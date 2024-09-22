export interface BotAppearanceDetails {
    name: string;
    tone: 'formal' | 'friendly' | 'playful' | 'informative';
    avatar: string; 
    welcomeMessage: string;
}

export interface BotAppearanceProps {
    botDetails: BotAppearanceDetails;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSelectChange: (value: string) => void;
    handleFileUpload: (file: File | null) => Promise<any>;
}
