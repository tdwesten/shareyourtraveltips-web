export default class GoogleMapsApiService extends Service {
    get google(): import("rsvp").default.Promise<any>;
    get directionsService(): import("rsvp").default.Promise<any>;
    /**
     * By default, this returns the Google Maps URL created at build time. You can
     * use this hook to build the URL at runtime instead.
     *
     * Optionally, you can return a promise that resolves with the URL. This
     * allows you to use external data when building the URL. For example, you
     * could fetch the database record for the current user for localisation
     * purposes.
     */
    buildGoogleMapsUrl(config: any): any;
    /**
     * Get the configuration for ember-google-maps set in environment.js. This
     * should contain your API key and any other options you set.
     */
    _getConfig(): any;
    /**
     * Return or load the Google Maps API.
     */
    _getApi(): import("rsvp").default.Promise<any>;
    _loadAndInitApi(src: any): import("rsvp").default.Promise<any>;
}
import Service from "@ember/service";
