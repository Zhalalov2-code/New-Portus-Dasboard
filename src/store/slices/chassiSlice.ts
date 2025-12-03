import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChassiItem{
    id_chasi: number,
    chassi_nummer: string,
    tuf: string,
    esp: string,
}

interface ChassiState{
    items: ChassiItem[];
    loading: boolean;
    error: string | null;
}

const initialState: ChassiState = {
    items: [],
    loading: false,
    error: null,
};

const chassiSlice = createSlice({
    name: 'chassi',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setChassiItems: (state, action: PayloadAction<ChassiItem[]>) => {
            state.items = action.payload;
        },
        addChassiItem: (state, action: PayloadAction<ChassiItem>) => {
            state.items.push(action.payload);
        },
        updateChassiItem: (state, action: PayloadAction<ChassiItem>) => {
            const index = state.items.findIndex(item => item.id_chasi === action.payload.id_chasi);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        removeChassiItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id_chasi !== action.payload);
        },
    }
})

export const{
    setLoading,
    setError,
    setChassiItems,
    addChassiItem,
    updateChassiItem,
    removeChassiItem
} = chassiSlice.actions;

export default chassiSlice.reducer;

