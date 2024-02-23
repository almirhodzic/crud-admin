import { Component, OnInit } from '@angular/core';
import { MyOrderService } from '../../services/myorder.service';
import { MyOrder } from 'src/app/interfaces/my-order';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrl: './myorders.component.css'
})
export class MyordersComponent implements OnInit{

  constructor(
    private myOrderService: MyOrderService,
    public helperService: HelperService
  ) { }

  myorders: MyOrder[] = [];
  page: number = 1;
  lastPage!: number;
  totalMyOrders: number = 0;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.myOrderService.all(this.page).subscribe(
      res => {
        this.myorders = res.data;
        this.lastPage = res.meta.last_page;
        this.totalMyOrders = res.meta.total;
      }
    );
  }

  next(): void {
    if(this.page === this.lastPage) { }
    this.page++;
    this.load();
  }
  
  previous(): void {
    if(this.page === 1) { }
    this.page--;
    this.load();
  }
}
