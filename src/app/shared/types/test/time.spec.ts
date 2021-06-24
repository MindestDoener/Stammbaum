import { Time } from '../time';

describe('Time', () => {

  const time = new Time(10, 35);
  const timeWithSeconds = new Time(10, 35, 27);

  describe('equals', () => {

    it('should return true when time is equal', () => {
      expect(time.equals(new Time(10,35))).toBeTrue();
      expect(timeWithSeconds.equals(new Time(10,35,27))).toBeTrue();
    });

    it('should return false when time is unequal', () => {
      expect(time.equals(new Time(12,12))).toBeFalse();
      expect(timeWithSeconds.equals(new Time(10,35,12))).toBeFalse();
    });
  });

  describe('before', () => {

    it('should return true when time is before another', () => {
      expect(time.before(new Time(10,48))).toBeTrue();
      expect(timeWithSeconds.before(new Time(10,35,55))).toBeTrue();
    });

    it('should return false when time is after another', () => {
      expect(time.before(new Time(9,12))).toBeFalse();
      expect(timeWithSeconds.before(new Time(10,35,12))).toBeFalse();
    });

    it('should return false when time equals another', () => {
      expect(time.before(new Time(10,35))).toBeFalse();
      expect(timeWithSeconds.before(new Time(10,35,27))).toBeFalse();
    });
  });

  describe('after', () => {

    it('should return true when time is after another', () => {
      expect(time.after(new Time(10,10))).toBeTrue();
      expect(timeWithSeconds.after(new Time(10,35,12))).toBeTrue();
    });

    it('should return false when time is before another', () => {
      expect(time.after(new Time(12,12))).toBeFalse();
      expect(timeWithSeconds.after(new Time(10,35,55))).toBeFalse();
    });

    it('should return false when time equals another', () => {
      expect(time.after(new Time(10,35))).toBeFalse();
      expect(timeWithSeconds.after(new Time(10,35,27))).toBeFalse();
    });
  });
});
