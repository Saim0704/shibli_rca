import { Button, Checkbox, DatePicker, Form, Input, Typography } from 'antd';
import { IRegisterPayload } from './stepper';
import React, { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { uiAtom } from '../../utils/atoms';
import dayjs from 'dayjs';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const EarlierCompetitiveExamsContainer: React.FC<IProps> = ({
  payload,
  setPayload,
}) => {
  const { isMobile } = useRecoilValue(uiAtom);

  const onEarlierCompetitiveExamsChange = (
    name: string,
    value: any,
    index: number
  ) => {
    setPayload((prev) => ({
      ...prev,
      earlierCompetitiveExams: [
        ...prev.earlierCompetitiveExams.slice(0, index),
        {
          ...prev.earlierCompetitiveExams[index],
          [name]: value,
        },
      ],
    }));
  };

  const removeEarlierEducationExam = (index: number) => {
    setPayload((prev) => ({
      ...prev,
      earlierCompetitiveExams: prev.earlierCompetitiveExams.filter(
        (_, i) => i !== index
      ),
    }));
  };

  return (
    <Fragment>
      <Form.List name='earlierCompetitiveExams'>
        {(fields, { add, remove }) => (
          <Fragment>
            {fields.map((field, index) => (
              <Fragment key={field.key}>
                <Form.Item
                  noStyle
                  shouldUpdate={(prev, curr) =>
                    prev.phoneNumbers !== curr.phoneNumbers
                  }
                >
                  {() => (
                    <Form.Item
                      {...field}
                      label='Name'
                      name={[field.name, 'name']}
                      rules={[{ required: true }]}
                    >
                      <Input
                        size={isMobile ? 'middle' : 'large'}
                        placeholder='Enter Exam Name'
                        value={payload.earlierCompetitiveExams[index]?.name}
                        onChange={(e) =>
                          onEarlierCompetitiveExamsChange(
                            'name',
                            e.target.value,
                            index
                          )
                        }
                      />
                    </Form.Item>
                  )}
                </Form.Item>

                <Form.Item
                  {...field}
                  label='Year'
                  name={[field.name, 'year']}
                  rules={[{ required: true }]}
                >
                  {/* <Input
                    size={isMobile ? 'middle' : 'large'}
                    placeholder='Enter Exam Year'
                    value={payload.earlierCompetitiveExams[index]?.year}
                    onChange={(e) =>
                      onEarlierCompetitiveExamsChange(
                        'year',
                        e.target.value,
                        index
                      )
                    }
                  /> */}
                  <DatePicker
                    placeholder='Enter Exam Year'
                    style={{ width: '100%' }}
                    picker='year'
                    size={isMobile ? 'middle' : 'large'}
                    value={dayjs(payload.earlierCompetitiveExams[index]?.year)}
                    onChange={(val) => {
                      onEarlierCompetitiveExamsChange(
                        'year',
                        dayjs(val).format('YYYY'),
                        index
                      );
                    }}
                  />
                </Form.Item>

                <Checkbox
                  checked={payload.earlierCompetitiveExams[index]?.cleared}
                  onChange={(e) =>
                    onEarlierCompetitiveExamsChange(
                      'cleared',
                      e.target.checked,
                      index
                    )
                  }
                />
                <Typography.Text className='ml-2'>
                  Cleared this Exam
                </Typography.Text>

                <Button
                  type='dashed'
                  className='w-full my-10'
                  onClick={() => {
                    remove(field.name);
                    removeEarlierEducationExam(index);
                  }}
                >
                  Remove
                </Button>
              </Fragment>
            ))}

            <Button
              size={isMobile ? 'middle' : 'large'}
              type='dashed'
              style={{ width: '100%' }}
              onClick={() => add()}
            >
              Add Earlier Competitive Exams
            </Button>
          </Fragment>
        )}
      </Form.List>
    </Fragment>
  );
};

export default EarlierCompetitiveExamsContainer;
