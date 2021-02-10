import { AfterViewInit, Component, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Moment } from 'moment';
import { AddEveningSlotComponent } from '../add-evening-slot/add-evening-slot.component';
import { AddMorningSlotComponent } from '../add-morning-slot/add-morning-slot.component';
import { SlotService } from '../services/slot.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-walk-in',
  templateUrl: './walk-in.component.html',
  styleUrls: ['./walk-in.component.scss'],
  providers: [DatePipe]
})
export class WalkInComponent implements AfterViewInit {
  @Output()
  dateSelected: EventEmitter<Moment> = new EventEmitter();
  
  slotDate = new Date();
  body:any;
  dataSource:any =[]=[];
  constructor(private renderer: Renderer2, private dialog:MatDialog,private SlotService: SlotService,private snackBar: MatSnackBar,private datePipe: DatePipe) { }

  ngAfterViewInit() {
    const buttons = document.querySelectorAll('.mat-calendar-previous-button, .mat-calendar-next-button');
    
    const sltDate = this.datePipe.transform(this.slotDate, 'yyyy-MM-dd'); 
    this.SlotService.findSlots({slotDate:sltDate,fromTime:'9:00',toTime:'12:00'})
      .subscribe(data => {
        this.dataSource = data;
      }, err => this.errorHandler(err, 'Somethig went wrong !'));

  }

  dateChange(date:any){
    const sltDate = this.datePipe.transform(date._d, 'yyyy-MM-dd'); 
      this.SlotService.findSlots({slotDate:sltDate,fromTime:'9:00',toTime:'12:00'})
      .subscribe(data => {
        this.dataSource = data;
      }, err => this.errorHandler(err, 'Somethig went wrong !'));
  }
  


  private errorHandler(error:any, message:any) {
    this.snackBar.open(message, 'Error', {
      duration: 2000,
      verticalPosition: 'top'
    })
  }

  private msgHandler(message:any) {
    this.snackBar.open(message, 'Success', {
      duration: 2000,
      verticalPosition: 'top'
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMorningSlotComponent,{
      width: '550px',disableClose: true 
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.ngAfterViewInit();
    })
  }

  openEveningDialog(): void {
    const dialogRef = this.dialog.open(AddEveningSlotComponent,{
      width: '550px',disableClose: true 
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.ngAfterViewInit();
    })
  }

}
