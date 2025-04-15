import React from 'react';
import { FileText, AlertCircle, Scale, Clock, Shield, Zap } from 'lucide-react';

export function TermsOfService() {
  const sections = [
    {
      title: "Service Agreement",
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      content: "By accessing or using WiseDroid AI's platform, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our service. Your subscription constitutes your agreement to these terms, which form a binding contract between you and WiseDroid AI."
    },
    {
      title: "Account Responsibilities",
      icon: <Shield className="w-6 h-6 text-indigo-600" />,
      content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify WiseDroid AI of any unauthorized use of your account or any other breach of security. WiseDroid AI cannot and will not be liable for any loss or damage arising from your failure to comply with this provision."
    },
    {
      title: "Subscription and Billing",
      icon: <Zap className="w-6 h-6 text-indigo-600" />,
      content: "WiseDroid AI offers subscription plans as described on our pricing page. You agree to pay all fees associated with your selected plan. Unless otherwise stated, all fees are quoted in U.S. Dollars. We reserve the right to change our prices with 30 days notice. Continued use of the service after a price change constitutes your acceptance of the new pricing."
    },
    {
      title: "Acceptable Use",
      icon: <AlertCircle className="w-6 h-6 text-indigo-600" />,
      content: "You agree not to use WiseDroid AI for any unlawful purposes or to conduct any unlawful activity. This includes but is not limited to: abusive conduct, transmitting malware, infringing intellectual property, or accessing data not intended for you. WiseDroid AI reserves the right to terminate your access for violating these restrictions or any other provision of these Terms."
    },
    {
      title: "Intellectual Property",
      icon: <Scale className="w-6 h-6 text-indigo-600" />,
      content: "WiseDroid AI and its licensors retain all right, title, and interest in and to the service, including all related intellectual property rights. You acknowledge that the service contains proprietary and confidential information that is protected by applicable intellectual property and other laws. You are granted a limited license to use the service subject to these Terms."
    },
    {
      title: "Term and Termination",
      icon: <Clock className="w-6 h-6 text-indigo-600" />,
      content: "These Terms will remain in effect until terminated by you or WiseDroid AI. You may terminate these Terms at any time by canceling your account. WiseDroid AI may terminate or suspend your access to the service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, WiseDroid AI, or third parties, or for any other reason at our sole discretion."
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using WiseDroid AI's platform and services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-gray-600 mb-8">
            Effective Date: April 15, 2025
          </p>

          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.title} className="border-b border-gray-100 pb-6 last:border-b-0">
                <div className="flex items-center gap-3 mb-4">
                  {section.icon}
                  <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Modifications to Terms</h3>
            <p className="text-gray-600 mb-6">
              WiseDroid AI reserves the right to modify these Terms at any time. We will provide notice of any material changes through our service or by sending you an email. Your continued use of the service after such modifications constitutes your acceptance of the revised Terms.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
            <p className="text-gray-600">
              If you have any questions about these Terms, please contact us at <a href="mailto:legal@wisedroidai.com" className="text-indigo-600 hover:text-indigo-800">legal@wisedroidai.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}