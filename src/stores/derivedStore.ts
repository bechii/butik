import { EventListener, TypedEvent } from '../lib/typedEvent';
import { IReadable, ISubscribable } from './store';

export class DerivedStore<T, U> implements ISubscribable<U>, IReadable<U> {
  private _value: U;
  private _changed: TypedEvent<U>;

  constructor(store: ISubscribable<T>, derive: (value: T) => U) {
    this._changed = new TypedEvent<U>();
    store.subscribe((v) => {
      this._value = derive(v);
      this._changed.dispatch(this._value);
    });
  }

  public get(): Readonly<U> {
    return this._value as Readonly<U>;
  }

  public subscribe(callback: EventListener<U>): () => void {
    this._changed.addEventListener(callback);
    callback(this._value);
    return () => this._changed.removeEventListener(callback);
  }
}
