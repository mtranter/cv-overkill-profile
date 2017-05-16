export function configure(config){
  let container = config.container;
  container.registerInstance('plugin.admin.route',  { route: ['profile'],  name: 'edit-profile',  moduleId: 'profile/admin/edit', title: 'Profile', nav: true,
    settings:{
      icon: 'fa-address-card'
    }
 });

  container.registerInstance('plugin.widget.homepage.component', {
    title: 'Profile',
    href:'#profile',
    name:'profile',
    viewModel: 'profile/profile',
    view:'profile/profile.html'
  });
}
