"use client";
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Check, Copy, Download } from 'react-feather';
import { useQRCode } from 'next-qrcode';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CongratulationsModal from './succes'; // Adjust the path as necessary

const DomainSetup: React.FC<{ documentId: string }> = ({ documentId }) => {
    const [path, setPath] = useState<string>('');
    const [fullUrl, setFullUrl] = useState<string>('');
    const [isQRReady, setIsQRReady] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);
    const [isUrlAvailable, setIsUrlAvailable] = useState<boolean | null>(null);
    const [isCheckingUrl, setIsCheckingUrl] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false); // State for modal visibility
    const { Canvas } = useQRCode();
    console.log(documentId);

    useEffect(() => {
        setFullUrl(`https://converisifi.vercel.app/chat/${path}`);
        setIsQRReady(path.length > 0 && !error);

        const debounceTimer = setTimeout(() => {
            if (path && !error) {
                setIsCheckingUrl(true);
                checkUrlAvailability(path);
            } else {
                setIsUrlAvailable(null);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(debounceTimer);
    }, [path, error]);

    const checkUrlAvailability = async (url: string) => {
        try {
            const response = await fetch(`/api/chatbot/url-available?url=${url}`);
            const data = await response.json();
            setIsUrlAvailable(data.isAvailable === true || data.isAvailable === false ? data.isAvailable : null);
        } catch (error) {
            console.error('Error checking URL availability:', error);
            setIsUrlAvailable(null);
        } finally {
            setIsCheckingUrl(false);
        }
    };

    const validatePath = (input: string): string => {
        if (input.length === 0) return '';
        if (!/^[a-z0-9-]+$/.test(input)) {
            return 'Only lowercase letters, numbers, and hyphens are allowed.';
        }
        if (input.startsWith('-') || input.endsWith('-')) {
            return 'Path cannot start or end with a hyphen.';
        }
        if (input.includes('--')) {
            return 'Path cannot contain consecutive hyphens.';
        }
        return '';
    };

    const handlePathChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPath = e.target.value.toLowerCase().replace(/\s+/g, '-');
        setPath(newPath);
        setError(validatePath(newPath));
        setIsUrlAvailable(null); // Reset availability status when typing
    };

    const handleDownload = () => {
        const canvas = document.querySelector('canvas');
        if (canvas instanceof HTMLCanvasElement) {
            const link = document.createElement('a');
            link.download = `qr-code.png`;
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy URL to clipboard:', error);
            alert('Failed to copy URL. Please try again.');
        }
    };

    const handleFinishSetup = async () => {
        try {
            const response = await fetch('/api/chatbot/add-url', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: documentId, botUrl: fullUrl }),
            });
            const result = await response.json();
            if (result.success) {
                setShowModal(true); // Show modal on success
            } else {
                alert('Failed to update bot URL.');
            }
        } catch (error) {
            console.error('Error finishing setup:', error);
            alert('An error occurred while finishing setup.');
        }
    };

    const getInputBorderColor = () => {
        if (error) return 'border-b-red-500';
        if (isUrlAvailable === true) return 'border-b-green-500';
        if (isUrlAvailable === false) return 'border-b-red-500';
        return 'border-b-gray-700';
    };

    const isFinishDisabled = Boolean(error) || isCheckingUrl || isUrlAvailable === false;

    return (
        <div>
            <motion.div
                className='rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl p-8 mb-8'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h3 className="font-extrabold text-3xl text-white mb-6 pb-4 border-b border-gray-700">
                    Setup domain for your bot
                </h3>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center mb-4 bg-gray-900 p-4 rounded-lg shadow-lg">
                            <span className="text-lg text-white font-mono mr-4 bg-gray-800 px-3 py-1 rounded-lg shadow-sm">
                                https://converisifi.vercel.app/chat/
                            </span>
                            <input
                                type="text"
                                name="path"
                                value={path}
                                onChange={handlePathChange}
                                placeholder="Enter unique path"
                                className={`flex-1 bg-gray-700 text-white border-b-2 focus:outline-none transition-colors duration-300 px-3 py-2 rounded-lg ${getInputBorderColor()}`}
                            />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: error || isUrlAvailable !== null ? 1 : 0, y: error || isUrlAvailable !== null ? 0 : 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                            {isUrlAvailable === false && <p className="text-red-400 text-sm mt-2">This URL is not available.</p>}
                            {isUrlAvailable === true && <p className="text-green-400 text-sm mt-2">This URL is available!</p>}
                        </motion.div>

                        <div className="flex items-center mt-4">
                            <p className="text-sm text-gray-300 mr-2 font-mono bg-gray-800 rounded-md p-2 shadow-md border border-gray-600">
                                <span className="font-semibold text-white">Your full URL:</span> {fullUrl}
                            </p>
                            <motion.button
                                onClick={handleCopy}
                                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                                title="Copy URL"
                                whileTap={{ scale: 0.9 }}
                            >
                                {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-gray-400" />}
                            </motion.button>
                        </div>
                    </div>
                    <motion.div
                        className="w-full md:w-1/2 flex flex-col items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="p-4 bg-white rounded-xl shadow-inner mb-6">
                            {isQRReady ? (
                                <Canvas
                                    text={fullUrl}
                                    options={{
                                        errorCorrectionLevel: 'M',
                                        margin: 2,
                                        scale: 4,
                                        width: 200,
                                        color: {
                                            dark: '#1a202c',
                                            light: '#ffffff',
                                        },
                                    }}
                                />
                            ) : (
                                <div className="relative w-56 h-56">
                                    <Image
                                        src='/images/qr-code.png'
                                        alt="Placeholder QR Code"
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-xl filter blur-md"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <p className="text-black text-sm">Start Typing to reveal the QR ...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleDownload}
                            disabled={!isQRReady}
                            className="mb-4 p-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                        >
                            Download QR Code
                        </button>
                    </motion.div>
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleFinishSetup}
                        disabled={isFinishDisabled}
                        className={`px-6 py-2 rounded-lg text-white font-semibold ${isFinishDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        Finish Setup
                    </button>
                </div>
            </motion.div>
            {showModal && (
                <CongratulationsModal onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default DomainSetup;
