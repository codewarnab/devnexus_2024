import React from 'react';
import {  OrganizationDetailsProps } from '@/types/OrganizationDetails';
import InputGroup from '@/components/FormElements/InputGroup';
import SelectGroupTwo from '@/components/FormElements/SelectGroup/SelectGroupTwo';


const OrganizationDetails: React.FC<OrganizationDetailsProps> = ({ organizationDetails, setOrganizationDetails }) => {

    const handleTypeChange = (value: string) => {
        setOrganizationDetails(prevDetails => ({
            ...prevDetails,
            type: value as 'zoo' | 'park' | 'museum' | ''
        }));
    };

    const typeOptions = [
        { value: 'zoo', label: 'Zoo' },
        { value: 'park', label: 'Park' },
        { value: 'museum', label: 'Museum' },
        { value: 'other', label: 'Other' }
    ];

    return (
        <div className='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-6 mb-5'>
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-semibold text-dark dark:text-white">
                Enter Your Organisation Details
                </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <InputGroup
                    type="text"
                    placeholder="Enter your organization name"
                    customClasses="w-full mb-4"
                    label="Enter your Organization name"
                    value={organizationDetails.name}
                    onChange={(e) => setOrganizationDetails({ ...organizationDetails, name: e.target.value })}
                />
                <InputGroup
                    type="text"
                    placeholder="Enter Website URL (optional)"
                    customClasses="w-full mb-4"
                    label="Enter your Website URL"
                    value={organizationDetails.websiteUrl}
                    onChange={(e) => setOrganizationDetails({ ...organizationDetails, websiteUrl: e.target.value })}
                />
                <InputGroup
                    type="text"
                    placeholder="Enter Address of your organization"
                    customClasses="w-full mb-4"
                    label="Enter Organization's Address"
                    value={organizationDetails.address}
                    onChange={(e) => setOrganizationDetails({ ...organizationDetails, address: e.target.value })}
                />
                <InputGroup
                    type="text"
                    placeholder="Enter Contact Info"
                    customClasses="w-full mb-4"
                    label="Enter your Contact Info"
                    value={organizationDetails.contactInfo}
                    onChange={(e) => setOrganizationDetails({ ...organizationDetails, contactInfo: e.target.value })}
                />
            </div>
            <div className="mt-5">
                <SelectGroupTwo
                    label="Select Organization Type"
                    options={typeOptions}
                    placeholder="Select type..."
                    defaultValue={organizationDetails.type}
                    onChange={handleTypeChange}
                />
            </div>
        </div>
    );
}

export default OrganizationDetails;
