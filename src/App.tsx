import { useEffect, useRef, useState } from 'react'





function App() {
  const canvas = useRef<null|HTMLCanvasElement>(null);
  const [link,updateLink] = useState<string>("https://curious.earth/wp-content/uploads/2020/11/quotes-about-nature.jpg");
  const RGBtoHEX = (...rest:number[]) => {
    const rawColor = rest.map((e,i)=>(e << (16-i*8)).toString(16).replace(/(0)/g,""));
    const colorArr = rawColor.map(e=>e.length === 0?"00":e.length === 1?e+"0":e);
    return "#"+colorArr.join("");
  }

  const handleMouseMove = (event:MouseEvent) => {
      if(canvas.current){
        const ctx = canvas.current.getContext("2d");
        const rawColorData = ctx?.getImageData(event.x - canvas.current.offsetLeft,event.y - canvas.current.offsetTop,1,1).data;
        if(rawColorData){
          const color = RGBtoHEX(rawColorData[0],rawColorData[1],rawColorData[2])
          document.body.style.backgroundColor = color;
        }
      }
  }
  
  useEffect(()=>{
      canvas.current?.addEventListener("mouseover",()=>{
        canvas.current?.addEventListener("mousemove",handleMouseMove)
      })
      canvas.current?.addEventListener("mouseout",()=>{
        canvas.current?.removeEventListener("mousemove",handleMouseMove)
      })
  },[])

  useEffect(()=>{
      if(canvas.current){
        const ctx = canvas.current.getContext("2d")
        const image = new Image(640,360);
        image.crossOrigin = "Anonymous"
        image.onload = ()=>{
          ctx?.drawImage(image,0,0);
        }
        image.src = link;
      } 
  },[link])


  return (
    <>
      <canvas ref={canvas} width={500} height={500}/>
      <table className="marker">
        <tbody>
          {new Array(11).fill(11).map((e,index)=>{
            return <tr key={e-index}>
              {new Array(11).fill(11).map((e,i)=>{
                return <td key={e-index*10+i} />
              })}
            </tr>
          })}
        </tbody>
      </table>
      <form onSubmit={(event:React.FormEvent)=>{
        event.preventDefault()
        const el = event.target as any;
        updateLink(el.url.value);
      }}>
        <input type='url' name='url'/>
        <input type='submit' value={"Update Link"}/>
      </form>
    </>
  )
}

export default App
