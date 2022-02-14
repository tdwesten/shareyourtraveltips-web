import Component from '@glimmer/component';
import Tip from '../../models/tip';

interface MapMarkerArgs {
  tip: Tip;
}

export default class MapMarker extends Component<MapMarkerArgs> {
  get getClasses() {
    const classes = [
      'w-10 h-10 -translate-x-1/2  -translate-y-10 cursor-pointer ease-linear hover:z-50 duration-50 hover:scale-105 transform text-white flex items-center justify-center rounded-full mr-3 relative shadow-lg',
    ];

    if (this.args.tip.isHovered) {
      classes.push('scale-110');
    }

    classes.push(this.bgColor);

    return classes.join(' ');
  }

  get bgColor() {
    const color =
      this.args.tip.category.get('backgroundColor') !== undefined
        ? this.args.tip.category.get('backgroundColor')
        : 'orange';

    return `bg-${color}-500`;
  }

  get getIcon() {
    return this.args.tip.category.get('icon')
      ? this.args.tip.category.get('icon')
      : 'circle';
  }
}
