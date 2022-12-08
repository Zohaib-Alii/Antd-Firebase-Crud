import React, { useEffect } from "react";
import { Button, Form, Modal, Input, Space } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/Firebase";
const EditDataModel = ({ open, setOpen, selectedDocId, currentUserData }) => {
  const currentUser = localStorage.getItem("currentUserID");
  useEffect(() => {
    debugger;
    console.log("*", currentUserData);
  }, [currentUserData]);
  //   on submit edit model
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    console.log(currentUser);
    if (selectedDocId) {
      try {
        const documnetRef = doc(
          db,
          "users",
          currentUser,
          "data",
          selectedDocId
        );
        await updateDoc(documnetRef, values);
        setOpen(false);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert("please select a document to edit ");
    }
  };
  return (
    <Modal
      open={open}
      title='Edit Data'
      // onOk={handleOk}
      onCancel={() => setOpen(false)}
      footer={[
        <Button key='back' onClick={() => setOpen(false)}>
          Cancel
        </Button>,
      ]}>
      <Form
        name='complex-form'
        onFinish={onFinish}
        initialValues={currentUserData}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}>
        <Form.Item label='Name'>
          <Space>
            <Form.Item
              name='name'
              noStyle
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
              ]}>
              <Input
                style={{
                  width: 160,
                }}
                placeholder='Please input'
              />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item label='Email'>
          <Space>
            <Form.Item
              name='email'
              noStyle
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
              ]}>
              <Input
                style={{
                  width: 160,
                }}
                placeholder='Please Enter Email'
              />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item label='Country'>
          <Space>
            <Form.Item
              name='country'
              noStyle
              rules={[
                {
                  required: true,
                  message: "Country is required",
                },
              ]}>
              <Input
                style={{
                  width: 160,
                }}
                placeholder='Please Enter Country'
              />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item label='Dasignation'>
          <Space>
            <Form.Item
              name='dasignation'
              noStyle
              rules={[
                {
                  required: true,
                  message: "dasignation is required",
                },
              ]}>
              <Input
                style={{
                  width: 160,
                }}
                placeholder='Please Enter dasignation'
              />
            </Form.Item>
          </Space>
        </Form.Item>{" "}
        <Form.Item label=' ' colon={false}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditDataModel;
