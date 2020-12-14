import React, { useState } from 'react';
//import { useForm, useStep } from 'react-hooks-helper';
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

const steps = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

const SignUpForm = () => {
  const [formData, setFormData] = useState(defaultData);
  const [count, setCount] = useState(1);

  // const { step, navigation } = useStep({
  //   steps,
  //   initialStep: 0,
  // });

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
