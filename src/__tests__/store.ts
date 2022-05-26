import { Store } from '../stores';

describe('Store', () => {
  const store = new Store(0);

  it('Can set value', () => {
    expect(store.value).toBe(0);
    store.set(5);
    expect(store.value).toBe(5);
  });

  it('Dispatch changes', () => {
    let dispatches: number = 0;
    store.subscribe(() => {
      dispatches++;
    });

    expect(dispatches).toBe(1);
    store.set(0);
    expect(dispatches).toBe(2);
  });
});
