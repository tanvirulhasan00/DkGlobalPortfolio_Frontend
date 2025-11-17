// PrivacyPolicy.tsx
import React, { useState } from "react";

interface PolicySection {
  id: string;
  title: string;
  content: string;
}

const PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  const policySections: PolicySection[] = [
    {
      id: "introduction",
      title: "Introduction",
      content: `Welcome to DK Global Fashion Wear Ltd. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our portfolio website, dkglobalfashion.com (the "Site").

Please read this policy carefully. By accessing and using our Site, you consent to the practices described in this policy. If you do not agree with the terms of this policy, please do not access the Site.`,
    },
    {
      id: "information-collection",
      title: "Information We Collect",
      content: `We may collect information about you in a few ways:
      A. Information You Voluntarily Provide to Us:
• Contact Forms: When you use our contact form to get in touch for business inquiries, collaborations, or press, we may collect your name, email address, phone number, company name, and the content of your message.
• Newsletter Sign-ups: If we offer a newsletter, we will collect your email address to send it to you.
• Correspondence: If you contact us via email, we will retain the content of your message and our response.
B. Information Collected Automatically:
• Technical Data: Like most websites, we automatically collect information sent by your browser. This may include your IP address, browser type and version, time zone setting, browser plug-in types, operating system and platform, and other technology on the devices you use to access this Site.
• Usage Data: We collect information about how you use our Site, such as the pages you view, the links you click, the time and duration of your visits, and the referring website address.

This automatic collection is typically done using cookies and similar tracking technologies.`,
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      content: `We use the information we collect for the following purposes:
• To Respond to Your Inquiries: To answer the questions and requests you send us via our contact forms or email.
• To Improve Our Site: To analyze how visitors use our Site so we can enhance its functionality, content, and user experience.
• For Business Communications: To communicate with you about potential business opportunities, collaborations, or other professional purposes you have initiated.
• For Marketing (with consent): If you have opted-in to receive our newsletter, to send you updates about our latest collections, news, and events. You can opt-out at any time.
• For Security: To monitor and protect the security of our Site and our business.
`,
    },
    {
      id: "legal-basis",
      title: "Legal Basis for Processing (For Bangladesh Context)",
      content: `We process your personal information based on the following legal grounds:
• Your Consent: For specific purposes like sending marketing newsletters, where we will ask for your explicit consent.
• Legitimate Interests: To operate our business and provide you with the services you request, such as responding to your inquiries and improving our Site, provided such interests are not overridden by your data protection rights.
• Legal Obligation: To comply with applicable laws and regulations in Bangladesh.

`,
    },
    {
      id: "data-sharing",
      title: "Data Sharing and Disclosure",
      content: `We value your trust and do not sell, trade, or rent your personal information to third parties. We may share your information only in the following situations:
• Service Providers: With trusted third-party service providers who assist us in operating our website, conducting our business, or serving you (e.g., website hosting, analytics providers), provided they agree to keep this information confidential.
• Legal Requirements: If required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency in Bangladesh).
• Business Transfers: In connection with a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred.

We do not sell your personal information to third parties.`,
    },
    {
      id: "data-retention",
      title: "Data Retention",
      content: `We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy, or as required to comply with our legal obligations, resolve disputes, and enforce our agreements.`,
    },
    {
      id: "data-security",
      title: "Data Security",
      content: `We implement appropriate technical and organizational security measures designed to protect your personal information from accidental loss, unauthorized access, use, alteration, and disclosure. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.`,
    },
    {
      id: "your-rights",
      title: "Your Rights and Choices",
      content: `Under the principles of data protection in Bangladesh and international best practices, you have the following rights regarding your personal data:
• Right to Access: You can request a copy of the personal information we hold about you.
• Right to Correction: You can request that we correct any inaccurate or incomplete information we hold about you.
• Right to Withdraw Consent: Where we rely on your consent to process your data, you have the right to withdraw that consent at any time.
• Restriction: You can request restriction of processing of your personal information.
• Portability: You can request transfer of your data to another organization.
• Right to Erasure: You can request that we delete your personal information, subject to certain legal limitations.
• Objection: You can object to processing of your personal information.

To exercise these rights, please contact us using the information provided in the "Contact Us" section.`,
    },
    {
      id: "cookies",
      title: "Cookies and Tracking Technologies",
      content: `Our Site uses "cookies" to enhance your experience. A cookie is a small file placed on your device. You can choose to set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this Site may become inaccessible or not function properly.`,
    },

    {
      id: "international-transfer",
      title: "International Data Transfers",
      content: `Your information, including personal data, may be transferred to —and maintained on— computers located outside of Bangladesh where the data protection laws may differ. By using our Site, you consent to such transfer. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy.`,
    },

    {
      id: "policy-changes",
      title: "Changes to This Policy",
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will update the "Last Updated" date at the top of this policy. If we make material changes, we will provide notice through our website or by other means to give you an opportunity to review the changes before they become effective. We encourage you to periodically review this page for the latest information on our privacy practices.`,
    },
    {
      id: "contact-us",
      title: "Contact Us",
      content: `If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:

DK Global Fashion Wear Ltd.
Data Protection Officer
123 Fashion District, Dhaka 1230
Bangladesh
Email: info@dkgfashion.com
Phone: +880 2 XXXX-XXXX

We will respond to your inquiry within a reasonable timeframe.`,
    },
  ];

  const lastUpdated = "November 1, 2025";

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Last Updated: {lastUpdated}
            </p>
            <p className="text-gray-700 max-w-3xl mx-auto">
              At DK Global Fashion Wear Ltd., we are committed to protecting
              your privacy and ensuring the security of your personal
              information. This policy outlines how we collect, use, and protect
              your data.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents - Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Table of Contents
              </h2>
              <nav className="space-y-2">
                {policySections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Policy Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-lg">
              {policySections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className={`p-8 ${
                    index !== policySections.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                      {index + 1}
                    </span>
                    {section.title}
                  </h2>
                  <div className="text-gray-700 leading-relaxed">
                    {section.content.split("\n").map((paragraph, idx) => (
                      <p key={idx} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download Privacy Policy
                </button>
                <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contact Data Protection Officer
                </button>
              </div>
            </div>

            {/* Consent Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-blue-800">
                    Your Privacy Choices
                  </h3>
                  <p className="text-blue-700 mt-1">
                    By using our website and services, you consent to the terms
                    of this Privacy Policy. You can manage your privacy
                    preferences through your account settings or by contacting
                    us directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
