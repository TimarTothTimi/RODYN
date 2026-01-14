import { TestBed } from "@angular/core/testing";
import { AdminGuard } from "./admin.guard";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

describe("AdminGuard", () => {
  let guard: AdminGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AdminGuard,
        {
          provide: AuthService,
          useValue: { getCurrentUser: () => ({ role: "admin" }) },
        },
      ],
    });

    guard = TestBed.inject(AdminGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });

  it("should allow access if the user is admin", () => {
    spyOn(authService, "getCurrentUser").and.returnValue({
      username: "admin_user",
      role: "admin",
    });

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = guard.canActivate(route, state);
    expect(result).toBeTrue();
  });

  it("should deny access if the user is not admin", () => {
    spyOn(authService, "getCurrentUser").and.returnValue({
      username: "regular_user",
      role: "user",
    });

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = guard.canActivate(route, state);
    expect(result).toBeFalse();
  });
});
