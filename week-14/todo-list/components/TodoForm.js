function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState('');

  // Needs a state for the form field.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        value={value}
        placeholder="Add item..."
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
