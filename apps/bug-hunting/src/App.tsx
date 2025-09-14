import { useMemo, useState } from "react";
import "./App.css";
import TodoFilter from "./components/TodoFilter";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { FilterType, Todo } from "./types/type";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  return (
    <div className="app">
      <h1>Todo App</h1>

      <TodoForm onAdd={addTodo} />

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      <TodoFilter
        value={filter}
        onChange={setFilter}
        onClearCompleted={clearCompleted}
      />
    </div>
  );
};

export default App;

/**
 * App.tsx
 * State mutation bug with todos
 * Incorrect initialization of todos. SHould be an empty array
 * Missing types
 * Missing initial filter state
 * Mutation of todo.completed
 */

/**
 * TodoFilter.tsx
 * Bugs
 * 1. No typed props
 * 3. Accidentally invoking the function instead of passing a function reference for onClearCompleted.
 * 4. filter === active is incorrect. Should be filter === "active"
 */

/**
 * TodoForm.tsx
 * Bugs
 * 1. No typed props and handleSubmit handler
 * 2. Passing the result instead of a callback to onChange
 * 3. Incorrect type for input. Should be string
 * 4. No form validation. Empty string will be passed to onAdd
 */

/**
 * TodoList.tsx
 * Bugs
 * 1. No typed props
 * 2. Accidentally invoking the function instead of passing a function reference for onDelete.
 */
