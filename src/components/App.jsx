import { useState, useEffect } from "react";
import Loading from "./Loader";
import Navbar from "./Navbar";
import Home from "./Home";

function App() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const API_URL = "https://jsonplaceholder.typicode.com/todos";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const todoData = await response.json();
      setData(todoData);
      setLoader(false);
    } catch (error) {
      console.log("Error in fetching data", error);
      setLoader(false);
    }
  };

  return (
    <>
      <div className="App">
        <Navbar />
        {loader ? (
          <div>
            <Loading />
          </div>
        ) : (
          <Home data={data} />
        )}
      </div>
    </>
  );
}

export default App;
