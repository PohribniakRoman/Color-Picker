import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../reducers/combinerdReducer";
import namedColors from '../../../colornames.json';
import { useCanvas } from "../../hooks/useCanvas";
import { MdOutlineContentCopy } from "react-icons/md";

export const ColorContainer:React.FC = () =>{
    const nvabarState = useSelector((state:State)=>state.navbar); 
    const canvasHandler = useCanvas();
    const HEX = canvasHandler.RGBtoHEX(useSelector((state:State)=>state.cursorColor.clicked));

    const result = HEX !== "Loading..." ? canvasHandler.getClosestColor(HEX,namedColors):"Loading...";
    const colorMapWhite = HEX !== "Loading..." ? canvasHandler.generatePlateToColor(HEX,"#ffffff"):"Loading...";
    const colorMapBlack = HEX !== "Loading..." ? canvasHandler.generatePlateToColor(HEX,"#000000"):"Loading...";
    

    return <section className={`color${nvabarState.page?" away":""} ${nvabarState.theme?"":"dark"}`}>
        <div className="color__plate" style={{background:HEX,color:canvasHandler.getClosestColor(HEX,[{hex:"#ffffff",name:"black"},{hex:"#000000",name:"white"}])}}>
            <h1>
                {HEX}
            </h1>
            <h3>
                <i>≈</i> {result}
            </h3>
        </div>
        <div className="color__variations">
            <h1 className="color__variations--title">Variations</h1>
            <h1 className="color__variations--description">The purpose of this section is to accurately produce tints (pure white added) and shades (pure black added) of your selected color in 10% increments.</h1>
            <h1 className="color__variations--subtitle">Tints</h1>
            <div className="color__variations--list">
                {colorMapWhite !== "Loading..." && colorMapWhite.map((color,index)=>{
                     const closest = canvasHandler.getClosestColor(color,[{hex:"#ffffff",name:"black"},{hex:"#000000",name:"white"}])
                     return <div key={color} data-precent={((index)*10)+"%"} className="color__variations--list-item" data-color={color} style={{color:closest,background:color}}>
                        <MdOutlineContentCopy/>
                    </div>
                })}
            </div>
            <h1 className="color__variations--subtitle">Shades</h1>
            <div className="color__variations--list">
                {colorMapBlack !== "Loading..." && colorMapBlack.map((color,index)=>{
                    const closest = canvasHandler.getClosestColor(color,[{hex:"#ffffff",name:"black"},{hex:"#000000",name:"white"}])
                    return <div key={color} data-precent={((index)*10)+"%"} className="color__variations--list-item" data-color={color} style={{color:closest,background:color}}>
                        <MdOutlineContentCopy/>
                    </div>
                })}
            </div>
        </div>
    </section>
}