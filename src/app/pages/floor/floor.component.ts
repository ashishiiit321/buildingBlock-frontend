import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { FloorService } from '../../services/floor/floor.service';


@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {
  buildlingId = ''
  building = <any>[];

  floorDescription = '';
  floorName = '';
  noOfHouse = ''

  floorToDelete = <any>{}
  pageLoaded = false;

  floorDetails = <any>{};

  constructor( private _router: Router, private activatedRoute: ActivatedRoute,private floorService:FloorService, ) { }

  ngOnInit() {

    if(!localStorage.getItem('buildingToken'))
      this._router.navigate(['/login']);
    else 
      this.initIoConnection()

  }

  private async initIoConnection() {
    try {
      this.buildlingId = this.activatedRoute.snapshot.paramMap.get("buildingId")

      this.building = await this.floorService.getBuilding(this.buildlingId);
      
      this.floorDetails = this.building[0].floor[0]


      this.pageLoaded = true


    } catch(err) {
      // this.appComponent.handleError(err)
    }

  }


  async addFloor() {
    if(this.floorDescription.trim()!= '' && this.floorName.trim()!= '' && this.noOfHouse.trim()!= '') {

        var data = {
          "buildingId": this.buildlingId,
          "description": this.floorDescription,
          "floorName": this.floorName,
          "noOfHouse": this.noOfHouse
        }

        let response = await this.floorService.createFloor(data);
        console.log("floor created response",response);

        
        this.building[0].floor.push(response)

        if(!this.floorDetails) {
          this.floorDetails = this.building[0].floor[0]
        }
        
        this.floorDescription= '';
        this.floorName= '';
        this.noOfHouse = '';

    } else {
        alert("Please fill all the fields");
    }
}

async deleteFloor() {
  try{

    let result = await this.floorService.deleteFloor(this.floorToDelete._id, this.buildlingId);
    console.log(result);
    var index = this.building[0].floor.indexOf(this.floorToDelete._id)

    this.building[0].floor.splice(index, 1)

    
    if(!this.building[0].floor[0]) {
      this.floorDetails = this.building[0].floor[0]
    }

  } catch(err) {
    console.log(err);
  }
}




}
