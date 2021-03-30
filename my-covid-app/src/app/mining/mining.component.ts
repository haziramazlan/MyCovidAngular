import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CovidApiService } from '../covidapi.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import { GlobalMethods } from 'src/environments/GlobalMethods';

@Component({
  selector: 'app-mining',
  providers: [CovidApiService],
  styleUrls: ['./mining.component.css'],
  templateUrl: './mining.component.html',

})
export class MiningComponent implements OnInit {
  public covidTotalDaily: any;
  public showMyMessage = false

  constructor(
    private httpClient: HttpClient,
    public covidApiService: CovidApiService,
    private confirmationDialogService: ConfirmationDialogService

  ) { }

  ngOnInit(): void {
    this.getCovid();

    console.log("Covid Component Inited");
  }

  mining: string = 'Date Mined Successfully. Total Cases {{covidTotalDaily}}';

  getCovid(): any {
    this.covidTotalDaily = this.covidApiService.getCovid().subscribe((data: any) => {
      console.log(data); this.covidTotalDaily = data;
    }
      ,
      (error: { error: { message: string; }; }) => {
        console.log(error);
        this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
      }
    );

    return this.covidTotalDaily;
  }

  showMessageSoon() {
    this.showMyMessage = true
  }
}
