import { EventCallback, TypedEvent } from '../lib/typedEvent';
import { IStore } from './store';

export type DeriveFunc<IN, OUT> = (value: IN) => OUT;

export class DerivedStore<IN, OUT> implements IStore<OUT> {
  private _value: OUT;
	private _changed: TypedEvent<OUT>;

  public get value(): OUT {
		return this._value;
	}

  constructor(store: IStore<IN>, derive: DeriveFunc<IN, OUT>) {
    this._changed = new TypedEvent<OUT>();
    store.subscribe((v) => {
      this._value = derive(v);
      this._changed.dispatch(this._value);
    });
	}

  public subscribe(callback: EventCallback<OUT>): (() => void) {
		this._changed.addEventListener(callback);
		callback(this._value);
		return (): void => this._changed.removeEventListener(callback);
	}
}
