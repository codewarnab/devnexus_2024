interface FileUploadProps {
    label: string;
    required?: boolean;
    customClasses?: string;
    onChange?: (file: File | null) => void; // Function that accepts file or null
    disabled?: boolean; // Option to disable the input
}

const FileUpload: React.FC<FileUploadProps> = ({
    label,
    customClasses = '',
    onChange,
    required,
    disabled = false,
}) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null; // Get the first file
        if (onChange) {
            onChange(file); // Call the passed function with the file or null
        }
    };

    return (
        <div className={`flex flex-col gap-5.5 ${customClasses}`}>
            <div>
                <label className={`mb-3 ml-3 block text-body-sm font-medium text-dark dark:text-white ${!label ? 'min-h-[2.5rem]' : ''}`}>
                    {label}
                    {required && <span className="text-red">*</span>}
                </label>
                <input
                    type="file"
                    onChange={handleFileChange} // Use the new handler
                    disabled={disabled}
                    className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
            </div>
        </div>
    );
};

export default FileUpload;
