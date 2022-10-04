import { Store } from './store';

export class ObjectStore<T extends object> extends Store<T> {
  public patch(partial: Partial<T>): void {
    this.set({ ...this._value, ...partial });
  }
}
