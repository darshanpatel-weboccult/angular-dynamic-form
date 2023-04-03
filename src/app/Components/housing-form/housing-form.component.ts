import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { FormProviderService, House } from 'src/app/Shared/form-provider.service';

@Component({
  selector: 'app-housing-form',
  templateUrl: './housing-form.component.html',
  styleUrls: ['./housing-form.component.scss'],
})
export class HousingFormComponent implements OnInit {
  formsArray: FormGroup[] = [];
  formProvider: FormProviderService;

  constructor(private fp: FormProviderService) {
    this.formProvider = fp;
  }

  // to get updated forms 
  ngOnInit(): void {
    this.fp.getForms().subscribe((forms: FormGroup[]) => {
      this.formsArray = forms;
    });
  }

  // returns array of address form of house provided by index
  getAddresses(houseIndex: number): AbstractControl[] {
    return (this.formsArray[houseIndex]['controls']['addresses'] as FormArray)[
      'controls'
    ];
  }

  // returns array of address form of address of  house provided by index
  getPersons(houseIndex: number, addressIndex: number): AbstractControl[] {
    return (
      (
        (this.formsArray[houseIndex]['controls']['addresses'] as FormArray)[
          'controls'
        ][addressIndex] as FormGroup
      )['controls']['persons'] as FormArray
    )['controls'];
  }

}
