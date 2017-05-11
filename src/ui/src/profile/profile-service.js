import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class ProfileService {
  constructor(http){
    this.http = http;
  }
  getProfile() {
    return this.http.fetch('profile/').then(d => d.json());
  }
}
