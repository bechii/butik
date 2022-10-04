import { EaseMethod, cubInOut, interpolate } from '../lib/easing';
import { Store } from './store';
import { FrameTimer } from '../lib/frameTimer';

export class Tween extends Store<number> {
  public duration: number;
  public easeMethod: EaseMethod;
  private readonly _timer: FrameTimer;
  private _tweening: boolean;

  constructor(value: number = 0, duration: number = 1000, easeMethod: EaseMethod = cubInOut) {
    super(value);
    this.duration = duration;
    this.easeMethod = easeMethod;
    this._timer = new FrameTimer();
    this._tweening = false;
  }

  protected validate(newValue: number): number {
    if (this._tweening) {
      this.stop();
    }
    return newValue;
  }

  public start(targetValue: number, onDone?: () => void): void {
    this.stop();
    this._tweening = true;
    const initialValue: number = this._value;
    this._timer.start(this.duration, (progress: number) => {
      const t: number = progress / this.duration;
      this.set(interpolate(initialValue, targetValue, this.easeMethod, t));

      if (t === 1) {
        this._tweening = false;
        if (onDone != null) {
          onDone();
        }
      }
    });
  }

  public stop(): void {
    this._timer.stop();
    this._tweening = false;
  }
}
