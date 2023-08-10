import { GatePosition } from "./CanvasContainer";

export interface CanvasGate{
    colorList:string[];
    gatePosition:GatePosition
}

export const CanvasGate:React.FC<CanvasGate> = ({colorList,gatePosition}) => {
    return <div className={`gate ${gatePosition.visible?"active":""}`} style={{marginTop:gatePosition.y,marginLeft:gatePosition.x}}>
        {colorList.map((color,index)=>{
            if(61 === index+1) return <div className="gate__item active" style={{backgroundColor:color}}></div>
            
            return <div className="gate__item" style={{backgroundColor:color}}></div>
        })}
    </div>
}