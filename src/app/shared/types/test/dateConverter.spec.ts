import { DateConverter } from '../dateConverter';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

describe('dateConverter', () => {
  const dateConverter = new DateConverter();
  const dateObject = { year: 2021, month: 6, day: 12 };
  const dateString = '12.6.2021';

  it('should return random string Date in right format', () => {
    expect(dateConverter.format(dateObject)).toBe(dateString);
  });

  it('should return random string Date in right format', () => {
    expect(
      NgbDate.from(dateConverter.parse(dateString))?.equals(dateObject),
    ).toBeTrue();
  });
});
