import { TypedEvent } from '../lib/typedEvent';
import type { EventCallback } from '../lib/typedEvent';

export interface IObservable<T> {
	readonly value: T;
	subscribe(callback: EventCallback<T>): (() => void);
}

export class Observable<T> implements IObservable<T> {
	protected _value: T;
	protected _changed: TypedEvent<T>;

	public get value(): T {
		return this._value;
	}

	public set value(value: T) {
		const newValue = this.validateChange(value);
		if (this._value !== newValue) {
			this._value = newValue;
			this._changed.dispatch(newValue);
		}
	}

	public set(value: T): void {
		this.value = value;
	}

	public update(updater: (value: T) => T): void {
		this.value = updater(this._value);
	}

	protected validateChange(newValue: T): T {
		return newValue;
	}

	public subscribe(callback: EventCallback<T>): (() => void) {
		this._changed.addEventListener(callback);
		callback(this._value);
		return (): void => this._changed.removeEventListener(callback);
	}

	constructor(value: T) {
		this._value = this.validateChange(value);
		this._changed = new TypedEvent<T>();
	}
}
