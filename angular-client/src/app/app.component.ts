import { DataService } from './data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  originalArray : any =[];
  filterdArray : any = [];
  constructor(
  	private dataService: DataService
  ) {
    this.getCustomerResults();
  }

  getCustomerResults() {
    this.dataService.getResult().subscribe(
      data => {
        this.sortByUserId(data['filterdArray']);
        this.originalArray = data['originalArray'];
      }, err => {
        console.log('Error' + err);
      }, () => {
        console.log('Request Completed!');
      }
    );
  }

  sortByUserId(itemArray) {
    this.filterdArray = itemArray.sort(function (a, b) {
      return a.user_id - b.user_id;
    });
  }
}
