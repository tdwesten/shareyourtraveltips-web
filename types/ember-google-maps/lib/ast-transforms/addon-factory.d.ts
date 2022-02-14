export = makeAddonFactory;
declare function makeAddonFactory(addons?: {}): (env: any) => {
    name: string;
    visitor: {};
};
