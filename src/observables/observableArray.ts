import { Observable } from './observable';

export type Predicate<T> = ((value: T) => boolean);

export class ObservableArray<T> extends Observable<T[]> {
	public add(arg: T | T[]): void {
    if (Array.isArray(arg)) {
      this.value = [...this._value, ...arg];
    } else {
      this.value = [...this._value, arg];
    }
	}

	public remove(arg: T | T[] | Predicate<T>): void {
		if (typeof arg === 'function') {
			const predicate = arg as Predicate<T>;
			this.value = this._value.filter(predicate);
		} else if (Array.isArray(arg)) {
			this.value = this._value.filter((x) => !arg.includes(x));
		} else {
			this.value = this._value.filter((x) => x !== arg);
    }
	}

	public toggle(item: T): void {
		if (this.has(item)) {
			this.remove(item);
		} else {
			this.add(item);
		}
	}

	public has(arg: T | Predicate<T>): boolean {
		if (typeof arg === 'function') {
			const predicate = arg as Predicate<T>;
			return this._value.some((x) => predicate(x));
		} else {
			return this._value.includes(arg);
		}
	}

  public count(): number {
    return this._value.length;
  }
}
