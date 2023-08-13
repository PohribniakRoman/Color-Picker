import { combineReducers } from "@reduxjs/toolkit";
import { CursorColor, cursorColor } from "./cursorColor";

export type State = {
    cursorColor:CursorColor
}

export const combinedReducer = combineReducers({
    cursorColor:cursorColor
})