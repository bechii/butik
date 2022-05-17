import { Observable } from './observable';

export class ObservableNumber extends Observable<number> {
	public add(amount: number): void {
		this.value += amount;
	}
}
