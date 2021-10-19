import React, { useState } from 'react';
import { Result, Layout, Steps, Menu, PageHeader, Row, Col, Form, Input, Button, Checkbox, Divider } from 'antd';
import { PrinterOutlined, EditOutlined, FileZipOutlined, CheckCircleOutlined, LinkOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './index.css';
const { TextArea } = Input;
const { Step } = Steps;
const { Header, Content, Footer } = Layout;
const axios = require('axios').default;


function App() {
  const [name, setName] = useState("输入队伍编号...");
  const [current, setCurrent] = React.useState(0);
  const onFinish = (values) => {
    console.log('Success:', values);
    setName(values.name);
    setCurrent(current + 1);
    console.log(name);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onPasteFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onPasteFinish = (values) => {
    console.log('Success:', values);
    console.log(values.code);
    axios.post('/api/', {
      no: name,
      code: values.code
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setCurrent(current + 1);
  }
  return (
    <Layout>
      <Header>
        <Menu selectedKeys={["home"]} mode="horizontal" theme="light" >
          <Menu.Item key="home" icon={<PrinterOutlined />}>
            代码打印
          </Menu.Item>
          <Menu.Item key="noj" icon={<img src='https://acm.njupt.edu.cn/favicon.png' height='17'/>}>
            <a href="https://acm.njupt.edu.cn/" target="_blank" rel="noopener noreferrer">
              NOJ
            </a>
          </Menu.Item>
          <Menu.Item key="xjzsq" icon={<LinkOutlined />}>
            <a href="https://xjzsq.cn" target="_blank" rel="noopener noreferrer">
              青い記憶
            </a>
          </Menu.Item>
        </Menu>
      </Header>
      <Row>
        <Col span={18} offset={3}>
          <Content>
            <PageHeader title="南邮ACM校队真题模拟训练赛代码打印">
              <Steps>
                <Step status={current > 0 ? "finish" : "process"} title="填写队伍编号" icon={<EditOutlined />} />
                <Step status={current > 1 ? "finish" : current < 1 ? "wait" : "process"} title="粘贴打印代码" icon={<FileZipOutlined />} />
                <Step status={current > 2 ? "finish" : current < 2 ? "wait" : "process"} title="完成~" icon={<CheckCircleOutlined />} />
              </Steps>
            </PageHeader>
            <Divider />
            {current == 0 && (
              <Form
                {...layout}
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="队伍编号"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: '输入队伍编号...',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                  <Checkbox>记住信息</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" >
                    下一步
                  </Button>
                </Form.Item>
              </Form>
            )}
            {current == 1 && (
              <Form
                {...layout}
                name="basic"
                onFinish={onPasteFinish}
                onFinishFailed={onPasteFinishFailed}
              >
                <Form.Item {...textLayout}
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: '输入代码...',
                    },
                  ]}>
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item {...textLayout} style={{ margin: 'auto' }}>
                  <Button type="primary" htmlType="submit"  >
                    打印
                  </Button>
                </Form.Item>
              </Form>

            )}
            {current == 2 && (
              <Result
                status="success"
                title="提交打印成功！"
                subTitle="请耐心等待志愿者将代码送达。如需重新提交请刷新页面重新打印"
              // extra={[
              //   <Button type="primary" key="console">
              //     Go Console
              //   </Button>,
              // ]}
              />
            )}
          </Content>
        </Col>
      </Row>
      <Footer style={{ textAlign: 'center' }}>
        代码打印系统  @2021 Crafted with ❤ by <a href="http://d1.fan" target="_blank">xjzsq </a>,
        Powered by < a href="https://reactjs.org/" > React </a >
      </Footer >
    </Layout >
  );
}

export default App;

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const textLayout = {
  wrapperCol:
  {
    offset: 3,
    span: 18
  }
}
