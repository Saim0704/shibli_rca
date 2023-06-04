import React, { useContext } from 'react';
import ReactQuill from 'react-quill';
import debounce from 'lodash.debounce';
import 'react-quill/dist/quill.snow.css';
import { DatePicker, Form, Input } from 'antd';
import { uiContext } from '../hooks/ui';

interface IProps {
  quillValue: string;
  setValue: (value: string) => void;
}

const EventForm: React.FC<IProps> = ({ quillValue, setValue }) => {
  const onChange = debounce((val) => setValue(val), 200);

  const [{ isMobile }] = useContext(uiContext);
  return (
    <>
      <Form.Item
        label='Event Name'
        name='name'
        rules={[{ required: true, message: 'Please enter event name' }]}
      >
        <Input
          size={isMobile ? 'middle' : 'large'}
          placeholder='Enter Event Name'
        />
      </Form.Item>

      <Form.Item
        label='Location'
        name='location'
        rules={[{ required: true, message: 'Please enter event location' }]}
      >
        <Input
          size={isMobile ? 'middle' : 'large'}
          placeholder='Enter Event Location'
        />
      </Form.Item>

      <Form.Item label='Details' name='description'>
        <ReactQuill
          theme='snow'
          value={quillValue}
          onChange={onChange}
          style={{
            height: '100px',
            marginBottom: '40px',
          }}
        />
      </Form.Item>

      <Form.Item
        label='Start Date'
        name='startDate'
        rules={[
          {
            required: true,
            message: 'Please enter event start date/time',
          },
        ]}
      >
        <DatePicker
          showTime
          size={isMobile ? 'middle' : 'large'}
          className='w-full'
        />
      </Form.Item>

      <Form.Item
        label='End Date'
        name='endDate'
        rules={[
          {
            required: true,
            message: 'Please enter event end date/time',
          },
        ]}
      >
        <DatePicker
          showTime
          size={isMobile ? 'middle' : 'large'}
          className='w-full'
        />
      </Form.Item>

      <Form.Item label='Contact' name='contact'>
        <Input
          size={isMobile ? 'middle' : 'large'}
          placeholder='Enter Contact for Event'
        />
      </Form.Item>
    </>
  );
};

export default EventForm;
