import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  url = environment.apiURL;
  constructor(private http: HttpClient) { }


  createBuilding(data) {
    return this.http.post(this.url + '/building', data).toPromise()
  }


  getBuildings() {
  	return this.http.get(this.url + '/building').toPromise()
  }
 
   deleteFloor(buildingId) {
    return this.http.delete(this.url + '/building/'+buildingId).toPromise()

  }

}
