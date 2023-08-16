import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../reducers/combinerdReducer";
import namedColors from 'color-name-list';
import { useCanvas } from "../../hooks/useCanvas";

export const ColorContainer:React.FC = () =>{
    const nvabarState = useSelector((state:State)=>state.navbar); 
    const canvasHandler = useCanvas();
    const HEX = canvasHandler.RGBtoHEX(useSelector((state:State)=>state.cursorColor.clicked));
    //@ts-ignore
    const result = HEX !== "Loading..." ? canvasHandler.getClosestColor(HEX,namedColors.colorNameList):"Loading...";


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