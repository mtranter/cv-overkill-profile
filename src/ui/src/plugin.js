export function configure(config){
  let container = config.container;
  //container.registerInstance('plugin.route',  { route: ['profile'],       name: 'profile',       moduleId: 'profile/index' })

  container.registerInstance('plugin.widget.homepage.component', {viewModel: 'profile/index', view:'profile/index.html'});
}
