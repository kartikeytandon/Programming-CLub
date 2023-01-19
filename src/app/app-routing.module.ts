import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AlumniComponent } from './alumni/alumni.component';
import { PostComponent } from './post/post.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
const routes: Routes = [
  {
    component:HomeComponent,
    path:'home'
  },
  {
   component:LoginComponent,
   path:'' 
  },
  {
   component:AlumniComponent,
   path:'alumni' 
  },
  {
   component:PostComponent,
   path:'Post' 
  }
  ,
  {
   component:ContactUsComponent,
   path:'contact' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}

