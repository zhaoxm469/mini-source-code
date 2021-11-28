import { VNode } from "../types";
import { createElement } from "./createElement";
import { vnode } from "./h";

export function patch(oldVNode: VNode | Element, newVNode: VNode) {
    let elm: Node, parent: Node;

    // 如果老的oldVNode 不为虚拟DOM。 比如我们传过来的是一个容器节点
    if (!isVNode(oldVNode)) {
        // 把oldVNode 转换为虚拟DOM节点
        oldVNode = emptyNodeAt(oldVNode);
    }

    // 如果不为同一个节点，
    if (!sameVNode(oldVNode, newVNode)) {

        elm = oldVNode.elm;
        parent = elm.parentElement;
        createElement(newVNode);

        parent.insertBefore(newVNode.elm, elm);

        parent.removeChild(elm);

    }

}

// 判断是否为vnode 类型 ， 这里需要注意 使用is 类型保护，让我们ts检测能正确的识别到 vnode 到底是 VNode 类型 还是 Element类型
function isVNode(vnode: any): vnode is VNode {
    return vnode && vnode.sel;
}

// 把我们DOM节点转换为虚拟DOM节点
function emptyNodeAt(elm: Element): VNode {
    let sel = elm.tagName.toLocaleLowerCase()
    return vnode(sel, undefined, undefined, undefined, elm);
}

// 判断是否为同一节点，因为如果不为同一节点，则暴利删除，插入新的节点
function sameVNode(oldVNode: VNode, newVNode: VNode): boolean {
    return oldVNode.sel === newVNode.sel && oldVNode.key === newVNode.key;
}