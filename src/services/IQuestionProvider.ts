import {QuestionDataType} from "./QuestionDataType.ts";

export default interface IQuestionProvider {
    getNumQuestions(): number;
    getCurrentQuestionIndex(): number;
    getNextQuestion(): Promise<QuestionDataType | null>;
    checkAnswer(userAnswer: string): Promise<boolean>;
    getScore(): number;
    resetQuiz(): void;
    getFeedbackData(questionIndex: number): string;
}