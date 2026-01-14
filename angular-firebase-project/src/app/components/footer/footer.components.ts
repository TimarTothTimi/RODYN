import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { addDoc, Firestore, collection } from "@angular/fire/firestore";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.components.html",
  styleUrls: ["./footer.components.scss"],
})
export class FooterComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(Firestore) private firestore: Firestore
  ) {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      gdpr: [false, Validators.requiredTrue], // GDPR jelölőnégyzet
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

function subscribe() {
  throw new Error("Function not implemented.");
}
