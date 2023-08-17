import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../reducers/combinerdReducer";
import namedColors from '../../../colornames.json';
import { useCanvas } from "../../hooks/useCanvas";

export const ColorContainer:React.FC = () =>{
    const nvabarState = useSelector((state:State)=>state.navbar); 
    const canvasHandler = useCanvas();
    const HEX = canvasHandler.RGBtoHEX(useSelector((state:State)=>state.cursorColor.clicked));

    const result = HEX !== "Loading..." ? canvasHandler.getClosestColor(HEX,namedColors):"Loading...";


    return <section className={`color${nvabarState.page?" away":""} ${nvabarState.theme?"":"dark"}`}>
        <div className="color__plate" style={{background:HEX,color:canvasHandler.getClosestColor(HEX,[{hex:"#ffffff",name:"black"},{hex:"#000000",name:"white"}])}}>
            <h1>
                {HEX}
            </h1>
            <h3>
                <i>≈</i> {result}
            </h3>
        </div>
    </section>
}