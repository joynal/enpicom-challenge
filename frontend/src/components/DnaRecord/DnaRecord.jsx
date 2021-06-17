import { Table } from 'antd';
import { useRecoilValue } from 'recoil';
import React, { useEffect } from 'react';

import { dnaRecord } from '../../recoil/atoms';
import { getDnaRecords } from '../../api/dnaRecord';

const DnaRecord = () => {
  const { fetchDnaRecord } = getDnaRecords();
  const records = useRecoilValue(dnaRecord);

  useEffect(() => {
    fetchDnaRecord();
  }, []);

  if (!records) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      title: 'Sequence',
      dataIndex: 'sequence',
    },
  ];

  return (
    <Table columns={columns} dataSource={records} pagination={false} rowKey={(item) => item.id} />
  );
};

export default DnaRecord;
