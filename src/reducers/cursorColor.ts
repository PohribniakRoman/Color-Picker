const defaultState = {
    color:false
} as CursorColor

export interface CursorColor{
    color:boolean;
}

export interface CursorColorAction{
    type:"SET_COLOR";
    payload:boolean;
}


export const cursorColor = (state = defaultState, action: CursorColorAction) => {
    switch (action.type) {
        case "SET_COLOR":{
            return {loaded:action.payload}            
        };
        default:{
            return state;
        }
    }
}