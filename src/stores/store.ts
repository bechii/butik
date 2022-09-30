import { TypedEvent } from '../lib/typedEvent';
import type { EventCallback } from '../lib/typedEvent';

export interface IReadonlyStore<T> {
  get(): Readonly<T>;
  subscribe(callback: EventCallback<T>): () => void;
}

export interface IStore<T> extends IReadonlyStore<T> {
  set(value: T): void;
  update(updater: (value: T) => T): void;
}

export class Store<T> implements IStore<T> {
	protected _value: T;
	protected _changed: TypedEvent<T>;

  constructor(value: T = undefined) {
		this._value = this.validate(value);
		this._changed = new TypedEvent<T>();
	}

  protected validate(newValue: T): T {
		return newValue;
	}

  protected dispatch(): void {
    this._changed.dispatch(this._value);
  }

  public get(): Readonly<T> {
    return this._value as Readonly<T>;
  }

	public set(value: T): void {
		const newValue = this.validate(value);
		if (this._value !== newValue) {
			this._value = newValue;
			this.dispatch();
		}
	}

  public update(updater: (value: T) => T): void {
    this.set(updater(this._value));
  }

	public subscribe(callback: EventCallback<T>): (() => void) {
		this._changed.addEventListener(callback);
		callback(this._value);
		return (): void => this._changed.removeEventListener(callback);
	}
}
