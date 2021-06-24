import { makeUUID } from '../uuid';

describe('makeUuid', () => {
  it('should return random id of length 10', () => {
    expect(makeUUID().toString()).toHaveSize(10);
  });
});
