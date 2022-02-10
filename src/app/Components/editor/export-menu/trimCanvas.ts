// @ts-nocheck
export function trimCanvas(c:HTMLCanvasElement): HTMLCanvasElement {
  // tslint:disable-next-line:no-non-null-assertion
  const ctx = c.getContext('2d')!;
  const copy = document.createElement('canvas').getContext('2d');
  const pixels = ctx.getImageData(0, 0, c.width, c.height);
  const l = pixels.data.length;
  let i: number;
  const bound = {
    top: null,
    left: null,
    right: null,
    bottom: null,
  };
  let x: number | null;
  let y: number | null;

  // Iterate over every pixel to find the highest
  // and where it ends on every axis ()
  for (i = 0; i < l; i += 4) {
    if (pixels.data[i + 3] !== 0) {
      x = (i / 4) % c.width;
      // tslint:disable-next-line:no-bitwise
      y = ~~((i / 4) / c.width);

      if (bound.top === null) {
        bound.top = y;
      }

      if (bound.left === null) {
        bound.left = x;
      } else if (x < bound.left) {
        bound.left = x;
      }

      if (bound.right === null) {
        bound.right = x;
      } else if (bound.right < x) {
        bound.right = x;
      }

      if (bound.bottom === null) {
        bound.bottom = y;
      } else if (bound.bottom < y) {
        bound.bottom = y;
      }
    }
  }

  // Calculate the height and width of the content
  const trimHeight = bound.bottom - bound.top;
  const trimWidth = bound.right - bound.left;
  const trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

  copy.canvas.width = trimWidth;
  copy.canvas.height = trimHeight;
  copy.putImageData(trimmed, 0, 0);

  // Return trimmed canvas
  return copy.canvas;
}
