function Todo({ todo, index, remove }) {
  const handle = () => {
    remove(index);
  };
  return (
    <div className="todo">
      <div>{todo.text}</div>
      <button type="button" className="btn-close" onClick={handle}></button>
    </div>
  );
}
