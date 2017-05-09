import {configure} from '../../src/plugin';

class ConfigStub {
  services = {}
  get container(){
    let that = this;
    return {
      registerInstance: function(key,val) {
        that.services[key] = val
      }
    }
  }
}

describe('the Aurelia configuration', () => {
  var mockedConfiguration;

  beforeEach(() => {
    mockedConfiguration = new ConfigStub();
    configure(mockedConfiguration);
  });

  it('should register home component routes', () => {
    expect(mockedConfiguration.services['plugin.widget.homepage.component']).toBeDefined();
  });

});
