import axios from "axios";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";

const DrugDetailsScreen = () => {
  const match = useRouteMatch();
  const [drug, setDrug] = useState();

  useEffect(() => {
    getDrugDetails(match.params.id);
  }, [match]);

  const getDrugDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:6660/api/data/drug/${id}`
      );
      setDrug(response.data.drug);
    } catch (error) {
      toast.error("Could not retrieve drug details");
    }
  };

  return (
    <div className="field">
      {drug && (
        <>
          <div className="field_name">{drug.name}</div>
          <div className="field_price">
            Price:
            <span>₦{drug.price}</span>
          </div>
          <div className="field_category">
            Drug Category:
            <span>{drug.category.name}</span>
          </div>

          <div className="field_dosage">
            Drug Dosage: <span>{drug.dosage}</span>
          </div>

          <div className="field_desc">{drug.desc}</div>

          <div className="field_effects">
            SideEffects:
            <span>{drug.sideEffects}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default DrugDetailsScreen;
