import { Component, OnInit } from '@angular/core';
import { MyOrderItem } from 'src/app/interfaces/my-order-item';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MyOrderDetailService } from 'src/app/services/myorderdetail.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class MyOrdersDetailComponent implements OnInit{

  myOrderItem: MyOrderItem[] = [];
  myOrderId: number = 0;
  myOrderItems: MyOrderItem[] = [];


  constructor(
    public helperService: HelperService,
    private router: Router,
    private route: ActivatedRoute,
    private myOrderDetailService: MyOrderDetailService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const orderId = params['id'];
      this.myOrderId = orderId;
    });

    /* this.route.params.pipe(
      switchMap(params => {
        const orderId = params['id'];
        return this.myOrderDetailService.all();
      })
    ).subscribe(
      {
        next: (res) =>  { 
          this.myOrderItem = res.data
        },
        error: (err) => { },
        complete: () => { }
      }
    ); */

    this.myOrderDetailService.all().subscribe(
      {
        next: (res) =>  { 
          this.myOrderItems = res.data
        },
        error: (err) => { },
        complete: () => { }
      }
    );
  }
}
