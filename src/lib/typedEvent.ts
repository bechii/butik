export type EventCallback<T> = (value: T) => void;

export interface ITypedEvent<T> {
  addEventListener(callback: EventCallback<T>): void;
  removeEventListener(callback: EventCallback<T>): void;
}

export class TypedEvent<T> implements ITypedEvent<T> {
  private readonly callbacks: Set<EventCallback<T>>;

  constructor() {
    this.callbacks = new Set();
  }

  public addEventListener(callback: EventCallback<T>): void {
    this.callbacks.add(callback);
  }

  public removeEventListener(callback: EventCallback<T>): void {
    this.callbacks.delete(callback);
  }

  public dispatch(value: T): void {
    const callbackArray = Array.from(this.callbacks.values());
    for (const callback of callbackArray) {
      callback(value);
    }
  }
}

export interface ISignal extends ITypedEvent<void> {}
export class Signal extends TypedEvent<void> implements ISignal {}
