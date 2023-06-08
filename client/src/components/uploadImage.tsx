import React from 'react';
import constants from '../utils/constants';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Form, Image, Upload, message, Typography } from 'antd';
import instance from '../hooks/api';

interface IProps {
  handleImageUrl: (imgSrc: string) => any;
  name: string;
  label: string;
  required?: boolean;
  upload: boolean;
}

const ImageUploader: React.FC<IProps> = ({
  handleImageUrl,
  label,
  name,
  required,
  upload,
}) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>();

  const handleImageChange = async (options: any) => {
    if (!options || !options.file) {
      setImageUrl(null);
      return;
    } else if (!upload) {
      const fileUrl = URL.createObjectURL(options.file);
      setImageUrl(fileUrl);
      if (handleImageUrl) handleImageUrl(fileUrl);
      return fileUrl;
    }

    try {
      const formData = new FormData();
      formData.append('file', options.file);
      const { data } = await instance({
        method: 'POST',
        data: formData,
        url: '/upload',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setImageUrl(data.url);
      if (handleImageUrl) handleImageUrl(data.url);
      return data.url;
    } catch (err: any) {
      console.log(err);
      message.error('Error uploading image');
    }
  };

  return (
    <>
      <Form.Item
        label={label}
        name={name}
        {...(required && {
          rules: [{ required: true, message: 'Please choose an image' }],
        })}
      >
        {imageUrl ? (
          <>
            <CloseCircleOutlined
              style={{
                float: 'right',
                marginBottom: 5,
                fontSize: 25,
                color: constants.dangerColor,
              }}
              onClick={() => setImageUrl(null)}
            />
            <Image src={imageUrl} />
          </>
        ) : (
          // </>
          <Upload.Dragger
            customRequest={handleImageChange}
            multiple={false}
            style={{ padding: 10 }}
          >
            <p className='ant-upload-text'>
              Click or drag file to this area to upload
            </p>

            <p className='ant-upload-hint'>
              Choose a single image from your device
            </p>

            <br />

            <Typography.Title level={5}>
              Image must not exceed 4.5 MB in size
            </Typography.Title>

            <Typography.Text type='danger'>
              Please wait for the image to upload before submitting the form.
              Once, preview is visible, you can submit the form.
            </Typography.Text>
          </Upload.Dragger>
        )}
      </Form.Item>
    </>
  );
};

export default ImageUploader;
