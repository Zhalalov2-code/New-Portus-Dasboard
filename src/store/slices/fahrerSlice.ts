import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FahrerItem {
    id_fahrer: number;
    email: string;
    name: string;
    lastname: string;
    lkw: string;
    chassi: string;
    phone: string;
}

interface FahrerState {
    items: FahrerItem[];
    loading: boolean;
    error: string | null;
}

const initialState: FahrerState = {
    items: [],
    loading: false,
    error: null,
}

const fahrerSlice = createSlice({
    name: 'fahrer',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setFahrerItems: (state, action: PayloadAction<FahrerItem[]>) => {
            state.items = action.payload;
        },
        addFahrerItem: (state, action: PayloadAction<FahrerItem>) => {
            state.items.push(action.payload);
        },
        updateFahrerItem: (state, action: PayloadAction<FahrerItem>) => {
            const index = state.items.findIndex(item => item.id_fahrer === action.payload.id_fahrer);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        removeFahrerItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id_fahrer !== action.payload);
        },  
    }
})

export const {
    setLoading,
    setError,
    setFahrerItems,
    addFahrerItem,
    updateFahrerItem,
    removeFahrerItem
} = fahrerSlice.actions;

export default fahrerSlice.reducer;