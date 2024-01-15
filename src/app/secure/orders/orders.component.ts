import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css', '../secure.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  page: number = 1;
  lastPage!: number;
  selected: number = 0;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.orderService.all(this.page).subscribe(
      (res: any) => {
        this.orders = res.data;
        this.lastPage = res.meta.last_page;
      }
    );
  }

  next(): void {
    if(this.page === this.lastPage) { return; }
    this.page++;
    this.load();
  }
  
  previous(): void {
    if(this.page === 1) { return; }
    this.page--;
    this.load();
  }

  formatPrice(price: number) {
    return (Math.round(price * 100)/100).toFixed(2);
  }

  preSum(itemPrice: number, itemQuantyity: number): number {
    let sum = 0;
    sum = itemPrice * itemQuantyity;
    const formtedSum = this.formatPrice(sum);
    return Number(formtedSum);
  }

  select(id: number): void {
    this.selected = id;
  }
}
