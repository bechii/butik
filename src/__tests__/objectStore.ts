import { ObjectStore } from '../stores';

interface TestObject {
  num: number;
  str: string;
  bool: boolean;
}

describe('ObjectStore', () => {
  const object: TestObject = {
    num: 10,
    str: 'Object',
    bool: true
  };
  const store = new ObjectStore(object);

  it('Can patch object partially', () => {
    expect(store.get().num).toBe(10);
    expect(store.get().str).toBe('Object');
    expect(store.get().bool).toBe(true);

    store.patch({
      num: 20,
      bool: false
    });

    expect(store.get().num).toBe(20);
    expect(store.get().str).toBe('Object');
    expect(store.get().bool).toBe(false);
  });
});
