function Transaction({ onChange, isDeposit, validationFailed }) {
  const choice = ['Deposit', 'Withdraw'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <>
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input type="number" width="200" onChange={onChange}></input>
        <input type="submit" width="200" value="Submit"></input>
      </label>
      {validationFailed && (
        <div style={{ color: 'red' }}>Overdraft detected!</div>
      )}
    </>
  );
}