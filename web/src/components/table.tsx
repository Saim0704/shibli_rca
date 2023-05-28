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
  ReloadOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { constants } from '../utils/constants';
import ObjectAsDetails from './objectToSchema';
import { RecoilState, useRecoilState } from 'recoil';
import React, { ReactNode, useEffect, useState } from 'react';

export type FormResponseError = {
  field: string;
  message: string;
};

export type ICustomTableProps<RecordType> = TableProps<RecordType> & {
  tableColumns: TableProps<RecordType>['columns'];
  addButtonLabel?: string;
  endpoint: {
    get: string;
    post: string;
    put: string;
    delete: string;
  };
  recoilAtom: RecoilState<Array<Partial<RecordType>>>;
  AddFormInner: ReactNode;
  tableTitle: string;
  customFormValidation?: (
    values: any
  ) => FormResponseError[] | Promise<FormResponseError[]>;
};

const fileInputNames = ['image', 'file'];

export const getUrl = (base: string, endpoint: string) => {
  const url = base.split('/');
  return [url[0], url[2]].join('//') + endpoint;
};

export default function CustomTable<RecordType = unknown>({
  endpoint,
  tableColumns,
  addButtonLabel,
  AddFormInner,
  customFormValidation,
  recoilAtom,
  tableTitle,
  ...props
}: ICustomTableProps<RecordType>) {
  const initialState = { loading: false, open: false, disable: false };
  const [tableData, setTableData] = useRecoilState(recoilAtom);
  const [modal, setModal] = useState(initialState);
  const [form] = Form.useForm();

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

  const [actionModal, setActionsModal] =
    useState<IActionModal>(initialActionsModal);

  const handleEdit = async () => {
    console.log(actionModal.data);
  };

  const handleDelete = async () => {
    console.log(actionModal.data);
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
    const { data } = await axios({
      method: 'POST',
      data: formData,
      url: '/api/admin/upload',
      headers: { 'Content-Type': 'multipart/form-data' },
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

      const url = getUrl(window.location.href, endpoint.post);
      const { data } = await axios.post(url, values);
      setTableData((p) => [...p, { ...data.data }]);
      form.resetFields();
      setModal(initialState);
    } catch (err) {
      setModal(initialState);
    }
  };

  const handleFormFinishFailed = async (values: any) => {};

  const allCols: TableProps<RecordType>['columns'] = [
    {
      title: 'Sl. No.',
      render: (_, __, index) => `${index + 1}.`,
      width: 100,
      align: 'center',
    },
    ...tableColumns,
    {
      title: '',
      width: 130,
      render: (text, record) => {
        return (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Tooltip title='Edit this entry'>
              <Button
                type='primary'
                icon={<EditOutlined />}
                onClick={handleEdit}
              />
            </Tooltip>

            <Tooltip title='Delete this entry'>
              <Button
                type='primary'
                style={{ background: constants.dangerColor }}
                icon={<DeleteOutlined />}
                onClick={() =>
                  setActionsModal({
                    data: record,
                    loading: false,
                    open: true,
                    type: 'DELETE',
                  })
                }
              />
            </Tooltip>

            <Tooltip title='Know more'>
              <Button
                type='primary'
                style={{ background: constants.infoColor }}
                icon={<InfoOutlined />}
                onClick={() =>
                  setActionsModal({
                    data: record,
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

  const refreshEntries = async () => {
    const {
      data: { data, /* error */ },
    } = await axios.get(endpoint.get);
    setTableData(data);
  };

  useEffect(() => {
    if (tableData?.length > 0) return;
    refreshEntries();
  }, []);

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
          <ObjectAsDetails data={actionModal.data} />
        )}
      </Modal>

      <div className='flex items-center justify-between m-[10px] gap-3 pt-[10px]'>
        <Typography.Title level={4}>{tableTitle}</Typography.Title>
        <div className='flex items-center gap-3'>
          <Button icon={<ReloadOutlined />} onClick={refreshEntries} />
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
        <Table
          size='small'
          sticky
          scroll={{ x: 1000 }}
          // @ts-ignore
          columns={allCols}
          // @ts-ignore
          rowKey={(record) => record._id}
          // @ts-ignore
          dataSource={tableData as Array<RecordType>}
          {...props}
        />
      </div>
    </>
  );
}
