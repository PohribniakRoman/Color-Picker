import {BsMoon} from "react-icons/bs";
import {useState} from "react";


export const Nvabar = () => {
    const [menuState,setMenuState] = useState<boolean>(false)

    return <section className="navbar">
        <nav className="navbar__container">
            <nav className="navbar__menu">
                <nav className={`navbar__menu--item first ${!menuState?"active":""}`} onClick={()=>menuState && setMenuState(!menuState)}>Pick color from image</nav>
                <nav className={`navbar__menu--item last ${menuState?"active":""}`} onClick={()=>!menuState && setMenuState(!menuState)}>Color picker</nav>
            </nav>
            <nav className="navbar__theme">
                <BsMoon/>
            </nav>
        </nav>
    </section>
}