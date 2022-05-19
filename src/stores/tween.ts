import { EaseMethod, cubInOut, interpolate } from '../lib/easing';
import { Store } from './store';
import { FrameTimer } from '../lib/frameTimer';
import { Signal, ISignal } from '../lib/typedEvent';

export class Tween extends Store<number> {
	public duration: number;
	public easeMethod: EaseMethod;
	private readonly _timer: FrameTimer;
	private readonly _finished: Signal;

	public get finished(): ISignal {
		return this._finished;
	}

	constructor(value: number = 0, duration: number = 1000, easeMethod: EaseMethod = cubInOut) {
		super(value);
		this.duration = duration;
		this.easeMethod = easeMethod;
		this._timer = new FrameTimer();
		this._finished = new Signal();
	}

	protected validate(newValue: number): number {
		this.stop();
		return newValue;
	}

	public start(targetValue: number): void {
		this.stop();
		const initialValue: number = this._value;
		this._timer.start(this.duration, (progress: number) => {
			const t: number = progress / this.duration;
			this.value = interpolate(initialValue, targetValue, this.easeMethod, t);

			if (t === 1) {
				this._finished.dispatch();
			}
		});
	}

	public stop(): void {
		this._timer.stop();
	}
}
