export const name: any;
export namespace options {
    namespace babel {
        const plugins: string[];
    }
}
export function init(...args: any[]): void;
export function init(...args: any[]): void;
export function included(parent: any, ...args: any[]): void;
export function included(parent: any, ...args: any[]): void;
export function config(env: any, config: any): {
    'ember-google-maps': any;
};
export function config(env: any, config: any): {
    'ember-google-maps': any;
};
export function treeForAddon(tree: any): any;
export function treeForAddon(tree: any): any;
export function checkIfWillProbablyUseEmbroider(): boolean;
export function checkIfWillProbablyUseEmbroider(): boolean;
export function setupPreprocessorRegistry(type: any, registry: any): void;
export function setupPreprocessorRegistry(type: any, registry: any): void;
export function _setupCanvasPlugin(registry: any): void;
export function _setupCanvasPlugin(registry: any): void;
export function _setupAddonPlugin(registry: any): void;
export function _setupAddonPlugin(registry: any): void;
export function _setupTreeshakerPlugin(registry: any): void;
export function _setupTreeshakerPlugin(registry: any): void;
export function _addonFactoryPlugin(addons?: {}): {
    name: string;
    plugin: (env: any) => {
        name: string;
        visitor: {};
    };
    baseDir(): string;
    cacheKey(): string;
    parallelBabel: {
        requireFile: string;
        buildUsing: string;
        params: {};
    };
};
export function _addonFactoryPlugin(addons?: {}): {
    name: string;
    plugin: (env: any) => {
        name: string;
        visitor: {};
    };
    baseDir(): string;
    cacheKey(): string;
    parallelBabel: {
        requireFile: string;
        buildUsing: string;
        params: {};
    };
};
export function _treeshakerPlugin(params?: {}): {
    name: string;
    plugin: (env: any) => {
        name: string;
        visitor: {};
    };
    baseDir(): string;
    cacheKey(): string;
    parallelBabel: {
        requireFile: string;
        buildUsing: string;
        params: {
            included: any;
            excluded: any;
            isProduction: boolean;
        };
    };
};
export function _treeshakerPlugin(params?: {}): {
    name: string;
    plugin: (env: any) => {
        name: string;
        visitor: {};
    };
    baseDir(): string;
    cacheKey(): string;
    parallelBabel: {
        requireFile: string;
        buildUsing: string;
        params: {
            included: any;
            excluded: any;
            isProduction: boolean;
        };
    };
};
export function _canvasBuildPlugin(): {
    name: string;
    plugin: typeof import("ember-google-maps/lib/ast-transforms/canvas-enforcer");
    baseDir(): string;
    cacheKey(): string;
    parallelBabel: {
        requireFile: string;
        buildUsing: string;
        params: {};
    };
};
export function _canvasBuildPlugin(): {
    name: string;
    plugin: typeof import("ember-google-maps/lib/ast-transforms/canvas-enforcer");
    baseDir(): string;
    cacheKey(): string;
    parallelBabel: {
        requireFile: string;
        buildUsing: string;
        params: {};
    };
};
export function getAddonsFromProject(project: any): any;
export function getAddonsFromProject(project: any): any;
export function filterComponents(tree: any): any;
export function filterComponents(tree: any): any;
export function buildGoogleMapsUrl(config?: {}): any;
export function buildGoogleMapsUrl(config?: {}): any;
export function warn(message: any): void;
export function warn(message: any): void;
