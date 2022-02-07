/*********************
 United States lists
 *********************/
export const US_STATES_LIST: import("@ember/node_modules/@types/ember/array/-private/native-array").default<{
    name: string;
    iso2: string;
}>;
export const US_MILITARY_STATES_LIST: import("@ember/node_modules/@types/ember/array/-private/native-array").default<{
    name: string;
    iso2: string;
}>;
export const US_REQUIRING_CUSTOM_DECLARATION_STATES_LIST: import("@ember/node_modules/@types/ember/array/-private/native-array").default<string>;
/**************
 Canada lists
 **************/
export const CA_STATES_LIST: import("@ember/node_modules/@types/ember/array/-private/native-array").default<{
    name: string;
    iso2: string;
}>;
export namespace STATES_BY_COUNTRIES {
    export const US: import("@ember/node_modules/@types/ember/array/-private/native-array").default<{
        name: string;
        iso2: string;
    }>;
    export { CA_STATES_LIST as CA };
}
declare namespace _default {
    export { US_STATES_LIST };
    export { US_MILITARY_STATES_LIST };
    export { US_REQUIRING_CUSTOM_DECLARATION_STATES_LIST };
    export { CA_STATES_LIST };
    export { STATES_BY_COUNTRIES };
}
export default _default;
