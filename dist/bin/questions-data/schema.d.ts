declare const schemaQuestionsData: ({
    name: string;
    type: string;
    message: string;
    choices?: undefined;
} | {
    name: string;
    type: string;
    message: string;
    choices: string[];
})[];
export { schemaQuestionsData };
