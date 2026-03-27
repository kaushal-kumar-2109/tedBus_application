import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: false,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  to: string = '';
  position: number = 0;
  from: string = '';
  nobus: number = 0;
  dataSource = Element_data;
  displayedColumns: string[] = ['position', 'from', 'to', 'nobus'];

}
const Element_data: DialogComponent[] = [
  {
    position: 1, from: 'Delhi', to: 'Jaipur', nobus: 2,
    dataSource: [],
    displayedColumns: []
  },
  {
    position: 2, from: 'Mumbai', to: 'Goa', nobus: 2,
    dataSource: [],
    displayedColumns: []
  },
  {
    position: 3, from: 'Bangalore', to: 'Mysore', nobus: 2,
    dataSource: [],
    displayedColumns: []
  },
  {
    position: 4, from: 'Kolkata', to: 'Darjeeling', nobus: 2,
    dataSource: [],
    displayedColumns: []
  },
  {
    position: 5, from: 'Chennai', to: 'Pondicherry', nobus: 2,
    dataSource: [],
    displayedColumns: []
  },
]