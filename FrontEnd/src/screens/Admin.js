import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Admin = () => {
  const [category, setCategory] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/signin");
    }

    getCategories();
  }, []);

  const cateNameinput = useRef();

  const drugNameinput = useRef();
  const drugDosageinput = useRef();
  const drugPriceinput = useRef();
  const drugEffectinput = useRef();
  const drugDescinput = useRef();
  const drugIdCateinput = useRef();

  const createCategory = async (e) => {
    e.preventDefault();
    const name = cateNameinput.current.value;

    try {
      await axios.post("http://localhost:6660/api/data/category", {
        name,
      });
      toast.success("Category created");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const createDrug = async (e) => {
    e.preventDefault();

    const name = drugNameinput.current.value;
    const desc = drugDescinput.current.value;
    const category = drugIdCateinput.current.value;
    const dosage = drugDosageinput.current.value;
    const price = drugPriceinput.current.value;
    const sideEffects = drugEffectinput.current.value;
    try {
      await axios.post("http://localhost:6660/api/data/drugs", {
        name,
        desc,
        category,
        dosage,
        price,
        sideEffects,
      });

      toast.success("Drug Added");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getCategories = async () => {
    const cate = await axios.get("http://localhost:6660/api/data/category");
    setCategory(cate.data.categories);
  };

  return (
    <div className="admin">
      <div className="category">
        <form onSubmit={createCategory}>
          <div className="label">
            <label htmlFor="category">Enter drug category</label>
          </div>
          <div>
            <input
              type="text"
              name="category"
              id="category"
              required
              className="cate_input"
              ref={cateNameinput}
            />
          </div>
          <button className="cate_btn">Create category</button>
        </form>
      </div>

      <div className="drug">
        <form onSubmit={createDrug}>
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
              ref={drugNameinput}
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
              ref={drugDosageinput}
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
              ref={drugPriceinput}
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
              ref={drugEffectinput}
              required
              className="drug_input"
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
              ref={drugDescinput}
              className="drug_textArea"
            />
          </div>
          <div>
            <select
              name="categories"
              id="categories"
              className="categories_opt"
              ref={drugIdCateinput}
            >
              {category &&
                category.map((cate) => (
                  <option value={cate._id} key={cate._id}>
                    {cate.name}
                  </option>
                ))}
            </select>
          </div>

          <button className="drug_btn">Create drug</button>
        </form>
      </div>
      <div className="link">
        <Link to="/admin/manage">Manage</Link>
      </div>
    </div>
  );
};

export default Admin;
