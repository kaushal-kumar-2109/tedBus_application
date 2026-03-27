import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../../../../service/dataservice.service';

@Component({
  selector: 'app-bus-booking-form',
  standalone: false,
  templateUrl: './bus-booking-form.component.html',
  styleUrl: './bus-booking-form.component.css'
})
export class BusBookingFormComponent {
@Input() selectedseat:number[]=[]
@Input() seatprice:number=0
@Input()routedetails :any
@Input() busid:string =''
@Input() busarrivaltime: number=0
@Input() busdeparturetime: number=0
@Input() operatorname:string=''
passdetails:{name:string,age:string,gender:string}[]=[]
passemail:string=''
passphn:string=''
passisbuisness:boolean=false
passinsurance:boolean=false
sendupdates:boolean=false
passiscovid:boolean=false
constructor(private router:Router, private dataservice:DataserviceService){}



handlePassGender(event: Event, index: number): void {
  const target = event.target as HTMLInputElement;
  if (!this.passdetails[index]) {
    // If not, initialize it with default values
    this.passdetails[index] = { name: '', age: '', gender: '' };
  }
  this.passdetails[index].gender = target.value;
}

handlePassName(event: Event, index: number): void {
  const target = event.target as HTMLInputElement;
  if (!this.passdetails[index]) {
    // If not, initialize it with default values
    this.passdetails[index] = { name: '', age: '', gender: '' };
  }
  this.passdetails[index].name = target.value;
}

handlePassAge(event: Event, index: number): void {
  const target = event.target as HTMLInputElement;
  if (!this.passdetails[index]) {
    // If not, initialize it with default values
    this.passdetails[index] = { name: '', age: '', gender: '' };
  }
  this.passdetails[index].age = target.value;
}

handleproceedtopay():void{
  const routeParams={
    operatorname:this.operatorname, 
    selectedseat:this.selectedseat,
    passemail:this.passemail,
    passphn:this.passphn,
    passiscoviddonate:this.passiscovid,
    passisbuisness:this.passisbuisness,
    passinsurance:this.passinsurance,
    seatprice:this.seatprice,
    busid:this.busid,
    busarrivaltime:this.busarrivaltime,
    busdeparturetime:this.busdeparturetime
  };

  this.dataservice.passobj(this.passdetails)
  this.dataservice.sendobj(this.routedetails)
  this.router.navigate(['/payment',routeParams])
}
}
