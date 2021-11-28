type Key = string | number | undefined;

export interface VNode {
    sel: string,
    data: VNodeData | undefined,
    children: VNode[] | undefined,
    elm: Node | undefined,
    text: string | undefined,
    key: Key
}

export type Props = Record<string, any>;
export type Attrs = Record<string, string | number | boolean>;
export type Classes = Record<string, boolean>;
export type VNodeStyle = Record<string, string> & {
    delayed?: Record<string, string>;
    remove?: Record<string, string>;
};
export type Dataset = Record<string, string>;
type Listener<T> = (this: VNode, ev: T, vnode: VNode) => void;
export type On = {
    [N in keyof HTMLElementEventMap]?:
    | Listener<HTMLElementEventMap[N]>
    | Array<Listener<HTMLElementEventMap[N]>>;
} & {
    [event: string]: Listener<any> | Array<Listener<any>>;
};
export interface AttachData {
    [key: string]: any;
    [i: number]: any;
    placeholder?: any;
    real?: Node;
}

export type VNodeChildren = VNode[];


export interface VNodeData {
    props?: Props;
    attrs?: Attrs;
    class?: Classes;
    style?: VNodeStyle;
    dataset?: Dataset;
    on?: On;
    attachData?: AttachData;
    key?: Key;
    ns?: string; // for SVGs
    fn?: () => VNode; // for thunks
    args?: any[]; // for thunks
    is?: string; // for custom elements v1
    [key: string]: any; // for any other 3rd party module
}
