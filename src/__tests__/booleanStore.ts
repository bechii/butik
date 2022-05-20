import { BooleanStore } from '../stores';

describe('BooleanStore', () => {
  const store = new BooleanStore(false);

  it('Can toggle value', () => {
    expect(store.value).toBe(false);
    store.toggle();
    expect(store.value).toBe(true);
    store.toggle();
    expect(store.value).toBe(false);
  });
});
