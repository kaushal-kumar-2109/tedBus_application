import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bottom-tab',
  standalone: false,
  templateUrl: './bottom-tab.component.html',
  styleUrl: './bottom-tab.component.css'
})
export class BottomTabComponent {
@Input() filledseats:number[]=[]
@Input() seatprice:number=0;
@Input() routedetials:any;
@Input() busarrivaltime: number=0;
@Input() busdeparturetime:number=0;
@Input() operatorname: string=''
@Input() busid:string=''

tabstate:boolean[]=[false,false,false,false,false]

handletabstate(value:number):void{
  for(let i=0;i<this.tabstate.length;i++){
    this.tabstate[i]=(i===value && !this.tabstate[i])
  }
}

}
