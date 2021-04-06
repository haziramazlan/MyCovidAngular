import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CovidApiService } from '../covidapi.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { CovidComponent } from '../covid/covid.component';

@Component({
  selector: 'app-covid-delete',
  providers: [CovidApiService],
  styleUrls: ['../sharecss/share.component.css'],
  templateUrl: './covid-delete.component.html'
})
export class CovidDeleteComponent implements OnInit {

  public covidTotalDaily: any;

  public covidTotalDesc: any[] = [];

  public desc: any;

  public descObject: any;

  constructor(
    private httpClient: HttpClient,
    public covidApiService: CovidApiService,
    public covidComponent: CovidComponent,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.descObject = {};
  }

  deleteDescSoap() {
    console.log("covidTotalDesc length-->" + this.covidTotalDesc.length);

    this.covidApiService.deleteDescSoap(this.descObject.desc).then(
      resolve => {
        this.covidComponent.getCovidDesc();
      });
  }

  findDuplicateNDelete() {
    this.covidApiService.findDuplicateNDelete().then(
      resolve => {
        this.covidComponent.getCovidDesc();
      });
  }

}
