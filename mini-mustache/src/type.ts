export type tokenNoChildType = [
    string,
    string,
];

export type tokenChildType = [
    string,
    string,
    [tokenType]
];

export type tokenType = tokenNoChildType | tokenChildType | [];

export type tokensType = tokenType[];
