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
    expect(store.value.num).toBe(10);
    expect(store.value.str).toBe('Object');
    expect(store.value.bool).toBe(true);

    store.patch({
      num: 20,
      bool: false
    });

    expect(store.value.num).toBe(20);
    expect(store.value.str).toBe('Object');
    expect(store.value.bool).toBe(false);
  });
});
