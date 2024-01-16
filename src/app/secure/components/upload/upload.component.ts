import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment.dev';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css', '../../secure.component.css']
})
export class UploadComponent implements OnInit {

  @Output() uploaded = new EventEmitter<string>();

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {

  }

  upload(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      const file = files.item(0);
      const data = new FormData();
      data.append('image', file as Blob);

      this.http.post(`${environment.api}/upload`, data).subscribe(
        (res: any) => {
          this.uploaded.emit(res['url']);
        }
      );
    }
  }

}
