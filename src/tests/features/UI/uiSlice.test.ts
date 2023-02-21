import uiReducer, { UIState, toggleTheme } from '../../../features/UI/uiSlice';

describe('UI reducer test suites', () => {
  const initialState: UIState = {
    isDark: true,
  };

  it('should handle initial state', () => {
    expect(uiReducer(undefined, { type: 'unknown' })).toEqual({
      isDark: true,
    });
  });

  it('should handle toggle theme', () => {
    const actual = uiReducer(initialState, toggleTheme());
    expect(actual.isDark).toBe(false);
  });
});
