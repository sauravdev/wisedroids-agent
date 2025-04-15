import { Shield, Lock, Eye, FileText, Bell, Download } from 'lucide-react';

export function PrivacyPolicy() {
  const sections = [
    {
      title: "Data Collection",
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      content: "WiseDroid AI collects information that you provide directly to us, including personal information such as your name, email address, and payment information when you register for an account, subscribe to our service, or contact our support team. We also automatically collect certain information about your device and how you interact with our platform."
    },
    {
      title: "Data Usage",
      icon: <Eye className="w-6 h-6 text-indigo-600" />,
      content: "We use the information we collect to provide, maintain, and improve our services, process transactions, send communications, and for internal analytics. Your agent training data is used solely to improve your specific agents' performance and is not shared with other customers."
    },
    {
      title: "Data Security",
      icon: <Lock className="w-6 h-6 text-indigo-600" />,
      content: "WiseDroid AI employs industry-standard security measures to protect your personal information. We implement various security protocols and encryption methods to safeguard your data from unauthorized access, disclosure, alteration, and destruction."
    },
    {
      title: "Data Sharing",
      icon: <Shield className="w-6 h-6 text-indigo-600" />,
      content: "We do not sell your personal information to third parties. We may share data with trusted service providers who assist us in operating our platform, conducting our business, or servicing you. These third parties are contractually obligated to keep this information confidential."
    },
    {
      title: "User Rights",
      icon: <Download className="w-6 h-6 text-indigo-600" />,
      content: "You have the right to access, correct, or delete your personal information at any time. You can export your data or request its deletion through your account settings or by contacting our support team. We retain your information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy."
    },
    {
      title: "Policy Updates",
      icon: <Bell className="w-6 h-6 text-indigo-600" />,
      content: "We may update this Privacy Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. We will notify you of any material changes via email or through a notice on our website prior to the change becoming effective."
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            At WiseDroid AI, we take your privacy seriously. Learn how we collect, use, and protect your information.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-gray-600 mb-8">
            Last Updated: April 15, 2025
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h3>
            <p className="text-gray-600">
              If you have any questions or concerns about our Privacy Policy, please contact us at <a href="mailto:privacy@wisedroidai.com" className="text-indigo-600 hover:text-indigo-800">privacy@wisedroidai.com</a> or through our support channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}