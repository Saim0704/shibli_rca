import React from 'react';
import { Form, Input } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import debounce from 'lodash.debounce';
import { useRecoilValue } from 'recoil';
import { uiAtom } from '../utils/atoms';

interface IProps {
  quillValue: string;
  setValue: (value: string) => void;
}

const NoticeForm: React.FC<IProps> = ({ quillValue, setValue }) => {
  const onChange = debounce((val) => setValue(val), 200);

  const { isMobile } = useRecoilValue(uiAtom);

  return (
    <>
      <Form.Item
        label='Title'
        name='title'
        rules={[{ required: true, message: 'Please enter title' }]}
      >
        <Input placeholder='Enter Title' size={isMobile ? 'middle' : 'large'} />
      </Form.Item>

      <Form.Item label='Issued By' name='issuedBy'>
        <Input
          placeholder='Enter Issued By'
          size={isMobile ? 'middle' : 'large'}
        />
      </Form.Item>

      <Form.Item label='Description' name='description'>
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
    </>
  );
};

export default NoticeForm;
