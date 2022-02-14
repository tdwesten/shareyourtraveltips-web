export = AddonRegistry;
/**
 * Discover and process addons for ember-google-maps that use the keyword
 * `ember-google-maps-addon` in their `package.json`.
 */
declare class AddonRegistry {
    constructor(project: any);
    project: any;
    _components: any[];
    _addons: any[];
    /**
     * Find and return all components defined by the addons. The names of
     * addon components should be begin with `g-map-addons`.
     * @return {Object}
     */
    get components(): any;
    get addons(): any[];
    discoverAddons(projectAddons?: any[]): any[];
}
