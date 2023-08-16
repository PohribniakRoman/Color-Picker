//@ts-ignore
import ColorThief from "colorthief";
import rgbHex from "rgb-hex";

export const canvasSize = {
  x: 640,
  y: 360,
};

export const useCanvas = () => {
  const toRGB = (...rest: number[]) => {
    return "rgb(" + rest[0] + "," + rest[1] + "," + rest[2] + ")";
  };

  const getListOfColors = (
    ctx: CanvasRenderingContext2D | null,
    radius: number,
    x: number,
    y: number
  ): string[] => {
    x = x - 5;
    y = y - 5;
    const list = [] as string[];
    if (ctx) {
      for (let i = 0; i < radius; i++) {
        for (let j = 0; j < radius; j++) {
          const data = ctx.getImageData(x + j, y + i, 1, 1).data;
          list.push(toRGB(data[0], data[1], data[2]));
        }
      }
    }

    return list;
  };

  const getColorPlate = (img: any) => {
    const colorThief = new ColorThief();
    return colorThief.getPalette(img).map((color: number[]) => toRGB(...color));
  };
  const getMainColor = (img: any) => {
    const colorThief = new ColorThief();
    return toRGB(...colorThief.getColor(img));
  };

  const RGBtoHEX = (data: string) => {
    try {
      return `#${rgbHex(data)}`;
    } catch {
      return data;
    }
  };

  const hexToRgb = (hex: string): any => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  };

  const calcDistance = (color1: any, color2: any) => {
    color1 = hexToRgb(color1);
    color2 = hexToRgb(color2);
    if (color1 && color2) {
      const [r1, g1, b1] = color1;
      const [r2, g2, b2] = color2;
      const drp2 = Math.pow(r1 - r2, 2);
      const dgp2 = Math.pow(g1 - g2, 2);
      const dbp2 = Math.pow(b1 - b2, 2);
      return Math.sqrt(drp2 + dgp2 + dbp2);
    }
    return Infinity;
  };

  const getClosestColor = (target: any, list: any) => {
    let result = list[0].name;
    let dist = calcDistance(list[0].hex, target);
    list.forEach((el: any) => {
      const diff = calcDistance(el.hex, target);
      if (dist > diff) {
        result = el.name;
        dist = diff;
      }
    });
    return result;
  };

  return {
    toRGB,
    getListOfColors,
    getColorPlate,
    getMainColor,
    RGBtoHEX,
    getClosestColor,
  };
};
