import { useState } from "react";
import AddTodo from "./AddTodo";
import UpdateTodo from "./UpdateTodo";
import styles from "../styles/Home.module.css";

function Home({ data, setData }) {
  const [selectedTodoId, setSelectedTodoId] = useState(null);
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
  const handleUpdateTodo = async (updatedTodo) => {
    try {
      const response = await fetch(`${API_URL}/${updatedTodo.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      setData((prevData) => {
        return prevData.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
      });
      setSelectedTodoId(null);
    } catch (error) {
      console.log("Error in updating todo", error);
    }
  };

  const handleToggleTodo = async (id) => {
    const todoToToggle = data.find((todo) => todo.id === id);
    if (!todoToToggle) return;

    const updatedTodo = { ...todoToToggle, completed: !todoToToggle.completed };
    handleUpdateTodo(updatedTodo);
  };
  return (
    <>
      <AddTodo onAdd={handleAddTodo} />
      <div className={styles.Home}>
        {data.map((item) => (
          <div className={styles.Todo} key={item.id}>
            {selectedTodoId === item.id ? (
              <UpdateTodo
                todo={item}
                onUpdate={handleUpdateTodo}
                onCancel={() => setSelectedTodoId(null)}
              />
            ) : (
              <>
                <div className={styles.Status}>
                  <div className="title">{item.title}</div>
                  <div
                    className={
                      item.completed ? styles.Completed : styles.NotCompleted
                    }
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleToggleTodo(item.id)}
                    />
                  </div>
                </div>

                <div className={styles.Controls}>
                  <img
                    className={styles.edit}
                    id="edit"
                    src="https://cdn-icons-png.flaticon.com/128/1342/1342558.png"
                    alt="Edit"
                    onClick={() => setSelectedTodoId(item.id)}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
