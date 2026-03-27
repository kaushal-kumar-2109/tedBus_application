import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from "../model/bus.model"
import { url } from '../config';
import { Booking } from '../model/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private busbookapi: string = url + 'booking/'
  private apiurl: string = url + 'routes/'
  constructor(private http: HttpClient) { }
  GETBUSDETAILS(depart: string, arrival: string, date: string): Observable<Bus[]> {
    const url = `${this.apiurl}${depart}/${arrival}/${date}`;
    console.log(depart,arrival,date)
    return this.http.get<Bus[]>(url);
  }
addbusmongo(myBooking:any):Observable<Booking>{
  const busbook: Booking = {
    customerId:myBooking.customerId,
    passengerDetails:myBooking.passengerDetails,
    email:myBooking.email,
    phoneNumber:myBooking.phoneNumber,
    fare:myBooking.fare,
    status:myBooking.status,
    bookingDate:myBooking.bookingDate,
    busId:myBooking.busId,
    seats: myBooking.seats,
    departureDetails:myBooking.departureDetails,
    arrivalDetails:myBooking.arrivalDetails,
    duration:myBooking.duration,
    isBusinessTravel:myBooking.isBusinessTravel,
    isInsurance: myBooking.isInsurance ,
    isCovidDonated:myBooking.isCovidDonated
  };
  return this.http.post<Booking>(this.busbookapi,busbook)
}

getbusmongo(id:string):Observable<Booking[]>{
  const url=`${this.busbookapi}${id}`;
  return this.http.get<Booking[]>(url);
}

}
