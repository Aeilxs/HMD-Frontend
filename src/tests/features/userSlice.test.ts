import userReducer, { UserState } from '../../reducers/user/userSlice';

describe('user reducer test suite', () => {
  const initialState: UserState = {
    firstname:'',
    gender: '',
    isLogged: false,
    token: '',
    properties: [],
    medicalTreatments: [],
    cigarettes: [],
    caloricAlimentations: [],
    hydratations: [],
    activities: [],
    sleeps: [],
  };

  it('should handle initial state', () => {
    expect(userReducer(initialState, { type: 'unknown' })).toEqual({
      firstname:'',
      gender: '',
      isLogged: false,
      token: '',
      properties: [],
      medicalTreatments: [],
      cigarettes: [],
      caloricAlimentations: [],
      hydratations: [],
      activities: [],
      sleeps: [],
    });
  });
});
