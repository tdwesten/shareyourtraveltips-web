/**
 * Throw an assertion to warn the user when they call a component that isn't
 * included in the build. In development, we replace the excluded component with
 * this one instead.
 */
export default class WarnMissingComponent extends Component<any> {
    constructor(...args: any[]);
}
import Component from "@glimmer/component";
