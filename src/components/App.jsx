import { useState } from "react";
import Loading from "./Loader";
import Navbar from "./Navbar";

function App() {
  const [Loader, setLoader] = useState(true);
  return (
    <>
      <div className="App">
        <Navbar />
      </div>
    </>
  );
}

export default App;
