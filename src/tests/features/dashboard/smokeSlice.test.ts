import smokeReducer, { SmokeState } from '../../../features/dashboard/smokeSlice';

describe('smoke reducer test suite', () => {
  const initialState: SmokeState = {
    date: 'Wed, 16 Jul 1998 22:00:00 GMT',
    quantity: 2,
  };

  it('should handle initial state', () => {
    expect(smokeReducer(initialState, { type: 'unknown' })).toEqual({
      date: 'Wed, 16 Jul 1998 22:00:00 GMT',
      quantity: 2,
    });
  });

  it('should change date', () => {
    // todo
  });

  it('should change quantity', () => {
    // todo
  });
});
