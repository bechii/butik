export type EventListener<T> = (value: T) => void;

export interface ITypedEvent<T> {
  addEventListener(listener: EventListener<T>): void;
  removeEventListener(listener: EventListener<T>): void;
}

export class TypedEvent<T> implements ITypedEvent<T> {
  private readonly listeners: Set<EventListener<T>>;

  constructor() {
    this.listeners = new Set();
  }

  public addEventListener(listener: EventListener<T>): void {
    this.listeners.add(listener);
  }

  public removeEventListener(listener: EventListener<T>): void {
    this.listeners.delete(listener);
  }

  public dispatch(value: T): void {
    const listenerArray = Array.from(this.listeners.values());
    for (const listener of listenerArray) {
      listener(value);
    }
  }
}

export interface ISignal extends ITypedEvent<void> {}
export class Signal extends TypedEvent<void> implements ISignal {}
