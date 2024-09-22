// contextTypes.ts
import  { Dispatch } from "react";

export interface CustomQuestion {
    questionText: string;
    textAreaValue: string;
}


export interface ContextSetupTypes{
    largeText: string ;
    contextFileUrl: string ;
    customQuestions: CustomQuestion[];
}

export interface ContextSetupProps {
    contextSetup: ContextSetupTypes;
    handleContextChange: (field: keyof ContextSetupTypes, value: string ) => void;
    handleContextFileUpload: (file: File | null) => Promise<any>;
    setContextSetup: Dispatch<React.SetStateAction<ContextSetupTypes>>;

}
