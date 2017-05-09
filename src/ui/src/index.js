import {inject} from 'aurelia-framework'
import {ProfileService} from 'profile/profile-service'

@inject(ProfileService)
export class Index {
  constructor(profileService){
    profileService.getProfile().then((p) => this.profile = p);
  }
}
