import React, { useContext, useEffect } from 'react';
import { Input, message } from 'antd';
import AdminContainer from '../../components/adminContainer';
import ConfigForm from '../../components/configForm';
import instance from '../../hooks/api';
import { uiContext } from '../../hooks/ui';

interface IProps {}

interface IConfig {
  name: string;
  value: string;
  label: string;
}

const splitCamelCase = (str: string) => {
  const result = str.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const SiteSettings: React.FC<IProps> = () => {
  const [{ isMobile }] = useContext(uiContext);
  const [config, setConfig] = React.useState<IConfig[]>([]);

  useEffect(() => {
    const getSiteSettings = async () => {
      const response = await instance.get('/config');
      return response.data.data;
    };

    getSiteSettings().then((data) => {
      setConfig(
        data.map((item: any) => {
          return {
            name: item.name,
            value: item.value,
            label: splitCamelCase(item.name),
          };
        })
      );
    });
  }, []);

  const onSubmitConfig = async ({ name, value }: IConfig) => {
    try {
      await instance.put('/config', { name, value });
      message.success('Config updated successfully');
    } catch (err) {
      message.error('Config update failed');
    }
  };
  return (
    <AdminContainer>
      <div className='flex justify-center w-full'>
        <div className='w-1/2 my-10'>
          {config.map((item, index) => {
            return (
              <ConfigForm
                key={index}
                formName={item.name}
                formLabel={item.label}
                formRules={[
                  { required: true, message: `Please input ${item.label}` },
                ]}
                formInitialValue={item.value}
                onSubmit={() => onSubmitConfig(item)}
                onError={() => {}}
              >
                <Input.TextArea
                  size={isMobile ? 'middle' : 'large'}
                  onChange={(e) => {
                    setConfig([
                      ...config.slice(0, index),
                      {
                        ...item,
                        value: e.target.value,
                      },
                      ...config.slice(index + 1),
                    ]);
                  }}
                  rows={4}
                />
              </ConfigForm>
            );
          })}
        </div>
      </div>
    </AdminContainer>
  );
};

export default SiteSettings;
