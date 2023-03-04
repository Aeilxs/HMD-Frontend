import smokeReducer, { SmokeState } from '../../../reducers/dashboard/smoke/smokeSlice';

describe('smoke reducer test suite', () => {
  const initialState: SmokeState = {
    id:null,
    date: 'Wed, 16 Jul 1998 22:00:00 GMT',
    quantity: 2,
  };

  it('should handle initial state', () => {
    expect(smokeReducer(initialState, { type: 'unknown' })).toEqual({
      id:null,
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
