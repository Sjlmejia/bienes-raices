import React from 'react'
import { PropertiesFormStepProps } from '.'
import { Button, Form, Input } from 'antd'

function Basic({ currentStep, setCurrentStep, finalValues, setFinalValues }: PropertiesFormStepProps) {
  
  const onFinish = (values: any) => {
    setFinalValues({ ...finalValues, basic: values});
    setCurrentStep(currentStep + 1);
  }

  return (
    <Form layout='vertical' initialValues={finalValues.basic}>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        <Form.Item
          name='name'
          label='Property Name'
          rules={[{ required: true, message: 'Please input property name' }]}
          className='col-span-1 lg:col-span-3'
        >
          <Input placeholder="Property Name"/>
        </Form.Item>

        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Please input Description' }]}
          className='col-span-1 lg:col-span-3'
        >
          <Input.TextArea rows={6} placeholder="Property Name"/>
        </Form.Item>
      </div>
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
    </Form>
  )
}

export default Basic
