declare const seedsQuestionsData: (askForSeedName: any) => ({
    name: string;
    type: string;
    when: (ans: any) => boolean;
    message: string;
    choices: string[];
} | {
    name: string;
    type: string;
    when: (ans: any) => any;
    message: string;
    choices?: undefined;
})[];
export { seedsQuestionsData };
