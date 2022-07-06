import React from 'react';
import './App.scss';
import {Grid, Layout, Col, Row} from 'antd';
import 'antd/dist/antd.min.css';
import Search from "antd/es/input/Search";

const { Header, Footer, Content } = Layout;
const onSearch = (value: string) => console.log(value);

function App() {
  return (
        <Col className="App">
            <Col sm={1} md={2} lg={4} xl={4} xxl={4}> </Col>
            <Col className={'main-area'}>
                <Header className={'main-header'}>
                        Logo
                        <Search className={'search-field'} placeholder={"Поиск..."} onSearch={onSearch} enterButton/>
                </Header>
                <Content className={'main-content'}>
                    <div className={'modules-area'}>
                        
                    </div>
                    <Footer className={'main-footer'}>Контактные данные 89241237687</Footer>

                </Content>
            </Col>
            <Col sm={1} md={2} lg={4} xl={4} xxl={4}> </Col>
        </Col>
  );
}

export default App;
