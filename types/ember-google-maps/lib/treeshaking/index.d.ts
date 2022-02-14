export function newExcludeName(included?: any[], excluded?: any[]): (rawName: any) => boolean;
export function newExcludeComponent(included?: any[], excluded?: any[]): (name: any) => boolean;
export function newIncludedList(onlyList?: any[], exceptList?: any[]): any[];
export function newExcludedList(onlyList?: any[], exceptList?: any[]): any[];
export function skipTreeshaking(included?: any[], excluded?: any[]): boolean;
