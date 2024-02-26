import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order';
import { OrderService } from '../../services/order.service';
import { HelperService } from '../../services/helper.service';

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
  totalOrders: number = 0;
  selectedOrderId: number | null = null;

  constructor(
    private orderService: OrderService,
    public helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  selectOrder(orderId: number): void {
    if (this.selectedOrderId === orderId) {
        // Wenn die ausgewählte Bestellung bereits angezeigt wird, verbergen Sie die Detailansicht
        this.selectedOrderId = null;
    } else {
        // Andernfalls setzen Sie die ausgewählte Bestellung auf die angeklickte Bestellung
        this.selectedOrderId = orderId;
    }
}

  load(): void {
    this.orderService.all(this.page).subscribe(
      res => {
        this.orders = res.data;
        this.lastPage = res.meta.last_page;
        this.totalOrders = res.meta.total;
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

  formatPrice(price: number) {
    return this.helperService.formatPrice(price);
  }

  preSum(itemPrice: number, itemQuantyity: number) {
    let sum = 0;
    sum = itemPrice * itemQuantyity;
    return this.formatPrice(sum);
  }

  select(id: number): void {
    this.selected = id;
  }
}
