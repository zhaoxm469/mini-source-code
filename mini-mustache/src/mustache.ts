import parseTemplateToToTokens from "./parseTemplateToToTokens";
import parseTokensToTemplateStr from "./parseTokensToTemplateStr";

export default class Mustache {
    constructor() { }

    render(template: string, data): string {
        const tokens = parseTemplateToToTokens(template);
        const templateStr = parseTokensToTemplateStr(tokens, data);
        return templateStr;
    }
}