import { FormWorker } from "../Canvas/LoadCanvas";


export const FormLoadByLink:React.FC<FormWorker> = ({updateLink,overlay}) => {
    return <form className="form__modal--window" onSubmit={(event: React.FormEvent) => {
        event.preventDefault();
        const el = event.target as any;
        updateLink(el.url.value);
        overlay.current?.classList.remove("active");
      }}>
        <input type="url" name="url" required/>
        <input type="submit" value="Update Link" />
    </form>
}