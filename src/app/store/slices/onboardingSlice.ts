import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Form1Data {
  firstName: string;
  lastName: string;
  email: string;
  website: string;
  message: string;
}

interface Form2Data {
  degree: string;
  university: string;
  year: number;
}

interface Form3Data {
  occupation: string;
  company: string;
}

interface Form4Data {
  phone: string;
  emergencyContact: string;
}

interface Form5Data {
  preferences: string[];
  termsAccepted: boolean;
}

interface OnboardingState {
  step: number;
  form1: Form1Data;
  form2: Form2Data;
  form3: Form3Data;
  form4: Form4Data;
  form5: Form5Data;
}

const initialState: OnboardingState = {
  step: 1,
  form1: { firstName: '', lastName: '', email: '', website: '', message: '' },
  form2: { degree: '', university: '', year: 0 },
  form3: { occupation: '', company: '' },
  form4: { phone: '', emergencyContact: '' },
  form5: { preferences: [], termsAccepted: false },
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    saveForm1(state, action: PayloadAction<Form1Data>) {
      state.form1 = action.payload;
    },
    saveForm2(state, action: PayloadAction<Form2Data>) {
      state.form2 = action.payload;
    },
    saveForm3(state, action: PayloadAction<Form3Data>) {
      state.form3 = action.payload;
    },
    saveForm4(state, action: PayloadAction<Form4Data>) {
      state.form4 = action.payload;
    },
    saveForm5(state, action: PayloadAction<Form5Data>) {
      state.form5 = action.payload;
    },
    resetForms: (state) => {
      state.form1 = { firstName: '', lastName: '', email: '', website: '', message: '' };
      state.form2 = { degree: '', university: '', year: 0 };
      state.form3 = { occupation: '', company: '' };
      state.form4 = { phone: '', emergencyContact: '' };
      state.form5 = { preferences: [], termsAccepted: false };
    },
  },
});

export const { setStep, saveForm1, saveForm2, saveForm3, saveForm4, saveForm5, resetForms } = onboardingSlice.actions;
export default onboardingSlice.reducer;