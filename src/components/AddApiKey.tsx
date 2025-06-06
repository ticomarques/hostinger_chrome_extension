interface functionProps {
    handleSubmitKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFetchPlan: () => void;
}

function AddApiKey({handleSubmitKey, handleFetchPlan}: functionProps) {
  return (
    <div>
        <input
        type="text"
        id="apikey"
        name="apikey"
        placeholder="Insira sua API KEY"
        className="inputKey"
        onChange={handleSubmitKey}
      />
      <br /><br />
      <button onClick={handleFetchPlan} className="submit-button">OK</button>
    </div>
  )
}

export default AddApiKey