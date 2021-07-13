import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageScreen = () => {
  const [drugs, setDrugs] = useState();

  useEffect(() => {
    getDrugs();
  }, []);

  const getDrugs = async () => {
    const drugs = await axios.get(`http://localhost:6660/api/data/drugs`);
    setDrugs(drugs.data.Drugs);
  };

  const deleteDrug = async (id) => {
    alert("Drug will be deleted");
    try {
      await axios.delete(`http://localhost:6660/api/data/drug/${id}`);
      toast.success("Drug deleted");
    } catch (error) {
      toast.error("Unable to delete drug");
    }
  };

  const editDrug = (id) => {
    window.location.replace(`/manage/${id}`);
  };
  return (
    <div className="list">
      <div>
        <table className="table">
          <thead>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Dosage</th>
            <th>Side Effects</th>
            <th>Actions</th>
          </thead>

          <tbody>
            {drugs &&
              drugs.map((drug) => {
                return (
                  <tr key={drug._id}>
                    <td data-label="Name">{drug.name}</td>
                    <td data-label="Category">{drug.category.name}</td>
                    <td data-label="Price">{drug.price}</td>
                    <td data-label="Dosage">{drug.dosage}</td>
                    <td data-label="Side Effects">{drug.sideEffects}</td>
                    <td data-label="Actions">
                      <button
                        className="table_btn"
                        style={{ background: "blue", color: "white" }}
                        onClick={() => editDrug(drug._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="table_btn"
                        style={{ background: "red", color: "white" }}
                        onClick={() => deleteDrug(drug._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageScreen;
