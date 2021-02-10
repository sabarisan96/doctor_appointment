import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Slot} from '../models/slot';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  constructor(private httpClient: HttpClient) { }

  addSlot(body: String):Observable<Slot>{
    console.log(body);
  return this.httpClient.post<Slot>(`${environment.api_url}/slots/addslot`, body);
  }

  findSlots(body:any):Observable<Slot[]>{
      return this.httpClient.get<Slot[]>(`${environment.api_url}/slots/findSlots?slotDate=${body.slotDate}`);
  }

  findBookedSlots(body:any):Observable<Slot[]>{
    return this.httpClient.get<Slot[]>(`${environment.api_url}/slots/findBookedSlots?slotDate=${body.slotDate}`);
  }

}
