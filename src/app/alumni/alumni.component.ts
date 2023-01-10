import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { alumni } from '../models/alumni';
import { FormControl, FormGroup } from '@angular/forms';
import { timestamp } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { getDownloadURL, ref, Storage, uploadBytes, deleteObject } from '@angular/fire/storage';
declare function Init(): any;
@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css']
})
export class AlumniComponent implements OnInit {

  constructor(
    private service:UserService,
    private toast:HotToastService,
    private storage:Storage
  ) { }

 async ngOnInit(): Promise<void>{
  Init();
  this.getData();
  }


//getting all the data in dataTemp var  from database

dataTemp:alumni[]=[];

async getData(){
  const snapshot=await this.service.getDocs("alumni");
  snapshot.forEach((doc)=>{
  this.dataTemp.push(doc.data() as alumni ); 
  })

}

//creating a form for taking inputs from user like name,email linked in,yop

profileForm=new FormGroup(
  {
    name:new FormControl(''),
    email:new FormControl(''),
    lid:new FormControl(''),
    yop:new FormControl(new Date()),
    img:new FormControl('')
  }
)

//saving the image

file:any={};
Name:string="";

//getting the img
async selectImg($event:any){
  this.file=$event.target.files[0];
  this.Name=$event.target.files[0].name;
}


//saving the image address 
url:string="";
async uploadImg(){
var popup=this.toast.loading("uploading image");
var refe=ref(this.storage,"alumniImages"+this.Name);
await uploadBytes(refe,this.file).then((snapshot)=>{
 getDownloadURL(snapshot.ref).then((url)=>{
 this.url=url; 
 })
})
popup.close();
this.toast.success('image uploaded sucessfully');
}


//saving the final data
async saveData(){ 
  var alert=this.toast.success('saving data');
  var obj=this.profileForm.value;
  obj.img=this.url;
  await this.service.addingDocument(obj,'alumni').then(()=>{
  alert.close();
  }).catch((err)=>{
   console.log(err);
   var error=this.toast.error('could not save');
   error.close(); 
  });
}
}
