const Login = () => {
  const [userName, setUserName] = React.useState('');
  const [validUser, setValidUser] = React.useState(false);

  document.title = 'ATM | Welcome';
  React.useEffect(() => {
    if (validUser) {
      document.title = `${userName}'s Account`;
    }
    
  }, [validUser]);

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
    <div className="container">
      {!validUser ? (
        <div className="login-screen">
          <h1 className="login header">ATM</h1>
          <form onSubmit={logIn}>
            <input
              type="text"
              value={userName}
              onChange={onChange}
              placeholder="Please enter your name..."
            />
            <input type="submit" value="Log In" />
          </form>
        </div>
      ) : (
        <>
          <Account userName={userName} />
          <div className="logout-container">
            <button onClick={logOut}>Log Out</button>
          </div>
        </>
      )}
    </div>
  );
};
