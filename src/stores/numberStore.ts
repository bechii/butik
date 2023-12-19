import { Store } from './store';

export class NumberStore extends Store<number> {
  public min?: number;
  public max?: number;

  constructor(value: number, min?: number, max?: number) {
    super(value);
    this.min = min;
    this.max = max;
  }

  protected validate(newValue: number): number {
    if (this.min != null && newValue < this.min) {
      return this.min;
    }
    if (this.max != null && newValue > this.max) {
      return this.max;
    }
    return newValue;
  }

  public add(amount: number): void {
    this.set(this._value + amount);
  }
}
