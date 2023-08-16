import {BsMoon, BsSunFill} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../reducers/combinerdReducer";
import { NavBarAction } from "../reducers/navbarReducer";


export const Nvabar = () => {
    const nvabarState = useSelector((state:State)=>state.navbar); 
    const dispatch = useDispatch();


    return <section className={`navbar${nvabarState.theme?"":" dark"}`}>
        <nav className="navbar__container">
            <nav className="navbar__menu">
                <nav className={`navbar__menu--item first ${!nvabarState.page?"active":""}`} onClick={()=>nvabarState.page && dispatch({type:"SET_PAGE",payload:!nvabarState.page})}>Pick color from image</nav>
                <nav className={`navbar__menu--item last ${nvabarState.page?"active":""}`} onClick={()=>!nvabarState.page && dispatch({type:"SET_PAGE",payload:!nvabarState.page})}>Color picker</nav>
            </nav>
            <nav className="navbar__theme" onClick={()=>dispatch({type:"SET_THEME",payload:!nvabarState.theme} as NavBarAction)}>
                {nvabarState.theme
                ?<BsMoon/>
                :<BsSunFill/>}
            </nav>
        </nav>
    </section>
}