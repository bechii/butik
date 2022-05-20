import { NumberStore } from '../stores';

describe('NumberStore', () => {
  it('Can add a number', () => {
    const store = new NumberStore(0);
    expect(store.value).toBe(0);
    store.add(4);
    store.add(2);
    expect(store.value).toBe(6);
  });

  it('Can clamp between two values', () => {
    const store = new NumberStore(3, 0, 10);
    expect(store.value).toBe(3);
    store.add(-10);
    expect(store.value).toBe(0);
    store.add(20);
    expect(store.value).toBe(10);
  });
});
