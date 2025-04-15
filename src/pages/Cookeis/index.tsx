import { Cookie, Key, Compass, BarChart, Settings, Info } from 'lucide-react';

export function CookiePolicy() {
  const sections = [
    {
      title: "What Are Cookies",
      icon: <Cookie className="w-6 h-6 text-indigo-600" />,
      content: "Cookies are small text files that are placed on your device when you visit our website. They allow us to remember your preferences, understand how you use our site, and improve your experience. Some cookies are essential for the functioning of our platform, while others help us enhance its performance and usability."
    },
    {
      title: "Types of Cookies We Use",
      icon: <Key className="w-6 h-6 text-indigo-600" />,
      content: "WiseDroid AI uses several types of cookies: Essential cookies are necessary for basic functions like secure login and maintaining your session. Preference cookies remember your settings and choices. Analytics cookies help us understand how visitors interact with our site. Marketing cookies may be used to track your activity across websites to deliver relevant advertising."
    },
    {
      title: "Third-Party Cookies",
      icon: <Compass className="w-6 h-6 text-indigo-600" />,
      content: "Some cookies are placed by third parties that provide services on our behalf, such as analytics or advertising. These third parties may collect information about your online activities over time and across different websites. We do not control these third-party cookies and recommend reviewing their privacy policies for more information about their practices."
    },
    {
      title: "Cookie Usage",
      icon: <BarChart className="w-6 h-6 text-indigo-600" />,
      content: "We use cookies to improve your browsing experience, analyze site traffic, personalize content, remember your preferences, and provide social media features. These activities help us understand how our services are being used so we can deliver better functionality and targeted content based on your interests and needs."
    },
    {
      title: "Managing Cookies",
      icon: <Settings className="w-6 h-6 text-indigo-600" />,
      content: "You can control and manage cookies in various ways. Most web browsers allow you to adjust your cookie settings to accept, reject, or delete cookies. Please note that removing or blocking certain cookies may impact your experience on our website and limit some functionality. You can also manage cookie preferences through our cookie consent tool displayed on your first visit."
    },
    {
      title: "Cookie Policy Updates",
      icon: <Info className="w-6 h-6 text-indigo-600" />,
      content: "We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page with an updated effective date. We encourage you to periodically review this policy to stay informed about how we use cookies and related technologies."
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Understanding how WiseDroid AI uses cookies and how you can control them.
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cookie Consent</h3>
            <p className="text-gray-600 mb-6">
              By continuing to use our website, you consent to our use of cookies as described in this Cookie Policy. You can change your cookie settings at any time through your browser settings or our cookie preference center.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h3>
            <p className="text-gray-600">
              If you have any questions about our Cookie Policy, please contact us at <a href="mailto:privacy@wisedroidai.com" className="text-indigo-600 hover:text-indigo-800">privacy@wisedroidai.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}