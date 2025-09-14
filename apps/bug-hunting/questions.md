# Bug Hunting Challenge - Questions

Please answer the following questions about the bugs you identified and fixed:

1. **Bug Overview**: List the bugs you found and fixed. For each bug, briefly describe:
   - What was the issue?
   - How did you identify it?
   - How did you fix it?

2. **Technical Approach**: What debugging tools and techniques did you use to identify and fix the bugs?
   Most of the bugs were prettry obvious because the editor and TypeScript immediately showed red errors or warnings (e.g., missing types, invalid state initialization, functions being called instead of passed).  
   For the remaining issues, I identified them by testing the app manually — for example, submitting the form without `e.preventDefault()` caused a page reload, and using `onClick={onDelete(todo.id)}`.
   In short, I used a mix of editor/TypeScript feedback** and manual testing in the browser to quickly spot and fix the bugs.

3. **Code Improvements**: Beyond fixing bugs, did you make any improvements to the code organization or structure? If so, what and why?
Beyond fixing the intentional bugs, I also made several improvements to the code structure:

- **Added types** – I introduced proper TypeScript types for props and state (e.g., `Todo`, `FilterType`, `TodoListProps`, etc.). This improved editor support, prevented future mistakes, and made the codebase more maintainable.  

- **Added validation** – I added simple validation to the `TodoForm` to prevent submitting empty todos. This made the app behave more reliably.  

- **Made the code more DRY** – For example, in `TodoFilter` I replaced repetitive button code with a `.map` loop:
  ```tsx
  {filters.map((filter) => (
    <button
      key={filter.value}
      onClick={() => onChange(filter.value)}
      className={value === filter.value ? "active" : ""}
    >
      {filter.label}
    </button>
  ))}

4. **Future Prevention**: How would you prevent similar bugs in future development? Consider both coding practices and testing strategies.

## Preventing Similar Bugs in the Future

To prevent similar bugs from happening again, I would apply a mix of **good coding practices** and **testing strategies**:

   - **Always use TypeScript types** for props and state to catch mistakes early in the editor (e.g., invalid state types, missing props).
   - **Treat React state as immutable** – never use direct mutations like `.push` or `todo.completed = ...`, but instead return new objects/arrays with spread operators.
   - **Be explicit with event handlers** – always pass functions to event props (`onClick={() => ...}`), never invoke them directly in JSX.
   - **Use consistent code patterns** – for example, defining prop interfaces for every component, using arrow functions for callbacks, and applying DRY principles to avoid repetition.

   - **Leverage TypeScript + editor feedback** – most of the bugs in this test were caught immediately by red errors or warnings in the IDE.
   - **Write unit tests** for utility functions and component logic (e.g., adding, toggling, deleting todos).
   - **Use integration tests** (e.g., Playwright or React Testing Library) to verify that the UI behaves correctly when interacting with forms, buttons, and filters.

5. **Learning**: What was the most challenging or interesting aspect of this bug-hunting exercise? 
Applying best-practice fixes to make the code clean and maintainable.

### Bugs and Improvements

## Bug 1 – No typed props(TodoList.tsx)

### What was the issue?  
The `TodoList` component props (`todos`, `onToggle`, `onDelete`) were not typed. This means TypeScript cannot check what shape of data is being passed in, which removes type safety and IntelliSense support.

```tsx
const TodoList = ({ todos, onToggle, onDelete }) => { ... }
```
### How did you identify it?
The issue was obvious because the editor showed red underlines / warnings about missing type annotations

### How did you fix it?
I added explicit TypeScript interfaces for the props:
```tsx
import { Todo } from "../types/type";

type TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  // ...
}
```

## Bug 2 – `onClick={onDelete(todo.id)}` (TodoList.tsx)

### What was the issue?  
This calls onDelete immediately during render instead of passing a function reference.
```tsx
<button onClick={onDelete(todo.id)}>Delete</button>
```
### How did you identify it?
The issue was obvious 

### How did you fix it?
I wrapped it in an arrow function so it only runs when the button is clicked:
```tsx
<button onClick={() => onDelete(todo.id)}>Delete</button>
```

## Bug 3 – Missing key for todo list array (TodoList.tsx)

### What was the issue?  
<li> elements inside todos.map were missing a key prop, which React needs to track list items correctly
```tsx
{todos.map((todo) => (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
```
### How did you identify it?
I checked the dev console and saw the error
TodoList.tsx:13 Each child in a list should have a unique "key" prop.

### How did you fix it?
I added the id as key to the li element
```tsx
<li
   key={todo.id}
   ....
```

## Bug 4 – No typed props(TodoForm.tsx)

### What was the issue?  
The `TodoForm` component props (`onAdd`) was not typed
```tsx
const TodoForm = ({ onAdd }) => { ... }
```
### How did you identify it?
The issue was obvious the editor showed warning for missing prop types

### How did you fix it?
I created a proper props interface and applied it to the component:
```tsx
const TodoForm = ({ onAdd }: { onAdd: (input: string) => void }) => {...}
```

## Bug 5 – e.preventDefault() was missing(TodoForm.tsx)

### What was the issue?  
   Because e.preventDefault() was missing, submitting the form caused the browser to refresh, which cleared the state and wiped out the todos.
```tsx
const handleSubmit = (e) => {
  onAdd(input);  
}
```
### How did you identify it?
I pressed enter and the page refreshed and todo was not added

### How did you fix it?
I added e.preventDefault() inside handleSubmit to stop the default form submission:
```tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  ....
};
```

## Bug 6 – Input validation(TodoForm.tsx)

### What was the issue?  
   There was no validation on the text input and empty value was passed to onAdd
   as well as reseting the state to empty text for better ux
```tsx
const handleSubmit = (e) => {
  onAdd(input);  
}
```
### How did you identify it?
I pressed enter and the page refreshed and todo was not added

### How did you fix it?
I checked if input is not empty and set input to "" once the todo was added
```tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    if (input.trim() === "") return;
    onAdd(input);
    setInput("");
  ....
};
```

## Bug 7 – Incorrect type for input. Should be string(TodoForm.tsx)

### What was the issue?  
   The input was initialized with 0
```tsx
  const [input, setInput] = useState(0)
```
### How did you identify it?
The error was obvious


### How did you fix it?
I initialized the state correctly as a string
```tsx
const [input, setInput] = useState("");
```


## Bug 8 – No typed props(TodoFilter.tsx)

### What was the issue?  
   The input was initialized with 0
```tsx
  const TodoFilter = ({ filter, onFilter, onClearCompleted }) => {
```
### How did you identify it?
Editor showed red underlines / warnings about missing type annotations


### How did you fix it?
I added explicit TypeScript interfaces for the props. For example:
```tsx
interface FilterProps {
  value: FilterType;
  onChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

type FilterOption = {
  value: FilterType;
  label: string;
};

export default function TodoFilter({
  value,
  onChange,
  onClearCompleted,
}: FilterProps) {...}
```

## Bug 9 – onClearCompleted.(TodoFilter.tsx)

### What was the issue?  
   Accidentally invoking the function instead of passing a function reference for onClearCompleted.
```tsx
  onClick={onClearCompleted()}
```
### How did you identify it?
The error was obvious


### How did you fix it?
I passed the function itself to onClick (without invoking it):
```tsx
<button className="clear-completed" onClick={onClearCompleted}>
```

## Bug 10 – Incorrect filter comparisson(TodoFilter.tsx)

### What was the issue?  
   The problem is that active was not a defined variable. The comparison was trying to check filter === active instead of comparing against the string "active".
```tsx
   className={`${filter === active ? "active" : ""}`} 
```
### How did you identify it?
The error was obvious through the editor


### How did you fix it?
I initialized the state correctly as a string
```tsx
className={value === filter.value ? "active" : ""}
```

## Bug 11 – State mutation with todos

### What was the issue?  
This mutates the existing todos array directly. React state must always be treated as immutable.
Incorrect initialization of todos. Should be an empty array, this causes problems because the rest of the code expected todos to be an array 
```tsx
   const [todos, setTodos] = useState(null);
   todos.push({ text, completed: false })
```
### How did you identify it?
The error was obvious because the editor showed a red error (since todos was initialized as null), and .push was being used on state a common React anti-pattern. As well as adding id to the todo.

### How did you fix it?

```tsx
const [todos, setTodos] = useState<Todo[]>([])
const addTodo = (text: string) => {
  setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
};
```

## Bug 12 – Mutation of todo.completed

### What was the issue?  
This directly mutates the todo object (todo.completed = ...). Even though .map creates a new array, the individual todo objects are still the same references, which breaks React’s immutability rules.

```ts
const updatedTodos = todos.map(todo => {
  if (todo.id == id) {
    todo.completed = !todo.completed; // ❌ direct mutation
    return todo;
  }
  return todo;
});
setTodos(updatedTodos);
```

### How did you identify it?
It’s a common React anti-pattern: if state objects are mutated in place, React may not detect changes correctly and fail to re-render.

### How did you fix it?

```tsx
const updatedTodos = todos.map(todo =>
  todo.id === id ? { ...todo, completed: !todo.completed } : todo
);
setTodos(updatedTodos);
```
