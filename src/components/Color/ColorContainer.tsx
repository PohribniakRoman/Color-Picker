import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../reducers/combinerdReducer";

export const ColorContainer:React.FC = () =>{
    const nvabarState = useSelector((state:State)=>state.navbar); 

    
    return <section className={`color ${nvabarState.page?"":"away"}`}>

    </section>
}