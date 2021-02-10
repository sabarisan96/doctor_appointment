import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Timestamp } from 'rxjs';
import { DatePipe } from '@angular/common';
import { SlotService } from '../services/slot.service';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface PeriodicElement {
  patient: any;
  contact : string;
  appointment: any;
  waited: any;
  image:any;
}


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
  providers: [DatePipe]
})



export class AppointmentListComponent implements OnInit {
  // displayedColumns: string[] = ['name', 'contact', 'appointment', 'waited'];
  dataSource :any[] = [];
  slotDate = new Date();
  constructor(private datePipe:DatePipe, private SlotService:SlotService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const sltDate = this.datePipe.transform(this.slotDate, 'yyyy-MM-dd'); 
    this.SlotService.findBookedSlots({slotDate:sltDate,fromTime:'9:00',toTime:'12:00'})
      .subscribe(data => {
        console.log(data[0])
        this.dataSource = data;
      }, err => this.errorHandler(err, 'Somethig went wrong !'));
  }


  private errorHandler(error:any, message:any) {
    this.snackBar.open(message, 'Error', {
      duration: 2000,
      verticalPosition: 'top'
    })
  }

}
