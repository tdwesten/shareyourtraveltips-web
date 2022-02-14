export default class Autocomplete extends MapComponent {
    id: string;
    get name(): string;
    update(mapComponent: any): any;
    getInput(input: any): void;
    inputElement: any;
}
import MapComponent from "ember-google-maps/addon/components/g-map/map-component";
