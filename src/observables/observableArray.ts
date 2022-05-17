import { Observable } from './observable';

type Predicate<T> = ((item: T) => boolean);

export class ObservableArray<T> extends Observable<T[]> {
	public add(item: T): void {
		this.value = [...this._value, item];
	}

	public remove(item: T | Predicate<T>): void {
		if (typeof item === 'function') {
			const predicate = item as Predicate<T>;
			this.value = this._value.filter(predicate);
		} else {
			this.value = this._value.filter((x) => x !== item);
		}
	}

	public toggle(item: T): void {
		if (this.has(item)) {
			this.remove(item);
		} else {
			this.add(item);
		}
	}

	public has(item: T | Predicate<T>): boolean {
		if (typeof item === 'function') {
			const predicate = item as Predicate<T>;
			return this._value.some((x) => predicate(x));
		} else {
			return this._value.includes(item);
		}
	}
}
