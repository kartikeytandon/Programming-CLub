import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { HotToastService } from '@ngneat/hot-toast';
import { getDocs, getFirestore, collection, setDoc, doc, addDoc, getDoc, query, where, updateDoc, DocumentReference } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(
    private router: Router,
    private fireauth: AngularFireAuth,
    private toast: HotToastService,
    private auth: Auth
  ) { }

  db=getFirestore();

  async getCurrentUser(){
    return authState(this.auth);
  }

 email:string="";
 name:string="";
  async googleSignIn(){
    const db = getFirestore();
    var alert = this.toast.loading('loggin in..');
    return this.fireauth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(async (res)=>{
    this.email=res.user?.email as string;
    this.name=res.user?.displayName as string;  
    if(this.name && this.email){
      alert.close();
      this.toast.success('successfully logged in');
      this.router.navigate(['Post']);
    }   
    })
  }
}
