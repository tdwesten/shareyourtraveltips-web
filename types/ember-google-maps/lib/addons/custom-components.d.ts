export = CustomComponents;
declare class CustomComponents {
    static for(appInstance: any): CustomComponents;
    constructor(hostAppName: any, customComponents: any);
    hostAppName: any;
    customComponents: any;
    useMergeTactic(tactic: any): CustomComponents;
    mergeTactic: any;
    add(fromAddon: any, components: any): CustomComponents;
    merge(): any;
}
