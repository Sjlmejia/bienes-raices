import React from 'react'
import { PropertiesFormStepProps } from '.'
import { Button, Form, InputNumber, Select, Input } from 'antd'

function Contact({ currentStep, setCurrentStep,finalValues, setFinalValues  }: PropertiesFormStepProps) {
  
  const onFinish = (values: any) => {
    const tempFinalValues ={ ...finalValues, contact: values};
    console.log('Success:', tempFinalValues);
  }
  // ownerName, ownerEmail, ownerPhone, ownerAddress, showOwnerContact
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={finalValues.contact}

    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Form.Item
          label="Owner Name"
          name="ownerName"
          rules={[{ required: true, message: 'Please input owner name!' }]}
        >
          <Input placeholder='Owner Name' />
        </Form.Item>
        <Form.Item
          label="Owner Email"
          name="ownerEmail"
          rules={[{ required: true, message: 'Please input owner email!' }]}
        >
          <Input placeholder='Owner Email' />
        </Form.Item>
        <Form.Item
          label="Owner Phone"
          name="ownerPhone"
          rules={[{ required: true, message: 'Please input owner phone!' }]}
        >
          <Input placeholder='Please input owner phone!' />
        </Form.Item>
        <Form.Item
          label="Show Owner Contact"
          name="showOwnerContact"
          rules={[{ required: true, message: 'Please input show owner contact!' }]}
        >
          <Select
            options= {[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ]}
          />
        </Form.Item>
      </div>
      <div className="flex justify-end gap-5 mt-7">
        <Button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button type="primary" htmlType='submit'>
          Next
        </Button>
      </div>
      Contact
    </Form>
  )
}

export default Contact
