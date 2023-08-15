import { FormWorker } from "../Canvas/LoadCanvas";
import { FormLoadByColor } from "./FormLoadByColor";
import { FormLoadByLink } from "./FormLoadByLink";
import { FormLoadFile } from "./FormLoadFile";

interface FormVisualise extends FormWorker{
    index:number;
}

export const FormVisualise:React.FC<FormVisualise> = ({overlay,updateLink,index}) =>{
    return <>
        {index === 0 && <FormLoadByLink overlay={overlay} updateLink={updateLink}/>}
        {index === 1 && <FormLoadFile overlay={overlay} updateLink={updateLink}/>}
        {index === 2 && <FormLoadByColor overlay={overlay} updateLink={updateLink}/>}
    </>
}