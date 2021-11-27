import { tokensType } from './type';
/*
 * @Author: zhaoxingming
 * @Date: 2021-11-27 18:03:16
 * @LastEditTime: 2021-11-27 18:56:28
 * @LastEditors: vscode
 * @Description:解析tokens数组，将data数据融合进来，并且生成我们的最新模板字符串。
 */

export default function parseTokensToTemplateStr(tokens: tokensType, data): string {
    let html = '';
    for (let [key, value, childTokens] of tokens) {
        if (key === 'name') {
            html += getParsePathValue(data, value);
        } else if (key === '#') {
            // 解析有嵌套的情况
            html += parseTokenChild(childTokens, getParsePathValue(data, value));
        } else {
            html += value;
        }
    }
    return html;
}

function parseTokenChild(tokens: tokensType, arrData) {
    let html = '';
    // 循环数组，把dom节点都遍历一遍
    arrData.forEach(item => {
        // 每一项tokens 递归调用解析
        html += parseTokensToTemplateStr(tokens, {
            // 兼容模板中市容item查找对象的某个属性
            item,
            ...item
        });
    })
    return html;
}

function getParsePathValue(data, key: string) {
    if (!key.includes('.')) return data[key];
    key.split('.').forEach(k => data = data[k])
    return data;
}