'use client'
import React, { use, useEffect } from 'react';

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
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isEdit?: boolean;
}

function PropertiesForm({ initialValues = {}, isEdit= false }: 
  { initialValues?: any, isEdit?: boolean } = { initialValues: {}, isEdit: false }) {
  const [finalValues, setFinalValues] = React.useState({
    basic: initialValues,
    location: initialValues,
    amenities: initialValues,
    media: {
      newlyUploadedFiles: [],
      images: initialValues.images || [],
    },
    contact: initialValues
  });
  const [currentStep, setCurrentStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const commonPropsforSteps = {
    currentStep,
    setCurrentStep,
    finalValues,
    setFinalValues,
    loading,
    setLoading,
    isEdit
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

  useEffect(() => {
    console.log(finalValues);
  }, [finalValues]);
  
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
