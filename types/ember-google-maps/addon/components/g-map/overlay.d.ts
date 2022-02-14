export default class OverlayView extends MapComponent {
    id: string;
    container: DocumentFragment;
    get name(): string;
    get zIndex(): any;
    get paneName(): any;
    get position(): any;
    update(overlay: any): void;
    onAdd(): void;
    targetPane: any;
    draw(): void;
    onRemove(): void;
    overlayElement: any;
    getOverlay(element: any): void;
}
import MapComponent from "ember-google-maps/addon/components/g-map/map-component";
