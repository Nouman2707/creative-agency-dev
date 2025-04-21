import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Language slice
interface LanguageState {
  language: 'en' | 'ar';
}

const initialLanguageState: LanguageState = {
  language: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState: initialLanguageState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'en' | 'ar'>) => {
      state.language = action.payload;
    },
  },
});

// Search slice
interface SearchState {
  query: string;
}

const initialSearchState: SearchState = {
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

// Configure store
export const store = configureStore({
  reducer: {
    language: languageSlice.reducer,
    search: searchSlice.reducer,
  },
});

// Export actions
export const { setLanguage } = languageSlice.actions;
export const { setSearchQuery } = searchSlice.actions;

// Export selectors
export const selectLanguage = (state: RootState) => state.language.language;
export const selectSearchQuery = (state: RootState) => state.search.query;

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
