import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: JSON.parse(localStorage.getItem('users')) || [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { user, divs } = action.payload;
      const existingUser = state.users.find(u => u.id === user.id);
      if (existingUser) {
        existingUser.divs = divs;
      } else {
        state.users.push({ ...user, divs: divs || [] });
      }
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    addDivToUser: (state, action) => {
      const { userId, div } = action.payload;
      const user = state.users.find(u => u.id === userId);
      if (user) {
        if (!user.divs) {
          user.divs = [];
        }
        user.divs.push({
          ...div,
          createdBy: userId,
          flowComponent: {
            nodes: [],
            edges: [],
            
          },
         
        });
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },
    removeDivFromUser: (state, action) => {
      const { userId, id } = action.payload;
      const user = state.users.find(u => u.id === userId);
      if (user) {
        user.divs = user.divs.filter(div => div.id !== id);
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },
  },
});

export const { addUser, addDivToUser, removeDivFromUser } = userSlice.actions;
export default userSlice.reducer;
