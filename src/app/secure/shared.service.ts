import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private clickSubject = new Subject<void>();
  clickEvent$ = this.clickSubject.asObservable();

  triggerClickEvent() {
    this.clickSubject.next();
  }
}
