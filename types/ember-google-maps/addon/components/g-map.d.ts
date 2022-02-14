export default class GMap extends MapComponent {
    canvas: any;
    components: Set<any>;
    get newOptions(): any;
    update(map: any): any;
    pauseTestForIdle(map: any): Promise<void>;
    getCanvas(canvas: any): void;
    getComponent(component: any, as?: string): {
        context: {
            readonly map: any;
            readonly components: any;
        };
        remove: () => void;
    };
    deprecatedPublicComponents: {};
    addToDeprecatedPublicComponents({ as, component }: {
        as: any;
        component: any;
    }): void;
    removeFromDeprecatedPublicComponents({ as, component }: {
        as: any;
        component: any;
    }): void;
}
import MapComponent from "ember-google-maps/addon/components/g-map/map-component";
