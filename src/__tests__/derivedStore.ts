import { DerivedStore, Store } from '../stores';

describe('DerivedStore', () => {
  const fromStore = new Store<number>(0);
  const store = new DerivedStore(fromStore, (value) => {
    return value * 2;
  });

  it('Can derive value from other store', () => {
    expect(fromStore.get()).toBe(0);
    expect(store.get()).toBe(0);
    fromStore.set(5);
    expect(fromStore.get()).toBe(5);
    expect(store.get()).toBe(10);
  });

  it('Dispatch changes', () => {
    let dispatches: number = 0;
    store.subscribe(() => {
      dispatches++;
    });

    expect(dispatches).toBe(1);
    fromStore.set(10);
    expect(dispatches).toBe(2);
  });
});
