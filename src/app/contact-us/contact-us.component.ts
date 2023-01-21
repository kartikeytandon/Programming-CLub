import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //form created for storing data
  resForm=new FormGroup({
     name:new FormControl(''),
     email:new FormControl(''),
     message:new FormControl(''),
     phone:new FormControl(0) 
  })

 async saveData(){
  const data=this.resForm.value 
 }


}
