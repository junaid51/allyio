import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ListItem from "./components/ListItem";
import Filter from "./components/Filter";

function App() {
  const [data, setData] = useState([]); // state to store original data
  const [filteredData, setFilteredData] = useState([]); // state to store the filtered data
  const [loading, setLoading] = useState(true); // to show loading indicator when data is being fetched

  useEffect(() => {
    const url = "https://okrcentral.github.io/sample-okrs/db.json";
    fetch(url) // to get the data from the provided api
      .then((res) => res.json()) // convert the response to json
      .then(({ data }) => {
        // extract data
        if (data && data.length) {
          // if data exists continue
          const parents = data.filter((f) => !f.parent_objective_id); // identify all the parents
          parents.forEach((parent) => {
            // attach child objects to parents by matching their ids
            parent.children = data.filter(
              (child) =>
                child.parent_objective_id &&
                child.parent_objective_id === parent.id
            );
          });
          setData(parents); // set original data
          setFilteredData(parents); // set filtered data as original data
        }
      })
      .catch((err) => console.log(err)) // Did not get enough time to implement error boundaries
      .finally(() => setLoading(false)); // once request is complete, remove loading indicator
    return () => {}; // cleanup, left blank for now
  }, []); // blank array of dependencies makes sure the effect runs only once

  const filterData = (value) => {
    // function that will filter the data based on category that is entered by the user
    const filteredData = data.filter(
      (f) => f.category.toLowerCase() === value.toLowerCase()
    );
    setFilteredData(!value ? data : filteredData); // if the user clears input, reverting back to original data set to show all objects
  };

  return (
    <div className="App">
      <Header />
      <Filter filterData={filterData} />
      <div className="container">
        {!loading &&
          filteredData.length > 0 && ( //check if not loading and data is fetched
            <ul>
              {filteredData.map((parent, i) => {
                //render a list of data that is created above in the effect
                return (
                  <ListItem // split parent list items into individual components
                    key={parent.id} // unique identifier
                    value={parent.title}
                    children={parent.children}
                  />
                );
              })}
            </ul>
          )}
        {!loading &&
          filteredData.length === 0 && ( // if loading is complete and there is no data returned from API
            <div className="no-data">No data found...!!</div>
          )}
        {loading && <div className="no-data">Loading......</div>}
      </div>
    </div>
  );
}

export default App;
