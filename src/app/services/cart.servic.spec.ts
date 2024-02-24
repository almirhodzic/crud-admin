import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
        HttpClientModule
      ],
      providers: [
        CartService,
      ]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#should format a value to the ch-CH price format', () => {
    const result = service.formatPrice(594);
    expect(result).toBe('Fr. 594.–');
  });

  it('#should return a placeholder for instock icon color', () => {
    const result = service.inStock(10);
    expect(result).toBe('bi-check-circle-fill stockgreen');
  });
});
