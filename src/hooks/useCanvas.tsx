//@ts-ignore
import ColorThief from 'colorthief';

export const canvasSize = {
    x:640,
    y:360
}



export const useCanvas = () =>{
    const RGBtoHEX = (...rest:number[]) => {
        return `rgb(${rest[0]+","+rest[1]+","+rest[2]})`;
      }

    const getListOfColors = (ctx:CanvasRenderingContext2D | null,radius:number,x:number,y:number):string[] => {
        x=x-5;
        y=y-5;
        const list = [] as string[];
        if(ctx){
            for (let i = 0; i < radius; i++) {
                for (let j = 0; j < radius; j++) {
                    const data = ctx.getImageData(x+j,y+i,1,1).data
                    list.push(RGBtoHEX(data[0],data[1],data[2]))            
                }
            }
        }
        
        return list;
    }

    const getColorPlate = (img:any) =>{
        const colorThief = new ColorThief();
        return (colorThief.getPalette(img).map((color:number[])=>RGBtoHEX(...color)))
    } 
    const getMainColor = (img:any) =>{
        const colorThief = new ColorThief();
        return RGBtoHEX(...colorThief.getColor(img))
    } 
    
    return {RGBtoHEX,getListOfColors,getColorPlate,getMainColor}
} 