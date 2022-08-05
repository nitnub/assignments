function Transaction({ onChange, validationFailed, onSubmit, disableSubmit }) {
  return (
    <>
      <label className="label huge">
        <input type="number" width="200" onChange={onChange}></input>
        <input type="submit" width="200" value="Submit" onClick={onSubmit} disabled={disableSubmit}/>
      </label>
      {validationFailed && (
        <div style={{ color: 'red' }}>Insufficient funds</div>
      )}
    </>
  );
}
