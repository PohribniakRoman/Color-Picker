import { useRef } from "react";
import { FromModal } from "../Form/FormModal";

export interface LoadCanvas {
  updateLink: Function;
}

export interface FormWorker {
  updateLink: Function;
  overlay: any;
}

export const LoadCanvas: React.FC<LoadCanvas> = ({ updateLink }) => {
  const overlay = useRef<null | HTMLDivElement>(null);

  return (
    <div className="form">
      <FromModal overlay={overlay} updateLink={updateLink} />
      <button
        type="reset"
        className="form__btn"
        onClick={() => overlay.current?.classList.add("active")}
      >
        use your image
      </button>
      <h3 className="form__subtitle">
        We think data protection is important!
        <span>`No data is sent.`</span>
        The magic happens in your browser.
      </h3>
    </div>
  );
};
