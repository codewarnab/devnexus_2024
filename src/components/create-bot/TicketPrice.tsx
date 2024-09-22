import React from 'react';
import { TicketPriceProps } from '@/types/ticketPrice';
import InputGroup from '@/components/FormElements/InputGroup';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const TicketPrice: React.FC<TicketPriceProps> = ({
    ticketPrices,
    handleTicketPriceChange,
    handleAddOnChange,
    addCustomAddOn,
    removeCustomAddOn,
    updateCustomAddOn
}) => {
    return (
        <div className='rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card p-6 mb-5'>
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Ticket Prices
                </h3>
            </div>
            <div className="py-6.5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4.5">
                    <div>
                        <InputGroup
                            type="number"
                            label='Adult Price'
                            placeholder="Enter adult price"
                            value={ticketPrices.adultPrice}
                            onChange={(e) => handleTicketPriceChange('adultPrice', Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <InputGroup
                            type="number"
                            label='Child Price'
                            placeholder="Enter child price"
                            value={ticketPrices.childPrice}
                            onChange={(e) => handleTicketPriceChange('childPrice', Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <InputGroup
                            type="number"
                            placeholder="Enter foreigner price"
                            label='Foreigner Price'
                            value={ticketPrices.foreignerPrice}
                            onChange={(e) => handleTicketPriceChange('foreignerPrice', Number(e.target.value))}
                        />
                    </div>
                </div>

                <h4 className="mb-3 ml-3 text-black dark:text-white font-medium text-sm dark:border-strokedark border-b border-stroke">Add-ons</h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4.5">
                    <div>
                        <InputGroup
                            type="number"
                            placeholder="Enter cloak room charges"
                            label='Cloak Room Charges'
                            value={ticketPrices.addOns.cloakRoomCharges}
                            onChange={(e) => handleAddOnChange('cloakRoomCharges', Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <InputGroup
                            type="number"
                            placeholder="Enter guided tour price"
                            label='Guided Tour'
                            value={ticketPrices.addOns.guidedTour}
                            onChange={(e) => handleAddOnChange('guidedTour', Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <InputGroup
                            type="number"
                            placeholder="Enter high-end camera price"
                            label='High End Camera'
                            value={ticketPrices.addOns.highEndCamera}
                            onChange={(e) => handleAddOnChange('highEndCamera', Number(e.target.value))}
                        />
                    </div>
                </div>

                <h4 className="mb-2.5 text-black dark:text-white">Custom Add-ons</h4>

                <AnimatePresence>
                    {ticketPrices.addOns.customAddOns.map((addon, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-4.5 flex flex-col md:flex-row md:items-center gap-4"
                        >
                            <div className="flex-1">
                                <InputGroup
                                    type="text"
                                    placeholder="Add-on name"
                                    label='Add-on Name'
                                    value={addon.name}
                                    onChange={(e) => updateCustomAddOn(index, 'name', e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <InputGroup
                                    type="number"
                                    placeholder="Price"
                                    label='Price'
                                    value={addon.price}
                                    onChange={(e) => updateCustomAddOn(index, 'price', Number(e.target.value))}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeCustomAddOn(index)}
                                className="flex lg:pt-4 items-center justify-center text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 md:ml-2"
                            >
                                <FaTrash size={18} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <button
                    type="button"
                    onClick={() => addCustomAddOn({ name: '', price: 0 })}
                    className="mt-3 flex w-70 justify-center items-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                >
                    <FaPlus className="mr-2" />
                    Add Custom Add-on
                </button>
            </div>
        </div>
    );
};

export default TicketPrice;
