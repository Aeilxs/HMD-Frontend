export {};
// import uiReducer, {
//   UIState,
//   toggleTheme,
//   toggleForm,
//   toggleDrawer,
//     selectDate,
//   setGender,
// } from '../../../reducers/UI/uiSlice';

// describe('UI reducer test suites', () => {
//   const initialState: UIState = {
//     isDark: true,
//     isEdit: false,
//     errors: { login: null, registration: null },
//     isRegistered: false,
//     isDrawerOpen: false,
//     user: {
//       firstname: '',
//       lastname: '',
//       email: '',
//       password: '',
//       gender: 'Homme',
//     },
//   };

//   it('should handle initial state', () => {
//     expect(uiReducer(initialState, { type: 'unknown' })).toEqual(initialState);
//   });

//   it('should handle toggle theme', () => {
//     const actual = uiReducer(initialState, toggleTheme());
//     expect(actual.isDark).toBe(false);
//   });

//   it('should handle toggle form', () => {
//     const actual = uiReducer(initialState, toggleForm(false));
//     expect(actual.isRegistered).toBe(false);
//   });

//   it('should handle toggle drawer', () => {
//     const actual = uiReducer(initialState, toggleDrawer());
//     expect(actual.isDrawerOpen).toBe(true);
//   });

//   it('should handle change event on first firstname textfield', () => {
//     const newState = uiReducer(initialState,   selectDate,
//   setDate,
// ({ value: 'john', name: 'firstname' }));
//     const expectedState = { ...initialState, user: { ...initialState.user, firstname: 'john' } };
//     expect(newState).toEqual(expectedState);
//   });

//   it('should handle change event on first name textfield', () => {
//     const newState = uiReducer(initialState,   selectDate,
//   setDate,
// ({ value: 'doe', name: 'name' }));
//     const expectedState = { ...initialState, user: { ...initialState.user, name: 'doe' } };
//     expect(newState).toEqual(expectedState);
//   });

//   it('should handle change event on first email textfield', () => {
//     const newState = uiReducer(initialState,   selectDate,
//   setDate,
// ({ value: 'john.doe@gmail.com', name: 'email' }));
//     const expectedState = { ...initialState, user: { ...initialState.user, email: 'john.doe@gmail.com' } };
//     expect(newState).toEqual(expectedState);
//   });

//   it('should handle change event on first password textfield', () => {
//     const newState = uiReducer(initialState,   selectDate,
//   setDate,
// ({ value: 'johnSecurePassword', name: 'password' }));
//     const expectedState = { ...initialState, user: { ...initialState.user, password: 'johnSecurePassword' } };
//     expect(newState).toEqual(expectedState);
//   });

//   it('should handle change gender with setGender action', () => {
//     const test = uiReducer(initialState, setGender('Homme'));
//     expect(test.user.gender).toBe('Homme');
//     const test2 = uiReducer(initialState, setGender('Femme'));
//     expect(test2.user.gender).toBe('Femme');
//   });
// });
