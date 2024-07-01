const InputBox = ({ label, type, name, placeholder }) => {
  return (
    <div>
      <div className="text-sm  font-medium text-left py-2">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="w-full px-2 py-1 border rounded border-slate-200"
      ></input>
    </div>
  );
};

export default InputBox;
