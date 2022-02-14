export class MapComponentManager {
    constructor(owner: any);
    googleMapsApi: any;
    get google(): any;
    get isFastBoot(): any;
    capabilities: any;
    owner: any;
    fastboot: any;
    createComponent(Class: any, args: any): any;
    destroyComponent(component: any): void;
    getContext(component: any): any;
    setupMapComponent(component: any): undefined;
}
