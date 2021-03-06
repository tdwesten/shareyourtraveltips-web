import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
interface SearchboxArgs {
  onSelect: CallableFunction;
  map: google.maps.Map;
}

export default class Searchbox extends Component<SearchboxArgs> {
  @tracked selectedResult: unknown;
  @tracked public declare searchElement: HTMLInputElement;

  constructor(owner: unknown, args: SearchboxArgs) {
    super(owner, args);
  }

  @action
  onInsert(element: HTMLInputElement) {
    this.searchElement = element;

    const searchBox = new google.maps.places.SearchBox(this.searchElement);

    this.args.map.addListener('bounds_changed', () => {
      searchBox.setBounds(
        this.args.map.getBounds() as google.maps.LatLngBounds
      );
    });

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      this.searchElement.value = '';

      this.args.onSelect(places.firstObject);
    });
  }
}
