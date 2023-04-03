import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingFormComponent } from './housing-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormProviderService } from 'src/app/Shared/form-provider.service';

@NgModule({
  declarations: [HousingFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers:[FormProviderService]
})
export class HousingFormModule {}
