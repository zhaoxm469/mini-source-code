/*
 * @Author: zhaoxingming
 * @Date: 2021-11-27 17:18:11
 * @LastEditTime: 2021-11-27 18:03:55
 * @LastEditors: vscode
 * @Description: 创建扫描仪类，帮我们把想要提取的数据扫描出来
 */

export default class Scann {
    template: string;
    tail: string;
    pos: number;
    constructor(template: string) {
        this.template = template;
        this.tail = template;
        this.pos = 0;
    }

    scan(tag: string) {
        let tagLen = tag.length;
        if (!this.eos()) {
            this.pos += tagLen;
            this.tail = this.template.substring(this.pos);
        }
    }

    scanUntil(tag): string {
        const oldPos = this.pos;
        // 指针没有查找到 tag 就继续往下走，并把尾巴不断重新赋值
        while (!this.eos() && this.tail.indexOf(tag) !== 0) {
            this.pos++;
            this.tail = this.template.substring(this.pos)
        }
        // 返回指针扫描过的值
        return this.template.substring(oldPos, this.pos).trim()
    }

    eos() {
        return this.tail === '';
    }
}