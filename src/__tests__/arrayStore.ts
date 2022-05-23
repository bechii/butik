import { ArrayStore } from '../stores';

describe('ArrayStore', () => {
  const store = new ArrayStore<string>([]);

  it('Can add one item', () => {
    expect(store.count()).toBe(0);
    store.add('item');
    expect(store.count()).toBe(1);
    expect(store.value[0]).toBe('item');
  });

  it('Can remove one item', () => {
    expect(store.count()).toBe(1);
    store.remove('item');
    expect(store.count()).toBe(0);
  });

  it('Can add multiple items', () => {
    expect(store.count()).toBe(0);
    store.add(['item_one', 'item_two', 'item_three']);
    expect(store.count()).toBe(3);
  });

  it('Can remove multiple items', () => {
    expect(store.count()).toBe(3);
    store.remove(['item_two', 'item_three']);
    expect(store.count()).toBe(1);
  });

  it('Can remove items with predicate', () => {
    expect(store.count()).toBe(1);
    store.add('a');
    store.remove((x) => x.length > 1);
    expect(store.count()).toBe(1);
    expect(store.value[0]).toBe('a');
  });

  it('Can toggle an item', () => {
    expect(store.count()).toBe(1);
    expect(store.value[0]).toBe('a');
    store.toggle('a');
    expect(store.count()).toBe(0);
    store.toggle('a');
    expect(store.count()).toBe(1);
    expect(store.value[0]).toBe('a');
  });

  it('Can check if item is in array', () => {
    expect(store.count()).toBe(1);
    expect(store.value[0]).toBe('a');
    expect(store.has('a')).toBe(true);
    expect(store.has('b')).toBe(false);
  });

  it('Can check if some items is in array with predicate', () => {
    store.set(['apple', 'banana', 'grape']);
    expect(store.has((x) => x.length < 5)).toBe(false);
    expect(store.has((x) => x.length > 5)).toBe(true);
  });
});
