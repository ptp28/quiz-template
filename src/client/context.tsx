import React, {createContext, useReducer, useContext} from "react";
import {Action} from "./actions.tsx";


type AppState = {
    darkMode: boolean;
};

const initialState = {
    darkMode: false,
};

const reducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "TOGGLE_DARK_MODE":
            return {
                ...state,
                darkMode: action.payload,
            };
        default:
            return state;
    }
};

type AppStateContextType = {
    state: AppState;
    dispatch: React.Dispatch<Action>;
};

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);


export const useAppState = () => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error("useAppState must be used within a AppStateProvider");
    }
    return context;
};


export const AppStateProvider = ({children}: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppStateContext.Provider value={{state, dispatch}}>
            {children}
        </AppStateContext.Provider>
    );
};