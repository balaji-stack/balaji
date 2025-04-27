import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface StateType{
    urlParamObject: any | null
}

const initialState: StateType = {
    urlParamObject: {}
}

export const actionReducer = createSlice({
    name:'action',
    initialState,
    reducers:{
        updateUrlObject:(state: StateType,action: PayloadAction<any>) => {
            let newState = {...state,urlParamObject: action.payload};
            return newState;
        }
    }
})

export const {updateUrlObject} = actionReducer.actions;
export default actionReducer.reducer;