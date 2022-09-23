declare const attributesQuestionsData: ({
    type: string;
    name: string;
    message: string;
    choices?: undefined;
    when?: undefined;
} | {
    type: string;
    name: string;
    message: string;
    choices: string[];
    when?: undefined;
} | {
    type: string;
    name: string;
    message: string;
    when: (answ: any) => boolean;
    choices: string[];
} | {
    type: string;
    name: string;
    message: string;
    when: (answ: any) => boolean;
    choices?: undefined;
})[];
export { attributesQuestionsData };
