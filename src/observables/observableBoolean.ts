import { Observable } from './observable';

export class ObservableBoolean extends Observable<boolean> {
	public toggle(): void {
		this.value = !this._value;
	}
}
