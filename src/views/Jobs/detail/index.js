import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import emptyImage from "../../../assets/img/empty.jpg";
import Header from "../../../components/Header";
import parse from "html-react-parser";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dataDetail, SetDataDetail] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate("/");
      return
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
      );
      const newData = await response.json();
      SetDataDetail(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <Header>
      {" "}
      <div>
        <div className="container">
          <div>
            <span>
              {dataDetail.type} / {dataDetail.location}
            </span>
          </div>
          <h3>{dataDetail.title}</h3>
          <hr />
          <div className="row">
            <div className="col-9">
              {dataDetail?.description ? parse(dataDetail?.description) : "-"}
            </div>
            <div className="col-3">
              <div className="row">
                <div className="card p-0">
                  <div className="card-header bg-success text-light">
                    {dataDetail.company}
                  </div>
                  <div className="card-body">
                    <img
                      src={
                        dataDetail.company_logo
                          ? dataDetail.company_logo
                          : emptyImage
                      }
                      className="card-img-top"
                      alt="..."
                    ></img>
                    <br />
                    <a
                      href={dataDetail.company_url}
                      className="btn btn-success"
                    >
                      Visit Company
                    </a>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="card p-0">
                  <div className="card-header bg-success text-light">
                    How To Apply
                  </div>
                  <div className="card-body">
                    {dataDetail?.how_to_apply
                      ? parse(dataDetail?.how_to_apply)
                      : "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Detail;
