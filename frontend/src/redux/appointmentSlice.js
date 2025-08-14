import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointmentInfo: null,
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setAppointment: (state, action) => {
      state.appointmentInfo = action.payload;
    },
    clearAppointmentInfo: (state) => {
      state.appointmentInfo = null;
    },
  },
});

export const { setAppointment, clearAppointmentInfo } = appointmentSlice.actions;
export default appointmentSlice.reducer;
