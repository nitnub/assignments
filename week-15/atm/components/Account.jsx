/* eslint-disable react/function-component-definition */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
const Account = ({ userName }) => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [validationFailed, setValidationFailed] = React.useState(false);
  const [workArea, setWorkArea] = React.useState('');
  const [disableSubmit, setDisableSubmit] = React.useState(false);
  
  // List of transaction views. Can be expanded to include other service offerings.
  const choice = ['Deposit', 'Withdraw'];

  // Return to main Account View
  const goBack = () => {
    setWorkArea('');
  };

  const convertToUSD = (num) => {
    const format = {
      style: 'currency',
      currency: 'USD',
    };
    return Number(num).toLocaleString('en-US', format);
  };

  const handleChange = (event) => {
    setDisableSubmit(false);
    setDeposit(Number(event.target.value));

    if (event.target.value <= 0) {
      setDisableSubmit(true);
    }
  };

  const handleSubmit = () => {
    setValidationFailed(false);
  

    if (!isDeposit && deposit > totalState) {
      setValidationFailed(true);
    } else {
      const newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
    }

    event.preventDefault();
  };

  // Choose work area to move to
  const setView = (view) => {
    setWorkArea(view);
    if (view === 'Deposit') setIsDeposit(true);
    if (view === 'Withdraw') setIsDeposit(false);
  };

  return (
    <>
      <h1 className="header">Hello, {userName}</h1>
      <div className="account-main">

      {(workArea === 'Deposit' || workArea === 'Withdraw') && (
          <>
            <h2 id="total">{convertToUSD(totalState)}</h2>
            <div>
              <i>{choice[Number(!isDeposit)]} the below amount...</i>
            </div>

            <Transaction
              onChange={handleChange}
              isDeposit={isDeposit}
              validationFailed={validationFailed}
              onSubmit={handleSubmit}
              disableSubmit={disableSubmit}
            />
          </>
        )}

        {workArea === 'Balance Inquiry' && (
          <>
            <h2 id="total">{convertToUSD(totalState)}</h2>
            <BalanceInquiry />
          </>
        )}

        {workArea === '' ? (
          <div>
            <h4>Please make a selection:</h4>
            <form onSubmit={handleSubmit}>
              <button type="button" onClick={() => setView('Withdraw')}>
                Withdraw
              </button>
              <button type="button" onClick={() => setView('Deposit')}>
                Deposit
              </button>

              <button type="button" onClick={() => setView('Balance Inquiry')}>
                Balance Inquiry
              </button>
            </form>
          </div>
        ) : (
          <div className="back-button">
            <button onClick={goBack}>Back</button>
          </div>
        )}


      </div>
    </>
  );
};
