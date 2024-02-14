import React from 'react'
import { PropertiesFormStepProps } from '.'
import { Button, Form, InputNumber, Select, Input, message } from 'antd'
import { UploadFilesTOFirebaseAndReturnUrls } from '@/helpers/upload-media';
import { AddProperty, EditProperty } from '@/actions/properties';
import { useRouter, useParams } from 'next/navigation';

function Contact({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
  loading,
  setLoading,
  isEdit = false
}: PropertiesFormStepProps) {
  const { id } = useParams();
  const router = useRouter();
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const tempFinalValues = { ...finalValues, contact: values };

      //handle media upload
      const tempMedia = tempFinalValues.media;
      const newImagesURLS = await UploadFilesTOFirebaseAndReturnUrls(
        tempMedia.newlyUploadedFiles
      );

      if(newImagesURLS) {
        tempMedia.images = [...tempMedia.images, ...newImagesURLS];
      }
      
      tempFinalValues.media = tempMedia;
      const valuesAsperDb = {
        ...tempFinalValues.basic,
        ...tempFinalValues.location,
        ...tempFinalValues.amenities,
        ...tempFinalValues.contact,
        images: tempFinalValues.media.images,
      }
      console.log('valuesAsperDb', valuesAsperDb);
      let response = null;
      if (isEdit) {
        response = await EditProperty(valuesAsperDb, id as string);
      } else {
        response = await AddProperty(valuesAsperDb);
      }
      if (response.error) throw new Error(response.error)
      message.success(response.message);
      router.push('/user/properties');
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
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
            options={[
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
        <Button type="primary" htmlType='submit'
          loading={loading}
        >
          Save property
        </Button>
      </div>
    </Form>
  )
}

export default Contact
