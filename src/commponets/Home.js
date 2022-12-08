import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "antd";
import Table from "./CompleteTable";
import { auth } from "./../firebase/Firebase";
import { signOut } from "firebase/auth";
import AddDataModel from "./AddDataModel";
import { useNavigate } from "react-router-dom";
import "./home.css";
const Home = () => {
  const navigate = useNavigate();

  //   handle add data model\
  const [open, setOpen] = useState(false);
  const handleAddDataModel = () => {
    // console.log("model open ");
    setOpen(true);
  };
  // on submit event handler

  //   const [tableData, settableData] = useState([]);
  //   //  useEffects render on every render
  //   useEffect(() => {
  //     fatchData();
  //   }, []);
  //   // fatchData from database method
  //   const fatchData = async () => {
  //     const temp = [];
  //     // // old approch
  //     // const data = await getDocs(collection(db, "users"));
  //     // data.forEach((doc) => {
  //     //   temp.push({ ...doc.data(), id: doc.id });
  //     // });
  //     // settableData(temp);

  //     //real time data fatching with firebase 9
  //     onSnapshot(collection(db, "users"), (doc) => {
  //       debugger;
  //       doc.forEach((doc) => {
  //         temp.push({ ...doc.data(), id: doc.id });
  //       });
  //       console.log(temp);
  //       settableData(temp);
  //     });

  //     console.log("test ", temp);
  //   };
  const handleLogout = () => {
    console.log("logout");
    signOut(auth)
      .then(() => {
        navigate("/login");
        localStorage.clear();
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <Row style={{ height: "100vh" }}>
      <Col span={3} style={{ backgroundColor: "#69c0ff" }}>
        left side{" "}
      </Col>
      <Col span={21}>
        <div style={{ backgroundColor: "#69c0ff", height: "10vh" }}>
          <h3>Navbar</h3>
        </div>
        <div className='mainContaier'>
          <Button
            className='addDataBtn'
            type='primary'
            onClick={handleAddDataModel}>
            ADD Data
          </Button>
          <Table />
          <Button type='secondary' onClick={handleLogout}>
            Logout
          </Button>
          <AddDataModel open={open} setOpen={setOpen} />
        </div>
      </Col>{" "}
    </Row>
  );
};

export default Home;
