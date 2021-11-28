import { VNode, VNodeChildren, VNodeData } from './../types/index';

export function h(sel: string, childer: VNodeChildren): VNode;
export function h(sel: string, text: string): VNode;
export function h(sel: string, data, text: string): VNode;
export function h(sel: string, data: VNodeData, childer: VNodeChildren): VNode;

export function h(sel: string, b?: any, c?: any): VNode {
    let data = undefined, children = undefined, text = undefined;
    if (typeof b === 'object' && !Array.isArray(b)) {
        data = b;
    }
    if (b === null) data = {};

    if (typeof b === 'string') {
        text = b;
    }
    if (Array.isArray(b)) {
        children = b;
    }
    if (typeof c === 'string') {
        text = c;
    }
    if (Array.isArray(c)) {
        children = c;
    }

    return vnode(sel, data, children, text);
}

export function vnode(sel, data, children, text, elm?, key?): VNode {
    return {
        sel,
        data,
        children,
        text,
        elm,
        key
        // Key: string | number | undefined
    }
}
