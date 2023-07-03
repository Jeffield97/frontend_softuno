import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    username:"",
    rol:"",
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        addUser:(state,action)=>{
            const {name,username} = action.payload
            state.username=name;
            state.rol=username;
        }
    }
})

export const {addUser} = userSlice.actions
export default userSlice.reducer