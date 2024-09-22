export type TimeSlot = {
    open: string;
    close: string;
};

export type DayHours = {
    [key: string]: TimeSlot;
};

export type OpeningHoursSelectorProps = {
    hours: DayHours;
    onChange: (day: string, field: 'open' | 'close', value: string) => void;
    onApplyToAll: (sourceDay: string) => void;
};
