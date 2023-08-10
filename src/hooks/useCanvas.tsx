export const useCanvas = () =>{
    const RGBtoHEX = (...rest:number[]) => {
        return `rgb(${rest[0]+","+rest[1]+","+rest[2]})`;
      }

    const getListOfColors = (ctx:CanvasRenderingContext2D | null,radius:number,x:number,y:number):string[] => {
        x=x-radius/2;
        y=y-radius/2;
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

    
    return {RGBtoHEX,getListOfColors}
} 