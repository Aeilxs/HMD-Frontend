import userReducer, { UserState } from '../../reducers/user/userSlice';

describe('user reducer test suite', () => {
  const initialState: UserState = {
    isLogged: false,
    token: '',
    properties: [],
    medicalTreatments: [],
    cigarettes: [],
    caloricAlimentation: [],
    hydratations: [],
    activities: [],
    sleeps: [],
  };

  it('should handle initial state', () => {
    expect(userReducer(initialState, { type: 'unknown' })).toEqual({
      isLogged: false,
      token: '',
      properties: [],
      medicalTreatments: [],
      cigarettes: [],
      caloricAlimentation: [],
      hydratations: [],
      activities: [],
      sleeps: [],
    });
  });
});
