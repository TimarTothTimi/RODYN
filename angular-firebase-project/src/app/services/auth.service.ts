import { Injectable } from "@angular/core";
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "@angular/fire/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, catchError, from, map, Observable, tap } from "rxjs";

interface userAuthData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private googleAuthProvider = new GoogleAuthProvider();
  currentUserRole = new BehaviorSubject<string | null>(null);

  jwtHelper = new JwtHelperService();

  constructor(
    private router: Router,
    private auth: Auth,
    private toastr: ToastrService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.getCurrentUserRole(user.uid).subscribe((role) => {
          this.currentUserRole.next(role);
        });
      } else {
        this.currentUserRole.next(null);
      }
    });
  }

  getAuthState(): Observable<any> {
    return this.afAuth.authState;
  }

  private loggedInStatus: BehaviorSubject<boolean | null> = new BehaviorSubject<
    boolean | null
  >(null);

  private userEmail: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  public get userEmail$(): Observable<string | null> {
    return this.userEmail.asObservable();
  }

  public get loggedInStatus$(): Observable<boolean | null> {
    return this.loggedInStatus.asObservable();
  }

  get loggedInstatusValue(): boolean | null {
    return this.loggedInStatus.value;
  }

  checkLoggedInStatus(): boolean {
    if (!this.loggedInstatusValue) {
      this.router.navigate(["sign-in"]);
    }
    return true;
  }

  registration(regData: userAuthData): Observable<UserCredential> {
    return from(
      createUserWithEmailAndPassword(getAuth(), regData.email, regData.password)
    ).pipe(
      tap((userCredential) => {
        console.log("user adatok: ", userCredential);
        this.loggedInStatus.next(true);
        this.toastr.success("Registration sucessfully");
        this.router.navigate([""]);
      }),
      catchError((error) => {
        this.toastr.error(error.message);
        return error;
      })
    ) as Observable<UserCredential>;
  }

  login(loginData: userAuthData): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(this.auth, loginData.email, loginData.password)
    ).pipe(
      tap((userCredential) => {
        console.log("user adatok: ", userCredential);
        this.loggedInStatus.next(true);
        this.toastr.success("Login sucessfully");
        this.router.navigate([""]);
      }),
      catchError((error) => {
        this.toastr.error(error.message);
        return error;
      })
    ) as Observable<UserCredential>;
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
    this.loggedInStatus.next(false);
    this.userEmail.next(null);
  }

  checkAuthState(): void {
    this.auth.onAuthStateChanged({
      next: (user) => {
        if (user) {
          console.log("Van user initkor: ", user);
          this.loggedInStatus.next(true);
          this.userEmail.next(user.email);
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const userCredential = await signInWithPopup(
        this.auth,
        this.googleAuthProvider
      );
      const user = userCredential.user;
      this.toastr.success("Sikeres bejelentkezés Google-fiókkal!");

      // Frissítsd a felhasználói állapotot
      this.loggedInStatus.next(true);
      this.userEmail.next(user.email);

      // Navigálj a kívánt oldalra
      this.router.navigate([""]);
    } catch (error) {
      this.toastr.error("Hiba történt a Google-bejelentkezés során.");
      console.error("Google login error:", error);
    }
  }

  // Check if user is authenticated (i.e., has a valid token)
  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return token != null && !this.jwtHelper.isTokenExpired(token); // Ensure token exists and is not expired
  }

  // A token dekódolása
  getDecodedToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }

  // Token érvényességének ellenőrzése
  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  // Jelenlegi felhasználó lekérése (például a tokenből)
  getCurrentUser() {
    const token = localStorage.getItem("token"); // Token tárolva localStorage-ban
    if (token) {
      const decodedToken = this.getDecodedToken(token); // Token dekódolása
      return {
        username: decodedToken.username,
        role: decodedToken.role,
      };
    }
    return null;
  }

  // getCurrentUserRole(uid: string) {
  //   return this.firestore
  //     .collection("users")
  //     .doc(uid)
  //     .valueChanges()
  //     .pipe(map((user: any) => user?.role));
  // }

  getCurrentUserRole(uid: string): Observable<string> {
    return this.firestore
      .collection("users")
      .doc(uid)
      .valueChanges()
      .pipe(
        map((user: any) => user?.role || "user") // Alapértelmezett szerepkör: 'user'
      );
  }
}
