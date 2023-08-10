
export interface CanvasGate{
    colorList:string[]
}

export const CanvasGate:React.FC<CanvasGate> = ({colorList}) => {
    return <div className="gate">
        {colorList.map(color=>{
            return <div className="gate" style={{backgroundColor:color}}></div>
        })}
    </div>
}