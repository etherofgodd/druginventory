import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";

const DrugsScreen = () => {
  const [drugs, setDrugs] = useState();
  const [category, setCategory] = useState("");
  const [cate, setCate] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");

  const search = async (e, category = "") => {
    e.preventDefault();
    console.log("btn clicked");
    const drugs = await axios.get(
      `http://localhost:6660/api/data/drugs?category=${category}&searchKeyword=${searchKeyword}`
    );
    setDrugs(drugs.data.Drugs);
  };

  useEffect(() => {
    getDrugs(cate, "");
  }, [cate]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const cate = await axios.get("http://localhost:6660/api/data/category");
    setCategory(cate.data.categories);
  };

  const getDrugs = async (category = "", searchKeyword = "") => {
    const drugs = await axios.get(
      `http://localhost:6660/api/data/drugs?category=${category}&searchKeyword=${searchKeyword}`
    );
    setDrugs(drugs.data.Drugs);
  };

  return (
    <>
      <div>
        <div className="section">
          <form onSubmit={search}>
            <label htmlFor="drugs">SEARCH FOR DRUGS HERE</label>
            <input
              type="text"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button>SEARCH</button>
          </form>

          <div className="section_filter">
            <h4>Sort By Categories</h4>
            <select
              name="categories"
              id="categories"
              className="categories_opt"
              onChange={(e) => setCate(e.target.value)}
            >
              <option value="">None</option>
              {category &&
                category.map((cate) => (
                  <option value={cate._id} key={cate._id}>
                    {cate.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div className="section">
        <h1>LIST OF ALL DRUGS</h1>
      </div>
      <div className="drugs">
        {drugs && drugs.length >= 1 ? (
          drugs.map((drug) => (
            <Card
              name={drug.name}
              drugCategory={drug.category.name}
              key={drug._id}
              drugId={drug._id}
            />
          ))
        ) : (
          <div>No Drugs available</div>
        )}
      </div>
    </>
  );
};

export default DrugsScreen;
