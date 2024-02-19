import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DropdownService } from 'src/app/services/dropdown.service'; // Achte darauf, den korrekten Pfad zu deinem Service anzugeben
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  template: `

      <a *ngIf="title" href="javascript:void(0)" (click)="toggleDropdown($event)" class="nav-link">{{ title }}</a>
      <a *ngIf="icon" href="javascript:void(0)" (click)="toggleDropdown($event)" class="nav-icon">
        <i class="{{ icon }}"></i>
        <span class="badge {{ badgeClass }} ">{{ badgeContent }}</span>
      </a>
      <a *ngIf="image" class="nav-link nav-profile d-flex align-items-center px-3" href="javascript:void(0)" (click)="toggleDropdown($event)" >
        <img [src]="image" alt="Profile" class="rounded-circle">
      </a>

      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow {{ dropdownClass }}" *ngIf="dropdownService.isOpen(id)" (click)="stopClickPropagation($event)">
        <ng-content></ng-content>
      </ul>

   
  `,
  /* styleUrls: ['./dropdown.component.css', '../cart/cart.component.css', '../avatar/avatar.component.css', '../nav.component.css'], */
  styleUrls: ['./dropdown.component.css','./dropdown.messages.css','./dropdown.cart.css','./dropdown.avatar.css'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnInit, OnDestroy {
  @Input() id!: string;
  @Input() title!: string;
  @Input() icon!: string;
  @Input() badgeContent: any;
  @Input() badgeClass: any;
  @Input() dropdownClass!: string;
  @Input() image!: any;

  constructor(
    public dropdownService: DropdownService, 
    private elementRef: ElementRef
    ) {}

  ngOnInit() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation(); // Verhindert das Auslösen des document click Event-Listeners
    this.dropdownService.toggleDropdown(this.id);
  }

  handleOutsideClick = (event: Event): void => {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownService.closeAnyDropdown();
    }
  };

  stopClickPropagation(event: Event): void {
    event.stopPropagation();
  }

  closeDropdown(): void {
    this.dropdownService.closeAnyDropdown();
  }
}
