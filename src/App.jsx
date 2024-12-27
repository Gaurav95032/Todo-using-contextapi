import { useEffect, useState } from "react";
import { TodoContextProvider } from "./Context/TodoContext";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";

function App() {
  const [Todos, setTodos] = useState(() => {
    // Load todos from local storage or initialize with an empty array
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const AddTodo = (todo) => {
    const newTodo = { id: Date.now(), ...todo };
    setTodos((prev) => [...prev, newTodo]);
  };

  const UpdateTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  const DeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const ToggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Save Todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(Todos));
  }, [Todos]);

  return (
    <TodoContextProvider
      value={{ Todos, AddTodo, DeleteTodo, ToggleComplete, UpdateTodo }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {Todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
