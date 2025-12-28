import { QuestionDataType } from "./QuestionDataType.ts";

export default interface IQuestionProvider {
    ensureLoaded(): Promise<void>;
    getAllQuestions(): QuestionDataType[];
}