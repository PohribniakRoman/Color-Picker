import { canvasSize, useCanvas } from "../../hooks/useCanvas";
import React, { useRef, useState, useEffect } from "react";
import { CanvasGate } from "./CanvasGate";
import { CanvasColorPlate } from "./CanvasColorPlate";
import { CanvasReflection } from "./CanvasReflection";
import { useDispatch } from "react-redux";
import { LoadCanvas } from "./LoadCanvas";

interface Colors {
  primary: string | null;
  plate: string[] | null;
}

export const CanvasContainer: React.FC = () => {
  const canvas = useRef<null | HTMLCanvasElement>(null);
  const canvasHandler = useCanvas();
  const dispatch = useDispatch();

  const [colors, updateColors] = useState<Colors>({
    primary: null,
    plate: null,
  });
  const [link, updateLink] = useState<string>(
    "https://images.unsplash.com/photo-1546587348-d12660c30c50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHlvaG98ZW58MHx8MHx8&w=1000&q=80"
  );

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        ctx?.drawImage(image, 0, 0, canvasSize.x, canvasSize.y);
        updateColors({
          plate: canvasHandler.getColorPlate(image),
          primary:canvasHandler.getMainColor(image),
        });
      };
      image.src = link;
    }
  }, [link]);
  
  useEffect(()=>{
      dispatch({type:"SET_HOVERED",payload:colors.primary})
      dispatch({type:"SET_CLICKED",payload:colors.primary})
  },[colors.primary])


  return (
    <section className="banner" style={{ background: `${colors.primary}` }}>
      <section className="banner__container">
        <div className="canvas__wrapper">
          <canvas
            className="canvas"
            ref={canvas}
            width={canvasSize.x}
            height={canvasSize.y}
          />
          {canvas.current ? <CanvasGate canvas={canvas.current} /> : null}
          <CanvasColorPlate plate={colors.plate} />
        </div>
        <div className="banner__container-column">
          <CanvasReflection/>
          <LoadCanvas updateLink={updateLink}/>
        </div>
      </section>
    </section>
  );
};
