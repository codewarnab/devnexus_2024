import React, { useState, useCallback } from 'react';
import InputGroup from '@/components/FormElements/InputGroup';
import { GripVertical, Trash2 } from 'lucide-react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSnackbar } from 'notistack'

interface Question {
    id: string;
    text: string;
}

function SortableItem({ question, children }: { question: Question; children: React.ReactNode }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: question.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <li ref={setNodeRef} style={style} {...attributes} className="flex items-center justify-between space-x-2 p-3 bg-white dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 shadow-sm">
            <div className="flex items-center space-x-3 flex-grow" {...listeners}>
                <span><GripVertical className="text-gray-400 dark:text-gray-500" /></span>
                <span className="text-gray-700 dark:text-gray-200">{question.text}</span>
            </div>
            {children}
        </li>
    );
}

interface WelcomeQuestionsProps {
    welcomeQuestions: Question[];
    setWelcomeQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const MAX_QUESTIONS = 4;

const WelcomeQuestions: React.FC<WelcomeQuestionsProps> = ({ welcomeQuestions, setWelcomeQuestions }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const { enqueueSnackbar } = useSnackbar()

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setWelcomeQuestions((items) => {
                const oldIndex = items.findIndex(q => q.id === active.id);
                const newIndex = items.findIndex(q => q.id === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            if (welcomeQuestions.length >= MAX_QUESTIONS) {
                enqueueSnackbar(`Maximum limit of ${MAX_QUESTIONS} questions reached!`, { variant: 'warning' });
                return;
            }

            const isDuplicate = welcomeQuestions.some(
                question => question.text.trim().toLowerCase() === inputValue.trim().toLowerCase()
            );

            if (isDuplicate) {
                enqueueSnackbar('Duplicate question not allowed!', { variant: 'error' });
            } else {
                const newId = (welcomeQuestions.length > 0
                    ? Math.max(...welcomeQuestions.map(q => parseInt(q.id))) + 1
                    : 1
                ).toString();
                setWelcomeQuestions([...welcomeQuestions, { id: newId, text: inputValue.trim() }]);
                setInputValue('');
            }
        }
    };

    const handleDelete = useCallback((id: string) => {
        setWelcomeQuestions(prev => prev.filter(q => q.id !== id));
    }, [setWelcomeQuestions]);

    return (
        <div className='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-6 mb-5'>
            <h3 className="font-semibold text-dark dark:text-white">
                Enter Welcome Questions
            </h3>
            <InputGroup

                type="text"
                placeholder="Press Enter to add question"
                customClasses="w-full mb-4"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={welcomeQuestions.length >= MAX_QUESTIONS}
            />
            {welcomeQuestions.length >= MAX_QUESTIONS && (
                <p className="text-yellow-600 dark:text-yellow-400 mb-2">
                    Maximum limit of {MAX_QUESTIONS} questions reached.
                </p>
            )}
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={welcomeQuestions.map(q => q.id)} strategy={verticalListSortingStrategy}>
                    <ul className="space-y-3">
                        {welcomeQuestions.map(question => (
                            <SortableItem key={question.id} question={question}>
                                <button
                                    onClick={() => handleDelete(question.id)}
                                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </SortableItem>
                        ))}
                    </ul>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default WelcomeQuestions;