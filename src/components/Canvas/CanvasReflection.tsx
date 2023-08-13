import { useEffect, useState,useRef } from "react";
import { useSelector } from "react-redux";
import { State } from "../../reducers/combinerdReducer";
import {MdOutlineContentCopy} from "react-icons/md"
import { CursorColor } from "../../reducers/cursorColor";

export const CanvasReflection = () => {
  const color = useSelector((state:State)=>state.cursorColor)
  const [cursorColor,setCursorColor] = useState<CursorColor>(color);
    const copyHovered = useRef<null|HTMLDivElement>(null);
    const copyClicked = useRef<null|HTMLDivElement>(null);

    useEffect(()=>{
        setCursorColor(color)
    },[color])

    return <div className="canvas__reflection">
    <div className="canvas__selected">
      <div className="canvas__selected--color" style={{background:cursorColor.clicked}} />
      <div className="canvas__hovered--hex">
        <span>HEX:{cursorColor.clicked}</span>
        <div className="canvas__copy" ref={copyClicked} onClick={()=>{
          copyClicked.current?.classList.add("active")
          setTimeout(() => {
            copyClicked.current?.classList.remove("active")
          }, 400);
          navigator.clipboard.writeText(`${cursorColor.clicked}`)
        }}><MdOutlineContentCopy/></div>
      </div>
    </div>
    <div className="canvas__hovered">
      <div className="canvas__hovered--color" style={{background:cursorColor.hovered}}/>
      <div className="canvas__hovered--hex">
        <span>RGB:{cursorColor.hovered}</span>
        <div className="canvas__copy" ref={copyHovered} onClick={()=>{
          copyHovered.current?.classList.add("active")
          setTimeout(() => {
            copyHovered.current?.classList.remove("active")
          }, 400);
          navigator.clipboard.writeText(`${cursorColor.hovered}`)
        }}><MdOutlineContentCopy/></div>
      </div>
    </div>
  </div>
}