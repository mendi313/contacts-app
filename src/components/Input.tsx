import { ChangeEventHandler } from 'react';

type InputProps = {
  input: Input;
  error: string | undefined;
  value: string | undefined;
  handleFunc: ChangeEventHandler<HTMLInputElement>;
};
export default function Input({ input, error, value, handleFunc }: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={input.name}>
        {input.label}
      </label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? 'border-red-500' : ''
        }`}
        id={input.name}
        type={input.type}
        name={input.name}
        placeholder={input.placeholder}
        value={value}
        onChange={(e) => handleFunc(e)}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
