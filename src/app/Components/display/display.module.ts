import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from './display.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormProviderService } from 'src/app/Shared/form-provider.service';

@NgModule({
  declarations: [DisplayComponent],
  imports: [CommonModule],
  providers: [FormProviderService],
})
export class DisplayModule {}
