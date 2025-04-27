import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface StateType{
    menuObj: any | null,
    loginInfo: any | null
}

const initialState: StateType = {
    menuObj : {},
    loginInfo: {}
}
export const authReducer = createSlice({
    name:'auth',
    initialState,
    reducers:{
        updateMenuObj:(state: StateType,action: PayloadAction<any>) => {
            let newState = {...state,menuObj: action.payload};
            return newState;
        },
        updateLoginInfo:(state: StateType,action: PayloadAction<any>) => {
            let newState = {...state,loginInfo: action.payload};
            return newState;
        },
    }
})

export const {updateMenuObj,updateLoginInfo} = authReducer.actions;
export default authReducer.reducer;