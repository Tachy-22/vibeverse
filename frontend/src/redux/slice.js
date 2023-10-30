import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: "",
  currentUser: null,
  rooms:[]
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addNewRoom: (state, action) => ({
      ...state,
      room: action.payload,
    }),
    initiateCurrentUser: (state, action) => ({
      ...state,
      currentUser: action.payload,
    }),
    updateRooms: (state, action) => ({
      ...state,
      rooms: action.payload,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { addNewRoom, initiateCurrentUser, updateRooms } = appSlice.actions;

export default appSlice.reducer;
