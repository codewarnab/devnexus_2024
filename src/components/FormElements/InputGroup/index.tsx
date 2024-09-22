import React from "react";

interface InputGroupProps {
  customClasses?: string;
  label?: string;
  type: string;
  placeholder: string;
  required?: boolean;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  customClasses,
  label,
  type,
  placeholder,
  required,
  value = '',
  onChange,
  onKeyDown,
  disabled = false, // Default to false if not provided
  name = '', // Default to empty string if not provided
}) => {
  return (
    <div className={customClasses}>
      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white px-4">
        {label}
        {required && <span className="text-red">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
        name={name} // Set the name attribute
        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-6.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-100 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-gray-700"
      />
    </div>
  );
};

export default InputGroup;