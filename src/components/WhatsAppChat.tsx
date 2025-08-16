import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

interface WhatsAppChatProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export function WhatsAppChat({ 
  phoneNumber = '+917310768702', 
  message = 'Hello! I need help with WiseDroids.',
  className = ''
}: WhatsAppChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the chat button after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\s/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneClick = () => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-xl border border-gray-200 w-80">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">WiseDroids Support</h3>
                <p className="text-sm text-green-100">We typically reply instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-green-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="p-4">
            <div className="bg-gray-100 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700">
                👋 Hi! Need help with WiseDroids? We're here to assist you!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </button>
              
              <button
                onClick={handlePhoneClick}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Call us directly</span>
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Available 24/7 for instant support
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Open WhatsApp chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
} 