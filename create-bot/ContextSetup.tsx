// ContextSetup.tsx
import React from 'react';
import FileUpload from '@/components/FormElements/FileUpload';
import TextArea from '@/components/FormElements/TextArea';
import CustomQuesions from './CustomQuesions';
import { ContextSetupProps } from '@/types/ContextSetup';

const ContextSetup: React.FC<ContextSetupProps> = ({
  handleContextFileUpload,
  contextSetup,
  handleContextChange,
  setContextSetup,

}) => {
  return (
    <div className='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-6 mb-5'>
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Setup Context for Your Bot
        </h3>
      </div>
      <FileUpload
        label="Upload Context (pdf/.txt) multiple files allowed"
        onChange={handleContextFileUpload}
        customClasses="mb-6 mt-6"
      />
      <div className="mb-4">
        <TextArea
          name="welcomeMessage"
          onChange={(e) => handleContextChange('largeText', e.target.value)}
          rows={4}
          label='Enter a Long text for context (optional)'
          placeholder="Enter a Long text for context... It may contain Information about your organization, or any other information user may ask to the bot."
          className="border rounded-md p-2"
          value={contextSetup.largeText}
        />
      </div>
      <CustomQuesions
        customQuestions={contextSetup.customQuestions}
        setContextSetup={setContextSetup}
      />
    </div>
  );
};

export default ContextSetup;
