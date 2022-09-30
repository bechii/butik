import { BooleanStore } from '../stores';

describe('BooleanStore', () => {
  const store = new BooleanStore(false);

  it('Can toggle value', () => {
    expect(store.get()).toBe(false);
    store.toggle();
    expect(store.get()).toBe(true);
    store.toggle();
    expect(store.get()).toBe(false);
  });
});
