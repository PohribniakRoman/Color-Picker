const defaultState = {
    page:true,
    theme:true
} as NavBar

export interface NavBar{
    page:boolean;
    theme:boolean;
}

export interface NavBarAction{
    type:"SET_THEME" | "SET_PAGE";
    payload:boolean;
}


export const navBarReducer = (state = defaultState, action: NavBarAction) => {
    switch (action.type) {
        case "SET_THEME":{
            return {...state,theme:action.payload} as NavBar 
        };
        case "SET_PAGE":{
            return {...state,page:action.payload} as NavBar 
        };
        default:{
            return state;
        }
    }
}