import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bus-box',
  standalone: false,
  templateUrl: './bus-box.component.html',
  styleUrl: './bus-box.component.css'
})
export class BusBoxComponent {
@Input() rating:number[]=[];
@Input() operatorname:string=''
@Input() bustype:string=''
@Input() departuretime:string=""
@Input() reschedulable :number=0
@Input() livetracking: number=0
@Input() filledseats:any[]=[]
@Input() routedetails: any
@Input() busid:string=''
avgrating:number=0
totalreview:number=0
seatprivce:number=0
bustypename:string=''
busdeparturetime:number=0;
busarrivaltime:number=0
constructor(){}
ngOnInit(): void{
  this.rating.forEach((item,index)=> {
    this.avgrating+=  item;
    this.totalreview += index;
  });
  if(this.totalreview==0){
    this.totalreview=1
  }
  this.avgrating=+this.avgrating/this.totalreview;
  const duration = this.routedetails?.duration || 6;
  const busTypeLower = this.bustype.toLowerCase();
  if (busTypeLower.includes('sleeper')) {
    this.seatprivce = 120 * duration;
    this.bustypename = this.bustype;
  } else if (busTypeLower.includes('volvo') || busTypeLower.includes('multi axle')) {
    this.seatprivce = 150 * duration;
    this.bustypename = this.bustype;
  } else if (busTypeLower.includes('ac')) {
    this.seatprivce = 80 * duration;
    this.bustypename = this.bustype;
  } else {
    this.seatprivce = 50 * duration;
    this.bustypename = this.bustype;
  }
  const numericvalue=parseInt(this.departuretime,10);
  this.busdeparturetime=numericvalue;
  this.busarrivaltime=(numericvalue + duration) % 24;
}
}
