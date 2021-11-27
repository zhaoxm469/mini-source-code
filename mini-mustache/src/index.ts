import Mustache from "./mustache";

const oApp = document.getElementById('app')
const template = document.getElementById('template').innerHTML;
const mustache = new Mustache();

const data = {
    name: '赵某某',
    you_name: '王某某',
    title: '开始渲染',
    list: [
        {
            name: '小王',
            color: '红色',
            tags: ['高速', '高架桥'],
            a: {
                name: '到A了',
                b: {
                    c: {
                        list: {
                            color: ['白色', '花色']
                        },
                        d: '9999'
                    }
                }
            }
        },
        {
            name: '小李',
            color: '绿色',
            tags: ['桥上', '山洞里'],
            a: {
                name: '到A了',
                b: {
                    c: {
                        list: {
                            color: ['白色22', '花色33']
                        },
                        d: '9999'
                    }
                }
            }

        }
    ]
}

const htmlStr = mustache.render(template, data)

oApp.innerHTML = htmlStr;