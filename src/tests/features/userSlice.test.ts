import userReducer, { UserState } from '../../reducers/user/userSlice';

describe('user reducer test suite', () => {
  const initialState: UserState = {
    firstname:'',
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
      firstname:'',
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
