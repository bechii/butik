import { Store } from './store';

export class NumberStore extends Store<number> {
	public min: number | undefined;
	public max: number | undefined;

  constructor(value: number, min: number | undefined = undefined, max: number | undefined = undefined) {
		super(value);
		this.min = min;
		this.max = max;
	}

  protected validateChange(newValue: number): number {
    if (this.min != null && newValue < this.min) {
      return this.min;
    }
    if (this.max != null && newValue > this.max) {
      return this.min;
    }
    return newValue;
	}

  public add(amount: number): void {
		this.value += amount;
	}
}
