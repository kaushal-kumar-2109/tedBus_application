import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-drawer',
  standalone: false,
  templateUrl: './form-drawer.component.html',
  styleUrl: './form-drawer.component.css'
})
export class FormDrawerComponent {
  @Input() selectedseat:number[]=[]
  @Input() seatprice:number=0;
  @Input() routedetails: any;
  @Input() busid:string=''
  @Input() busarrivaltime: number =0;
  @Input() busdeparturetime:number=0;
  @Input() operatorname:string=''
  formdrawerstate:boolean=false;
  sidenavopened=false;

  toogledrawer(open:boolean):void{
    this.formdrawerstate=open
  }
}
