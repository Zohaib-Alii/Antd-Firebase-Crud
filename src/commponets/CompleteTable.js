import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  // updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { Table, Space, Button } from "antd";
import EditDataModel from "./EditDataModel";
const CompleteTable = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState("");
  const [currentUserData, setCurrentUserData] = useState();

  const [open, setOpen] = useState(false);

  const currentUser = localStorage.getItem("currentUserID");

  useEffect(() => {
    // table data

    const realTimedata = onSnapshot(
      collection(db, "users", currentUser, "data"),
      (querysnapshot) => {
        debugger;
        const temp = [];
        querysnapshot.docs.forEach((doc) => {
          debugger;
          console.log("querysnapshot", doc);
          temp.push({ ...doc.data(), id: doc.id });
        });
        setTableData(temp);
      }
    );

    return () => {
      realTimedata();
    };
  }, []);
  // first approch call realtime database function (onSnapshot)
  // const fatchData = async () => {
  //   // // old approch
  //   // const data = await getDocs(collection(db, "users"));
  //   // data.forEach((doc) => {
  //   //   temp.push({ ...doc.data(), id: doc.id });
  //   // });
  //   // setTableData(temp);

  //   //real time data fatching with firebase 9
  //   onSnapshot(collection(db, "users"), (doc) => {
  //     debugger;
  //     const temp = [];

  //     doc.forEach((doc) => {
  //       temp.push({ ...doc.data(), id: doc.id });
  //     });
  //     settableData(temp);
  //   });
  // };

  // real time database fetch
  // const data = onSnapshot(collection(db, "users"));

  // onSnapshot(data, (snapshot) => {
  //   snapshot.docs().forEach((doc) => {
  //     temp.push({ ...doc.data(), id: doc.id });
  //   });
  // });

  //   // another approch
  //   const data = collection(db, "users");

  //   const unsub = onSnapshot(doc(db, "users"), (doc) => {
  //     debugger;
  //     temp.push({ ...doc.data(), id: doc.id });
  //     console.log("Current data: ", doc.data());
  //   });
  //   settableData(temp);
  //   console.log(temp, "dataaa", unsub, "unsubscribe");
  // };
  // console.log(tableData, "table data");

  //   {
  //     title: "username",
  //     dataIndex: "username",
  //     key: "username",
  //   },
  //   {
  //     title: "email",
  //     dataIndex: "email",
  //     key: "email",
  //   },
  //   {
  //     title: "month",
  //     dataIndex: "month",
  //     key: "month",
  //   },
  //   {
  //     title: "year",
  //     dataIndex: "year",
  //     key: "year",
  //   },
  // ];
  const handleDelete = async (id) => {
    debugger;
    // wokting for single collection
    // await deleteDoc(doc(db, "users", id));

    // delete nasted collection document with id
    currentUser && (await deleteDoc(doc(db, "users", currentUser, "data", id)));
  };
  // edit handeler here
  const handleEdit = (id) => {
    setSelectedDocId(id);
    // debugger;
    let filteredData = tableData.find((item) => item.id === id);
    setCurrentUserData(filteredData);
    setOpen(true);
  };
  const columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Country ",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Dasignation",
      dataIndex: "dasignation",
      key: "dasignation",
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <main>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </main>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size='middle'>
          <Button type='primary' onClick={() => handleEdit(record.id)}>
            Edit
          </Button>
          <Button type='danger' onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <main>
      <Table key={Math.random()} dataSource={tableData} columns={columns} />
      <EditDataModel
        open={open}
        setOpen={setOpen}
        selectedDocId={selectedDocId}
        currentUserData={currentUserData}
      />
      <div>working perfact </div>
    </main>
  );
};

export default CompleteTable;
