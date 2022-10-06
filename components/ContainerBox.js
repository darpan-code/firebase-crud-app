import { useEffect, useState, useContext } from "react";
import UpdateForm from "./UpdateForm";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { LocalDataContext } from "../pages/index";

const ContainerBox = () => {
  const [loading, setLoading] = useState(false);
  const { localData, setLocalData } = useContext(LocalDataContext);

  useEffect(() => {
    const getData = async () => {
      let data = [];
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "students"));

      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        data.push({ ...doc.data(), id: doc.id });
        // console.log(data);
        setLocalData(data);
      });
      setLoading(false);
    };
    getData();
  }, [setLocalData]);

  // onSnapshot(collection(db, "students"), (snapshot) => {
  //   let data = [];
  //   snapshot.docs.forEach((doc) => {
  //     data.push({ ...doc.data(), id: doc.id });
  //   });
  //   setAllData(data);
  // });

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h1 className="text-center">Loading...</h1>
        ) : (
          localData?.map((item, index) => <Box key={index} data={item} />)
        )}
      </div>
    </div>
  );
};

const Box = ({ data }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id, name, roll } = data;

  const { localData, setLocalData } = useContext(LocalDataContext);

  const deleteData = async (id) => {
    setLoading(true);
    await deleteDoc(doc(db, "students", id));
    const data = localData?.filter((item, i) => item.id !== id);
    setLocalData(data);
    setLoading(false);
  };

  return (
    <div className="col-3 mt-4">
      <div
        className="p-5 fs-5 rounded position-relative"
        style={{ background: "#ebebeb" }}
      >
        <div className="edit" onClick={() => setShow(!show)}>
          Edit
        </div>
        <div onClick={() => deleteData(id)} className="delete">
          {loading ? "Deleting" : "Delete"}
        </div>
        <div className="mb-2">
          <span className="fw-semibold">Name: </span> {name}
        </div>
        <div>
          <span className="fw-semibold">Roll: </span> {roll}
        </div>
      </div>
      <style jsx>{`
        .edit {
          background: green;
          color: white;
          padding: 2px 4px;
          position: absolute;
          top: 5px;
          right: 75px;
          border-radius: 4px;
          cursor: pointer;
        }
        .delete {
          background: red;
          color: white;
          padding: 2px 4px;
          position: absolute;
          top: 5px;
          right: 5px;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
      <UpdateForm data={data} show={show} />
    </div>
  );
};

export default ContainerBox;
