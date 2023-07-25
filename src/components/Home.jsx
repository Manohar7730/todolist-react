import AddTodo from "./AddTodo";

function Home({ data, setData }) {
  const API_URL = "https://jsonplaceholder.typicode.com/todos";

  const handleAddTodo = async (newTodo) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      const addTodo = await response.json();
      setData((prevData) => [...prevData, addTodo]);
    } catch (error) {
      console.log("Error in adding Todo", error);
    }
  };
  return (
    <>
      <AddTodo onAdd={handleAddTodo} />
      <div className="Home">
        <div>
          {data
            .slice()
            .reverse()
            .map((item) => (
              <div key={item.id}>
                <div className="title">{item.title}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;
