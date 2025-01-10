const InputField = ({ label, type = "text", register, name, error }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        type={type}
        min={1}
        {...register(name)}
        placeholder={`Enter a ${label}...`}
        className="rounded-md border p-2 text-sm text-gray-700 outline-none dark:bg-gray-400 dark:placeholder-slate-700"
      />
      {error?.message && (
        <p className="text-xs text-red-500">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
