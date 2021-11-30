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

    } else {

        // 同一元素节点
        patchVNode(oldVNode, newVNode);
    }

}


// 对比两个节点
/**
 * @description: 对于新老虚拟节点 ， 这里需要注意一下，参数一跟参数2不可颠倒！
 * @param {VNode} oldVNode
 * @param {VNode} newVNode
 * @return {*}
 */
function patchVNode(oldVNode: VNode, newVNode: VNode) {
    let parent: Node = oldVNode.elm, oldCh = oldVNode.children, newCh = newVNode.children;

    // *** 这里需要注意一下 ， 把新的虚拟DOM的 elm 设置为老的 虚拟DOM的elm， 后边插入会用到这个新的虚拟DOM的em属性，找到剩余元素插入的位置
    newVNode.elm = oldVNode.elm;

    if (oldVNode === newVNode) return;

    // 如果有子元素
    if (hasCh(newVNode)) {
        // 老元素如果有文本节点 ， 则清空文本节点， 插入新的虚拟DOM的子节点
        if (oldVNode.text) {
            parent.textContent = '';
            createElement(newVNode);
            parent.appendChild(newVNode.elm)
        } else {
            // 新老虚拟DOM childer 子元素 ,进行精细化对比
            updateChild(parent, oldCh, newCh);
        }
    } else if (newVNode.text !== oldVNode.text) {
        // 如果老的虚拟DOM 有子节点，则清空子节点
        if (hasCh(oldVNode)) {
            oldCh.forEach(vnode => {
                parent.removeChild(vnode.elm)
            })
        }
        parent.textContent = newVNode.text;
    }
}

// 对比两个虚拟DOM节点 
function updateChild(parentEl: Node, oldCh: VNode[], newCh: VNode[]) {

    let oldStartIdx = 0,
        newStartIdx = 0,
        oldEndIdx = oldCh.length - 1,
        newEndIdx = newCh.length - 1;

    let startOldVnode = oldCh[oldStartIdx],
        endOldVnode = oldCh[oldEndIdx],
        startNewVnode = newCh[newStartIdx],
        endNewVnode = newCh[newEndIdx];

    let vnodeMap = new Map();


    // let endIdx = 0;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {

        if (startOldVnode == null) {
            startOldVnode = oldCh[++oldStartIdx]
            console.log(999);
        } else if (endOldVnode === null) {
            endOldVnode = oldCh[--oldEndIdx]
        } else if (sameVNode(startNewVnode, startOldVnode)) { // 1. 新前旧前
            console.log('1. 新前旧前');
            patchVNode(startOldVnode, startNewVnode);
            startNewVnode = newCh[++newStartIdx];
            startOldVnode = oldCh[++oldStartIdx];
            console.log(newStartIdx);
        } else if (sameVNode(endNewVnode, endOldVnode)) { // 2. 新后旧后
            patchVNode(endOldVnode, endNewVnode);
            endOldVnode = oldCh[--oldEndIdx]
            endNewVnode = newCh[--newEndIdx]
            console.log('2. 新后旧后');
        } else if (sameVNode(endNewVnode, startOldVnode)) { // 3. 新后旧前 把旧前移动到到我们旧后的最后一个节点下面
            console.log('3. 新后旧前 , 移动到旧后之后');
            console.log(endOldVnode);
            console.log(startOldVnode);

            patchVNode(startOldVnode, endNewVnode);
            // **** 这里要记住 这里是把旧前 移动到我们 旧后下一个节点的前面 ，如果 旧后下一个节点没有 insertBefore API 就会把元素插入到我们父节点的最后一个
            parentEl.insertBefore(startOldVnode.elm, endOldVnode.elm.nextSibling)
            endNewVnode = newCh[--newEndIdx]
            startOldVnode = oldCh[++oldStartIdx];
        } else if (sameVNode(startNewVnode, endOldVnode)) { // 4. 新前旧后 
            console.log('4. 新前旧后,旧后移动到旧前之前 ');
            patchVNode(endOldVnode, startNewVnode);
            // **** 旧后移动到旧前之前 
            parentEl.insertBefore(endOldVnode.elm, startOldVnode.elm);
            startNewVnode = newCh[++newStartIdx]
            endOldVnode = oldCh[--oldEndIdx]
        } else {

            if (!vnodeMap.size) {
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    oldCh[i] && vnodeMap.set(oldCh[i].key, i)
                }
            }

            // 获取新前对应旧的虚拟DOM的索引
            const oldInIdx = vnodeMap.get(startNewVnode.key)

            if (oldInIdx !== undefined) {
                const oldVnode = oldCh[oldInIdx].elm;
                patchVNode(oldCh[oldInIdx], startNewVnode)
                oldCh[oldInIdx] = null;
                console.log('map中找到了', startNewVnode.key);
                parentEl.insertBefore(oldVnode, startOldVnode.elm)
                startNewVnode = newCh[++newStartIdx];
                vnodeMap.clear();
            } else {
                console.log(vnodeMap, startNewVnode.key);
                console.log('map没有找到');
                // 插入到旧前之前
                parentEl.insertBefore(createElement(startNewVnode).elm, startOldVnode.elm)
                startNewVnode = newCh[++newStartIdx];
                vnodeMap.clear();
            }
        }

        // endIdx++;
    }

    console.log({ oldStartIdx, newStartIdx, oldEndIdx, newEndIdx });

    // 这里需要注意 一下 ， 如果这种情况不匹配 
    // 就说明 oldStartIdx > oldEndIdx && startNewIdx > newEndIdx 子集 相同 并且个数相同 ， 下标才向下移动 ，就不做任何说里
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
        if (oldStartIdx > oldEndIdx) {

            // 如果新后 后面有元素 则是向前插入， 如果新后后面没有元素这是向后插入
            const referenceNode = newCh[newEndIdx + 1]?.elm || null;

            for (; newStartIdx <= newEndIdx; newStartIdx++) {
                parentEl.insertBefore(createElement(newCh[newStartIdx]).elm, referenceNode);
            }

            console.log('5.插入到旧后->', newStartIdx, newCh[newStartIdx]);
        }
        // 如果map 里还有老的节点，则移除即可
        if (vnodeMap) {
            for (; oldStartIdx <= oldEndIdx; oldStartIdx++) {
                oldCh[oldStartIdx] && parentEl.removeChild(oldCh[oldStartIdx].elm);
            }
        }
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

// 是否有子节点
function hasCh(vnode: VNode) {
    return vnode.children && vnode.children.length;
}