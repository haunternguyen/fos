import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventList } from 'src/app/models/eventList';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { ActivatedRoute } from '@angular/router';

import * as jsPDF from 'jspdf';
// import * as printJs from 'printjs';
import html2canvas from 'html2canvas';
import * as moment from 'moment';
import 'moment/locale/vi';
import { SummaryService } from 'src/app/services/summary/summary.service';

import { environment } from 'src/environments/environment';
import { Report } from 'src/app/models/report';
import { async } from 'q';

const database: any[] = [
  {
    userId: 'e618f708-8dde-4f04-9d9b-5c5bc3a4905d',
    payExtra: 10000,
    comment: 'không hành',
    orderDetail: [
      { foodId: '', foodName: 'Chicken Rice', price: 30000 },
      { foodId: '', foodName: 'Coka', price: 10000 },
      { foodId: '', foodName: 'Draft beer', price: 20000 }
    ]
  },
  {
    userId: 'e618f708-8dde-4f04-9d9b-5c5bc3a4905d',
    payExtra: 10000,
    comment: 'không hành',
    orderDetail: [
      { foodId: '', foodName: 'Chicken Rice', img: '', price: 30000 },
      { foodId: '', foodName: 'Coka', img: '', price: 10000 },
      { foodId: '', foodName: 'Draft beer', img: '', price: 20000 }
    ]
  },
  {
    userId: 'e618f708-8dde-4f04-9d9b-5c5bc3a4905d',
    payExtra: 10000,
    comment: 'không hành',
    orderDetail: [
      { foodId: '', foodName: 'Chicken Rice', img: '', price: 30000 },
      { foodId: '', foodName: 'Coka', img: '', price: 10000 },
      { foodId: '', foodName: 'Draft beer', img: '', price: 20000 }
    ]
  }
];

@Component({
  selector: 'app-event-summary-dialog',
  templateUrl: './event-summary-dialog.component.html',
  styleUrls: ['./event-summary-dialog.component.less']
})
export class EventSummaryDialogComponent implements OnInit {
  @ViewChild('personGroupView', { static: false }) userGroupTab: ElementRef;

  constructor(
    private router: Router,
    private restaurantService: RestaurantService,
    private summaryService: SummaryService,
    private route: ActivatedRoute
  ) {
    console.log(router.routerState);
  }

  printMode:boolean;
  dishGroupViewdataSource: any = new MatTableDataSource([]);
  personGroupViewdataSource: any = new MatTableDataSource([]);

  dishGroupViewDisplayedColumns: string[] = [
    'picture',
    'name',
    'amount',
    'price',
    'total',
    'comment'
  ];
  personGroupViewDisplayedColumns: string[] = [
    'user',
    'food',
    'price',
    'pay-extra',
    'comment'
  ];

  restaurant: any;

  eventDetail: EventList;

  orderByDish: any[] = [
    {
      foodId: '',
      picture:
        'https://images.foody.vn/res/g1/595/prof/s60x60/foody-upload-api-foody-mobile-10-jpg-180508140146.jpg',
      name: 'Coka',
      amount: 4,
      price: 10000,
      total: 40000,
      comment: '2x không gas, 1x không đường'
    },
    {
      foodId: '',
      picture:
        'https://images.foody.vn/res/g1/595/prof/s60x60/foody-upload-api-foody-mobile-10-jpg-180508140146.jpg',
      name: 'Coka',
      amount: 4,
      price: 10000,
      total: 40000,
      comment: '2x không gas, 1x không đường'
    }
  ];

  orderByPerson: any[] = [
    {
      user: 'admin',
      food: '1xChicken rice + 1x coca',
      price: 40000,
      payExtra: 5000,
      comment: 'không hành'
    },
    {
      user: 'admin',
      food: '1xChicken rice + 1x coca',
      price: 40000,
      payExtra: 5000,
      comment: 'không hành'
    },
    {
      user: 'admin',
      food: '1xChicken rice + 1x coca',
      price: 40000,
      payExtra: 5000,
      comment: 'không hành'
    },
    {
      user: 'admin',
      food: '1xChicken rice + 1x coca',
      price: 40000,
      payExtra: 5000,
      comment: 'không hành'
    },
    {
      user: 'admin',
      food: '1xChicken rice + 1x coca',
      price: 40000,
      payExtra: 5000,
      comment: 'không hành'
    },
    {
      user: 'admin',
      food: '1xChicken rice + 1x coca',
      price: 40000,
      payExtra: 5000,
      comment: 'không hành'
    },
    {
      user: 'admin',
      food: '1xChicken rice + 1x coca',
      price: 40000,
      payExtra: 5000,
      comment: 'không hành'
    },
    {
      user: 'admin',
      food: '1xChicken rice + 1x coca',
      price: 40000,
      payExtra: 5000,
      comment: 'không hành'
    },
    {
      user: 'admin',
      food: '1xChicken rice + 1x coca',
      price: 40000,
      payExtra: 5000,
      comment: 'không hành'
    },{
      user: 'admin',
      food: '1xChicken rice + 1x coca',
      price: 40000,
      payExtra: 5000,
      comment: 'không hành'
    },
    {
      user: 'admin',
      food: '1xChicken rice + 1x coca',
      price: 40000,
      payExtra: 5000,
      comment: 'không hành'
    },
    {
      user: 'admin',
      food: '1xChicken rice + 1x coca',
      price: 40000,
      payExtra: 5000,
      comment: 'không hành'
    },{
      user: 'admin',
      food: '1xChicken rice + 1x coca',
      price: 40000,
      payExtra: 5000,
      comment: 'không hành'
    },
    {
      user: 'admin',
      food: '1xChicken rice + 1x coca',
      price: 40000,
      payExtra: 5000,
      comment: 'không hành'
    },
    {
      user: 'admin',
      food: '1xChicken rice + 1x coca',
      price: 40000,
      payExtra: 5000,
      comment: 'không hành'
    }
  ];

  dishGroupView() {
    database.map(order => {
      order.orderDetail.map(detail => {
        if (
          !this.orderByDish.includes(order => order.foodId == detail.foodId)
        ) {
          // this.orderData.push()
        }
      });
    });
  }
  toStandardDate(date: Date) {
    return moment(date).format('DD/MM/YYYY HH:mm');
  }
 
  printToPdf() {
    // this.printMode = true;
    const printContent = document.getElementById("print");

    // printJs('print', 'html');
    console.log(printContent)
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    // WindowPrt.document.write('<link rel="stylesheet" type="text/css" href="event-summary-dialog.component.css">');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    console.log(window.document)
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

  async sendEmail() {
    const page = document.getElementById('print');
    const options = {
      background: "white", height: 800, width: page.clientWidth, letterRendering: 1, scale: 2,};
    console.log(this.userGroupTab)
    // pageSource.toDataURL("image/PNG")
    // let doc = new jsPDF();
    // var html = '<html> <a href="'+ window.location.href + '">Click here to go to event report' + '</a></html>';
    html2canvas(page, options).then(pageSource => {
      //Converting canvas to Image
      var pageData = pageSource.toDataURL('image/PNG');
      // let userGroupData = userTabSource.toDataURL("image/PNG")
      // Add image Canvas to PDF%
      // doc.addImage(pageData, 'PNG', 0, 0, window.innerWidth*0.25, window.innerHeight*0.25);

      this.summaryService.addReport(this.eventDetail.EventId, window.location.href, pageData)
      // doc.addImage(userGroupData, 'PNG', 20, 20, 200, 200);
      console.log('html2canvas');
    });
    // .then(async() => {
    //   let pdfOutput = await doc.output();
    //   console.log('output')
    //   var report = new Report();
    //   report.Subject = "Report for " + this.eventDetail.eventTitle;
    //   report.Html = html;
    //   report.Attachment = pdfOutput;
    //   if (report.Html && report.Subject && report.Attachment) {
    //     console.log(report)
    //     // await this.summaryService.sendEmail(report);
    //     // this.summaryService.downloadReport();

    //     this.summaryService.addReport(this.eventDetail.eventId, pdfOutput)
    //   }
    // });
  }

  // pageToImage() {
  //   window['html2canvas'] = html2canvas;

  //   console.log(this.userGroupTab)

  //   const page = document.getElementById('report');
  //   // const userGroupTab = document.get('personGroupView');
  //   const options = {background: "white", height: page.clientHeight, width: page.clientWidth, letterRendering: 1};
  //   // const options2 = {background: "white", height: this.userGroupTab.nativeElement.clientHeight, width: this.userGroupTab.nativeElement.clientWidth};

  //   html2canvas(page, options).then(pageSource => {
  //     // html2canvas(userGroupTab, options2).then((userTabSource) => {
  //       //Initialize JSPDF
  //       let doc = new jsPDF();
  //       //Converting canvas to Image
  //       var pageData = pageSource.toDataURL("image/PNG");
  //       // let userGroupData = userTabSource.toDataURL("image/PNG")
  //       // Add image Canvas to PDF%
  //       doc.addImage(pageData, 'PNG', 0, 0, window.innerWidth*0.25, window.innerHeight*0.25);
  //       // doc.addImage(userGroupData, 'PNG', 20, 20, 200, 200);

  //       let pdfOutput = doc.output();
  //       let buffer = new ArrayBuffer(pdfOutput.length);
  //       let array = new Uint8Array(buffer);
  //       for (let i = 0; i < pdfOutput.length; i++) {
  //           array[i] = pdfOutput.charCodeAt(i);
  //       }
  //       const fileName = "report.pdf";
  //       // doc.save(fileName);
  //     });
  //   // })
  // }

  ngOnInit() {
    this.restaurant = { }
    this.eventDetail = new EventList();
    this.restaurant.isLoaded = false;
    this.printMode = false;

    this.route.params.subscribe(params => {
      var id = params['id'];
      this.summaryService.getEventById(id).then(result => {
        this.eventDetail = {
          EventTitle: result.Name,
          EventId: result.EventId,
          EventRestaurant: result.Restaurant,
          EventMaximumBudget: result.MaximumBudget,
          EventTimeToClose: result.Date,
          EventTimeToReminder: result.TimeToRemind,
          EventHost: result.HostName,
          EventParticipants: result.Participants,
          EventCategory: result.Category,
          EventRestaurantId: result.RestaurantId,
          EventServiceId: '1',
          EventDeliveryId: '',
          EventCreatedUserId: '4cf3230b-6dd5-4942-a0cd-bcb8db6dc8eb',
          EventHostId: '4cf3230b-6dd5-4942-a0cd-bcb8db6dc8eb',
          EventParticipantsJson: '',
          EventDate: null,
          EventType: null
        };


        this.restaurantService.getRestaurants([Number(this.eventDetail.EventRestaurantId)]).then(result => {
          console.log(result[0])
          this.restaurant = result[0];
          this.restaurant.address = result[0].Address;

          this.restaurantService.getRestaurantDetail(Number(this.restaurant.DeliveryId))
          .then(result => {
            this.restaurant.Rating = Number(result.Rating);
            this.restaurant.TotalReview = Number(result.TotalReview);
            this.restaurant.isLoaded = true;
          });
          console.log(this.restaurant)
          // this.restaurant.RestaurantUrl = "01234";
        }); 
      });
    })

    this.dishGroupViewdataSource = this.orderByDish;
    this.personGroupViewdataSource = this.orderByPerson;
  }
}
