import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';
import {Container} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-fetch-client';
import aws from './fakes/aws'

describe('IndexComponent', () => {
  let component;
  let viewModel;
  let bio;

  beforeEach(() => {

    System.map["AWS"] = ("/base/test/unit/profile/fakes/aws");

    component = StageComponent
      .withResources('profile/profile')
      .inView('<profile></profile>');

      component.bootstrap(aurelia => {
        aurelia.use.standardConfiguration();

      });
  });

  it('should render profile', done => {
    let name = 'Mark Tranter';
    let blurb = 'Developer';
    bio = {"Count":1,"Items":[{"Profile":"I like coding","Blurb":blurb,"Name":name}],"ScannedCount":1};
    aws.DynamoDB.retvals.scan = bio;
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
    .catch(e => {console.log(e); throw e;});
  });

  afterEach(() => {
    component.dispose();
  });
});
