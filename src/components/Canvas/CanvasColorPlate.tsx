import  React from "react";
import { useState,useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../reducers/combinerdReducer";
import { useCanvas } from "../../hooks/useCanvas";

export interface CanvasColorPlate {
  plate: string[] | null;
}

export const CanvasColorPlate: React.FC<CanvasColorPlate> = ({ plate }) => {
    const [plateSize,setPlateSize] = useState<number>(1);
    const color = useSelector((state:State)=>state.cursorColor.clicked);
    const [currentColor,setCurrentCollor] = useState<string>(color);
    const dispatch = useDispatch();
    const canvasHandler = useCanvas();

    useEffect(()=>{
      setCurrentCollor(canvasHandler.RGBtoHEX(color))
    },[color])
    useEffect(()=>{
      setPlateSize(plate?plate.length:1)
    },[plate])
    
    return (
      <section className="canvas__plate--wrapper">
      <div className="canvas__plate--btn left" onClick={()=>setPlateSize(plateSize-1<3?plateSize:plateSize-1)}>
        <AiOutlineMinus />
      </div>
      <ul className="canvas__plate" style={{gridTemplateColumns:`repeat(${plateSize},1fr)`}}>
      
        {plate
          ? plate.map((color) => {
            color = canvasHandler.RGBtoHEX(color);
            const closest = canvasHandler.getClosestColor(color,[{hex:"#ffffff",name:"black"},{hex:"#000000",name:"white"}]);
            return (
              <li key={color}
                onClick={()=>{
                    dispatch({type:"SET_CLICKED",payload:color})
                }}
                  className={`canvas__plate--item ${currentColor === color?"active":""}`}
                  style={{ backgroundColor: color }}
                >
                  <span style={{background:closest}}></span>
                </li>
              );
            })
          : "loading..."}
      </ul>
      <div className="canvas__plate--btn right" onClick={()=>setPlateSize(plateSize+1>10?10: plateSize!== 1?plateSize+1:plateSize)}>
        <AiOutlinePlus />
      </div>
    </section>
  );
};
