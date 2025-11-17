// TermsOfService.tsx
import React, { useState } from "react";
import { Link } from "react-router";

interface TermSection {
  id: string;
  title: string;
  content: string;
}

const TermsOfService: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("agreement");
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  const termSections: TermSection[] = [
    {
      id: "agreement",
      title: "Agreement to Terms",
      content: `Welcome to the online portfolio of DK Global Fashion Wear Ltd. ("Company," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of our website dkglobalfashion.com (the "Site").
      By accessing, browsing, or using the Site, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Site.`,
    },
    {
      id: "services",
      title: "Description of Services",
      content: `This Site is a portfolio and informational website. Its primary purpose is to showcase the designs, brand, and creative work of DK Global Fashion Wear Ltd.
      Please note: This is not an e-commerce website. You cannot purchase products directly through this Site. Any inquiries regarding potential business collaborations, wholesale, or press should be directed through the provided contact information.

We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice.`,
    },

    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      content: `All content on this Site, including but not limited to text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, software, and the compilation of all content on the Site, is the exclusive property of DK Global Fashion Wear Ltd., its affiliates, or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws.

The "DK Global Fashion Wear Ltd." name and logo, and all related product and service names, design marks, and slogans are the trademarks or service marks of the Company. You are not authorized to use any such marks without our prior written permission.

You may view, download, and print content from the Site for your personal, non-commercial use only. You may not:
• Modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from the Site.
• Use any meta tags or any other "hidden text" utilizing our name or trademarks without our express written consent.
`,
    },

    {
      id: "prohibited",
      title: "Prohibited Activities",
      content: `You agree not to engage in any of the following prohibited activities:

• Using the Site in any way that violates any applicable local, national, or international law or regulation.
• Engaging in any conduct that restricts or inhibits anyone's use or enjoyment of the Site.
• Introducing any viruses, trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful.
• Attempting to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Site, the server on which the Site is stored, or any server, computer, or database connected to the Site.
`,
    },
    {
      id: "user-generated",
      title: "User-Generated Content",
      content: `
The Site may include features that allow you to submit content, such as through contact forms or comment sections ("User Content"). By submitting User Content, you grant us a non-exclusive, worldwide, royalty-free, perpetual, irrevocable, and sub-licensable right to use, reproduce, modify, adapt, publish, translate, and distribute it in any media.

You represent and warrant that you own or control all rights to the User Content you submit and that the User Content is accurate, does not violate these Terms, and will not cause injury to any person or entity.

We have the right, but not the obligation, to monitor and remove any User Content at our sole discretion.`,
    },

    {
      id: "disclaimer",
      title: "Disclaimer of Warranties",
      content: `
The Site and all content are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. DK Global Fashion Wear Ltd. disclaims all warranties, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement.`,
    },
    {
      id: "limitation",
      title: "Limitation of Liability",
      content: `To the fullest extent permitted by law, DK Global Fashion Wear Ltd. shall not be liable for any damages of any kind arising from the use of this Site, including, but not limited to, direct, indirect, incidental, punitive, and consequential damages. This includes, without limitation, damages for loss of profits, goodwill, data, or other intangible losses resulting from:

• Your access to or use of, or inability to access or use, the Site.
• Any conduct or content of any third party on the Site.
• Any content obtained from the Site.
• Unauthorized access, use, or alteration of your transmissions or content.
`,
    },
    {
      id: "indemnification",
      title: "Indemnification",
      content: `You agree to defend, indemnify, and hold harmless DK Global Fashion Wear Ltd., its officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Site.
`,
    },
    {
      id: "termination",
      title: "Termination",
      content: `We may terminate or suspend your access to the Site immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
`,
    },
    {
      id: "governing-law",
      title: "Governing Law",
      content: `These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions.

Any legal suit, action, or proceeding arising out of, or related to, these Terms of Service or the services shall be instituted exclusively in the courts of Dhaka, Bangladesh. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.`,
    },
    {
      id: "changes",
      title: "Changes to Terms",
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms of Service at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

By continuing to access or use our services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the services.`,
    },
    {
      id: "contact",
      title: "Contact Information",
      content: `If you have any questions about these Terms of Service, please contact us:

DK Global Fashion Wear Ltd.
Legal Department
House 52, Road 01, Sector 3, Uttara, Dhaka 1230
Bangladesh
Email: info@dkglobalfashion.com
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

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
    // In a real application, you would save this preference
    localStorage.setItem("termsAccepted", "true");
    alert("Thank you for accepting our Terms of Service!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Last Updated: {lastUpdated}
            </p>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Please read these Terms of Service carefully before using our
              website and services. These terms govern your access to and use of
              DK Global Fashion Wear Ltd.
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
                {termSections.map((section) => (
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

              {/* Acceptance Section in Sidebar */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Accept Terms
                </h3>
                <p className="text-blue-700 text-sm mb-3">
                  By using our services, you agree to these terms.
                </p>
                <button
                  onClick={handleAcceptTerms}
                  disabled={acceptedTerms}
                  className={`w-full py-2 px-4 rounded-md text-sm font-medium ${
                    acceptedTerms
                      ? "bg-green-100 text-green-700 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {acceptedTerms ? "Terms Accepted ✓" : "I Accept These Terms"}
                </button>
              </div>
            </div>
          </div>

          {/* Terms Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-lg">
              {termSections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className={`p-8 ${
                    index !== termSections.length - 1
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

            {/* Important Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-yellow-800">
                    Important Legal Notice
                  </h3>
                  <div className="text-yellow-700 mt-2 space-y-2">
                    <p>
                      These Terms of Service constitute a legally binding
                      agreement between you and DK Global Fashion Wear Ltd.
                    </p>
                    <p>
                      If you do not agree to these terms, you must immediately
                      cease using our website and services.
                    </p>
                    <p className="font-semibold">
                      We recommend that you print or save a copy of these terms
                      for your records.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => window.print()}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
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
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  Print Terms
                </button>
                <button
                  onClick={() => {
                    const element = document.createElement("a");
                    const file = new Blob(
                      [
                        document.getElementById("terms-content")?.innerText ||
                          "",
                      ],
                      { type: "text/plain" }
                    );
                    element.href = URL.createObjectURL(file);
                    element.download = "dk-global-fashion-terms-of-service.txt";
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                  }}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
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
                  Download Terms
                </button>
                <Link
                  to={"/contact-us"}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
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
                  Contact Legal Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
