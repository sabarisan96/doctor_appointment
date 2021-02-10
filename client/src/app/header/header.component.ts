import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
