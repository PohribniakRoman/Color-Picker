import { combineReducers } from "@reduxjs/toolkit";
import { CursorColor, cursorColor } from "./cursorColor";
import { NavBar, navBarReducer } from "./navbarReducer";

export type State = {
    cursorColor:CursorColor;
    navbar:NavBar;
}

export const combinedReducer = combineReducers({
    cursorColor:cursorColor,
    navbar:navBarReducer
})