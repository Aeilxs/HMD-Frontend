import uiReducer, {
  UIState,
  toggleTheme,
  toggleForm,
  toggleDrawer,
} from '../../../features/UI/uiSlice';

describe('UI reducer test suites', () => {
  const initialState: UIState = {
    isDark: true,
    isRegistered: true,
    isDrawerOpen: false,
  };

  it('should handle initial state', () => {
    expect(uiReducer(undefined, { type: 'unknown' })).toEqual({
      isDark: true,
      isRegistered: true,
      isDrawerOpen: false,
    });
  });

  it('should handle toggle theme', () => {
    const actual = uiReducer(initialState, toggleTheme());
    expect(actual.isDark).toBe(false);
  });

  it('should handle toggle form', () => {
    const actual = uiReducer(initialState, toggleForm());
    expect(actual.isRegistered).toBe(false);
  });

  it('should handle toggle drawer', () => {
    const actual = uiReducer(initialState, toggleDrawer());
    expect(actual.isDrawerOpen).toBe(true);
  });
});
