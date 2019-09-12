import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  Input,
  Inject
} from '@angular/core';
import { TooltipPosition } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Event } from './../../models/event';
import { EventDialogViewComponent } from '../event-dialog-view/event-dialog-view.component';
import { MatDialog } from '@angular/material/dialog';
import { ReminderDialogComponent } from '../reminder-dialog/reminder-dialog.component';
import { EventDialogEditComponent } from '../event-dialog-edit/event-dialog-edit.component';
@Component({
  selector: 'app-show-action',
  templateUrl: './show-action.component.html',
  styleUrls: ['./show-action.component.less']
})
export class ShowActionComponent implements OnInit {
  isShowListAction: boolean;
  positionOptions: TooltipPosition[] = [
    'after',
    'before',
    'above',
    'below',
    'left',
    'right'
  ];
  position = new FormControl(this.positionOptions[2]);
  @Input() event: Event;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isShowListAction = false;
    }
  }

  constructor(private eRef: ElementRef, private dialog: MatDialog) {}

  ngOnInit() {
    this.isShowListAction = false;
  }

  showListAction($event) {
    this.isShowListAction = !this.isShowListAction;
  }

  viewEvent() {
    const dialogRef = this.dialog.open(EventDialogViewComponent, {
      maxHeight: '98vh',
      width: '80%',
      data: this.event
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    // alert('view event: ' + this.event.EventId);
  }

  editEvent($event) {
    const dialogRef = this.dialog.open(EventDialogEditComponent, {
      maxHeight: '98vh',
      width: '80%',
      data: this.event
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    // alert('edit event: ' + this.event.EventId);
  }

  sendReminder($event) {
    const dialogRef = this.dialog.open(ReminderDialogComponent, {
      maxHeight: '98vh',
      minWidth: '50%',
      data: this.event
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.isShowListAction = false;
  }

  makeOrder($event) {
    alert('make order event: ' + this.event.EventId);
    this.isShowListAction = false;
  }

  viewOrder($event) {
    alert('view order event: ' + this.event.EventId);
  }
}