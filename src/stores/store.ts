import { TypedEvent } from '../lib/typedEvent';
import type { EventCallback } from '../lib/typedEvent';

export interface IStore<T> {
	readonly value: T;
	subscribe(callback: EventCallback<T>): () => void;
}

export class Store<T> implements IStore<T> {
	protected _value: T;
	protected _changed: TypedEvent<T>;

	public get value(): T {
		return this._value;
	}

	public set value(value: T) {
		const newValue = this.validate(value);
		if (this._value !== newValue) {
			this._value = newValue;
			this.dispatch();
		}
	}

  constructor(value: T) {
		this._value = this.validate(value);
		this._changed = new TypedEvent<T>();
	}

  protected validate(newValue: T): T {
		return newValue;
	}

  protected dispatch(): void {
    this._changed.dispatch(this._value);
  }

	public set(value: T): void {
		this.value = value;
	}

	public subscribe(callback: EventCallback<T>): (() => void) {
		this._changed.addEventListener(callback);
		callback(this._value);
		return (): void => this._changed.removeEventListener(callback);
	}
}
