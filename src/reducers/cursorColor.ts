const defaultState = {
    hovered:"",
    clicked:""
} as CursorColor

export interface CursorColor{
    hovered:string;
    clicked:string;
}

export interface CursorColorAction{
    type:"SET_HOVERED" | "SET_CLICKED";
    payload:string;
}


export const cursorColor = (state = defaultState, action: CursorColorAction) => {
    switch (action.type) {
        case "SET_HOVERED":{
            if(action.payload){
                return {...state,hovered:action.payload} as CursorColor 
            }
            return state
        };
        case "SET_CLICKED":{
            if(action.payload){
                return {...state,clicked:action.payload} as CursorColor 
            }
            return state
        };
        default:{
            return state;
        }
    }
}