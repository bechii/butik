import { TypedEvent } from '../lib/typedEvent';

describe('TypedEvent', () => {
  it('Can dispatch and be listened to', () => {
    const typedEvent = new TypedEvent<number>();
    typedEvent.addEventListener((value) => {
      expect(value).toBe(10);
    });
    typedEvent.dispatch(10);
  });

  it('Can remove listener', () => {
    const typedEvent = new TypedEvent<number>();
    let container: number = 0;

    function callback(value: number): void {
      container = value;
    }
    typedEvent.addEventListener(callback);

    typedEvent.dispatch(10);
    expect(container).toBe(10);

    typedEvent.removeEventListener(callback);
    typedEvent.dispatch(20);
    expect(container).toBe(10);
  });
});
