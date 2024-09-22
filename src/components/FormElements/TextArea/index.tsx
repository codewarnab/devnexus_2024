import React from "react";

interface TextAreaProps {
    rows?: number;
    placeholder?: string;
    value?: string | '';
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
    disabled?: boolean;
    name?: string;
    id?: string;
    label?: string; 
    required?: boolean; 
}

const TextArea: React.FC<TextAreaProps> = ({
    rows = 6,
    placeholder = "Type your message",
    value,
    onChange,
    className = "",
    disabled = false,
    name,
    id,
    label,
    required = false, 
}) => {
    return (
        <div className="mb-4">
            {label && (
                <label className={`mb-3 ml-3 block text-body-sm font-medium text-dark dark:text-white ${!label ? 'min-h-[2.5rem]' : ''}`}>
                    {label}
                    {required && <span className="text-red">*</span>}
                </label>
            )}
            <textarea
                rows={rows}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary ${className}`}
                disabled={disabled}
                name={name}
                id={id}
            />
        </div>
    );
};

export default TextArea;
