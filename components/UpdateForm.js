import { useContext, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { LocalDataContext } from "../pages/index";

const UpdateForm = ({ show, data }) => {
  const [formData, setFormData] = useState({
    name: data.name,
    roll: data.roll,
  });

  const { localData, setLocalData } = useContext(LocalDataContext);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataRef = doc(db, "students", data.id);

    await updateDoc(dataRef, {
      name: formData.name,
      roll: formData.roll,
    });

    const updatedata = localData?.map((item, i) => {
      if (item.id === data.id) {
        return { ...item, name: formData.name, roll: formData.roll };
      } else {
        return { ...item };
      }
    });

    setLocalData(updatedata);

    setLoading(false);
    // setFormData({
    //   name: "",
    //   roll: "",
    // });
  };

  return (
    <div className={`container ${show ? "d-block" : "d-none"}`}>
      <div className="row">
        <div className="col mx-auto my-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                class="form-control"
                onChange={handleChange}
                value={formData.name}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Roll</label>
              <input
                type="text"
                name="roll"
                class="form-control"
                onChange={handleChange}
                value={formData.roll}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
