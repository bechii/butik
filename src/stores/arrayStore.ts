import { Store } from './store';

export type Predicate<T> = (value: T) => boolean;

export class ArrayStore<T> extends Store<T[]> {
  public get(): ReadonlyArray<T> {
    return this._value as ReadonlyArray<T>;
  }

  public count(): number {
    return this._value.length;
  }

  public has(arg: T | Predicate<T>): boolean {
    if (typeof arg === 'function') {
      const predicate = arg as Predicate<T>;
      return this._value.some((x) => predicate(x));
    } else {
      return this._value.includes(arg);
    }
  }

  public add(arg: T | T[]): void {
    if (Array.isArray(arg)) {
      this.set([...this._value, ...arg]);
    } else {
      this.set([...this._value, arg]);
    }
  }

  public remove(arg: T | T[] | Predicate<T>): void {
    if (typeof arg === 'function') {
      const predicate = arg as Predicate<T>;
      this.set(this._value.filter((x) => !predicate(x)));
    } else if (Array.isArray(arg)) {
      this.set(this._value.filter((x) => !arg.includes(x)));
    } else {
      this.set(this._value.filter((x) => x !== arg));
    }
  }

  public toggle(item: T): void {
    if (this.has(item)) {
      this.remove(item);
    } else {
      this.add(item);
    }
  }
}
