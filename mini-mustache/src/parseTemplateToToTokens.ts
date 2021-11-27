import { tokensType, tokenType } from './type';
/*
 * @Author: zhaoxingming
 * @Date: 2021-11-27 17:16:46
 * @LastEditTime: 2021-11-27 18:27:54
 * @LastEditors: vscode
 * @Description: 将模板字符串转换为tokens数组格式数据
 */

import config from './config'
import Scann from "./scann";

const { startTag, endTag } = config;

export default function parseTemplateToToTokens(template: string): tokensType {
    const tokens = parseTemplateTokens(template);
    const nestTokens = parseToNestTokens(tokens);
    return nestTokens;
}

// 先转换成token
function parseTemplateTokens(template: string): tokensType {
    const scan = new Scann(template);
    let tokens: tokensType = [];
    let word = '';

    while (!scan.eos() && scan.pos < template.length) {
        word = scan.scanUntil(startTag);
        tokens.push(['text', word]);

        scan.scan(startTag)
        word = scan.scanUntil(endTag)
        if (word) {
            tokens.push(['name', word]);
            scan.scan(endTag)
        }
    }

    return tokens;

}

// 折叠tokens , 通过栈  和对象的引用类型 来判断更改收集器的指向 。 这个方法很巧妙。。。
function parseToNestTokens(tokens): tokensType {
    const stack = [];
    let result = [];
    let selection = result;

    for (let token of tokens) {
        // 如果有#开头
        if (token[1].indexOf('#') === 0) {
            // 创建一个新的数组，数组的第3项存放 childer子集
            const newToken = ['#', token[1].substring(1), []]
            // 把新创建的newToken数组追加到收集器里，这个收集器指向上一个栈的第3项，如果栈里为空则指向全局的result 收集器
            selection.push(newToken);
            // 让收集器重新指向 当前新创建数组的newToken 的第二项，让后续遍历的token 数据都插入到这个收集器里
            selection = newToken[2]
            // 将newToken 推出栈中
            stack.push(newToken)
        } else if (token[1] === '/') {
            // 如果遇到/开头的 ，则出栈
            stack.pop();
            // 并让收集器指向上一个栈中的第3项（childer），如果栈中没有数据，则让收集器指向全局收集器 result
            selection = stack.length ? stack[stack.length - 1][2] : result;
        } else {
            // 把token插入到收集器,这里的收集器 可能指向全局的result，也可能是栈顶数组的第3项（childer）
            selection.push(token)
        }
    }

    return result;
}