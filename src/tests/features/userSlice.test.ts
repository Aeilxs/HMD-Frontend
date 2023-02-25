import userReducer, { UserState } from '../../reducers/user/userSlice';

describe('user reducer test suite', () => {
  const initialState: UserState = {
    isLogged: false,
    dateOfBirth: '',
    age: 0,
    height: 0,
    weight: 0,
  };

  it('should handle initial state', () => {
    expect(userReducer(initialState, { type: 'unknown' })).toEqual({
      isLogged: false,
      dateOfBirth: '',
      age: 0,
      height: 0,
      weight: 0,
    });
  });
});
