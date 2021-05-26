// tslint:disable-next-line:typedef
export function Step(this: any, context: any, t: number) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart(): void {
    this._line = 0;
  },
  areaEnd(): void {
    this._line = NaN;
  },
  lineStart(): void {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd(): void {
    if (0 < this._t && this._t < 1 && this._point === 2) {
      this._context.lineTo(this._x, this._y);
    }
    if (this._line || (this._line !== 0 && this._point === 1)) {
      this._context.closePath();
    }
    if (this._line >= 0) {
      this._t = 1 - this._t;
      this._line = 1 - this._line;
    }
  },
  point(x: number, y: number): void {
    if (this._point === 0) {
      this._point = 1;
      this._context.moveTo(x, y);
    } else {
      if (this._point === 1) {
        this._point = 2;
        this._context.lineTo(this._x, y);
      } else {
        this._context.lineTo(x, this._y);
        this._context.lineTo(x, y);
      }
    }
    this._x = x;
    this._y = y;
  },
};

// @ts-ignore
export const treeCurve = (context: any) => new Step(context, 0.5);
