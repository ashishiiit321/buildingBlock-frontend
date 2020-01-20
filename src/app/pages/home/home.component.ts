import { Component, OnInit } from '@angular/core';

import { BuildingService } from '../../services/building/building.service';
import { FloorService } from '../../services/floor/floor.service';

import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  buildings = <any>[];
  buildingName = '';
  buildingToDelete = <any>{}

  pageLoaded = false


  deptName = '';
  deptId = '';
  error = {}; 
  deptToEdit = <any>{};
  deptToDelete = <any>{}
  latest_date;
  companySelected = true;
  saved = true;  

  iconArray = ['fa-0 fa-icon', 'fa-1 fa-icon', 'fa-2 fa-icon']


  constructor(private buildingService: BuildingService, private floorService:FloorService,  private route: ActivatedRoute, private _router: Router) { }

  async ngOnInit() {
  
    if(!localStorage.getItem('buildingToken'))
      this._router.navigate(['/login']);
    else {
      this.buildings = await this.buildingService.getBuildings();

    console.log("buildings", this.buildings)
    this.pageLoaded = true;
    }
  
  
  }

  openFloor(buildindId){
    this._router.navigate(['/building/'+buildindId]);
  }


  async addBuilding() {
    try{
      if(this.buildingName.trim()!= '') {
        
        var data = {
          "buildingName": this.buildingName
        }

       let response:any = await this.buildingService.createBuilding(data);
        console.log("building added ",response)


       this.buildingName = '';
       this.buildings.push(response)

    } else {
        alert("Please provide the building Name");
    }

    }
    catch(err){
      console.log(err);
    }
}


async deleteBuilding() {
  try{

    let result = await this.buildingService.deleteFloor(this.buildingToDelete._id);
    var index;

    for(var i=0; i<this.buildings.length; i++) {
      if(this.buildings[i]._id == this.buildingToDelete._id) {
        index = i;
        break;
      }
    }
    this.buildings.splice(index, 1);
   

  } catch(err) {
    console.log(err);
  }
}


}
