import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { ageValidator, pinValidator } from './validator';

export interface Person {
  name: string;
  age: number;
  gender: 'male' | 'female';
}

export interface Address {
  plot: string;
  area: string;
  pin: number;
  persons: Person[];
}

export interface House {
  name: string;
  type: 'small' | 'medium' | 'large';
  id: string;
  addresses: Address[];
}

@Injectable({
  providedIn: 'root',
})
export class FormProviderService {
  private forms: BehaviorSubject<FormGroup[]>; // active forms
  private houses: BehaviorSubject<House[]>; // submitted forms
  private editIndex: null | number = null; // indicates form to be updated

  constructor(private fb: FormBuilder) {
    this.forms = new BehaviorSubject<FormGroup[]>([]);
    this.houses = new BehaviorSubject<House[]>(this.getLocalData());
  }

  // returns observable stream of forms
  getForms(): Observable<FormGroup[]> {
    return this.forms.asObservable();
  }

  // returns observable stream of submissions
  getHouses(): Observable<House[]> {
    return this.houses.asObservable();
  }

  // inserts new house from in active forms
  addHouseForm(): void {
    const newHouse = this.fb.group({
      name: ['', Validators.required],
      type: ['small', Validators.required],
      addresses: this.fb.array([]),
    });
    this.forms.next([...this.forms.value, newHouse]);
  }

  // inserts new address form in active forms
  addAddressForm(houseIndex: number): void {
    const newAddress = this.fb.group({
      plot: ['', Validators.required],
      area: ['', Validators.required],
      pin: ['', [Validators.required, pinValidator]],
      persons: this.fb.array([]),
    });
    const updatedForms = [...this.forms.value];
    (updatedForms[houseIndex]['controls']['addresses'] as FormArray).push(
      newAddress
    );
    this.forms.next(updatedForms);
  }

  // inserts new Person form in active forms
  addPersonForm(houseIndex: number, addressIndex: number): void {
    const newPerson = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, ageValidator]],
      gender: ['male', Validators.required],
    });
    const updatedForms = [...this.forms.value];
    (
      (
        (updatedForms[houseIndex]['controls']['addresses'] as FormArray).at(
          addressIndex
        ) as FormGroup
      )['controls']['persons'] as FormArray
    ).push(newPerson);
    this.forms.next(updatedForms);
  }

  // removes house form from active forms
  removeHouse(houseIndex: number): void {
    this.forms.next([
      ...this.forms.value.filter((item, index) => index !== houseIndex),
    ]);
    this.editIndex = null;
  }

  // removes address form from active forms
  deleteAddress(houseIndex: number, addressIndex: number): void {
    const updatedForms = [...this.forms.value];
    (updatedForms[houseIndex]['controls']['addresses'] as FormArray).removeAt(
      addressIndex
    );
    this.forms.next(updatedForms);
  }

  // removes person form from active forms
  deletePerson(
    houseIndex: number,
    addressIndex: number,
    personIndex: number
  ): void {
    const updatedForms = [...this.forms.value];
    (
      (
        (updatedForms[houseIndex]['controls']['addresses'] as FormArray).at(
          addressIndex
        ) as FormGroup
      )['controls']['persons'] as FormArray
    ).removeAt(personIndex);
    this.forms.next(updatedForms);
  }

  // gathers data from active form and puts in houses
  handleSubmit(houseIndex: number) {
    const values: House = {
      ...this.forms.value[houseIndex].value,
      id: Date.now().toString(36) + Math.random().toString(36).substr(100),
    };
    const currentValue = [...this.houses.value];
    if (this.editIndex === null) {
      currentValue.push(values);
    } else {
      currentValue[this.editIndex] = {
        ...values,
        id: currentValue[this.editIndex].id,
      };
      this.editIndex = null;
    }
    this.houses.next(currentValue);
    this.setLocalData();
    this.forms.next([
      ...this.forms.value.filter((item, index) => index !== houseIndex),
    ]);
  }

  // returns submissions stored in local storage
  getLocalData(): House[] {
    const houses = localStorage.getItem('houses');
    if (houses) {
      return JSON.parse(houses);
    }
    return [];
  }

  // stores submissions in local storage
  setLocalData(): void {
    localStorage.setItem('houses', JSON.stringify(this.houses.value));
  }

  // deletes submission from houses and local storage
  deleteHouse(houseIndex: number): void {
    this.houses.next([
      ...this.houses.value.filter((item, index) => index !== houseIndex),
    ]);
    this.setLocalData();
  }

  // setup form to be updated
  setForms(newForms: FormGroup[]): void {
    this.forms.next(newForms);
  }

  // sets index of house to be updated
  setEditIndex(editIndex: null | number) {
    this.editIndex = editIndex;
  }

  // returns whether edit mode is on or off
  get isEdit(): boolean {
    return this.editIndex !== null;
  }
}
