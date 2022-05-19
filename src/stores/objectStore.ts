import { Store } from './store';

export class ObjectStore<T extends object> extends Store<T> {
	public patch(partial: Partial<T>): void {
    this.value = { ...this._value, ...partial };
	}
}
