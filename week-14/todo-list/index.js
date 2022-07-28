function App() {
  const [todos, setTodos] = React.useState([
    {
      text: 'Laundry',
      isCompleted: false,
    },
    {
      text: 'Dishes',
      isCompleted: false,
    },
    {
      text: 'Build To-Do App',
      isCompleted: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text: text, isCompleted: false }];
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const temp = [...todos];
    temp.splice(index, 1); // remove by index
    setTodos(temp);
  };

  return (
    <div className="app">
      <div className="todo-list">
        <div className="header">
          <h1>Today's To-Dos...</h1>
        </div>

        {todos.map((todo, i) => (
          <Todo index={i} key={i} todo={todo} remove={removeTodo} />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
