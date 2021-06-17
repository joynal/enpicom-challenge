import React from 'react';
import { useSetRecoilState } from 'recoil';
import {
  Form, Input, Button, InputNumber,
} from 'antd';

import { getDnaRecords } from '../../api/dnaRecord';
import { isCreateVisible } from '../../recoil/atoms';

const SearchBar = () => {
  const [form] = Form.useForm();
  const { filterDna } = getDnaRecords();
  const setIsCreateVisible = useSetRecoilState(isCreateVisible);

  const onFinish = (values) => {
    const params = {
      sequence: values.sequence,
    };

    if (values.fuzzyness) {
      params.fuzzyness = values.fuzzyness;
    }

    filterDna(params);
  };

  const showCreateForm = () => {
    setIsCreateVisible(true);
  };

  return (
    <Form
      formlayout={null}
      layout="inline"
      form={form}
      onFinish={onFinish}
      style={{ marginBottom: '2em', width: '100%' }}
    >
      <Form.Item
        name="sequence"
        style={{ width: '40%' }}
        rules={[
          {
            required: true,
            message: 'Enter sequence to filter',
          },
          {
            pattern: new RegExp(/^[ACTG]+$/),
            message: 'Invalid sequence',
          },
        ]}
      >
        <Input placeholder="Sequence" />
      </Form.Item>
      <Form.Item
        name="fuzzyness"
        rules={[
          {
            type: 'number',
            min: 1,
            max: 1000,
          },
        ]}
      >
        <InputNumber placeholder="distance" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={showCreateForm}>
          Create New Sequence
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchBar;
