import { TypedEvent } from '../lib/typedEvent';
import type { EventListener } from '../lib/typedEvent';

export interface ISubscribable<T> {
  subscribe(listener: EventListener<T>): () => void;
}

export interface IReadable<T> {
  get(): Readonly<T>;
}

export interface IWritable<T> {
  set(value: T): void;
  update(updater: (value: T) => T): void;
}

export interface IStore<T> extends ISubscribable<T>, IReadable<T>, IWritable<T> {}

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

  public subscribe(listener: EventListener<T>): () => void {
    this._changed.addEventListener(listener);
    listener(this._value);
    return () => this._changed.removeEventListener(listener);
  }
}
