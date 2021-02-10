import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SlotService } from '../services/slot.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-morning-slot',
  templateUrl: './add-morning-slot.component.html',
  styleUrls: ['./add-morning-slot.component.scss'],
  providers: [DatePipe]
})
export class AddMorningSlotComponent implements OnInit {

  addTimeSlot!:any;

  constructor(private dialog:MatDialog, private slotService: SlotService,private snackBar:MatSnackBar,private datePipe: DatePipe) { }

  ngOnInit():void {
    this.addTimeSlot = new FormGroup({
      slotDate: new FormControl('',[Validators.required]),
      fromTime:new FormControl('', [Validators.required]),
      toTime:new FormControl('',[Validators.required])
    });
  }

  minDate =  new Date();
  maxTime : any;
  get f(){
    return this.addTimeSlot.controls;
  }
  closeDialog(): void {
      this.dialog.closeAll();
  }

  futureTime(time:any){
    var time = time.target.value;
    var thirtyMinutesLater = this.addMinutesToTime(time,30)
    if(thirtyMinutesLater != '00:NaN'){
      this.maxTime = thirtyMinutesLater;  
    }
    
  }

  onAddSlot(){
    if(this.addTimeSlot.value){
      const body = this.addTimeSlot.value;
      body.slotDate = this.datePipe.transform(body.slotDate, 'yyyy-MM-dd');  // You can provide any date format on the 2nd parameter

      this.slotService.addSlot(body).subscribe((data)=>{
        const resp = JSON.stringify(data);
        const mesg = JSON.parse(resp);
        this.msgHandler(mesg.msg);
        this.dialog.closeAll();
        // this.isResultsLoading = false;
      }, err => {
        this.errorHandler(err, err.error);
        // this.isResultsLoading = false;
  
      });
  }
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


  addMinutesToTime(time:any, minsAdd:any) {
    function z(n:any){ 
      return (n<10? '0':'') + n;
    }
    var bits = time.split(':');
    var mins = bits[0]*60 + +bits[1] + +minsAdd;
    return z(mins%(24*60)/60 | 0) + ':' + z(mins%60);  
  } 

  
}
