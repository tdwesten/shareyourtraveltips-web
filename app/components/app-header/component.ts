import Component from '@glimmer/component';

interface AppHeaderArgs {
  title: string;
  isSmall: boolean;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class AppHeader extends Component<AppHeaderArgs> {}
