export = enforceCanvas;
declare function enforceCanvas(env: any): {
    name: string;
    visitor: {
        BlockStatement(node: any): void;
        ElementNode(node: any): void;
    };
};
