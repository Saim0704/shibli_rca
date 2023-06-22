import {
  Button,
  Form,
  Modal,
  Skeleton,
  Table,
  TableProps,
  Tooltip,
  Typography,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  InfoOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import constants from '../utils/constants';
import ObjectAsDetails from './objectToSchema';
import { ReactNode, useState } from 'react';
import instance from '../hooks/api';
import useSession from '../hooks/session';
import { useQuery } from '@tanstack/react-query';

export type FormResponseError = {
  field: string;
  message: string;
};

interface IActionModal {
  loading: boolean;
  open: boolean;
  type: 'DELETE' | 'INFO';
  data: any | null;
}

const initialActionsModal: IActionModal = {
  loading: false,
  open: false,
  type: 'DELETE',
  data: null,
};

export type ICustomTableProps<RecordType> = TableProps<RecordType> & {
  tableColumns: TableProps<RecordType>['columns'];
  addButtonLabel?: string;
  moreActions?: (record: RecordType) => ReactNode;
  endpoint: {
    get: string;
    post?: string;
    put?: string;
    delete?: string;
  };
  AddFormInner: ReactNode;
  tableTitle: string;
  moreInfoTransformer?: (data: any) => ReactNode;
  customFormValidation?: (
    values: any
  ) => FormResponseError[] | Promise<FormResponseError[]>;
};

const fileInputNames = ['image', 'file'];

export default function CustomTable<RecordType = unknown>({
  endpoint,
  tableColumns,
  addButtonLabel,
  AddFormInner,
  customFormValidation,
  tableTitle,
  ...props
}: ICustomTableProps<RecordType>) {
  const initialState = { loading: false, open: false, disable: false };
  const [modal, setModal] = useState(initialState);
  const [form] = Form.useForm();
  const { getToken } = useSession();
  const [page, setPage] = useState(1);

  const { data: tableData } = useQuery({
    queryKey: [tableTitle],
    queryFn: () => {
      return instance.get(endpoint.get, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
  });

  const [actionModal, setActionsModal] =
    useState<IActionModal>(initialActionsModal);

  const handleEdit = async () => {
    // console.log(actionModal.data);
  };

  const handleDelete = async () => {
    // console.log(actionModal.data);
  };

  // const handleMoreInfo = async () => {
  //   console.log(actionModal.data);
  // };

  if (!tableColumns || tableColumns.length == 0) {
    return null;
  }

  const closeModal = () => setModal(initialState);
  const closeActionModal = () => setActionsModal(initialActionsModal);

  const handleActionModalOk = async () => {
    if (actionModal.type === 'DELETE') {
      await handleDelete();
    }
    closeActionModal();
  };

  const handleFile = async (file: any) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await instance({
      method: 'POST',
      data: formData,
      url: '/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return data;
  };

  const handleFormFinish = async (values: any) => {
    try {
      setModal((p) => ({ ...p, disable: true, loading: true }));

      let errors: FormResponseError[] = [];
      if (customFormValidation) {
        errors = await customFormValidation(values);
      }
      if (errors.length > 0) {
        form.setFields(
          errors.map((e) => ({ name: e.field, errors: [e.message] }))
        );
        setModal((p) => ({ ...p, disable: false, loading: false }));
        return;
      }

      const keys = Object.keys(values);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (fileInputNames.includes(k)) {
          const { url } = await handleFile(values[k].file.originFileObj);
          values[k] = url;
          break;
        }
      }
      if (!endpoint.post) throw new Error('No endpoint for post');
      await instance.post(endpoint.post, values, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      form.resetFields();
      setModal(initialState);
    } catch (err) {
      setModal(initialState);
    }
  };

  const handleFormFinishFailed = async () => {};

  const infoTransformer = (data: any) => {
    if (props.moreInfoTransformer) return props.moreInfoTransformer(data);
    return <ObjectAsDetails data={data} />;
  };

  const allCols: TableProps<RecordType>['columns'] = [
    {
      title: 'Sl. No.',
      render: (_, __, index) => `${(page - 1) * 10 + index + 1}.`,
      width: 100,
      align: 'center',
    },
    ...tableColumns,
    {
      title: '',
      render: (/*text,*/ record) => {
        return (
          <div style={{ display: 'flex', gap: '10px' }}>
            {props.moreActions ? props.moreActions(record) : null}

            {endpoint.put && (
              <Tooltip title='Edit this entry'>
                <Button
                  type='primary'
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                />
              </Tooltip>
            )}

            {endpoint.delete && (
              <Tooltip title='Delete this entry'>
                <Button
                  type='primary'
                  style={{ background: constants.dangerColor }}
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    setActionsModal({
                      data: record,
                      loading: false,
                      open: true,
                      type: 'DELETE',
                    });
                  }}
                />
              </Tooltip>
            )}

            <Tooltip title='Know more'>
              <Button
                type='primary'
                style={{ background: constants.infoColor }}
                icon={<InfoOutlined />}
                onClick={() =>
                  setActionsModal({
                    data: infoTransformer(record),
                    loading: false,
                    open: true,
                    type: 'INFO',
                  })
                }
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Modal
        footer={null}
        onCancel={closeModal}
        open={modal.open}
        title={
          <Typography.Title
            style={{ textAlign: 'center', margin: 20 }}
            level={4}
          >
            {addButtonLabel}
          </Typography.Title>
        }
      >
        {modal.loading ? (
          <Skeleton active />
        ) : (
          <Form
            form={form}
            name={addButtonLabel}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={handleFormFinish}
            onFinishFailed={handleFormFinishFailed}
            disabled={modal.disable}
          >
            {AddFormInner}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                marginRight: '25px',
                gap: '10px',
              }}
            >
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type='primary'
                  htmlType='submit'
                  disabled={modal.disable}
                >
                  Submit
                </Button>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button onClick={closeModal} disabled={modal.disable}>
                  Cancel
                </Button>
              </Form.Item>
            </div>
          </Form>
        )}
      </Modal>

      <Modal
        title={
          <Typography.Title
            style={{ textAlign: 'center', margin: 20 }}
            level={5}
          >
            {actionModal.type === 'DELETE' ? 'Confirm Deletion' : 'Info'}
          </Typography.Title>
        }
        open={actionModal.open}
        onCancel={closeActionModal}
        onOk={handleActionModalOk}
      >
        {actionModal.type === 'DELETE' ? (
          <Typography.Text style={{ textAlign: 'center' }}>
            Are you sure you want to delete this entry ?
          </Typography.Text>
        ) : (
          actionModal.data
        )}
      </Modal>

      <div className='flex items-center justify-between m-[10px] gap-3 pt-[10px]'>
        <Typography.Title level={4}>{tableTitle}</Typography.Title>
        <div className='flex items-center gap-3'>
          {addButtonLabel ? (
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={() => setModal((p) => ({ ...p, open: true }))}
            >
              {addButtonLabel || 'Add'}
            </Button>
          ) : null}
        </div>
      </div>

      <div style={{ width: '100%', overflowX: 'auto' }}>
        {tableData ? (
          <Table
            size='small'
            sticky
            scroll={{ x: 1000 }}
            // @ts-ignore
            columns={allCols}
            // @ts-ignore
            rowKey={(record) => record._id}
            // @ts-ignore
            dataSource={tableData.data}
            pagination={{
              current: page,
              pageSize: 10,
              total: tableData.data.length,
              onChange: (page) => setPage(page),
              pageSizeOptions: [],
            }}
            {...props}
          />
        ) : null}
      </div>
    </>
  );
}
