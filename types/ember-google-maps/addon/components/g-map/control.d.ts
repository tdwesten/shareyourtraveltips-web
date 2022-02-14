export default class Control extends MapComponent {
    id: string;
    container: DocumentFragment;
    lastControlPosition: any;
    get name(): string;
    getControl(element: any): void;
    controlElement: any;
}
import MapComponent from "ember-google-maps/addon/components/g-map/map-component";
