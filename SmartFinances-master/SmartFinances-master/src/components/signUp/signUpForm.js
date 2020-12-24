import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

const defaultData = {
  firstName: '',
  lastName: '',
  email: '',
  dob: '',
  phone: '',
  gender: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  isEnrolled: false,
  university: '',
  commuteToUniversity: '',
  isWorking: 'None',
  industry: '',
  officeLocation: '',
  commuteToOffice: '',
  bankName: '',
  accountNumber: '',
  tfnNumber: '',
  openingBalance: '',
};

const SignUpForm = () => {
  const [formData, setFormData] = useState(defaultData);
  const [count, setCount] = useState(1);

  const props = { formData, setFormData, count, setCount };

  switch (count) {
    case 1:
      return <StepOne {...props} />;
    case 2:
      return <StepTwo {...props} />;
    case 3:
      return <StepThree {...props} />;
    case 4:
      return <StepFour />;
  }
  return <div>MultiStep form</div>;
};

export default SignUpForm;
