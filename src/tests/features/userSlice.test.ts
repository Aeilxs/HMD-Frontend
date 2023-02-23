import userReducer, { UserState } from '../../features/user/userSlice';

describe('user reducer test suite', () => {
  const initialState: UserState = {
    isLogged: false,
    dateOfBirth: '',
  };

  it('should handle initial state', () => {
    expect(userReducer(initialState, { type: 'unknown' })).toEqual({
      isLogged: false,
      dateOfBirth: '',
    });
  });
});
