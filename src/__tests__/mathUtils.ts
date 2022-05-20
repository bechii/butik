import * as utils from '../lib/mathUtils';

describe('Math utilities', () => {
  it('Can clamp between two values', () => {
    expect(utils.clamp(5, 0, 10)).toBe(5);
    expect(utils.clamp(0, 5, 10)).toBe(5);
    expect(utils.clamp(20, 5, 10)).toBe(10);
  });

  it('Can clamp between 0 and 1', () => {
    expect(utils.clamp01(0.5)).toBe(0.5);
    expect(utils.clamp01(5)).toBe(1);
    expect(utils.clamp01(-5)).toBe(0);
  });

  it('Can lerp between two values', () => {
    expect(utils.lerp(50, 100, 0.5)).toBe(75);
  });
});
