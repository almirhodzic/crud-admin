import { Component, OnInit, OnDestroy, booleanAttribute } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { UserService } from 'src/app/services/user.service';
import { Auth } from 'src/app/classes/auth';
import { UserdetailService } from 'src/app/services/userdetail.service';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from 'src/app/services/checkout.service';
import { appInfo } from 'src/app/environments/environment.dev';

@Component({
  selector: 'app-basket',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css', './../nav/nav.component.css', '../secure.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckoutComponent implements OnInit, OnDestroy{

  private subscription: Subscription = new Subscription();

  form!: FormGroup;
  first_name: string = '';
  last_name: string = '';
  phone: any | string = '';
  address: string = '';
  country: string = '';
  city: string = '';
  zipcode: number | string = '';
  useremail: string = '';
  userid: number = 0;
  ShowComponent: boolean = false;
  agb: boolean = false;
  cartSend: string = '';
  cartItems: any[] = [];
  totalInCart: number = 0;
  checkout_success_success: number = 0;
  checkout_success_message: string = '';
  checkout_success_buyeremail: string = '';
  checkout_success_orderid: number = 0;
  appInfo = appInfo;

  f1E: string = '';

  constructor(
    public cartService: CartService,
    private router: Router,
    private loaderService: LoaderService,
    private userService: UserService,
    private userDetailService: UserdetailService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private checkoutService: CheckoutService
  ) { }

  ngOnInit() {

    if(this.cartService.cartIsEmpy()){
      this.router.navigate(['/shop']);
    }

    this.form = this.formBuilder.group({
      agb: [this.agb],
      user_id: [this.userid],
      cart: [this.cartSend]
    });

    this.reloadUserData();
    this.cartService.updateTotalInCart();
    this.loadCartItems();
    this.cartSend = localStorage.getItem('minicart') ? JSON.parse(localStorage.getItem('minicart') || '{}') : [];
    this.subscription.add(this.cartService.currentTotalInCart.subscribe(total => {
    this.totalInCart = total;
    }));

    Auth.userEmitter.subscribe(
      user => {
        if(user) {
          this.first_name = user.first_name,
          this.last_name = user.last_name,
          this.phone = user.phone,
          this.address = user.address,
          this.country = user.country ? user.country : 'CH',
          this.city = user.city,
          this.zipcode = user.zipcode,
          this.useremail = user.email;
          this.userid = user.id;

          if(this.address.length > 0) {
            this.ShowComponent = true
          }

          this.form.patchValue({
            agb: this.agb,
            user_id: this.userid,
            cart: this.cartSend
          });
        }
      }
    );
  }

  clearErrorFields() {
    this.f1E = '';
  }

  handleErrors(errors: any) {
    this.clearErrorFields();
    if (errors.agb) { this.f1E = errors.agb[0]; }
  }

  submit(): void {
    this.loaderService.setLoading(true);
    setTimeout(() => {
      this.checkoutService.checkout(this.form.getRawValue())
      .subscribe(
        {
          next: res => { 
            this.clearErrorFields();
            console.log(res.message);

            this.checkout_success_success = res.message.success;
            this.checkout_success_message = res.message.message;
            this.checkout_success_buyeremail = res.message.buyeremail;
            this.checkout_success_orderid = res.message.bestellnr;
            this.loaderService.setLoading(false);

            if(this.checkout_success_success === 1) {
              this.cartService.clearCartSilent();
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 30000);
            }

          },
          error: err => { 
            this.handleErrors(err.error.errors);
          },
          complete: () => { }
        }
      );
    }, 2000);
  }














  redirectToProfile() {
    localStorage.setItem('redirectUrl', '/checkout');
    this.router.navigate(['/profile']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCurrentDate(): string {
    return this.cartService.getCurrentDate();
  }

  countrByName(country: string) {
    return this.userDetailService.countrByName(country);
  }
  
  formatPrice(totalPrice: number): string {
    return this.cartService.formatPrice(totalPrice);
  }

  loadCartItems() {
    this.cartService.loadCartItems();
  }

  clearCart() {
    this.loaderService.setLoading(true);
    setTimeout(() => {
      this.loaderService.setLoading(false);
      this.cartService.clearCart();
      location.reload();
    }, 1000);
  };

  reloadUserData() {
    const dataCompleted = localStorage.getItem('dataCompleted');
    if (dataCompleted === 'true') {
      localStorage.removeItem('dataCompleted');
      window.location.reload();
    }
  }

  deleteCartItem(productId: number) {
    this.cartService.deleteCartItem(productId);
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
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
