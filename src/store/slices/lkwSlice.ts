import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LkwItem {
  id_lkw: number;
  lkw_number: string;
  tuf_date: string;
  tuf_status: string;
  sp_date: string;
  sp_status: string;
}

interface LkwState {
  items: LkwItem[];
  loading: boolean;
  error: string | null;
}

const initialState: LkwState = {
  items: [],
  loading: false,
  error: null,
};

const lkwSlice = createSlice({
  name: 'lkw',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLkwItems: (state, action: PayloadAction<LkwItem[]>) => {
      state.items = action.payload;
    },
    addLkwItem: (state, action: PayloadAction<LkwItem>) => {
      state.items.push(action.payload);
    },
    updateLkwItem: (state, action: PayloadAction<LkwItem>) => {
      const index = state.items.findIndex(item => item.id_lkw === action.payload.id_lkw);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeLkwItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id_lkw !== action.payload);
    },
  },
});

export const { 
  setLoading, 
  setError, 
  setLkwItems, 
  addLkwItem, 
  updateLkwItem, 
  removeLkwItem 
} = lkwSlice.actions;

export default lkwSlice.reducer;