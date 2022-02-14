import { service } from '@ember/service';
import Component from '@glimmer/component';
import CurrentUserService from '../../services/current-user';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface AppHeaderArgs {
  title: string;
  isSmall: boolean;
}

export default class AppHeader extends Component<AppHeaderArgs> {
  @service public declare session: any;
  @service public declare currentUser: CurrentUserService;

  @tracked public isMobileMenuOpen = false;

  menuItems = [
    {
      title: 'menu.trips',
      route: 'authenticated.trips',
      currentWhen: 'authenticated.trips authenticated.trip',
    },
    {
      title: 'menu.categories',
      route: 'authenticated.categories',
      currentWhen: 'authenticated.categories authenticated.category',
    },
  ];

  menuMobileItems = [
    ...this.menuItems,
    {
      title: 'menu.logout',
      route: 'logout',
      currentWhen: 'logout',
    },
  ];

  get mobileMenuIcon() {
    return this.isMobileMenuOpen ? 'times' : 'bars';
  }

  @action
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
