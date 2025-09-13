"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FiDownload, FiCopy, FiCheck, FiX } from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";

export const QRCode = () => {
    const [inputText, setInputText] = useState("");
    const [copied, setCopied] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleDownload = () => {
        const canvas = document.getElementById("qrCode") as HTMLCanvasElement;
        if (!canvas) return;
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qr_code.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(inputText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    const handleClear = () => {
        setInputText("");
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
            <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6 flex flex-col items-center">

                {/* Header */}
                <h1 className="text-xl font-bold text-gray-800 mb-1 flex items-center">
                    <BsQrCode className="mr-2 text-indigo-600" />
                    QR Code Generator
                </h1>
                <p className="text-sm text-gray-500 mb-4 text-center">
                    Enter text or a link to generate your QR code
                </p>

                {/* Input */}
                <div className="relative w-full mb-4">
                    <textarea
                        ref={textareaRef}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 resize-none text-sm bg-white"
                        placeholder="Type here..."
                        rows={2}
                    />
                    {inputText && (
                        <button
                            onClick={handleClear}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                            <FiX size={18} />
                        </button>
                    )}
                </div>

                {/* QR Code */}
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-md mb-4">
                    {inputText.trim() ? (
                        <QRCodeCanvas
                            id="qrCode"
                            value={inputText}
                            size={200}
                            bgColor="#ffffff"
                            fgColor="#4f46e5"
                            level="H"
                            includeMargin={true}
                        />
                    ) : (
                        <div className="w-48 h-48 flex flex-col items-center justify-center text-gray-300">
                            <BsQrCode size={48} className="opacity-30 mb-2" />
                            <p className="text-xs text-center">QR code preview</p>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 w-full">
                    <button
                        onClick={handleDownload}
                        disabled={!inputText.trim()}
                        className="flex-1 flex items-center justify-center bg-indigo-600 text-white py-3 rounded-xl text-sm font-medium transition-all hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FiDownload className="mr-1" /> Download
                    </button>
                    <button
                        onClick={handleCopy}
                        disabled={!inputText.trim()}
                        className="flex-1 flex items-center justify-center bg-white text-gray-800 border border-gray-200 py-3 rounded-xl text-sm font-medium transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {copied ? (
                            <FiCheck className="mr-1 text-green-600" />
                        ) : (
                            <FiCopy className="mr-1" />
                        )}
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Created by{" "}
                    <a
                        href="https://github.com/kingdamie"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-purple-600 hover:text-purple-800 transition"
                    >
                        Olaniyan Damilare
                    </a>{" "}
                    • Source code available{" "}
                    <a
                        href="https://github.com/kingdamie/qrcode-generator"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-purple-600 hover:text-purple-800 transition"
                    >
                        here
                    </a>
                </div>

            </div>
        </div>
    );
};
