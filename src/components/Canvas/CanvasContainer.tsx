import { canvasSize, useCanvas } from "../../hooks/useCanvas";
import { useRef, useState, useEffect } from "react";
import { CanvasGate } from "./CanvasGate";
import { CanvasColorPlate } from "./CanvasColorPlate";

export interface GatePosition{
    x:number;
    y:number;
    visible:boolean;
}

interface Colors {
  primary:string | null;
  plate:string[] | null;
} 

export const CanvasContainer: React.FC = () => {
  const canvas = useRef<null | HTMLCanvasElement>(null);
  const [colors,updateColors] = useState<Colors>({primary:null,plate:null})
  const [colorList,setColorList] = useState<string[]>([]);
  const [gatePosition,setGatePosition] = useState<GatePosition>({x:0,y:0,visible:false})
  const canvasHandler = useCanvas();
  const [link, updateLink] = useState<string>(
    "https://images.unsplash.com/photo-1546587348-d12660c30c50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHlvaG98ZW58MHx8MHx8&w=1000&q=80"
  );
  
  const handleMouseMove = (event: MouseEvent) => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      const x = event.x - canvas.current.offsetLeft;
      const y = event.y - canvas.current.offsetTop;
      setColorList(canvasHandler.getListOfColors(ctx,11,x,y));
      setGatePosition({visible:true,x:event.x,y:event.y})
    }
};

useEffect(() => {
    canvas.current?.addEventListener("mouseover", () => {
        canvas.current?.addEventListener("mousemove", handleMouseMove);
    });
    canvas.current?.addEventListener("mouseout", () => {
        canvas.current?.removeEventListener("mousemove", handleMouseMove);
        setGatePosition({visible:false,x:0,y:0})
    });
  }, []);

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        ctx?.drawImage(image, 0, 0, canvasSize.x, canvasSize.y);
        updateColors({plate:canvasHandler.getColorPlate(image),primary:canvasHandler.getMainColor(image)})
      };
      image.src = link;
    }
  }, [link]);


  return (
    <section className="banner">
    <section className="banner__container" style={{background:`radial-gradient(circle, ${colors.primary} 0%, rgba(255,255,255,0) 100%)`}}/>
    <section className="canvas__wrapper">
      <canvas className="canvas" ref={canvas} width={canvasSize.x} height={canvasSize.y} />
      <CanvasGate colorList={colorList} gatePosition={gatePosition}/>
      <CanvasColorPlate plate={colors.plate}/>
    </section>
      <form
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
          const el = event.target as any;
          updateLink(el.url.value);
        }}
        >
        <input type="url" name="url" />
        <input type="submit" value={"Update Link"} />
      </form>
    </section>
  );
};
