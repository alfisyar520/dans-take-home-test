import React, {useEffect} from "react";
import InfiniteTable from "../../components/InfiniteTable";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate("/");
      return
    }
  }, []);
  return (
    <Header>
      <div class="container">
        <InfiniteTable url="http://dev3.dansmultipro.co.id/api/recruitment/positions.json" />
      </div>
    </Header>
  );
};

export default Jobs;
