export const useCanvas = () =>{
    const RGBtoHEX = (...rest:number[]) => {
        const rawColor = rest.map((e,i)=>(e << (16-i*8)).toString(16).replace(/(0)/g,""));
        const colorArr = rawColor.map(e=>e.length === 0?"00":e.length === 1?e+"0":e);
        return "#"+colorArr.join("");
      }

    const getListOfColors = (ctx:CanvasRenderingContext2D | null,radius:number,x:number,y:number):string[] => {
        x=x-radius/2;
        y=y+radius/2;
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