import { Store } from './store';

export class BooleanStore extends Store<boolean> {
	public toggle(): void {
		this.set(!this._value);
	}
}
