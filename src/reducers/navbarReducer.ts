const defaultState = {
    page:true,
    theme:true
} as NavBar

const theme  = localStorage.getItem("dark_mode");
const page  = localStorage.getItem("page");
if(theme){
    defaultState.theme = JSON.parse(theme); 
}
if(page){
    defaultState.page = JSON.parse(page); 
}

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
            localStorage.setItem("dark_mode",JSON.stringify(action.payload))
            return {...state,theme:action.payload} as NavBar 
        };
        case "SET_PAGE":{
            localStorage.setItem("page",JSON.stringify(action.payload))
            return {...state,page:action.payload} as NavBar 
        };
        default:{
            return state;
        }
    }
}