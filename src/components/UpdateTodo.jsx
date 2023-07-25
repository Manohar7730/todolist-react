import { useState } from "react";

function UpdateTodo({ todo, onUpdate }) {
  const [title, setTitle] = useState(todo.title);
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    const updatedTodo = { ...todo, title };
    onUpdate(updatedTodo);
  };
  return (
    <div className="UpdatedTodo">
      <input type="text" value={title} onChange={handleChange} />
      <button onClick={handleSubmit}>Update Title</button>
    </div>
  );
}

export default UpdateTodo;
