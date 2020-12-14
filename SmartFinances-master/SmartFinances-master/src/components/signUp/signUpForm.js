import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

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
  isEnrolled: '',
  isWorking: '',
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
  }
  return <div>MultiStep form</div>;
};

export default SignUpForm;
