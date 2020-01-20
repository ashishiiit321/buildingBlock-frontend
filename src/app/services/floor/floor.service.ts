import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FloorService {

 
  url = environment.apiURL;
  constructor(private http: HttpClient) { }


  createFloor(data) {
    return this.http.post(this.url + '/floor', data).toPromise()
  }

  getBuilding(buildingId) {
  	return this.http.get(this.url + "/building?_id="+buildingId).toPromise()
  }

  deleteFloor(floorId, buildingId) {
    return this.http.delete(this.url + '/floor/'+floorId+"?buildingId="+buildingId).toPromise()
  }
  
}
