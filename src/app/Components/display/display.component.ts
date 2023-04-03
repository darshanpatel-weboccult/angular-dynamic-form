import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  FormProviderService,
  House,
} from 'src/app/Shared/form-provider.service';
import { ageValidator, pinValidator } from 'src/app/Shared/validator';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})

export class DisplayComponent implements OnInit {
  houses: House[] = [];

  constructor(private fp: FormProviderService, private router:Router) {}

  // To get updated submissions values 
  ngOnInit(): void {
    this.fp.getHouses().subscribe((houses: House[]) => {
      this.houses = houses;
    });
  }

  // delete submission provided by index
  deleteHouse(houseIndex: number) {
    this.fp.deleteHouse(houseIndex);
  }

  // prepares new form group to update values 
  updateHouse(houseIndex: number) {
    const values = this.houses[houseIndex];
    const house: any = {};
    house['name'] = new FormControl(values.name, [Validators.required]);
    house['type'] = new FormControl(values.type, [Validators.required]);
    house['addresses'] = new FormArray([]);
    for (let address of values.addresses) {
      const persons: FormGroup[] = [];

      for (let person of address.persons) {
        persons.push(
          new FormGroup({
            name: new FormControl(person.name, [Validators.required]),
            age: new FormControl(person.age, [
              Validators.required,
              ageValidator,
            ]),
            gender: new FormControl(person.gender),
          })
        );
      }
      const addressGrp = {
        plot: new FormControl(address.plot, [Validators.required]),
        area: new FormControl(address.area, [Validators.required]),
        pin: new FormControl(address.pin, [Validators.required, pinValidator]),
        persons: new FormArray(persons),
      };

      (house['addresses'] as FormArray).push(new FormGroup(addressGrp));
    }
    this.fp.setEditIndex(houseIndex);
    this.fp.setForms([new FormGroup(house)]);
    this.router.navigate(['housing-form'])
  }
}
