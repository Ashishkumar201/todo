import { useState } from "react";
import { Navbar } from "./components/Navbar";

function App() {
  const [todo, setTodo] = useState(""); // Current input value for a to-do
  const [lists, setLists] = useState([{ id: 1, todos: [] }]); // Array of lists with to-dos
  const [activeListId, setActiveListId] = useState(1); // ID of the currently active list

  const handleAdd = () => {
    if (todo.trim() === "") return; // Prevent adding empty todos
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === activeListId
          ? { ...list, todos: [...list.todos, { todo, isCompleted: false }] }
          : list
      )
    );
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleDeleteTodo = (listId, index) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, todos: list.todos.filter((_, i) => i !== index) }
          : list
      )
    );
  };

  const handleEdit = (listId, index) => {
    const list = lists.find((list) => list.id === listId);
    const todoToEdit = list.todos[index].todo;
    setTodo(todoToEdit);
    handleDeleteTodo(listId, index); // Remove the item from the list to allow editing
  };

  const handleAddList = () => {
    const newId = lists.length > 0 ? Math.max(...lists.map((list) => list.id)) + 1 : 1;
    setLists([...lists, { id: newId, todos: [] }]);
    setActiveListId(newId); // Set the newly created list as active
  };

  const handleSwitchList = (listId) => {
    setActiveListId(listId); // Switch to the selected list
  };

  const handleDeleteList = (listId) => {
    const filteredLists = lists.filter((list) => list.id !== listId);
    setLists(filteredLists);

    // Update active list if the deleted list was the active one
    if (listId === activeListId && filteredLists.length > 0) {
      setActiveListId(filteredLists[0].id);
    } else if (filteredLists.length === 0) {
      setActiveListId(null); // No active list if all are deleted
    }
  };

  const handleToggleComplete = (listId, index) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              todos: list.todos.map((todo, i) =>
                i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
              ),
            }
          : list
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="container  mx-10 my-2 rounded-xl bg-violet-100 p-5 min-h-[80vh]">
        <div className="flex gap-10 items-center">
          <div className="text-xl font-bold">To-Do App</div>
          <button
            className="p-3 py-1 bg-violet-800 hover:bg-violet-950 text-white rounded-md"
            onClick={handleAddList}
          >
            Add a List
          </button>
        </div>

        <div className="my-5">
          <div className="text-lg font-bold">Select a List:</div>
          {lists.map((list) => (
            <div key={list.id} className="flex items-center my-2">
              <button
                onClick={() => handleSwitchList(list.id)}
                className={`p-2 ${
                  list.id === activeListId
                    ? "bg-violet-950 text-white"
                    : "bg-violet-300"
                } rounded-md mr-2`}
              >
                List {list.id}
              </button>
              <button
                onClick={() => handleDeleteList(list.id)}
                className="p-2 bg-red-500 hover:bg-red-700 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {activeListId && (
          <>
            <div className="text-xl font-bold my-3">
              Add a todo to List {activeListId}
            </div>
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-80"
              placeholder="Add a List item"
            />
            <button
              className="p-3 py-1 bg-violet-800 hover:bg-violet-950 text-white rounded-md mx-3"
              onClick={handleAdd}
            >
              ADD
            </button>

            <h2 className="text-lg">Your Todo List {activeListId}</h2>
            <div className="todos">
              {lists
                .find((list) => list.id === activeListId)
                ?.todos.map((item, index) => (
                  <div
                    key={index}
                    className="todo flex w-full gap-5 mb-2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      className={`flex items-center w-[calc(100%-150px)] ${item.isCompleted ? "line-through" : ""}`}
                      style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={() => handleToggleComplete(activeListId, index)}
                        className="mr-2"
                      />
                      {item.todo}
                    </div>
                    <div className="buttons ml-3 flex w-1/2 mx-20">
                      <button
                        onClick={() => handleEdit(activeListId, index)}
                        className="p-3 py-1 bg-violet-800 hover:bg-violet-950 text-white mx-0.5"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(activeListId, index)}
                        className="p-3 py-1 bg-violet-800 hover:bg-violet-950 text-white mx-0.5"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
