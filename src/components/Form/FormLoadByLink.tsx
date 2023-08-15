import { FormWorker } from "../Canvas/LoadCanvas";


export const FormLoadByLink:React.FC<FormWorker> = ({updateLink,overlay}) => {
    return <form className="form__modal--window" onSubmit={(event: React.FormEvent) => {
        event.preventDefault();
        const el = event.target as any;
        updateLink(el.url.value);
        overlay.current?.classList.remove("active");
      }}>
        <span className="form__modal--window-url-container">
          <input className="form__modal--window-url" autoComplete="off"  type="url" name="url" required/>
        </span>
        <input className="form__modal--window-url-submit" type="submit" value="Update Link" />

    </form>
}