import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: "",
  currentUser: null,
  currentChat: null,
  currentChatRecipient: null,
  rooms: [],
  users: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addNewRoom: (state, action) => ({
      ...state,
      room: action.payload,
    }),
    addNewChat: (state, action) => ({
      ...state,
      currentChat: action.payload,
    }),
    addNewChatRecipient: (state, action) => ({
      ...state,
      currentChatRecipient: action.payload,
    }),
    initiateCurrentUser: (state, action) => ({
      ...state,
      currentUser: action.payload,
    }),
    updateRooms: (state, action) => ({
      ...state,
      rooms: action.payload,
    }),
    updateUsers: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewRoom,
  initiateCurrentUser,
  updateRooms,
  updateUsers,
  addNewChat,
  addNewChatRecipient,
} = appSlice.actions;

export default appSlice.reducer;
