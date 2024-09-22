import React, { useMemo } from 'react';
import { Clock } from 'lucide-react';
import SelectGroupTwo from '@/components/FormElements/SelectGroup/SelectGroupTwo';
import { OpeningHoursSelectorProps } from '@/types/openingHours';

const OpeningHoursSelector: React.FC<OpeningHoursSelectorProps> = ({ hours, onChange, onApplyToAll }) => {
    // Memoize time options to prevent unnecessary recalculations
    const timeOptions = useMemo(
        () => [
            { value: 'Closed', label: 'Closed' },
            ...Array.from({ length: 24 }, (_, i) => ({
                value: `${i.toString().padStart(2, '0')}:00`,
                label: `${i.toString().padStart(2, '0')}:00`
            }))
        ],
        []
    );

    return (
        <div className='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-6 mb-5'>
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-semibold text-white mb-4 flex items-center">
                <Clock className="mr-2" size={20} />
                Select Opening Hours
                </h3>
            </div>
            {Object.entries(hours).map(([day, { open, close }]) => (
                <div key={day} className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-200">{day}</span>
                        <button
                            onClick={() => onApplyToAll(day)}
                            className="text-xs text-blue-400 hover:text-blue-300"
                        >
                            Apply to all
                        </button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                        <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
                            <SelectGroupTwo
                                label={`${day} Open`}
                                options={timeOptions}
                                placeholder="Select open time..."
                                value={open}
                                onChange={(value) => onChange(day, 'open', value)}
                            />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <SelectGroupTwo
                                label={`${day} Close`}
                                options={timeOptions}
                                placeholder="Select close time..."
                                value={close}
                                onChange={(value) => onChange(day, 'close', value)}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OpeningHoursSelector;
 