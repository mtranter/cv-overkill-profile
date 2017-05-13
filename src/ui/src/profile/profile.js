import {inject} from 'aurelia-framework'
import {ProfileService} from './profile-service'


@inject(ProfileService)
export class Profile {
  constructor(profileService){
    this.profileService = profileService;
  }
  attached(){
    return this.profileService.getProfile().then((p) => this.profile = p);
  }
}
