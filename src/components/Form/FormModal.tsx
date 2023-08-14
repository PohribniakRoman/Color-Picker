import { FormVisualise } from "./FormVisualise";
import { FormTabList } from "./FromTabList";
import {useState} from "react";

export interface FromModal {
  overlay: any;
  updateLink: Function;
}

export const FromModal: React.FC<FromModal> = ({ overlay, updateLink }) => {
    const closeModal = () => overlay.current?.classList.remove("active");
    const [index,setIndex] = useState<number>(0) 
  return (
    <div
      ref={overlay}
      className="form__overlay"
      onClick={(event) =>event.target === overlay.current && closeModal()}
    >
      <div className="form__modal">
        <div className="form__modal--title">Select image</div>
        <FormTabList index={index} setIndex={setIndex}/>
        <FormVisualise overlay={overlay} updateLink={updateLink} index={index}/>
      <div className="form__overlay--cancel" onClick={()=>closeModal()}>Cancel</div>
      </div>
    </div>
  );
};
