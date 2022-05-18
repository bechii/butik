import { Store } from './store';

export class BooleanStore extends Store<boolean> {
	public toggle(): void {
		this.value = !this._value;
	}
}
