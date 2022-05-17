import { Observable } from './observable';

export class ObservableObject<T extends object> extends Observable<T> {
	public patch(partial: Partial<T>): void {
		this.value = Object.assign({}, this._value, partial);
	}
}
