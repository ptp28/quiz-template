import {QuestionDataType} from "./QuestionDataType.ts";

export default interface IQuestionProvider {
    getNumQuestions(): number;
    getCurrentQuestionIndex(): number;
    getNextQuestion(): Promise<QuestionDataType | null>;
    checkAnswer(userAnswer: string): Promise<boolean>;
    getScore(): { correctAnswerCount: number, inCorrectAnswerCount: number };
    resetQuiz(): void;
    getFeedbackData(questionIndex: number): string;
}