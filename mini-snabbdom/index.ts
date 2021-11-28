import { h, patch } from './src/snabbdom'

const content = document.getElementById('content');
const oBtn = document.querySelector('button');

const vnode1 = h('p', {}, 'asd1')
const vnode2 = h('p', 'asd2')
const vnode3 = h('p', null, 'asd3')
const vnode4 = h('p', [
    h('ul', {}, [
        h('li', '123'),
        h('li', [
            h('div', [
                h('p', {

                }, '呵呵呵')
            ])
        ])
    ])
])

// console.log(vnode1)
// console.log(vnode2)
// console.log(vnode3)
// console.log(vnode4)

patch(content, vnode4)

oBtn.addEventListener('click', () => {
    patch(vnode4, vnode3)
})

