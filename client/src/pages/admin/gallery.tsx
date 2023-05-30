import { Form, Image, Input, TableProps } from 'antd';
import { useRecoilValue } from 'recoil';
import { galleryAtom, uiAtom } from '../../utils/atoms';
import { IGallery } from '../../types/models';
import AdminContainer from '../../components/adminContainer';
import CustomTable from '../../components/table';
import ImageUploader from '../../components/uploadImage';

const Gallery = () => {
  const { isMobile } = useRecoilValue(uiAtom);

  const columns: TableProps<IGallery>['columns'] = [
    {
      title: 'Image',
      dataIndex: 'image',
      width: 110,
      align: 'center',
      render: (image, record) => (
        <Image
          preview
          width={80}
          height={80}
          src={image}
          alt={record.name}
          style={{ padding: 0 }}
        />
      ),
    },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Details', dataIndex: 'description' },
  ];

  const handleImageUrl = (imgSrc: string) => {};

  return (
    <AdminContainer>
      <div className='m-4 bg-white rounded-md shadow-md'>
        <CustomTable<IGallery>
          tableTitle='Gallery'
          endpoint={{
            get: '/gallery',
            post: '/gallery',
            put: '/gallery',
            delete: '/gallery',
          }}
          scroll={{ x: 800 }}
          tableColumns={columns}
          addButtonLabel='Add Gallery'
          recoilAtom={galleryAtom}
          AddFormInner={
            <>
              <Form.Item
                label='Gallery Name'
                name='name'
                rules={[
                  { required: true, message: 'Please enter gallery name' },
                ]}
              >
                <Input size={isMobile ? 'middle' : 'large'} />
              </Form.Item>

              <ImageUploader
                upload={false}
                label='Image'
                name='image'
                required
                handleImageUrl={handleImageUrl}
              />

              <Form.Item label='Details' name='description'>
                <Input.TextArea rows={4} />
              </Form.Item>
            </>
          }
        />
      </div>
    </AdminContainer>
  );
};

export default Gallery;
