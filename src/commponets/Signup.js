import React from "react";
import { Button, Checkbox, Form, Input, Col, Row } from "antd";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  //   new user created
  const onFinish = (values) => {
    debugger;
    const { email, password } = values;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        debugger;
        console.log(user, "user created ");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        debugger;
        console.log(errorMessage);
        // ..
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className='site-card-wrapper'>
        <Row justify='space-around' align='middle'>
          <Col span={2}></Col>
          <Col
            span={20}
            style={{
              backgroundColor: "#d6e4ff",
              height: "100vh",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Form
              name='basic'
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'>
              <Form.Item
                label='Your Email'
                name='email'
                type='email'
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}>
                <Input />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}>
                <Input.Password />
              </Form.Item>

              <Form.Item
                name='remember'
                valuePropName='checked'
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    </div>
  );
};

export default Signup;
