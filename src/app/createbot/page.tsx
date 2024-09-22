"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState } from "react";
import WelcomeQuestions from "@/components/create-bot/welcomeQuestions";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import OrganizationDetails from "@/components/create-bot/OrganizationDetails";
import OpeningHoursSelector from "@/components/create-bot/OpeningHourSelector";
import BotAppearance from "@/components/create-bot/BotAppearence"
import TicketPrice from "@/components/create-bot/TicketPrice";
import ContextSetup from "@/components/create-bot/ContextSetup";
import DomainSetup from '@/components/create-bot/DomainSetup';
import { useEdgeStore } from '../../lib/edgestore';
import { useSnackbar } from 'notistack';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import Modal from "@/components/Modal";
import { OrganizationDetailsType } from "@/types/BotDataTypes/OrganizationDetails";
import { DayHours } from "@/types/BotDataTypes/openingHours";
import { BotAppearanceDetails } from "@/types/BotDataTypes/botAppearence";
import { TicketPrices, AddOns, CustomAddOn } from "@/types/BotDataTypes/ticketPrice";
import { ContextSetupTypes } from "@/types/BotDataTypes/ContextSetup";
import { mergedDataSchema } from "@/utils/validationSchema";
import { useMutation } from "@tanstack/react-query";
import { motion } from 'framer-motion';
import DefaultLayout from "@/components/Layouts/DefaultLaout";

type MergedData = {
    welcomeQuestions: { id: string; text: string }[];
    organizationDetails: OrganizationDetailsType;
    hours: DayHours;
    botDetails: BotAppearanceDetails;
    ticketPrices: TicketPrices;
    contextSetup: ContextSetupTypes;
};

interface CreateChatBotProps {
    onBack: () => void;
}



const CreateChatBot: React.FC<CreateChatBotProps> = ({ onBack }) => {
    const { edgestore } = useEdgeStore();
    const { enqueueSnackbar } = useSnackbar();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [completeConfig, setCompleteConfig] = useState(false);
    const [chatbotId, setChatbotId] = useState<string>('');
    const { userId } = useAuth();
    const [welcomeQuestions, setWelcomeQuestions] = useState<{ id: string; text: string }[]>([
        { id: '1', text: 'What special activities are happening today?' }
    ]);
    const [organizationDetails, setOrganizationDetails] = useState<OrganizationDetailsType>({
        name: '',
        type: '',
        websiteUrl: '',
        address: '',
        contactInfo: ''
    });
    const [hours, setHours] = useState<DayHours>({
        Monday: { open: '10:00', close: '18:00' },
        Tuesday: { open: '10:00', close: '18:00' },
        Wednesday: { open: '10:00', close: '18:00' },
        Thursday: { open: '10:00', close: '18:00' },
        Friday: { open: '10:00', close: '18:00' },
        Saturday: { open: '10:00', close: '18:00' },
        Sunday: { open: '10:00', close: '18:00' }
    });
    const [botDetails, setBotDetails] = useState<BotAppearanceDetails>({
        name: '',
        tone: 'friendly',
        avatar: '',
        welcomeMessage: ''
    });
    const [ticketPrices, setTicketPrices] = useState<TicketPrices>({
        adultPrice: '',
        childPrice: '',
        foreignerPrice: '',
        addOns: {
            cloakRoomCharges: '',
            guidedTour: '',
            highEndCamera: '',
            customAddOns: []
        }
    });
    const [contextSetup, setContextSetup] = useState<ContextSetupTypes>({
        largeText: '',
        contextFileUrl: '',
        customQuestions: []
    });

    const handleChange = (day: string, field: 'open' | 'close', value: string) => {
        setHours(prevHours => ({
            ...prevHours,
            [day]: { ...prevHours[day], [field]: value }
        }));
    };

    const applyToAll = (sourceDay: string) => {
        const sourceHours = hours[sourceDay];
        setHours(prevHours => Object.keys(prevHours).reduce((newHours, day) => {
            newHours[day] = { ...sourceHours };
            return newHours;
        }, {} as DayHours));
    };

    const handleTicketPriceChange = (field: keyof TicketPrices, value: number) => {
        setTicketPrices(prev => ({ ...prev, [field]: value }));
    };

    const handleAddOnChange = (field: keyof AddOns, value: number) => {
        setTicketPrices(prev => ({ ...prev, addOns: { ...prev.addOns, [field]: value } }));
    };

    const addCustomAddOn = (newAddOn: CustomAddOn) => {
        setTicketPrices(prev => ({
            ...prev,
            addOns: { ...prev.addOns, customAddOns: [...prev.addOns.customAddOns, newAddOn] }
        }));
    };

    const removeCustomAddOn = (index: number) => {
        setTicketPrices(prev => ({
            ...prev,
            addOns: { ...prev.addOns, customAddOns: prev.addOns.customAddOns.filter((_, i) => i !== index) }
        }));
    };

    const updateCustomAddOn = (index: number, field: keyof CustomAddOn, value: string | number) => {
        setTicketPrices(prev => ({
            ...prev,
            addOns: {
                ...prev.addOns, customAddOns: prev.addOns.customAddOns.map((addon, i) =>
                    i === index ? { ...addon, [field]: value } : addon
                )
            }
        }));
    };

    const handleBotAppearanceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBotDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleToneChange = (value: string) => {
        setBotDetails(prev => ({ ...prev, tone: value as 'formal' | 'friendly' | 'playful' | 'informative' }));
    };

    const handleAvatarUpload = async (file: File | null) => {
        if (file) {
            const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => { console.log(progress); }
            });
            if (res && res.url) {
                console.log(res.url);
                enqueueSnackbar('Avatar uploaded successfully', { variant: 'success' });
                setBotDetails(prev => ({ ...prev, avatar: res.url }));
            }
        }
    };

    const handleContextFileUpload = async (file: File | null) => {
        if (file) {
            const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => { console.log(progress); }
            });
            if (res && res.url) {
                console.log(res.url);
                enqueueSnackbar('Context file uploaded successfully', { variant: 'success' });
                setContextSetup(prev => ({ ...prev, contextFileUrl: res.url }));
            }
        }
    };

    const handleContextChange = (field: keyof ContextSetupTypes, value: string) => {
        setContextSetup(prev => ({ ...prev, [field]: value }));
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const createChatbotMutation = useMutation<unknown, Error, MergedData>({
        mutationFn: (data: MergedData) => axios.post('/api/chatbot/create-chatbot', data),
        onSuccess: (response: unknown) => {
            setChatbotId((response as { data: { id: string } }).data.id);
            console.log("Chatbot created successfully", (response as { data: { id: string } }).data.id);
            setIsModalOpen(true);
        },
        onError: (error: Error) => {
            enqueueSnackbar("Failed to submit bot configuration. Please try again.", { variant: 'error' });
            console.error("Error submitting bot configuration:", error);
        }
    });

    const handleSubmit = () => {
        const mergedData = {
            welcomeQuestions,
            organizationDetails,
            hours,
            botDetails,
            ticketPrices,
            contextSetup,
            userId
        };
        const result = mergedDataSchema.safeParse(mergedData);
        if (!result.success) {
            result.error.errors.forEach((error) => {
                console.log(error);
                enqueueSnackbar(error.message, { variant: "error" });
            });
        } else {
            setIsSubmitting(true);
            createChatbotMutation.mutate(mergedData, {
                onSettled: () => {
                    setIsSubmitting(false);
                }
            });
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCompleteConfiguration = () => {
        setIsModalOpen(false);
        setCompleteConfig(true);
        console.log("Configuration completed");
    };

    return (
        <>
            {completeConfig ? (
                <DomainSetup documentId={chatbotId} />
            ) : (
                <DefaultLayout>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Breadcrumb pageName="Build Your Bot" />
                        <WelcomeQuestions
                            welcomeQuestions={welcomeQuestions}
                            setWelcomeQuestions={setWelcomeQuestions}
                        />
                        <OrganizationDetails
                            organizationDetails={organizationDetails}
                            setOrganizationDetails={setOrganizationDetails}
                        />
                        <BotAppearance
                            botDetails={botDetails}
                            handleChange={handleBotAppearanceChange}
                            handleSelectChange={handleToneChange}
                            handleFileUpload={handleAvatarUpload}
                        />
                        <OpeningHoursSelector
                            hours={hours}
                            onChange={handleChange}
                            onApplyToAll={applyToAll}
                        />
                        <TicketPrice
                            ticketPrices={ticketPrices}
                            handleTicketPriceChange={handleTicketPriceChange}
                            handleAddOnChange={handleAddOnChange}
                            addCustomAddOn={addCustomAddOn}
                            removeCustomAddOn={removeCustomAddOn}
                            updateCustomAddOn={updateCustomAddOn}
                        />
                        <ContextSetup
                            contextSetup={contextSetup}
                            handleContextChange={handleContextChange}
                            handleContextFileUpload={handleContextFileUpload}
                            setContextSetup={setContextSetup}
                        />

                        <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:space-x-4 space-y-4 lg:space-y-0">
                            <ButtonDefault
                                label="Submit"
                                onClick={handleSubmit}
                                isLoading={isSubmitting}
                                customClasses="w-full max-w-[350px] bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg px-12 py-4 sm:px-10 sm:py-3 lg:px-12 lg:py-4 transition-all duration-300 ease-in-out transform hover:scale-105"
                            />
                            <ButtonDefault
                                label="Back"
                                onClick={onBack}
                                customClasses="w-full max-w-[350px] bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold rounded-lg shadow-lg px-12 py-4 sm:px-10 sm:py-3 lg:px-12 lg:py-4 transition-all duration-300 ease-in-out transform hover:scale-105"
                            />
                        </div>

                        {isModalOpen && (
                            <Modal
                                onClose={handleCloseModal}
                                onNext={handleCompleteConfiguration}
                            />
                        )}
                    </motion.div>
                </DefaultLayout>
            )}
        </>
    );

};

export default CreateChatBot;