import { QuestionDataType } from "./QuestionDataType.ts";
import IQuestionProvider from "./IQuestionProvider.ts";


class FileQuestionProvider implements IQuestionProvider {
    private questions: QuestionDataType[] = [];
    private loadingPromise: Promise<void>;

    constructor(filePath: string) {
        this.loadingPromise = fetch(filePath)
            .then((response) => response.json())
            .then((data) => {
                this.questions = data;
            })
            .catch((error) => console.error("Error loading questions:", error));
    }

    async ensureLoaded(): Promise<void> {
        return this.loadingPromise;
    }

    getAllQuestions(): QuestionDataType[] {
        return this.questions;
    }
}

// Singleton Design Pattern
const questionService = new FileQuestionProvider("quiz_list.json");
export default questionService;