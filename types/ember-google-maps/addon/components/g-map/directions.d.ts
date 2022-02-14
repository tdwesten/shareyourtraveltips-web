export function DirectionsAPI(source: any): {
    readonly directions: any;
    readonly waypoints: any;
};
export default class Directions extends MapComponent {
    googleMapsApi: any;
    get name(): string;
    directions: any;
    waypointComponents: TrackedSet<unknown>;
    get waypoints(): any[];
    get serializedWaypoints(): {
        location: any;
        stopover: any;
    }[];
    fetchDirections(options?: {}): Generator<any, any, any>;
    getWaypoint(waypoint: any): () => boolean;
}
import MapComponent from "ember-google-maps/addon/components/g-map/map-component";
import { TrackedSet } from "tracked-maps-and-sets";
