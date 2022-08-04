const Login = () => {
  const [userName, setUserName] = React.useState('');
  const [validUser, setValidUser] = React.useState(false);

  const onChange = (e) => {
    setUserName(e.target.value);
  };
  const logIn = (e) => {
    e.preventDefault();
    if (userName) {
      setValidUser(true);
    }
  };

  const logOut = () => {
    setUserName('');
    setValidUser(false);
  };

  return (
    <div className="conatainer">
      {validUser ? (
        <>
          <Account userName={userName} />
          <button onClick={logOut}>Log Out</button>
        </>
      ) : (
        <form onSubmit={logIn}>
          <input
            type="text"
            value={userName}
            onChange={onChange}
            placeholder="Please enter your name..."
          />
          <input type="submit" value="Log In" />
        </form>
      )}
    </div>
  );
};
