import  React from "react";
import { useState,useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

export interface CanvasColorPlate {
  plate: string[] | null;
}

export const CanvasColorPlate: React.FC<CanvasColorPlate> = ({ plate }) => {
    const [plateSize,setPlateSize] = useState<number>(1);
    useEffect(()=>{
      setPlateSize(plate?plate.length:1)
    },[plate])
    return (
    <section className="canvas__plate--wrapper">
      <div className="canvas__plate--btn left" onClick={()=>setPlateSize(plateSize-1<1?1:plateSize-1)}>
        <AiOutlineMinus />
      </div>
      <ul className="canvas__plate" style={{gridTemplateColumns:`repeat(${plateSize},1fr)`}}>
        {plate
          ? plate.map((color) => {
              return (
                <li key={color}
                  className="canvas__plate--item"
                  style={{ backgroundColor: color }}
                />
              );
            })
          : "loading..."}
      </ul>
      <div className="canvas__plate--btn right" onClick={()=>setPlateSize(plateSize+1>10?10:plateSize+1)}>
        <AiOutlinePlus />
      </div>
    </section>
  );
};
