import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ski-form',
  templateUrl: './ski-form.component.html',
  styleUrls: ['./ski-form.component.css']
})
export class SkiFormComponent implements OnInit {
  constructor(private fb: FormBuilder) { }

  skiStyles = ['Freestyle', 'Classic'];

  skiForm = this.fb.group({
    height: ['', [Validators.required, Validators.min(0), Validators.max(230), this.isNumber]],
    age: ['', [Validators.required, Validators.min(0), Validators.max(100), this.isNumber]],
    style: ['', Validators.required]
  });

  isNumber(x: any) {
    let regex = /^[0-9]+$/;
    if (!x.value.trim().match(regex)) {
      return { isNumber: true };
    }
    return null;
  }

  recommendation: string;
  height: AbstractControl;
  skiStyle: AbstractControl;
  age: AbstractControl;

  ngOnInit() {
    this.height = this.skiForm.get('height');
    this.skiStyle = this.skiForm.get('style');
    this.age = this.skiForm.get('age');
  }

  submitted = false;
  onSubmit() {
    if (this.skiForm.valid) {
      this.submitted = true;
    }
  }

  clearForm() {
    this.skiForm.setValue({
      height: '',
      age: '',
      style: ''
    });
    this.skiForm.markAsPristine();
    this.skiForm.markAsUntouched();
  }

  skiLength(): void {
    let skiStyle = this.skiStyle.value;
    let age = this.age.value;
    let height = this.height.value;

    if (skiStyle === 'Freestyle') {
      if (age <= 4 && age >= 0) {
        this.recommendation = `${height} cm long `;
      } else if (age >= 5 && age <= 8) {
        this.recommendation = `${Number(height) + 10} to ${(Number(height) + 20)} cm long * `;
      } else if (age > 8) {
        this.recommendation = `${Number(height) + 10} to ${(Number(height) + 15)} cm long *`;
      }
    } else if (skiStyle === 'Classic') {
      if (age <= 4 && age >= 0) {
        this.recommendation = `${height} cm long `;
      } else if (age >= 5 && age <= 8) {
        this.recommendation = `${Number(height) + 10} to ${(Number(height) + 20)} cm long`;
      } else if (age > 8 && height <= 187) {
        this.recommendation = `${(Number(height) + 20)} cm long`;
      } else if (age > 8 && height > 187) {
        this.recommendation = `207+ cm long or custom made`;
      }
    }
  }
}
