import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Post } from '../models/post';
import { HotToastService } from '@ngneat/hot-toast';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Storage, deleteObject } from '@angular/fire/storage';
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
    temp.id=doc.id;
    this.tempData.push(temp);
  })
  }

  //deleting any particular post
  async deletePost(id:string,name:string){
    var alert=this.toast.loading('deleting');
    var storageRef=ref(this.storage,'postImages/'+name);
    await deleteObject(storageRef).then(()=>{
      this.services.deleteDoc('Posts',id).then(()=>{
        var alert=this.toast.success('deleted Sucessfully');
        alert.close();
      }).catch((err)=>{
        this.toast.error(err);
      })
    })
  }
   
//creating any post
  
//1->selecting any image
file:any={};
Name:string="";
//getting the img
async selectImage($event:any){
  if(this.TempForm.value.content?.length==0 || this.TempForm.value.title?.length==0){
    this.toast.error("please fill the title and content first");
}
else{
  this.toast.success("image selected");
  this.file=$event.target.files[0];
  this.Name=$event.target.files[0].name;
}
}

//creating form for getting information about post 
TempForm=new FormGroup(
  {
   title:new FormControl(''),
   content:new FormControl(''),
   img:new FormControl('')
  }
)
url:string="";
canShow:boolean=false;

//uploading image that has been selected

async uploadImage(){
  if(this.TempForm.value.title?.length==0 || this.TempForm.value.content?.length==0){
      this.toast.error("please fill the title and content first");
  }

  else {var temp=this.toast.loading("uploading image");
  const storageRef=ref(this.storage,"postImages/"+this.TempForm.value.title);
  await uploadBytes(storageRef,this.file).then((snapshot)=>{
    temp.close();
    this.toast.success("sucessfully added image");
    getDownloadURL(snapshot.ref).then((downloadUrl)=>{
      this.url=downloadUrl;
    })
  })
}
}

//saving final data

async createPost(){
if(this.TempForm.value.title?.length==0 ||this.TempForm.value.content?.length==0){
 this.toast.error("content and title must be there"); 
}

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
