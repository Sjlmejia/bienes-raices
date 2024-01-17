import React from 'react'
import { PropertiesFormStepProps } from '.'
import { Button } from 'antd'

function Contact({ currentStep, setCurrentStep }: PropertiesFormStepProps) {
  return (
    <div>
      <div className="flex justify-end gap-5">
        <Button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
          Next
        </Button>
      </div>
      Contact
    </div>
  )
}

export default Contact
