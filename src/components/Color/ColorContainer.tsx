import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../reducers/combinerdReducer";
import namedColors from '../../../colornames.json';
import { useCanvas } from "../../hooks/useCanvas";
import { MdOutlineContentCopy } from "react-icons/md";
import converter from "color-convert";


export const ColorContainer:React.FC = () =>{
    const nvabarState = useSelector((state:State)=>state.navbar); 
    const canvasHandler = useCanvas();
    const HEX = canvasHandler.RGBtoHEX(useSelector((state:State)=>state.cursorColor.clicked));

    const result = HEX !== "Loading..." ? canvasHandler.getClosestColor(HEX,namedColors):"Loading...";
    const colorMapWhite = HEX !== "Loading..." ? canvasHandler.generatePlateToColor(HEX,"#ffffff"):"Loading...";
    const colorMapBlack = HEX !== "Loading..." ? canvasHandler.generatePlateToColor(HEX,"#000000"):"Loading...";
    console.log();
    const formats = HEX !== "Loading..." ? [
        [`HEX: ${HEX}`,HEX],
        [`HSL: ${converter.hex.hsl(HEX).join(", ")}`,converter.hex.hsl(HEX).join(", ")],
        [`RGB: ${converter.hex.rgb(HEX).join(", ")}`,converter.hex.rgb(HEX).join(", ")],
        [`CMYK: ${converter.hex.cmyk(HEX).join(", ")}`,converter.hex.cmyk(HEX).join(", ")],
        [`LAB: ${converter.hex.lab(HEX).join(", ")}`,converter.hex.lab(HEX).join(", ")],
        [`HWB: ${converter.hex.hwb(HEX).join(", ")}`,converter.hex.hwb(HEX).join(", ")],
        [`XYZ: ${converter.hex.xyz(HEX).join(", ")}`,converter.hex.xyz(HEX).join(", ")],
        [`LCH: ${converter.hex.lch(HEX).join(", ")}`,converter.hex.lch(HEX).join(", ")],
    ] :[];

    return <section className={`color${nvabarState.page?" away":""} ${nvabarState.theme?"":"dark"}`}>
        <div className="color__plate" style={{background:HEX,color:canvasHandler.getClosestColor(HEX,[{hex:"#ffffff",name:"black"},{hex:"#000000",name:"white"}])}}>
            <h1>
                {HEX}
            </h1>
            <h3>
                <i>≈</i> {result}
            </h3>
        </div>
        <div className="color__converter">
            <h1 className="color__converter--title">Color-Conversion</h1>
            <ul className="color__converter--container">
                {formats.map((color=>{
                    return <li key={color[1]} className="color__converter--container-item">
                    <span>
                       {color[0]}
                    </span>
                    <div onClick={(event:any)=>{
                        event.target.classList.add("active");
                        setTimeout(() => {
                            event.target.classList.remove("active");
                        }, 400);
                        navigator.clipboard.writeText(`${color[1]}`);
                    }}>
                        <MdOutlineContentCopy/>
                    </div>
                </li>
                }))}
            </ul>
        </div>
        <div className="color__variations">
            <h1 className="color__variations--title">Variations</h1>
            <h1 className="color__variations--description">The purpose of this section is to accurately produce tints (pure white added) and shades (pure black added) of your selected color in 10% increments.</h1>
            <h1 className="color__variations--subtitle">Tints</h1>
            <div className="color__variations--list">
                {colorMapWhite !== "Loading..." && colorMapWhite.map((color,index)=>{
                     const closest = canvasHandler.getClosestColor(color,[{hex:"#ffffff",name:"black"},{hex:"#000000",name:"white"}])
                     return <div 
                        key={color + index} 
                        data-precent={((index)*10)+"%"} 
                        className="color__variations--list-item" 
                        data-color={color} 
                        style={{color:closest,background:color}}
                        onClick={(event:any)=>{
                            event.target.classList.add("active");
                            setTimeout(() => {
                                event.target.classList.remove("active");
                            }, 400);
                            navigator.clipboard.writeText(`${color}`);
                        }}>
                        <MdOutlineContentCopy/>
                        <span>Copied!</span>
                    </div>
                })}
            </div>
            <h1 className="color__variations--subtitle">Shades</h1>
            <div className="color__variations--list">
                {colorMapBlack !== "Loading..." && colorMapBlack.map((color,index)=>{
                    const closest = canvasHandler.getClosestColor(color,[{hex:"#ffffff",name:"black"},{hex:"#000000",name:"white"}])
                    return <div 
                        key={color + index} 
                        data-precent={((index)*10)+"%"} 
                        className="color__variations--list-item" 
                        data-color={color} 
                        style={{color:closest,background:color}}
                        onClick={(event:any)=>{
                            event.target.classList.add("active");
                            setTimeout(() => {
                                event.target.classList.remove("active");
                            }, 400);
                            navigator.clipboard.writeText(`${color}`);
                        }}>
                        <MdOutlineContentCopy/>
                        <span>Copied!</span>
                    </div>
                })}
            </div>
        </div>
    </section>
}