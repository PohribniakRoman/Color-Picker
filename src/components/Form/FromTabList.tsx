interface FormTabList{
    setIndex:Function;
    index:number;
}

export const FormTabList:React.FC<FormTabList> = ({setIndex,index}) =>{
    return <div className="form__modal--tabs">
        <div className={`form__modal--tabs-item ${index === 0?"active":""}`} onClick={()=>index !== 0 && setIndex(0)}>Load By Link</div>
        <div className={`form__modal--tabs-item ${index === 1?"active":""}`} onClick={()=>index !== 1 && setIndex(1)}>Load File</div>
        <div className={`form__modal--tabs-item ${index === 2?"active":""}`} onClick={()=>index !== 2 && setIndex(2)}>Pick page color</div>
    </div>
}