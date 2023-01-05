import { Injectable } from '@angular/core';
import { getDocs, getFirestore,collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  db=getFirestore();

  //getting all documents

  async getDocs(Collection:string){
   const snapshot=await getDocs(collection(this.db,Collection));
   snapshot.forEach((doc)=>{
    console.log(doc.data());
   })
   return snapshot;
  }


   //adding a doc  
   async addingDocument(obj: any, Collection: string) {
    await addDoc(collection(this.db, Collection), obj).then((res) => {
      console.log(res);
      console.log("added sucessfully");
    }).catch((err: any) => {
      console.log("check the error->" + err)
    })
  }
  

  
}
