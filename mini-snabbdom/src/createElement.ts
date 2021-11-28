import { VNode } from './../types/index';
export function createElement(vnode: VNode): VNode {
    const { text, children } = vnode;
    const elm = document.createElement(vnode.sel);
    if (children) {
        for (let vnode of children) {
            elm.appendChild(createElement(vnode).elm);
        }
    }

    if (text) elm.innerHTML = text;
    vnode.elm = elm;

    return vnode;
}