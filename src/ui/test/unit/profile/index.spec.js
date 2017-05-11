import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {Container} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-fetch-client';

class HttpStub {
  bio = {name:"", blurb:""};
  fetch(){
    let that = this;
    return Promise.resolve({
      json: function(){
        return Promise.resolve(that.bio);
      }
    });
  }
}

describe('IndexComponent', () => {
  let component;
  let viewModel;
  let svc;

  beforeEach(() => {
    svc = new HttpStub();

    component = StageComponent
      .withResources('profile/profile')
      .inView('<profile></profile>');

      component.bootstrap(aurelia => {
        aurelia.use.standardConfiguration();

        aurelia.container.registerInstance(HttpClient, svc);
      });
  });

  it('should render profile', done => {
    let name = svc.bio.name = 'Mark Tranter';
    let blurb = svc.bio.blurb = 'Developer';
    component.manuallyHandleLifecycle().create(bootstrap)
    .then(() => component.bind())
    .then(() => {
      const nameElement = document.querySelector('h1');
      expect(nameElement.innerHTML).toBe('');
      const blurbElement = document.querySelector('h3');
      expect(blurbElement.innerHTML).toBe('');
    })
    .then(() => component.attached())
    .then(() => {
      const nameElement = document.querySelector('h1');
      expect(nameElement.innerHTML).toBe(name);
      const blurbElement = document.querySelector('h3');
      expect(blurbElement.innerHTML).toBe(blurb);
    })
    .then(done)
  });

  afterEach(() => {
    component.dispose();
  });
});
