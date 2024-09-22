// src/types/OrganizationDetails.ts
export type OrganizationDetailsType = {
    name: string;
    type: 'zoo' | 'park' | 'museum' | ''; // Adjust as needed
    websiteUrl: string;
    address: string;
    contactInfo: string;
};

export interface OrganizationDetailsProps {
    organizationDetails: OrganizationDetailsType;
    setOrganizationDetails: React.Dispatch<React.SetStateAction<OrganizationDetailsType>>;
}
