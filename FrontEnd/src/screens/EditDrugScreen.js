import axios from "axios";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";

const EditDrugScreen = () => {
  const [category, setCategory] = useState();
  const [drug, setDrug] = useState();

  const [drugName, setDrugName] = useState("");
  const [drugDosage, setDrugDosage] = useState("");
  const [drugPrice, setDrugPrice] = useState("");
  const [drugeffect, setDrugeffect] = useState("");
  const [drugdesc, setDrugdesc] = useState("");
  const [drugCateId, setDrugCateId] = useState("");

  const match = useRouteMatch();

  const updateDrug = async (e, id) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:6660/api/data/drug/${id}`, {
        name: drugName,
        desc: drugdesc,
        category: drugCateId,
        dosage: drugDosage,
        price: drugPrice,
        sideEffects: drugeffect,
      });

      toast.success("Drug Updated");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getCategories();
    getDrugDetails(match.params.id);
  }, [match]);

  const getCategories = async () => {
    const cate = await axios.get("http://localhost:6660/api/data/category");
    setCategory(cate.data.categories);
  };

  const getDrugDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:6660/api/data/drug/${id}`
      );

      const drug = response.data.drug;
      setDrug(drug);
      setDrugName(drug.name);
      setDrugDosage(drug.dosage);
      setDrugPrice(drug.price);
      setDrugdesc(drug.desc);
      setDrugeffect(drug.sideEffects);
      setDrugCateId(drug.category);
    } catch (error) {
      toast.error("Could not retrieve drug details");
    }
  };

  return (
    <div className="update">
      {drug ? (
        <div className="drug">
          <form onSubmit={(e) => updateDrug(e, match.params.id)}>
            <div className="label">
              <label htmlFor="drugname">Enter drug name</label>
            </div>
            <div>
              <input
                type="text"
                name="drugname"
                id="drugname"
                required
                className="drug_input"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
              />
            </div>
            <div className="label">
              <label htmlFor="dosage">Enter drug dosage</label>
            </div>
            <div>
              <input
                type="text"
                name="dosage"
                id="dosage"
                required
                className="drug_input"
                value={drugDosage}
                onChange={(e) => setDrugDosage(e.target.value)}
              />
            </div>

            <div className="label">
              <label htmlFor="price">Enter drug price</label>
            </div>
            <div>
              <input
                type="number"
                name="price"
                id="price"
                required
                className="drug_input"
                value={drugPrice}
                onChange={(e) => setDrugPrice(e.target.value)}
              />
            </div>
            <div className="label">
              <label htmlFor="effects">Enter drug side effects</label>
            </div>
            <div>
              <input
                type="text"
                name="effects"
                id="effects"
                required
                className="drug_input"
                onChange={(e) => setDrugeffect(e.target.value)}
                value={drugeffect}
              />
            </div>
            <div className="label">
              <label htmlFor="desc">Enter drug description</label>
            </div>
            <div>
              <textarea
                type="text"
                name="desc"
                id="desc"
                required
                value={drugdesc}
                onChange={(e) => setDrugdesc(e.target.value)}
                className="drug_textArea"
              />
            </div>
            <div>
              <select
                name="categories"
                id="categories"
                className="categories_opt"
                onChange={(e) => setDrugCateId(e.target.value)}
                defaultValue="default"
              >
                <option value={drugCateId.id}>{drugCateId.name}</option>
                {category &&
                  category.map((cate) => (
                    <option value={cate._id} key={cate._id}>
                      {cate.name}
                    </option>
                  ))}
              </select>
            </div>

            <button className="drug_btn">Update drug</button>
          </form>
        </div>
      ) : (
        <div>No drug found</div>
      )}
    </div>
  );
};

export default EditDrugScreen;
