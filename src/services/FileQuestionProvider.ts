import {QuestionDataType} from "./QuestionDataType.ts";
import IQuestionProvider from "./IQuestionProvider.ts";


class FileQuestionProvider implements IQuestionProvider {
    private questions: QuestionDataType[] = [];
    private currentQuestionIndex: number = 0;
    private score: number = 0;

    constructor(filePath: string) {
        fetch(filePath)
            .then((response) => response.json())
            .then((data) => this.questions = data)
            .catch((error) => console.error("Error loading questions:", error));
    }

    async getNextQuestion(): Promise<QuestionDataType | null> {
        if (this.currentQuestionIndex < this.questions.length) {
            return this.questions[this.currentQuestionIndex];
        }
        return null;
    }

    async checkAnswer(userAnswer: string): Promise<boolean> {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        if (!currentQuestion) {
            throw new Error("No question to check.");
        }

        const isCorrect = currentQuestion.answer.correctAnswer === userAnswer;
        if (isCorrect) {
            this.score++;
            this.currentQuestionIndex++;
        }
        return isCorrect;
    }

    getScore(): number {
        return this.score;
    }

    getNumQuestions(): number {
        return this.questions.length;
    }

    resetQuiz(): void {
        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    getCurrentQuestionIndex(): number {
        return this.currentQuestionIndex;
    }

    getFeedbackData(questionIndex: number): string {
        return this.questions[questionIndex].feedback;
    }
}

// Singleton Design Pattern
const questionService = new FileQuestionProvider("quiz_list.json");
export default questionService;