import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { COMPONENTS } from './components';
import { CONTAINERS } from './containers';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [COMPONENTS, CONTAINERS],
})
export class CoreModule {}
