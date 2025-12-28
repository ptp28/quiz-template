import { useState, useEffect, useCallback } from 'react';
import questionService from '../../services/FileQuestionProvider';
import { QuestionDataType } from '../../services/QuestionDataType';

export interface QuizState {
    isLoading: boolean;
    isError: boolean;
    isFinished: boolean;
    questionData: QuestionDataType | null;
    currentQuestionIndex: number;
    totalQuestions: number;
    score: number;
    isIncorrect: boolean;
    isHintRevealed: boolean;
    questions: QuestionDataType[];
}

export const useQuiz = () => {
    const [state, setState] = useState<QuizState>({
        isLoading: true,
        isError: false,
        isFinished: false,
        questionData: null,
        currentQuestionIndex: 0,
        totalQuestions: 0,
        score: 0,
        isIncorrect: false,
        isHintRevealed: false,
        questions: [],
    });

    const initializeQuiz = useCallback(async () => {
        try {
            await questionService.ensureLoaded();
            const allQuestions = questionService.getAllQuestions();

            if (!allQuestions || allQuestions.length === 0) {
                setState(prev => ({ ...prev, isError: true, isLoading: false }));
                return;
            }

            setState(prev => ({
                ...prev,
                questions: allQuestions,
                totalQuestions: allQuestions.length,
                currentQuestionIndex: 0,
                questionData: allQuestions[0],
                score: 0,
                isLoading: false,
                isFinished: false,
                isError: false,
                isIncorrect: false,
                isHintRevealed: false,
            }));

        } catch (error) {
            console.error("Error initializing quiz:", error);
            setState(prev => ({ ...prev, isError: true, isLoading: false }));
        }
    }, []);

    useEffect(() => {
        initializeQuiz();
    }, [initializeQuiz]);

    const advanceToNextQuestion = useCallback(() => {
        setState(prev => {
            const nextIndex = prev.currentQuestionIndex + 1;
            if (nextIndex < prev.totalQuestions) {
                return {
                    ...prev,
                    currentQuestionIndex: nextIndex,
                    questionData: prev.questions[nextIndex],
                    isIncorrect: false,
                    isHintRevealed: false,
                };
            } else {
                return {
                    ...prev,
                    isFinished: true,
                    isIncorrect: false,
                    isHintRevealed: false,
                };
            }
        });
    }, []);

    const submitAnswer = (selectedAnswer: string) => {
        const currentQuestion = state.questions[state.currentQuestionIndex];
        const isCorrect = currentQuestion.answer.correctAnswer === selectedAnswer;

        if (isCorrect) {
            const newScore = state.score + 5;
            setState(prev => ({
                ...prev,
                score: newScore,
                isIncorrect: false,
            }));
            advanceToNextQuestion();
        } else {
            const newScore = state.score - 1;
            setState(prev => ({
                ...prev,
                score: newScore,
                isIncorrect: true,
            }));
        }
    };

    const dismissFeedback = () => {
        advanceToNextQuestion();
    };

    const resetQuiz = () => {
        initializeQuiz();
    };

    const revealHint = () => {
        setState(prev => ({
            ...prev,
            isHintRevealed: true,
            score: prev.score - 1
        }));
    };

    return {
        ...state,
        submitAnswer,
        dismissFeedback,
        resetQuiz,
        revealHint,
    };
};
