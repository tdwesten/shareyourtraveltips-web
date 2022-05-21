import { service } from '@ember/service';
import Component from '@glimmer/component';
import CurrentUserService from '../../services/current-user';

interface MobileNavBarArgs {}

type MenuItem = {
  title: string;
  route: string;
  currentWhen?: string;
  isAdmin?: boolean;
  icon: string;
};

export default class MobileNavBar extends Component<MobileNavBarArgs> {
  @service public declare currentUser: CurrentUserService;
  @service public declare session: any;

  menuItems: MenuItem[] = [
    {
      title: 'menu.trips',
      route: 'authenticated.trips',
      currentWhen: 'authenticated.trip authenticated.trips',
      icon: 'map-marked-alt',
    },
    {
      title: 'menu.shared_trips',
      route: 'authenticated.sharedtrips',
      currentWhen: 'authenticated.sharedtrip authenticated.sharedtrips',
      icon: 'share-nodes',
    },
    {
      title: 'menu.categories',
      route: 'authenticated.categories',
      isAdmin: true,
      icon: 'tags',
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
}
