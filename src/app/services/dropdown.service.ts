import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  private openDropdownId: string | null = null;

  constructor() { }

  toggleDropdown(dropdownId: string): void {
    if (this.openDropdownId === dropdownId) {
      this.openDropdownId = null; // Schließt das Dropdown, wenn es bereits geöffnet ist
    } else {
      this.openDropdownId = dropdownId; // Öffnet das neue Dropdown und speichert seine ID
    }
  }

  closeDropdown(): void {
    this.openDropdownId = null; // Schließt jedes geöffnete Dropdown
  }

  closeAnyDropdown(): void {
    this.openDropdownId = null;
  }

  isOpen(dropdownId: string): boolean {
    return this.openDropdownId === dropdownId; // Überprüft, ob das Dropdown geöffnet ist
  }
}
