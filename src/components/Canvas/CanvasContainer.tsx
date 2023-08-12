import { canvasSize, useCanvas } from "../../hooks/useCanvas";
import React, { useRef, useState, useEffect } from "react";
import { CanvasGate } from "./CanvasGate";
import { CanvasColorPlate } from "./CanvasColorPlate";

interface Colors {
  primary: string | null;
  plate: string[] | null;
}

export const CanvasContainer: React.FC = () => {
  const canvas = useRef<null | HTMLCanvasElement>(null);
  const canvasHandler = useCanvas();
  const [cursorColor,setCursorColor] = useState<string>("");
  
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
          primary: canvasHandler.getMainColor(image),
        });
      };
      image.src = link;
    }
  }, [link]);

  return (
    <section className="banner" style={{background:`${colors.primary}`}}>
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
        <div className="canvas__reflection">
          <div className="canvas__selected">
            <div className="canvas__selected--color"></div>
            <div className="canvas__selected--hex"></div>
          </div>
          <div className="canvas__hovered">
            <div className="canvas__hovered--color"></div>
            <div className="canvas__hovered--hex">{cursorColor}</div>
          </div>
        </div>
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
