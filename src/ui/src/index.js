import {inject} from 'aurelia-framework'
import {ProfileService} from 'profile/profile-service'

export class Index {
  constructor(profileService){
    profileService.getProfile().then((p) => this.profile = p);
  }
}
