"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';


const CongratulationsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const router = useRouter();

    const handleGoHome = () => {
        router.push('/dashboard');
    };

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white rounded-lg p-8 shadow-lg max-w-sm mx-auto"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
            >
                <h3 className="text-xl font-semibold mb-4">Congratulations!</h3>
                <p className="text-gray-700 mb-6">Your domain setup is complete. Your bot is now ready to interact with users.</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleGoHome}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors"
                    >
                        Go Home
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CongratulationsModal;
