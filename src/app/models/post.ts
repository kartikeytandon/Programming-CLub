import { Timestamp } from "@firebase/firestore";

export  interface Post{
title:string,
content:string,
date:Timestamp,
img:string
}