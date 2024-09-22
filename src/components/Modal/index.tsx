import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CongratulationsModalProps {
    onClose: () => void;
    onNext: () => void;
}

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({ onClose, onNext }) => {
    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="bg-[#5e5cff] text-white rounded-xl p-8 max-w-xl w-full relative"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-200">
                    <X size={32} />
                </button>
                <div className="flex flex-col items-center text-center">
                    <div className="bg-[#7a78ff] rounded-full p-6 mb-6">
                        <Image
                            src="/images/Congratulations.svg"
                            alt="Congratulations"
                            width={64}
                            height={64}
                        />
                    </div>
                    <h2 className="text-4xl font-bold mb-4">Congratulations!</h2>
                    <p className="mb-8 text-xl">
                        Your ChatBot is Successfully Created. Now Select URL to Share with your visitors and customers.
                    </p>

                    <button
                        onClick={onNext}
                        className="bg-white text-[#5e5cff] py-3 px-6 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Complete Configuration
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CongratulationsModal;
