import React from 'react';
import { ContactForm } from '@/components/forms/ContactForm';
import { MapPin, Phone, Mail } from 'lucide-react';

export function Contact() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-500">
            We'd love to hear from you. Please fill out this form or use our contact information.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <div className="space-y-8">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-indigo-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Office</h3>
                  <p className="mt-1 text-gray-500">
                    123 Innovation Drive<br />
                    Silicon Valley, CA 94025
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="h-6 w-6 text-indigo-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                  <p className="mt-1 text-gray-500">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center">
                <Mail className="h-6 w-6 text-indigo-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="mt-1 text-gray-500">contact@wisedroids.com</p>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}