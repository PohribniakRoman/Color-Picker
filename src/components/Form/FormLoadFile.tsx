import { FormWorker } from "../Canvas/LoadCanvas";


export const FormLoadFile:React.FC<FormWorker> = ({updateLink,overlay}) => {
    return <form className="form__modal--window">
        <input
          type="file"
          onChange={(event) => {
            if (event.target.files && event.target.files[0].type.includes("image")) {
                const reader = new FileReader();
                reader.onload = () => {
                    overlay.current?.classList.remove("active");  
                    updateLink(reader.result);
                };
                reader.readAsDataURL(event.target.files[0]);
            }}}/>
    </form>
}