import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  Modal, Form, Input, notification,
} from 'antd';

import { createDnaRecord } from '../../api/dnaRecord';
import { isCreateVisible, dnaRecord } from '../../recoil/atoms';

const openNotificationWithIcon = (type, message) => {
  notification[type]({ message });
};

const CreateDna = () => {
  const [form] = Form.useForm();
  const setDnaRecord = useSetRecoilState(dnaRecord);
  const [isModalVisible, setIsModalVisible] = useRecoilState(isCreateVisible);

  const createSequence = async (values) => {
    setIsModalVisible(false);
    const { status, data } = await createDnaRecord(values);

    if (status === 200) {
      openNotificationWithIcon('success', 'Sequence created successfully');
      setDnaRecord((current) => [...current, data]);
      return;
    }

    openNotificationWithIcon('error', 'Sequence creation failed!');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        createSequence(values);
      })
      .catch((error) => {
        console.error('Validate Failed:', error);
      });
  };

  return (
    <Modal
      title="Create Dna Sequence"
      okText="Create"
      cancelText="Cancel"
      visible={isModalVisible}
      onOk={onOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" name="sequence_create_modal">
        <Form.Item
          name="sequence"
          label="Sequence"
          rules={[
            {
              required: true,
              message: 'Please enter the dna sequence!',
            },
            {
              pattern: new RegExp(/^[ACTG]+$/),
              message: 'Invalid sequence',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateDna;
