import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuComponent } from '../menu/menu.component';
import { appInfo } from '../../environments/environment.dev';
import { Auth } from 'src/app/classes/auth';
import { User } from 'src/app/interfaces/user';
import { Role } from 'src/app/interfaces/role';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownService } from 'src/app/services/dropdown.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css', '../nav/avatar/avatar.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class NavComponent implements OnInit {

  cartItems: any[] = [];

  appInfo = appInfo;
  user?: User;
  userrole?: Role;

  totalProducts!: number;
  productImage: string = '';
  count: number = 1;
  stockIconColor: string = 'white';
  totalQuantity: number | undefined = 0;
  totalInCart: number = 0;

  private subscription: Subscription = new Subscription();
  
  @Output() functionTriggered = new EventEmitter<void>();

  triggerFunction() {
    this.functionTriggered.emit();
  }

  triggerSidebar() {
    this.functionTriggered.emit();
  }

  constructor(
    private authService: AuthService,
    public sidebar: MenuComponent,
    private router: Router,
    public cartService: CartService,
    private dropdownService: DropdownService
  ) {}
  
  loadCartItems() {
    this.cartService.loadCartItems();
  }

  clearCart() {
    this.cartService.clearCart();
    setTimeout(() => {
      this.closeDropdown();
    }, 2000);
  };

  deleteCartItem(productId: number) {
    this.cartService.deleteCartItem(productId);
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  ngOnInit() {
    this.cartService.updateTotalInCart();
    this.loadCartItems();
    this.subscription.add(this.cartService.currentTotalInCart.subscribe(total => {
    this.totalInCart = total;
    }));

    Auth.userEmitter.subscribe(
      (user: any) => {
        this.user = user;
        this.userrole = user?.role.name;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  closeDropdown(): void {
    this.dropdownService.closeDropdown();
  }

  increaseQuantity(productId: number) {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  sumPriceEachProduct(productId: number, productPrice: number) {
    return this.cartService.sumPriceEachProduct(productId, productPrice);
  }
}
