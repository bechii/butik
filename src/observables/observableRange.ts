import { ObservableNumber } from './observableNumber';
import { clamp } from '../lib/mathUtils';

export class ObservableRange extends ObservableNumber {
	public min: number;
	public max: number;

	protected validateChange(newValue: number): number {
		return clamp(newValue, this.min, this.max);
	}

	constructor(value: number, min: number, max: number) {
		super(value);
		this.min = min;
		this.max = max;
	}
}
