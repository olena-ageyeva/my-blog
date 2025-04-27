import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Initial state
const initialState = {
  navigation: {
    isNavigatingFromBlog: false,
    currentPath: null,
    previousPath: null,
    showNavAnimation: true, // Add this new state
  },
  ui: {
    isPanelOpen: false,
    isDarkMode: false,
    showAnimation: false,
  },
  blog: {
    currentPost: null,
    searchQuery: '',
    filterOptions: {},
  }
};

// Action types
export const ACTIONS = {
  SET_NAVIGATION: 'SET_NAVIGATION',
  SET_NAV_ANIMATION: 'SET_NAV_ANIMATION', // Add this new action type
  TOGGLE_PANEL: 'TOGGLE_PANEL',
  SET_DARK_MODE: 'SET_DARK_MODE',
  SET_ANIMATION: 'SET_ANIMATION',
  SET_BLOG_STATE: 'SET_BLOG_STATE',
  RESET_STATE: 'RESET_STATE',
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_NAVIGATION:
      return {
        ...state,
        navigation: {
          ...state.navigation,
          ...action.payload,
        },
      };
    case ACTIONS.SET_NAV_ANIMATION: // Add this new case
      return {
        ...state,
        navigation: {
          ...state.navigation,
          showNavAnimation: action.payload,
        },
      };
    case ACTIONS.TOGGLE_PANEL:
      return {
        ...state,
        ui: {
          ...state.ui,
          isPanelOpen: action.payload ?? !state.ui.isPanelOpen,
        },
      };
    case ACTIONS.SET_DARK_MODE:
      return {
        ...state,
        ui: {
          ...state.ui,
          isDarkMode: action.payload,
        },
      };
    case ACTIONS.SET_ANIMATION:
      return {
        ...state,
        ui: {
          ...state.ui,
          showAnimation: action.payload,
        },
      };
    case ACTIONS.SET_BLOG_STATE:
      return {
        ...state,
        blog: {
          ...state.blog,
          ...action.payload,
        },
      };
    case ACTIONS.RESET_STATE:
      return {
        ...initialState,
        ...action.payload,
      };
    default:
      return state;
  }
}

// Context
const GlobalContext = createContext(null);

// Provider component
export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Action creators
  const actions = {
    setNavigation: useCallback((navigationData) => {
      dispatch({ type: ACTIONS.SET_NAVIGATION, payload: navigationData });
    }, []),

    setNavAnimation: useCallback((show) => { // Add this new action
      dispatch({ type: ACTIONS.SET_NAV_ANIMATION, payload: show });
    }, []),

    togglePanel: useCallback((value) => {
      dispatch({ type: ACTIONS.TOGGLE_PANEL, payload: value });
      // Also update body class
      if (typeof document !== 'undefined') {
        document.body.classList.toggle('show-nav', value);
      }
    }, []),

    setDarkMode: useCallback((isDark) => {
      dispatch({ type: ACTIONS.SET_DARK_MODE, payload: isDark });
    }, []),

    setAnimation: useCallback((show) => {
      dispatch({ type: ACTIONS.SET_ANIMATION, payload: show });
    }, []),

    setBlogState: useCallback((blogData) => {
      dispatch({ type: ACTIONS.SET_BLOG_STATE, payload: blogData });
    }, []),

    resetState: useCallback((keepData = {}) => {
      dispatch({ type: ACTIONS.RESET_STATE, payload: keepData });
    }, []),
  };

  return (
    <GlobalContext.Provider value={{ state, ...actions }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Custom hook
export function useGlobalState() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalProvider');
  }
  return context;
}
