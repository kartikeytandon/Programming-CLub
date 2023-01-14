import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Post } from '../models/post';
import { HotToastService } from '@ngneat/hot-toast';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';
declare function Init(): any;
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(
    private services:UserService,
    private toast:HotToastService,
    private storage:Storage
  ) { }

  async ngOnInit(): Promise<void>{
    Init();
    this.getPosts();
    
  }
  
  tempData:Post[]=[];
  
  //getting al the posts

  async getPosts(){
  var snapshots=this.services.getDocs('Posts');
  (await snapshots).forEach((doc)=>{
    var temp=doc.data() as Post;
    this.tempData.push(temp);
  })
  }

  //deleting any particular post
  async deletePost(id:string){
    var alert=this.toast.loading('deleting');
    alert.close(); 
    this.services.deleteDoc('Posts',id).then(()=>{
    var alert=this.toast.success('deleted sucessfully');
    alert.close(); 
    }).catch((err)=>{
    this.toast.error('error occured'); 
    })
  }
   
//creating any post
  
//1->selecting any image
file:any={};
Name:string="";
//getting the img
async selectImage($event:any){
  this.file=$event.target.files[0];
  this.Name=$event.target.files[0].name;
}

TempForm=new FormGroup(
  {
   title:new FormControl(''),
   content:new FormControl(''),
   img:new FormControl('')
  }
)
url:string="";
async uploadImage(){
  var temp=this.toast.loading("uploading image");
  const storageRef=ref(this.storage,"postImages/"+this.Name);
  await uploadBytes(storageRef,this.file).then((snapshot)=>{
    temp.close();
    this.toast.success("sucessfully added image");
    getDownloadURL(snapshot.ref).then((downloadUrl)=>{
      this.url=downloadUrl;
    })
  })
}

//saving final data
async createPost(){
var alert=this.toast.loading("adding post");  
var data=this.TempForm.value;
data.img=this.url;
this.services.addingDocument(data,"Posts").then(()=>{
 alert.close();
 this.toast.success("successfully added");
}).catch((err)=>{
  console.log(err);
  this.toast.error("some error occured");
})
}

}
