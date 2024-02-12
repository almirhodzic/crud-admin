import { Component, OnInit} from '@angular/core';
import { Input } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-breadcrumb-item',
  templateUrl: './breadcrumb-item.component.html',
  styleUrls: ['./breadcrumb-item.component.css', '../../../secure/secure.component.css']
})
export class BreadcrumbItemComponent {

  @Input() link: string | null = null;
  @Input() title: string = '';
  @Input() class: string = '';

  constructor(private location: Location) { }

  ngOnInit(): void {

  }

  goBack(): void {
    if (this.link) {
      this.location.back();
    }
  }
}
