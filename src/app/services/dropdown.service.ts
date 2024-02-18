import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  private openDropdown = new BehaviorSubject<string | null>(null);

  setOpenDropdown(name: string) {
    this.openDropdown.next(name);
  }

  getOpenDropdown() {
    return this.openDropdown.asObservable();
  }

  closeAllDropdowns() {
    this.openDropdown.next(null);
  }
}
