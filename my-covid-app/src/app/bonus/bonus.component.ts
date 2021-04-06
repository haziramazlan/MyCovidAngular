import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CovidApiService } from '../covidapi.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import { GlobalMethods } from 'src/environments/GlobalMethods';

@Component({
  selector: 'app-bonus',
  providers: [CovidApiService],
  styleUrls: ['./bonus.component.css'],
  templateUrl: './bonus.component.html',

})
export class BonusComponent implements OnInit {
  public covidTotalDaily: any;

  public covidTotalBonus: any[] = [];

  public bonus: any;

  public bonusObject: any;

  public newBonus: any;

  public updateBonus: any;

  public postBonus: any;

  constructor(
    private httpClient: HttpClient,
    public covidApiService: CovidApiService,
    private confirmationDialogService: ConfirmationDialogService

  ) { }

  ngOnInit(): void {
    this.bonusObject = {};
    this.updateBonus = {};
    this.postBonus = {};
    this.getCovid();
    this.getCovidBonus();

    console.log("Bonus Component Inited");
  }

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

  getCovidBonus(): any {
    this.covidApiService.getCovidBonus().subscribe((data: any) => {
      console.log(data);
      this.covidTotalBonus = data;
      console.log("Total of Bonus Column Row --->" + this.covidTotalBonus.length);
    });

    return this.covidTotalBonus;
  }

  onSelectBonus(bonus: any) {

    console.log("bonus-->" + this.bonus);
    if (this.bonus[0]) {
      this.bonusObject = this.bonus[0];
      console.log("bonus id-->" + this.bonusObject.id);
      console.log("bonus description-->" + this.bonusObject.description);
    }
  }

  deleteBonus() {
    console.log("covidTotalBonus length-->" + this.covidTotalBonus.length);

    if (this.covidTotalBonus.length == 0) {
      this.confirmationDialogService.confirm(GlobalConstants.errorMessageFE, "List is Empty");
    }
    else {
      this.covidApiService.deleteBonus(this.bonusObject.id).then(
        resolve => {
          this.getCovidBonus();
        });
    }
  }

  addBonus() {
    this.covidApiService.addBonus(this.newBonus).then(
      resolve => {
        this.getCovidBonus();
      });
  }

  onSelectUpdateBonus(bonus: any) {

    console.log("updateBonus-->" + this.updateBonus);
    if (this.bonus[0]) {
    
      let clonedBonus = Object.assign({}, this.bonus[0]);
      // use a new cloned Object to prevent pass by reference value in the class
      this.updateBonus = clonedBonus;
      console.log("updateBonus id-->" + this.updateBonus.id);
      console.log("updateBonus description-->" + this.updateBonus.description);
    }
  }

  putBonus() {

    this.covidApiService.putBonus(this.updateBonus).then(
      resolve => {
        this.getCovidBonus();
      });
  }

  addPostBonus() {

    this.covidApiService.addPostBonus(this.postBonus).then(
      resolve=> {
        this.getCovidBonus();
      });
    }

    deleteBonusSoap() {
      console.log("covidTotalBonus length-->" + this.covidTotalBonus.length);
  
      if (this.covidTotalBonus.length == 0) {
        this.confirmationDialogService.confirm(GlobalConstants.errorMessageFE, "List is Empty");
      }
      else {
        this.covidApiService.deleteBonusSoap(this.bonusObject.bonus).then(
          resolve => {
            this.getCovidBonus();
          });
      }
    }
}
