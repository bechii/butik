import { clamp01, lerp } from './mathUtils';

const PI: number = Math.PI;
const HALF_PI: number = Math.PI / 2;

export type EaseMethod = (t: number) => number;

//Interpolation
export function interpolate(from: number, to: number, easeMethod: EaseMethod, t: number): number {
  return lerp(from, to, easeMethod(t));
}

//Linear
export function linear(t: number): number {
  t = clamp01(t);
  return t;
}

//Sinusoidal
export function sinIn(t: number): number {
  t = clamp01(t);
  return Math.sin((t - 1) * HALF_PI) + 1;
}

export function sinOut(t: number): number {
  t = clamp01(t);
  return Math.sin(t * HALF_PI);
}

export function sinInOut(t: number): number {
  t = clamp01(t);
  return 0.5 * (1 - Math.cos(t * PI));
}

//Quadratic
export function quadIn(t: number): number {
  t = clamp01(t);
  return t * t;
}

export function quadOut(t: number): number {
  t = clamp01(t);
  return -t * (t - 2);
}

export function quadInOut(t: number): number {
  t = clamp01(t);
  if (t < 0.5) {
    return 2 * t * t;
  } else {
    return -2 * t * t + 4 * t - 1;
  }
}

//Cubic
export function cubIn(t: number): number {
  t = clamp01(t);
  return t * t * t;
}

export function cubOut(t: number): number {
  t = clamp01(t);
  const f = t - 1;
  return f * f * f + 1;
}

export function cubInOut(t: number): number {
  t = clamp01(t);
  if (t < 0.5) {
    return 4 * t * t * t;
  } else {
    const f = 2 * t - 2;
    return 0.5 * f * f * f + 1;
  }
}

//Quartic
export function quartIn(t: number): number {
  t = clamp01(t);
  return t * t * t * t;
}

export function quartOut(t: number): number {
  t = clamp01(t);
  const f: number = t - 1;
  return f * f * f * (1 - t) + 1;
}

export function quartInOut(t: number): number {
  t = clamp01(t);
  if (t < 0.5) {
    return 8 * t * t * t * t;
  } else {
    const f: number = t - 1;
    return -8 * f * f * f * f + 1;
  }
}

//Exponential
export function expoIn(t: number): number {
  t = clamp01(t);
  return t === 0.0 ? t : Math.pow(2, 10 * (t - 1));
}

export function expoOut(t: number): number {
  t = clamp01(t);
  return t === 1.0 ? t : 1 - Math.pow(2, -10 * t);
}

export function expoInOut(t: number): number {
  t = clamp01(t);
  if (t === 0.0 || t === 1.0) {
    return t;
  } else if (t < 0.5) {
    return 0.5 * Math.pow(2, 20 * t - 10);
  } else {
    return -0.5 * Math.pow(2, 10 - t * 20) + 1;
  }
}

//Back
export function backIn(t: number): number {
  t = clamp01(t);
  return t * t * t - t * Math.sin(t * PI);
}

export function backOut(t: number): number {
  t = clamp01(t);
  const f: number = 1 - t;
  return 1 - (f * f * f - f * Math.sin(f * PI));
}

export function backInOut(t: number): number {
  t = clamp01(t);
  if (t < 0.5) {
    const f: number = 2 * t;
    return 0.5 * (f * f * f - f * Math.sin(f * PI));
  } else {
    const f: number = 1 - (2 * t - 1);
    return 0.5 * (1 - (f * f * f - f * Math.sin(f * PI))) + 0.5;
  }
}

//Elastic
export function elasticIn(t: number): number {
  t = clamp01(t);
  return Math.sin((13 * t * PI) / 2) * Math.pow(2, 10 * (t - 1));
}

export function elasticOut(t: number): number {
  t = clamp01(t);
  return Math.sin((-13 * (t + 1) * PI) / 2) * Math.pow(2, -10 * t) + 1;
}

export function elasticInOut(t: number): number {
  t = clamp01(t);
  if (t < 0.5) {
    return 0.5 * Math.sin(((13 * PI) / 2) * 2 * t) * Math.pow(2, 10 * (2 * t - 1));
  } else {
    return 0.5 * Math.sin(((-13 * PI) / 2) * (2 * t - 1 + 1)) * Math.pow(2, -10 * (2 * t - 1)) + 1;
  }
}

//Bounce
export function bounceIn(t: number): number {
  t = clamp01(t);
  return 1 - bounceOut(1 - t);
}

export function bounceOut(t: number): number {
  t = clamp01(t);
  const a = 4 / 11;
  const b = 8 / 11;
  const c = 9 / 10;

  const ca = 4356 / 361;
  const cb = 35442 / 1805;
  const cc = 16061 / 1805;

  const t2 = t * t;

  return t < a
    ? 7.5625 * t2
    : t < b
    ? 9.075 * t2 - 9.9 * t + 3.4
    : t < c
    ? ca * t2 - cb * t + cc
    : 10.8 * t * t - 20.52 * t + 10.72;
}

export function bounceInOut(t: number): number {
  t = clamp01(t);
  return t < 0.5 ? 0.5 * (1 - bounceOut(1 - t * 2)) : 0.5 * bounceOut(t * 2 - 1) + 0.5;
}
