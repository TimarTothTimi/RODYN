import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class FooterComponent {
  form: FormGroup;
  private firestore = inject(Firestore);
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      gdpr: [false, Validators.requiredTrue],
    });
  }
}
