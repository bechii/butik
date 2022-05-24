import { EaseMethod, cubInOut, interpolate } from '../lib/easing';
import { Store } from './store';
import { FrameTimer } from '../lib/frameTimer';

export class Tween extends Store<number> {
	public duration: number;
	public easeMethod: EaseMethod;
	private readonly _timer: FrameTimer;

	constructor(value: number = 0, duration: number = 1000, easeMethod: EaseMethod = cubInOut) {
		super(value);
		this.duration = duration;
		this.easeMethod = easeMethod;
		this._timer = new FrameTimer();
	}

	protected validate(newValue: number): number {
		this.stop();
		return newValue;
	}

	public start(targetValue: number, onDone?: () => void): void {
		this.stop();
		const initialValue: number = this._value;
		this._timer.start(this.duration, (progress: number) => {
			const t: number = progress / this.duration;
			this.value = interpolate(initialValue, targetValue, this.easeMethod, t);

			if (t === 1 && onDone != null) {
				onDone();
			}
		});
	}

	public stop(): void {
		this._timer.stop();
	}
}
