export class ProfileService {
  getProfile() {
    return new Promise(function(accept, reject) {
      accept({
        name: "Mark Tranter",
        blurb: "My cv",
        bio:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim consectetur fringilla. Aliquam erat volutpat. Curabitur in nisi molestie, lobortis felis id, dignissim nibh. Integer sem libero, sodales imperdiet fringilla in, euismod varius ante. Aliquam et vehicula sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam euismod nibh nisi, sed interdum mi gravida et. Praesent ac consectetur ante."
      });
    });
  }
}
