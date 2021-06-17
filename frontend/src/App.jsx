import React from 'react';
import { Layout } from 'antd';
import { RecoilRoot } from 'recoil';

import 'antd/dist/antd.css';

import CreateDna from './components/CreateDna/Form';
import DnaRecord from './components/DnaRecord/DnaRecord';
import SearchBar from './components/SearchBar/SearchBar';

const App = () => (
  <RecoilRoot>
    <Layout style={{ height: '100%', padding: '10em 10em' }}>
      <SearchBar />
      <DnaRecord />
      <CreateDna />
    </Layout>
  </RecoilRoot>
);

export default App;
