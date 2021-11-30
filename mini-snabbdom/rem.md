# 手写实现snabbdom 

## DOM.API

- Node.insertBefore

const insertB = Node.insertBefore(newNode,referenceNode)  

将newNode 插入到Node父节点的 referenceNode 之前。  
这里需要注意 ， 如果 referenceNode 为null 的话 ， 就向父节点的最后插入newNode.  

- Node.nextSibling 

const nextNode = Node.nextSibling ;

返回Node元素后面紧跟着的元素 ， 如果Node节点后面没有元素，则返回null 