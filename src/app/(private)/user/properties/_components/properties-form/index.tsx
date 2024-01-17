'use client'
import React from 'react';

import { Steps } from 'antd';
import Basic from './basic';
import Location from './location';
import Amenities from './amenities';
import Media from './media';
import Contact from './contact';

export interface PropertiesFormStepProps {
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
  finalValues: any;
  setFinalValues: (finalValues: any) => void;
}

function PropertiesForm() {
  const [finalValues, setFinalValues] = React.useState({
    basic: {},
    location: {},
    amenities: {},
    media: {},
    contact: {}
  });
  const [currentStep, setCurrentStep] = React.useState(0);

  const commonPropsforSteps = {
    currentStep,
    setCurrentStep,
    finalValues,
    setFinalValues
  }
  const steps = [
    {
      title: 'Basic',
      content: <Basic 
        {...commonPropsforSteps}
      />
    },
    {
      title: 'Location',
      content: <Location 
        {...commonPropsforSteps}
      />
    },
    {
      title: 'Amenities',
      content: <Amenities 
        {...commonPropsforSteps}
      />
    },
    {
      title: 'Media',
      content: <Media 
        {...commonPropsforSteps}
      />
    },
    {
      title: 'Contact',
      content: <Contact 
        {...commonPropsforSteps}
      />
    }
  ]
  return (
    <div>
      <Steps current={currentStep} items={steps} />
      <div className='mt-8'>
        {steps[currentStep].content}
      </div>
    </div>
  )
}

export default PropertiesForm;
