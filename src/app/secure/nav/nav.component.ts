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
import { Cart } from 'src/app/interfaces/cart';
import { Subscription } from 'rxjs';

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
  productimage: string = '';
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
    public cartService: CartService
  ) {}
  
  loadCartItems() {
    this.cartService.loadCartItems();
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

  /* addToCart(productId: number, productName: string, productPrice: number, inStock: number): void {
    // Versuchen Sie, das bestehende Warenkorb-Array aus dem localStorage zu lesen
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
    // Finden Sie das Produkt im Warenkorb, falls vorhanden
    const existingProductIndex = cart.findIndex((item: any) => item.productId === productId);
  
    if (existingProductIndex !== -1) {
      // Wenn das Produkt bereits existiert, erhöhen Sie nur die Menge
      cart[existingProductIndex].quantity += 1;
    } else {
      // Wenn das Produkt neu ist, fügen Sie es dem Warenkorb hinzu
      cart.push({ productId, productName, productPrice, quantity: 1 });
    }
    // Speichern Sie das aktualisierte Warenkorb-Array zurück in den localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    this.displayCartItems();
    this.cartService.updateTotalInCart();
    this.loadCartItems();
  } */

  /* displayCartItems() {
    const cartItemsElement = document.getElementById('cartItems');

    while (cartItemsElement!.firstChild) {
      cartItemsElement!.removeChild(cartItemsElement!.firstChild);
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
    // Für jedes Produkt im Warenkorb ein Listenelement erstellen
    cart.forEach((product: Cart) => {
      const li = document.createElement('li');

      li.textContent = `ID: ${product.productId} - ${product.productName} - €${product.productPrice} - Quantity: ${product.quantity}`;

      cartItemsElement!.appendChild(li);
    });

    const totalQuantity = cart.reduce((total:any, product:any) => {
      return total + product.quantity;
    }, 0);

    this.totalQuantity = totalQuantity;
  } */
}
