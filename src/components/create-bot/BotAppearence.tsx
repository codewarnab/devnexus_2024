import { BotAppearanceProps } from '@/types/BotDataTypes/botAppearence';
import InputGroup from '@/components/FormElements/InputGroup';
import SelectGroupTwo from '@/components/FormElements/SelectGroup/SelectGroupTwo';
import FileUpload from '@/components/FileUpload';
import TextArea from '@/components/FormElements/TextArea';

const BotAppearance: React.FC<BotAppearanceProps> = ({ botDetails, handleChange, handleSelectChange, handleFileUpload }) => {


    return (
        <div className='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-6 mb-5'>
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">

                <h3 className="font-semibold text-dark dark:text-white">
                    Setup Your Bot&apos;s Appearance
                </h3>
            </div>
            <div className='mt-3'>
                <InputGroup
                    type="text"
                    label='Bot Name'
                    name='name'
                    value={botDetails.name}
                    onChange={handleChange}
                    placeholder='Enter bot name...'
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    <SelectGroupTwo
                        label="Bot Tone"
                        options={[
                            { value: 'formal', label: 'Formal' },
                            { value: 'friendly', label: 'Friendly' },
                            { value: 'playful', label: 'Playful' },
                            { value: 'informative', label: 'Informative' },
                        ]}
                        value={botDetails.tone}
                        onChange={handleSelectChange}
                        placeholder="Select tone..."
                    />
                    <FileUpload label="Upload Bot Avatar"
                        onChange={handleFileUpload}
                        customClasses="mb-6" />

                </div>
            </div>

            <div className="mb-4">
                <TextArea
                    name="welcomeMessage"
                    value={botDetails.welcomeMessage}
                    onChange={handleChange}
                    rows={4}
                    label='Enter a welcome message'
                    placeholder="Enter a welcome message..."
                    className="border rounded-md p-2"
                />
            </div>
        </div>
    );
};

export default BotAppearance;
