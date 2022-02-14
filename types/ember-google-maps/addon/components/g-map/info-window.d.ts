export default class InfoWindow extends MapComponent {
    get name(): string;
    get isOpen(): boolean;
    get content(): any;
    container: HTMLDivElement;
    get newOptions(): any;
    infoWindow: any;
    update(infoWindow: any): void;
    toggleOpen(): void;
    open(): void;
    close(): void;
}
import MapComponent from "ember-google-maps/addon/components/g-map/map-component";
