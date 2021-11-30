import { h, patch } from './src/snabbdom'

const content = document.getElementById('content');
const oBtn = document.querySelector('button');

const vnode1 = h('p', {}, 'asd1')
const vnode2 = h('p', 'asd2')

const vnode3 = h('p', [
    h('span', 'haha '),
    h('span', 'xixi '),
])

const vnode4 = h('p', [
    h('ul', {}, [
        h('li', '123'),
        h('li', [
            h('div', [
                h('p', {}, '呵呵呵')
            ])
        ])
    ])
])

// 插入文本节点
// oBtn.addEventListener('click', () => {
//     patch(vnode4, vnode3)
// })


// // 老的是文本节点，  插入新的有子元素节点
// patch(content, vnode2)
// oBtn.addEventListener('click', () => {
//     patch(vnode2, vnode4)
// })


// 新的虚拟DOM 比老的虚拟dom最后多插入一个新的节点
// const oldVnode = h('div', {
//     key: 'oldVnode'
// }, [
//     h('ul', [
//         h('li', { key: 0 }, '0'),
//         h('li', { key: 1 }, '1'),
//         h('li', { key: 2 }, '2'),
//         h('li', { key: 3 }, '3'),
//     ])
// ])


// const newVnode = h('div', {
//     key: 'oldVnode'
// }, [
//     h('ul', [
//         h('li', { key: 0 }, '0'),
//         h('li', { key: 1 }, '1'),
//         h('li', { key: 2 }, '2'),
//         h('li', { key: 3 }, '3'),
//         h('li', { key: 4 }, '4'),
//     ])
// ])

// patch(content, oldVnode)

// oBtn.addEventListener('click', () => {
//     patch(oldVnode, newVnode)
// })

// 新老虚拟DOM 子集替换位置 
// const oldVnode = h('div', {
//     key: 'oldVnode'
// }, [
//     h('li', { key: 0 }, '0'),
//     h('li', { key: 1 }, '1'),
//     h('li', { key: 2 }, '2'),
//     h('li', { key: 3 }, '3'),
// ])


// const newVnode = h('div', {
//     key: 'oldVnode'
// }, [
//     h('li', { key: 3 }, '3'),
//     h('li', { key: 2 }, '2'),
//     h('li', { key: 1 }, '1'),
//     h('li', { key: 0 }, '0'),
// ])

// patch(content, oldVnode)

// oBtn.addEventListener('click', () => {
//     patch(oldVnode, newVnode)
// })


// const oldVnode = h('div', {
//     key: 'oldVnode'
// }, [
//     h('li', { key: 4 }, '4'),
//     h('li', { key: 2 }, '2'),
//     h('li', { key: 3 }, '3'),
// ])


// const newVnode = h('div', {
//     key: 'oldVnode'
// }, [
//     h('li', { key: 9 }, '9'),
//     h('li', { key: 3 }, '3'),
//     h('li', { key: 2 }, '2'),
//     h('li', { key: 4 }, '4'),
// ])

// patch(content, oldVnode)

// oBtn.addEventListener('click', () => {
//     patch(oldVnode, newVnode)
// })




const oldVnode = h('div', {
    key: 'oldVnode'
}, [
    h('li', { key: 22 }, '4'),
    h('li', { key: 2 }, '2'),
    h('li', { key: 3 }, '3'),
])


const newVnode = h('div', {
    key: 'oldVnode'
}, [
    h('li', { key: 999 }, '999'),
    h('li', { key: 9 }, '9'),
    h('li', { key: 3 }, '3'),
    h('li', { key: 22 }, '2'),
    h('li', { key: 4 }, '4'),
    h('li', { key: 29 }, '29'),
    h('li', { key: 33 }, '33'),
    h('li', { key: 11 }, '11'),
])

patch(content, oldVnode)

oBtn.addEventListener('click', () => {
    patch(oldVnode, newVnode)
})
