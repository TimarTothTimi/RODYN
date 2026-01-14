import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import {
  addDoc,
  Firestore,
  collection,
  provideFirestore,
  getFirestore,
} from "@angular/fire/firestore";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.components.html",
  styleUrls: ["./footer.components.scss"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class FooterComponent {
  form: FormGroup;
  private firestore = inject(Firestore); // standalone inject pattern
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      gdpr: [false, Validators.requiredTrue],
    });
  }

  subscribe() {
    if (this.form.valid) {
      const email = this.form.value.email;

      const newsletterCollection = collection(this.firestore, "Newsletter");
      addDoc(newsletterCollection, { email })
        .then(() => {
          alert("Sikeresen feliratkoztál a hírlevélre!");
          this.form.reset();
        })
        .catch((error) => {
          console.error("Hiba történt a mentés során:", error);
          alert("Hiba történt a mentés során, próbáld újra később.");
        });
    } else {
      alert(
        "Kérlek, töltsd ki helyesen a mezőket, és fogadd el az adatvédelmi nyilatkozatot!"
      );
    }
  }
}
