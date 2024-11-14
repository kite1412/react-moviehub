export default function OutlinedTextField({label, input, onChange}) {
  const handleChange = (event) => {
    onChange(event.target.value);
  }
  return (
    <div className="outlined-text-field">
      <label >{label}</label>
      <input type='text' value={input} onChange={handleChange}/>
    </div>
  );
}