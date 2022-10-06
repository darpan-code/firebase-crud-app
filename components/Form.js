import { useContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { LocalDataContext } from "../pages/index";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
  });

  const [loading, setLoading] = useState(false);

  const { localData, setLocalData } = useContext(LocalDataContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Add a new document with a generated id.
    const addData = await addDoc(collection(db, "students"), {
      name: formData.name,
      roll: formData.roll,
    });

    setLocalData([
      ...localData,
      { id: addData.id, name: formData.name, roll: formData.roll },
    ]);

    setLoading(false);

    setFormData({
      name: "",
      roll: "",
    });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-4 mx-auto my-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                onChange={handleChange}
                name="name"
                type="text"
                class="form-control"
                value={formData.name}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roll" className="form-label">
                Roll
              </label>
              <input
                onChange={handleChange}
                name="roll"
                type="text"
                class="form-control"
                value={formData.roll}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {loading ? "Adding..." : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
