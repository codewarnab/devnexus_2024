export interface CustomAddOn {
    name: string;
    price: number;
}
export interface CustomAddOn {
    name: string;
    price: number;
}

export interface AddOns {
    cloakRoomCharges: number | '';
    guidedTour: number | '';
    highEndCamera: number | '';   
    customAddOns: CustomAddOn[];
}

export interface TicketPrices {
    adultPrice: number | '';
    childPrice: number | '';
    foreignerPrice: number | '';
    addOns: AddOns;
}

export interface TicketPriceProps {
    ticketPrices: TicketPrices;
    handleTicketPriceChange: (field: keyof TicketPrices, value: number) => void;
    handleAddOnChange: (field: keyof AddOns, value: number) => void;
    addCustomAddOn: (newAddOn: CustomAddOn) => void;
    removeCustomAddOn: (index: number) => void;
    updateCustomAddOn: (index: number, field: keyof CustomAddOn, value: string | number) => void;
}
