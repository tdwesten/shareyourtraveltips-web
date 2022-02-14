export function combine(base: any, extra: any): any;
export function MapComponentAPI(source: any): {
    [x: number]: any;
    readonly map: any;
    readonly mapComponent: any;
};
export default class MapComponent {
    constructor(owner: any, args: any, options: any, events: any);
    mapComponent: any;
    boundEvents: any[];
    get publicAPI(): {
        [x: number]: any;
        readonly map: any;
        readonly mapComponent: any;
    };
    get map(): any;
    args: any;
    options: any;
    events: any;
    setup(): void;
    teardown(mapComponent: any): void;
    register(): void;
    context: any;
    onTeardown: any;
    addEventsToMapComponent(mapComponent: any, events?: {}, payload?: {}): void;
}
