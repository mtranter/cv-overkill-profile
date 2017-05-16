import {inject} from 'aurelia-framework'
import {ProfileService} from './../profile-service'


@inject(ProfileService)
export class Edit {
  constructor(profileService){
    this.profileService = profileService;
  }
  activate() {
    this.profileService.getProfile().then(p => this.profile = p)
  }
  save(profile){
    this.profileService.saveProfile(profile);
  }
}
