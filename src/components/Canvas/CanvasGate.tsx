import { useDispatch } from "react-redux";
import { useCanvas } from "../../hooks/useCanvas";
import {useState,useEffect,useRef} from "react";

export interface CanvasGate{
    canvas:HTMLCanvasElement;
}

interface GatePosition{
    x:number;
    y:number;
    visible:boolean;
}

export const CanvasGate:React.FC<CanvasGate> = ({canvas}) => {
    const canvasHandler = useCanvas();
    const [colorList,setColorList] = useState<string[]>([]);
    const [gatePosition,setGatePosition] = useState<GatePosition>({x:0,y:0,visible:false})
    const once = useRef<boolean>(true);    
    const dispatch = useDispatch();

    const handleMouseMove = (event: MouseEvent) => {
          const ctx = canvas.getContext("2d");
          const rect = canvas.getBoundingClientRect();
          
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          setColorList(canvasHandler.getListOfColors(ctx,11,x,y));
          setGatePosition({visible:true,x,y})
        };
        
        useEffect(()=>{
            dispatch({type:"SET_HOVERED",payload:colorList[61]})
        },[colorList])
        
        
        useEffect(() => {
        if(once){
            once.current = false;   
            canvas.addEventListener("click",()=>{
                dispatch({type:"SET_CLICKED",payload:colorList[61]})
            })
            canvas.addEventListener("mouseover", () => {
                canvas.addEventListener("mousemove", handleMouseMove);
            });
            canvas.addEventListener("mouseout", () => {
                canvas.removeEventListener("mousemove", handleMouseMove);
                setGatePosition({visible:false,x:0,y:0})
            });
        }
      }, []);
  
  
  return <div className={`gate ${gatePosition.visible?"active":""}`} style={{marginTop:gatePosition.y,marginLeft:gatePosition.x}}>
        {colorList.map((color,index)=>{
            if(61 === index+1) return <div key={index} className="gate__item active" style={{backgroundColor:color}}></div>
            return <div className="gate__item" key={index} style={{backgroundColor:color}}></div>
        })}
    </div>
}