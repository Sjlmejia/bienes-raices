import React from 'react'
import { PropertiesFormStepProps } from '.'
import { Button, Form, Input, InputNumber, Select } from 'antd'

function Location({ currentStep, setCurrentStep, finalValues, setFinalValues}: PropertiesFormStepProps) {
  
  const onFisnish = (values: any) => {
    setFinalValues({...finalValues, location: values});
    setCurrentStep(currentStep + 1)
  }
  
  //city, pincode, lanmark, address
  return (
    <Form
      layout="vertical"
      onFinish={onFisnish} 
      initialValues={finalValues.location}     
    >
      <div className="grid gid-cols-1 lg:grid-cols-3 gap-5">
        <Form.Item
          name='city'
          label='City'
          rules={[{ required: true, message: 'Please input City' }]}
        >
          <Input placeholder="City"/>
        </Form.Item>
        <Form.Item
          name='pincode'
          label='Pincode'
          rules={[{ required: true, message: 'Please input Pincode' }]}
        >
          <InputNumber className='w-full' type='number' placeholder="Pincode"/>
        </Form.Item>
        <Form.Item
          name='landmark'
          label='Landmark'
          rules={[{ required: true, message: 'Please input Landmark' }]}
        >
          <Input placeholder="Landmark"/>
        </Form.Item>
        <Form.Item
          name='address'
          label='Address'
          rules={[{ required: true, message: 'Please input Address' }]}
          className='col-span-1 lg:col-span-3'
        >
          <Input.TextArea rows={6} placeholder="Address"/>
        </Form.Item>
      </div>
      <div className="flex justify-end gap-5 mt-7">
        <Button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button htmlType="submit" type="primary">
          Next
        </Button>
      </div>
    </Form>
  )
}

export default Location
