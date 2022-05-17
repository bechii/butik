export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(min, value), max);
}

export function clamp01(value: number): number {
	return clamp(value, 0, 1);
}

export function lerp(a: number, b: number, t: number): number {
	return (1 - t) * a + t * b;
}
