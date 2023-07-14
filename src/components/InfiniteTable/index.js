import React, { useState, useEffect, useCallback } from "react";
import moment from "moment/moment";
import SearchBar from "../SearchBar";
import { Link } from "react-router-dom";

const InfiniteTable = ({ url }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    fetchData();
    // Clean up
    return () => {
      // Perform cleanup if necessary
    };
  }, []);

  const fetchData = useCallback(
    async (retainOldData = true) => {
      console.log("fetch");
      setIsLoading(true);

      try {
        const urlParams = new URLSearchParams(searchQuery);
        const response = await fetch(`${url}?${urlParams}`);
        const newData = await response.json();

        setData((prevData) =>
          Object.keys(searchQuery).length === 0 && retainOldData
            ? [...prevData, ...newData]
            : [...newData]
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setIsLoading(false);
    },
    [searchQuery]
  );

  const handleScroll = (event) => {
    console.log("handlescroll");
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    console.log(scrollHeight, scrollTop, clientHeight);
    if (scrollHeight - scrollTop < clientHeight) {
      fetchData();
    }
  };

  const convertDays = (date) => {
    let days = moment(date).fromNow();
    return days;
  };

  const handleSearch = () => {
    fetchData(false);
  };

  const onCheckboxChange = (isChecked) => {
    handleInputChange("full_time", isChecked);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onCheckboxChange(!isChecked);
  };

  const handleInputChange = (field, event) => {
    let newQuery = { ...searchQuery };
    if (!event || event?.target?.value === "") {
      delete newQuery[field];
    } else {
      newQuery = {
        ...searchQuery,
        [field]: event?.target ? event.target.value : event,
      };
    }
    setSearchQuery(newQuery);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search Job Description"
          value={searchQuery["description"]}
          onChange={(e) => handleInputChange("description", e)}
        />
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search Location"
          value={searchQuery["location"]}
          onChange={(e) => handleInputChange("location", e)}
        />
        <input
          id="checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="me-2"
        />
        <span className="w-100 m-auto">Full time only</span>
      </SearchBar>
      <div
        style={{ height: "100vh", overflowY: "auto", OverflowX: "hidden" }}
        onScroll={handleScroll}
      >
        <table className="table table-striped">
          <tbody>
            {data.map((item) => (
              <tr>
                <div class="row justify-content-between">
                  <Link
                    to={item.id}
                    className="col-10 fw-bold"
                    style={{ color: "blue", textDecoration: "none" }}
                  >
                    {item.title}
                  </Link>
                  <div class="col-2 fw-light">{item.location}</div>
                </div>
                <div class="row justify-content-between">
                  <div class="col-10">
                    <span>{item.company}</span> -{" "}
                    <span className="fw-bold" style={{ color: "green" }}>
                      {item.type}
                    </span>
                  </div>
                  <div class="col-2 fw-lighter">
                    {convertDays(item.created_at)}
                  </div>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <div>Loading...</div>}
      </div>
    </>
  );
};

export default InfiniteTable;
