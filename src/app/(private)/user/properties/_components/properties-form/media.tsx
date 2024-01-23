import React from 'react'
import { PropertiesFormStepProps } from '.'
import { Button, Upload, Modal } from 'antd'
const getBase64 = (file:any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
function Media({ currentStep, setCurrentStep, finalValues, setFinalValues }: PropertiesFormStepProps) {
  const [tempFiles, setTempFiles] = React.useState<any>([])
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState('');
  const [previewTitle, setPreviewTitle] = React.useState('');
  const handleCancel = () => setPreviewOpen(false);
  const onFinish = () => {
    setFinalValues({ ...finalValues, media: { newlyUploadedFiles: tempFiles, images: finalValues.media.images } });
    setCurrentStep(currentStep + 1);
  }

  const handlePreview = async (file:any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  return (

    <div>
      <Upload
        listType="picture-card"
        multiple
        beforeUpload={(file: any) => {
          setTempFiles((prev: any) => [...prev, file]);

          return false;
        }}
        onPreview={handlePreview}
      >
        Upload Media
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
      <div className="flex justify-end gap-5">
        <Button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Back
        </Button>
        <Button type="primary" onClick={onFinish}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default Media
