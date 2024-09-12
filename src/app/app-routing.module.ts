import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementsComponent } from './Component/elements/elements.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/elements' },
  { path: 'elements', component: ElementsComponent},
  { path: '**', component: ElementsComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
