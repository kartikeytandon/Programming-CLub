import { DatePipe } from "@angular/common";
import { Timestamp } from "firebase/firestore";

export  interface alumni {
 name:string,
 email:string,
 yop:Timestamp,
 lid:string,
 img:string
}