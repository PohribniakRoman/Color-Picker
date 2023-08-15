import { FormWorker } from "../Canvas/LoadCanvas"

export const FormLoadByColor:React.FC<FormWorker> = ({overlay,updateLink}) => {
    return <form className="form__modal--window" onSubmit={(event)=>{
        event.preventDefault();
        const element = event.target as HTMLFormElement;
        updateLink(element.color.value);
        overlay.current?.classList.remove("active");  
    }}>
        <label className="form__modal--window-container_color">
            <div className="form__modal--window-select_color">Pick Color</div>
            <input type="color" className="form__modal--window-color" name="color" required/>
        </label>
        <button className="form__modal--window-btn">load</button>
    </form>
}