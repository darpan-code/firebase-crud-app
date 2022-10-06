import { createContext, useState } from "react";
import ContainerBox from "../components/ContainerBox";
import Form from "../components/Form";

const LocalDataContext = createContext();

const HomePage = () => {
  const [localData, setLocalData] = useState([{ id: "", name: "", roll: "" }]);
  return (
    <>
      <LocalDataContext.Provider value={{ localData, setLocalData }}>
        <Form />
        <ContainerBox />
      </LocalDataContext.Provider>
    </>
  );
};

export default HomePage;
export { LocalDataContext };
