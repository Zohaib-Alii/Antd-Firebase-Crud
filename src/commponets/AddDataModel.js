import { Button, Form, Modal, Input, Space } from "antd";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/Firebase";

const AddDataModel = ({ open, setOpen }) => {
  //usman bahi rendom string genrator
  const makeId = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  // usman bahi code  const currentUser = makeId(20);

  // add data handler here
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    debugger;
    const currentUser = localStorage.getItem("currentUserID");
    console.log(currentUser);
    try {
      // woorking properly for single collection
      // const docRef = await addDoc(collection(db, "users"), values);
      // working properly for multiple collection
      // await addDoc(
      //   collection(db, "users", "usersDocument", currentUser),
      //   values
      // );

      // issue hereeee  ---------888
      // usman bahi code  await setDoc(doc(db, "users", currentUser), values);
      // usman bahi code  await db().collection("users").doc(currentUser).set({ values });
      // await setDoc(collection(db, "users", currentUser), values);
      debugger;
      await addDoc(collection(db, "users", currentUser, "data"), values);
      setOpen(false);
    } catch (e) {
      debugger;
      console.error("Error adding document: ", e);
    }
  };
  return (
    <Modal
      open={open}
      title='Add Data'
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

export default AddDataModel;
