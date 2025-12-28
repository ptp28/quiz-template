export type QuestionDataType = {
    question: {
        text: string;
        imageURL?: string;
        imageAlt?: string;
    };
    answer: {
        options?: string[];
        correctAnswer: string;
    };
    hint?: string;
};