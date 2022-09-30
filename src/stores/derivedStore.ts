import { EventCallback, TypedEvent } from '../lib/typedEvent';
import { IReadonlyStore } from './store';

export type DeriveFunc<IN, OUT> = (value: IN) => OUT;

export class DerivedStore<IN, OUT> implements IReadonlyStore<OUT> {
  private _value: OUT;
	private _changed: TypedEvent<OUT>;

  constructor(store: IReadonlyStore<IN>, derive: DeriveFunc<IN, OUT>) {
    this._changed = new TypedEvent<OUT>();
    store.subscribe((v) => {
      this._value = derive(v);
      this._changed.dispatch(this._value);
    });
	}

  public get(): Readonly<OUT> {
    return this._value as Readonly<OUT>;
  }

  public subscribe(callback: EventCallback<OUT>): (() => void) {
		this._changed.addEventListener(callback);
		callback(this._value);
		return (): void => this._changed.removeEventListener(callback);
	}
}
