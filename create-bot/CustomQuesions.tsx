"use client";
import React, { useRef, Dispatch } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Trash2 } from 'lucide-react';
import InputGroup from '@/components/FormElements/InputGroup';
import { useSnackbar } from 'notistack';
import TextArea from '@/components/FormElements/TextArea';
import { motion } from 'framer-motion';
import { CustomQuestion, ContextSetupTypes } from '@/types/ContextSetup';

const CustomQuesions = ({
    customQuestions,
    setContextSetup
}: {
    customQuestions: CustomQuestion[];
    setContextSetup: Dispatch<React.SetStateAction<ContextSetupTypes>>;
}) => {
    const { enqueueSnackbar } = useSnackbar();

    // Function to add a new question
    const addQuestion = () => {
        setContextSetup((prevContext) => ({
            ...prevContext,
            customQuestions: [
                ...prevContext.customQuestions,
                { questionText: '', textAreaValue: '' }
            ]
        }));
    };

    // Function to update an existing question
    const updateQuestion = (index: number, field: keyof CustomQuestion, value: string) => {
        setContextSetup((prevContext) => {
            const updatedQuestions = [...prevContext.customQuestions];
            updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
            return { ...prevContext, customQuestions: updatedQuestions };
        });
    };

    // Function to delete a question
    const deleteQuestion = (index: number) => {
        setContextSetup((prevContext) => {
            const updatedQuestions = prevContext.customQuestions.filter((_, i) => i !== index);
            return { ...prevContext, customQuestions: updatedQuestions };
        });
        enqueueSnackbar('Question removed successfully', { variant: 'success' });
    };

    return (
        <div>
            <h3 className="font-semibold text-dark dark:text-white">
                Custom Context Questions for Enhanced Chatbot Accuracy
            </h3>
            <button
                className="mt-3 flex w-48 justify-center items-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                onClick={addQuestion}
            >
                <FaPlus className="mr-2" />
                Add Question
            </button>
            {customQuestions.map((question, index) => (
                <motion.div
                    key={index}
                    className="border border-gray-200 dark:border-gray-600 shadow-sm p-3 mt-3 rounded-[10px] flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex-1">
                        <InputGroup
                            type="text"
                            placeholder="Add your question here..."
                            customClasses="w-full mb-4"
                            value={question.questionText}
                            onChange={(e) => updateQuestion(index, 'questionText', e.target.value)}
                        />
                        <TextArea
                            placeholder="Type your response here..."
                            value={question.textAreaValue}
                            onChange={(e) => updateQuestion(index, 'textAreaValue', e.target.value)}
                            rows={4}
                        />
                    </div>
                    <button
                        title="Delete Question"
                        className="ml-3 mt-6 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        onClick={() => deleteQuestion(index)}
                    >
                        <Trash2 size={20} />
                    </button>
                </motion.div>
            ))}
        </div>
    );
};

export default CustomQuesions;
