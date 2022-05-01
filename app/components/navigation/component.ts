import { service } from '@ember/service';
import Component from '@glimmer/component';
import CurrentUserService from '../../services/current-user';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface NavigationArgs {
  title: string;
  isSmall: boolean;
}

type MenuItem = {
  title: string;
  route: string;
  currentWhen?: string;
  isAdmin?: boolean;
};

export default class Navigation extends Component<NavigationArgs> {
  @service public declare session: any;
  @service public declare currentUser: CurrentUserService;

  @tracked public isMobileMenuOpen = false;

  menuItems: MenuItem[] = [
    {
      title: 'menu.trips',
      route: 'authenticated.trips',
      currentWhen: 'authenticated.trip authenticated.trips',
    },
    {
      title: 'menu.shared_trips',
      route: 'authenticated.sharedtrips',
      currentWhen: 'authenticated.sharedtrip authenticated.sharedtrips',
    },
    {
      title: 'menu.categories',
      route: 'authenticated.categories',
      isAdmin: true,
    },
  ];

  menuMobileItems = [
    ...this.getMenuItems,
    {
      title: 'menu.logout',
      route: 'logout',
      currentWhen: 'logout',
    },
  ];

  get getMenuItems() {
    return this.menuItems.filter((item) => {
      if (item.isAdmin) {
        return this.currentUser?.user?.isAdmin;
      } else {
        return true;
      }
    });
  }

  get mobileMenuIcon() {
    return this.isMobileMenuOpen ? 'times' : 'bars';
  }

  @action
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
