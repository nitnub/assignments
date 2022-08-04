const Account = ({ userName }) => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [validationFailed, setValidationFailed] = React.useState(false);
  const [workArea, setWorkArea] = React.useState('');
  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
  };
  const handleSubmit = () => {
    setValidationFailed(false);
    console.log('submit');
    
    if (!isDeposit && deposit > totalState) {
      setValidationFailed(true);
    } else {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
    }
    event.preventDefault();
  };


  return (
    <>
      <h1>Hello, {userName}</h1>
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <button type="button" onClick={() => setIsDeposit(true)}>
          Deposit
        </button>
        <button type="button" onClick={() => setIsDeposit(false)}>
          Withdraw
        </button>
        <button type="button" onClick={() => setWorkArea('Balance Inquiry')}>
          Balance Inquiry
        </button>
        {/* <Transaction
        onChange={handleChange}
        isDeposit={isDeposit}
        validationFailed={validationFailed}
      ></Transaction> */}

      
      </form>
      {workArea === 'Balance Inquiry' && <BalanceInquiry totalState={totalState}/>}
    </>
  );
};
