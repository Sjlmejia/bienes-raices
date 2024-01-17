import React from 'react'
import { PropertiesFormStepProps } from '.'
import { Button, Input, InputNumber, Select, Form } from 'antd'
import { facingTypes, parkingTypes, furnishingTypes } from '@/constants';
function Amenities({ currentStep, setCurrentStep, finalValues, setFinalValues }: PropertiesFormStepProps) {

  const onFinish = (values: any) => {
    setFinalValues({ ...finalValues, amenities: values });
    setCurrentStep(currentStep + 1);
  };

  //bedrooms, bathrooms, balconies, parking, furnishing, area, totalFloors, facing, age
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={finalValues.amenities}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Form.Item
          name='bedrooms'
          label='Bedrooms'
          rules={[{ required: true, message: 'Please input Bedrooms' }]}
        >
          <InputNumber className='w-full' type='number' placeholder="Bedrooms" />
        </Form.Item>
        <Form.Item
          name='bathrooms'
          label='Bathrooms'
          rules={[{ required: true, message: 'Please input Bathrooms' }]}
        >
          <InputNumber className='w-full' type='number' placeholder="Bathrooms" />
        </Form.Item>
        <Form.Item
          name='balconies'
          label='Balconies'
          rules={[{ required: true, message: 'Please input Balconies' }]}
        >
          <InputNumber className='w-full' type='number' placeholder="Balconies" />
        </Form.Item>
        <Form.Item
          name='parking'
          label='Parking'
          rules={[{ required: true, message: 'Please input Parking' }]}
        >
          <Select options={parkingTypes} />
        </Form.Item>
        <Form.Item
          name='furnishing'
          label='Furnishing'
          rules={[{ required: true, message: 'Please input Furnishing' }]}
        >
          <Select options={furnishingTypes} />
        </Form.Item>
        <Form.Item
          name='area'
          label='Area'
          rules={[{ required: true, message: 'Please input Area' }]}
        >
          <InputNumber className='w-full' type='number' placeholder="Area" />
        </Form.Item>
        <Form.Item
          name='floors'
          label='Floors'
          rules={[
            { required: true, message: 'Please input Total Floors'
          }]}
        >
          <InputNumber min={0} className='w-full' type='number' placeholder="Total Floors" />
        </Form.Item>
        <Form.Item
          name='facing'
          label='Facing'
          rules={[{ required: true, message: 'Please input Facing' }]}
        >
          <Select options={facingTypes} />
        </Form.Item>
        <Form.Item
          name='age'
          label='Age'
          rules={[{ required: true, message: 'Please input Age' }]}>
          <InputNumber className='w-full' type='number' placeholder="Age" />
        </Form.Item>
      </div>
      <div className="flex justify-end gap-5">
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

export default Amenities
