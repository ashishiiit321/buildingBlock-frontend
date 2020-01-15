import { Component, OnInit } from '@angular/core';

import { BuildingService } from '../../services/building/building.service';
import { FloorService } from '../../services/floor/floor.service';



@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {

	floorDescription = '';
	floorName = '';

  buildings = <any>[];
	buildingName = '';
  activeBuilding = <any>{};

  isBuilding = false;

  pageLoaded = false;

  constructor(private buildingService: BuildingService, private floorService:FloorService) { }


  async ngOnInit() {
  if(localStorage.getItem('buildingId')) {
    this.isBuilding = true

  } 

  this.buildings = await this.buildingService.getBuildings();
  let buildingId = localStorage.getItem('buildingId')

  this.pageLoaded = true

  for(var i=0; i<this.buildings.length; i++) {

    if(this.buildings[i]._id == buildingId) {
      this.activeBuilding = this.buildings[i];
      break;
    }
  }


  }

  async addFloor() {
  		if(this.floorDescription.trim()!= '' && this.floorName.trim()!= '') {

          var data = {
            "buildingId": localStorage.getItem('buildingId'),
            "floorDescription": this.floorDescription,
            "floorName": this.floorName
          }

          let response = await this.floorService.createFloor(data);
          // console.log("floor created response",response);

          
          this.activeBuilding.floor.push(response)
          
          this.floorDescription= '';
          this.floorName= '';

  		} else {
  				alert("Please fill all the fields");
  		}
  }

  async addBuilding() {
  		try{
  			if(this.buildingName.trim()!= '') {
  				
          var data = {
            "buildingName": this.buildingName
          }

         let response:any = await this.buildingService.createBuilding(data);
         // console.log("building added ",response)

         localStorage.setItem('buildingId', response._id);

         this.buildingName = '';
         location.reload();

  		} else {
  				alert("Please provide the building Name");
  		}

  		}
  		catch(err){
  			console.log(err);
  		}
  }

  async selectBuilding(buildingId) {

    localStorage.setItem('buildingId', buildingId);
    location.reload();

  }

  async deleteFloor(floor) {
    try{

      let result = await this.floorService.deleteFloor(floor._id, localStorage.getItem('buildingId'));
      console.log(result);
      var index = this.activeBuilding.floor.indexOf(floor)

      this.activeBuilding.floor.splice(index, 1)

    } catch(err) {
      console.log(err);
    }
  }

  
  async deleteBuilding(buildingId) {
    try{

      let result = await this.buildingService.deleteFloor(buildingId);
      var index;

      for(var i=0; i<this.buildings.length; i++) {
        if(this.buildings[i]._id == buildingId) {
          index = i;
          break;
        }
      }
      this.buildings.splice(index, 1);
      window.localStorage.removeItem('buildingId');

      if(this.buildings[0]._id) {

         localStorage.setItem('buildingId', this.buildings[0]._id);
         this.activeBuilding = this.buildings[0];
      } else {
        location.reload();
      }
     

    } catch(err) {
      console.log(err);
    }
  }



}
