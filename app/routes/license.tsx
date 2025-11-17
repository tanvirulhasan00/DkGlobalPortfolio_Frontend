// License.tsx
import React, { useState } from "react";

interface LicenseSection {
  id: string;
  title: string;
  content: string;
}

interface SoftwareLicense {
  name: string;
  version: string;
  licenseType: string;
  description: string;
}

const License: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [selectedLicense, setSelectedLicense] = useState<string>("");

  const licenseSections: LicenseSection[] = [
    {
      id: "introduction",
      title: "Introduction",
      content: `This License Agreement ("Agreement") governs the use of software, content, and intellectual property owned by DK Global Fashion Wear Ltd. ("Licensor"). By accessing, downloading, installing, or using any of our licensed materials, you ("Licensee") agree to be bound by the terms of this Agreement.

This Agreement covers various types of licenses we offer, including software licenses, content licenses, and intellectual property licenses. Each license type has specific terms and conditions that apply.`,
    },
    {
      id: "definitions",
      title: "Definitions",
      content: `For the purposes of this Agreement:

• "Software" means any computer program, application, or code made available by Licensor.
• "Content" means any text, images, graphics, designs, or other media made available by Licensor.
• "Intellectual Property" means patents, trademarks, copyrights, trade secrets, and other proprietary rights.
• "Licensee" means the individual or entity obtaining a license from Licensor.
• "Term" means the duration for which the license is valid.
• "Fees" means any payments required for the license.`,
    },
    {
      id: "license-types",
      title: "Types of Licenses",
      content: `DK Global Fashion Wear Ltd. offers several types of licenses:

1. **Software Development License**
   - For developers integrating our APIs or using our software development kits
   - Includes access to documentation and technical support
   - May include source code access for enterprise customers

2. **Content License**
   - For use of our fashion designs, images, and media content
   - Includes royalty-free and royalty-bearing options
   - Specifies permitted uses and distribution channels

3. **Trademark License**
   - For authorized use of our brand names and logos
   - Requires adherence to brand guidelines
   - Typically granted to partners and affiliates

4. **Open Source License**
   - For software released under open source agreements
   - Includes GPL, MIT, and Apache licenses where applicable
   - Available for community development projects`,
    },
    {
      id: "grant-of-license",
      title: "Grant of License",
      content: `Subject to the terms of this Agreement, Licensor grants Licensee a non-exclusive, non-transferable, limited license to:

• Use the licensed materials for the specified purpose
• Install and use software on authorized devices
• Reproduce and distribute content as permitted
• Modify software as allowed by the license type
• Sublicense under conditions specified in the agreement

This license is granted solely for Licensee's internal business purposes or as otherwise specified in the ordering document.`,
    },
    {
      id: "restrictions",
      title: "License Restrictions",
      content: `Licensee shall not, and shall not permit others to:

• Reverse engineer, decompile, or disassemble the software except to the extent applicable law expressly permits
• Remove or alter any trademark, logo, copyright, or other proprietary notices
• Use the licensed materials for any illegal or unauthorized purpose
• Distribute, sublicense, lease, rent, or loan the materials to third parties without authorization
• Use the materials to create competing products or services
• Bypass any security mechanisms or usage limitations
• Use the materials in violation of any applicable laws or regulations

Violation of these restrictions may result in immediate termination of the license.`,
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      content: `All intellectual property rights in the licensed materials remain the exclusive property of DK Global Fashion Wear Ltd. This Agreement does not transfer any ownership rights to Licensee.

Licensee acknowledges that:
• All patents, copyrights, trade secrets, and other intellectual property rights are owned by Licensor
• Licensee acquires only the right to use the materials as specified in this Agreement
• Licensee shall not challenge Licensor's ownership of the intellectual property
• Any improvements or modifications to the software remain the property of Licensor

Licensee may be required to assign rights to any improvements back to Licensor, depending on the license type.`,
    },
    {
      id: "open-source",
      title: "Open Source Components",
      content: `Our software may include components subject to open source licenses. These components are governed by their respective licenses and not by this Agreement.

Notable open source licenses we use:
• **MIT License**: Permissive license allowing reuse with attribution
• **Apache 2.0**: Permissive license with patent protection
• **GPL v3**: Copyleft license requiring source code disclosure

A complete list of open source components and their licenses is available in our software documentation. Licensee must comply with all applicable open source license terms.`,
    },
    {
      id: "fees-payment",
      title: "Fees and Payment",
      content: `License fees are specified in the ordering document or pricing schedule. Payment terms are as follows:

• Fees are due within 30 days of invoice date
• Late payments may incur interest at 1.5% per month
• All fees are non-refundable except as required by law
• Licensee is responsible for all taxes, duties, and similar charges

We offer various pricing models:
• **Perpetual License**: One-time fee for ongoing use
• **Subscription License**: Recurring fees for continued access
• **Usage-Based License**: Fees based on actual usage metrics
• **Enterprise License**: Custom pricing for large organizations`,
    },
    {
      id: "term-termination",
      title: "Term and Termination",
      content: `This Agreement becomes effective upon acceptance and continues for the specified term. Termination conditions include:

• **For Cause**: Either party may terminate for material breach with 30 days' written notice
• **Insolvency**: Automatic termination upon bankruptcy or insolvency proceedings
• **Convenience**: Licensor may terminate with 60 days' written notice for subscription licenses

Upon termination:
• Licensee must cease all use of the licensed materials
• Licensee must destroy all copies of the materials
• Licensee must provide written certification of destruction
• Provisions that by their nature should survive will remain in effect`,
    },
    {
      id: "warranty-disclaimer",
      title: "Warranty Disclaimer",
      content: `THE LICENSED MATERIALS ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. LICENSOR DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:

• IMPLIED WARRANTIES OF MERCHANTABILITY
• FITNESS FOR A PARTICULAR PURPOSE
• NON-INFRINGEMENT OF THIRD-PARTY RIGHTS
• ACCURACY OR COMPLETENESS OF CONTENT
• UNINTERRUPTED OR ERROR-FREE OPERATION

Licensor does not warrant that the materials will meet Licensee's requirements or that operation will be uninterrupted. Some jurisdictions do not allow the exclusion of implied warranties, so these limitations may not apply.`,
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, LICENSOR'S TOTAL LIABILITY UNDER THIS AGREEMENT SHALL NOT EXCEED THE FEES PAID BY LICENSEE DURING THE 12 MONTHS PRECEDING THE CLAIM.

IN NO EVENT SHALL LICENSOR BE LIABLE FOR:
• INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES
• LOST PROFITS OR REVENUE
• LOST DATA OR BUSINESS INFORMATION
• COSTS OF PROCUREMENT OF SUBSTITUTE GOODS

These limitations apply even if Licensor has been advised of the possibility of such damages. Some jurisdictions do not allow the limitation of liability, so these limitations may not apply.`,
    },
    {
      id: "third-party",
      title: "Third-Party Software",
      content: `Our software may include or depend on third-party components. These components are subject to their own license agreements, which may contain different terms and conditions.

Licensee is responsible for:
• Reviewing and complying with all third-party license terms
• Obtaining any necessary third-party licenses
• Ensuring third-party components meet Licensee's requirements

We provide a list of significant third-party components in our documentation, but Licensee should verify the complete list in the actual software distribution.`,
    },
    {
      id: "export-control",
      title: "Export Control",
      content: `Licensee acknowledges that the licensed materials may be subject to export control laws and regulations. Licensee agrees to comply with all applicable international and national laws that govern:

• The export and re-export of software and technology
• Trade sanctions and embargoes
• End-use and end-user restrictions

Licensee represents and warrants that:
• They are not located in a sanctioned country
• They are not on any prohibited parties list
• They will not use the materials for prohibited purposes

Violation of export control laws may result in immediate termination and legal consequences.`,
    },
    {
      id: "governing-law",
      title: "Governing Law and Disputes",
      content: `This Agreement shall be governed by and construed in accordance with the laws of Bangladesh, without regard to its conflict of law principles.

Any disputes arising from this Agreement shall be resolved through:
1. **Negotiation**: Parties will attempt to resolve disputes through good faith negotiation
2. **Mediation**: If negotiation fails, parties will submit to mediation in Dhaka, Bangladesh
3. **Arbitration**: Unresolved disputes shall be settled by binding arbitration under the rules of the Bangladesh International Arbitration Centre
4. **Litigation**: Either party may seek injunctive relief in courts of competent jurisdiction

The prevailing party in any dispute shall be entitled to recover reasonable attorneys' fees and costs.`,
    },
    {
      id: "miscellaneous",
      title: "Miscellaneous Provisions",
      content: `**Assignment**: Licensee may not assign this Agreement without Licensor's prior written consent.

**Severability**: If any provision is found invalid, the remaining provisions remain in effect.

**Waiver**: Failure to enforce any provision does not constitute a waiver.

**Entire Agreement**: This Agreement constitutes the complete understanding between the parties.

**Amendments**: Modifications must be in writing and signed by both parties.

**Notices**: All notices must be in writing and sent to the addresses specified in this Agreement.

**Force Majeure**: Neither party is liable for delays caused by circumstances beyond their reasonable control.`,
    },
    {
      id: "contact",
      title: "Contact Information",
      content: `For license inquiries, compliance questions, or technical support:

DK Global Fashion Wear Ltd.
License Management Department
123 Fashion District, Dhaka 1212
Bangladesh

Email: licenses@dkgfashion.com
Phone: +880 2 XXXX-XXXX
Website: www.dkgfashion.com/licenses

Business Hours: Sunday-Thursday, 9:00 AM - 6:00 PM BST`,
    },
  ];

  const softwareLicenses: SoftwareLicense[] = [
    {
      name: "DK Fashion Design Suite",
      version: "2.1.0",
      licenseType: "Proprietary",
      description: "Complete fashion design and prototyping software",
    },
    {
      name: "Inventory Management System",
      version: "1.5.3",
      licenseType: "Enterprise",
      description: "Real-time inventory tracking and management",
    },
    {
      name: "E-commerce Platform API",
      version: "3.2.1",
      licenseType: "Developer",
      description: "REST API for e-commerce integration",
    },
    {
      name: "Mobile Shopping App",
      version: "4.0.0",
      licenseType: "Proprietary",
      description: "iOS and Android mobile application",
    },
    {
      name: "Analytics Dashboard",
      version: "1.2.5",
      licenseType: "SaaS",
      description: "Business intelligence and analytics platform",
    },
  ];

  const openSourceLicenses = [
    {
      name: "React",
      license: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
    {
      name: "Tailwind CSS",
      license: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
    {
      name: "Node.js",
      license: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
    {
      name: "MongoDB",
      license: "SSPL",
      url: "https://www.mongodb.com/licensing/server-side-public-license",
    },
    {
      name: "Redis",
      license: "BSD-3-Clause",
      url: "https://opensource.org/licenses/BSD-3-Clause",
    },
  ];

  const lastUpdated = "January 1, 2024";

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLicenseSelect = (licenseName: string) => {
    setSelectedLicense(licenseName);
  };

  const generateLicenseFile = () => {
    const licenseText = `
DK GLOBAL FASHION WEAR LTD.
SOFTWARE LICENSE AGREEMENT

This License Agreement is made between DK Global Fashion Wear Ltd. and the Licensee.

Selected License: ${selectedLicense || "Not Selected"}
Date: ${new Date().toLocaleDateString()}
Version: ${lastUpdated}

TERMS AND CONDITIONS:
${licenseSections.map((section) => `\n${section.title}:\n${section.content}`).join("\n\n")}

For full terms, visit: www.dkgfashion.com/licenses
    `;

    const element = document.createElement("a");
    const file = new Blob([licenseText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `dk-fashion-license-${new Date().getTime()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Software License Agreement
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Last Updated: {lastUpdated}
            </p>
            <p className="text-gray-700 max-w-3xl mx-auto">
              This agreement governs the use of software, APIs, and intellectual
              property owned by DK Global Fashion Wear Ltd. Please read
              carefully before using our software.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents - Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Agreement Contents
              </h2>
              <nav className="space-y-2 mb-6">
                {licenseSections.map((section) => (
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

              {/* Quick License Generator */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-3">
                  Generate License File
                </h3>
                <select
                  value={selectedLicense}
                  onChange={(e) => handleLicenseSelect(e.target.value)}
                  className="w-full p-2 border border-green-300 rounded-md mb-3 text-sm"
                >
                  <option value="">Select Software</option>
                  {softwareLicenses.map((software) => (
                    <option key={software.name} value={software.name}>
                      {software.name} ({software.version})
                    </option>
                  ))}
                </select>
                <button
                  onClick={generateLicenseFile}
                  disabled={!selectedLicense}
                  className={`w-full py-2 px-4 rounded-md text-sm font-medium ${
                    selectedLicense
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Download License File
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-8">
            {/* License Content */}
            <div className="bg-white rounded-lg shadow-lg">
              {licenseSections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className={`p-8 ${
                    index !== licenseSections.length - 1
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

            {/* Software Licenses Overview */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Our Software Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {softwareLicenses.map((software) => (
                  <div
                    key={software.name}
                    className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {software.name}
                      </h3>
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                        {software.licenseType}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      Version: {software.version}
                    </p>
                    <p className="text-gray-700 mb-4">{software.description}</p>
                    <button
                      onClick={() => handleLicenseSelect(software.name)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Select for License →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Source Licenses */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Open Source Components
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Our software includes the following open source components.
                  Please review their respective licenses:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {openSourceLicenses.map((oss, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-white rounded border"
                    >
                      <div>
                        <span className="font-medium text-gray-900">
                          {oss.name}
                        </span>
                        <span className="text-gray-600 text-sm ml-2">
                          ({oss.license})
                        </span>
                      </div>
                      <a
                        href={oss.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        View License
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Compliance Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
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
                    Compliance Requirements
                  </h3>
                  <div className="text-yellow-700 mt-2 space-y-2">
                    <p>
                      • Ensure all software usage complies with this license
                      agreement
                    </p>
                    <p>
                      • Maintain accurate records of licensed software
                      deployments
                    </p>
                    <p>
                      • Report any license violations to our compliance team
                    </p>
                    <p className="font-semibold">
                      Regular audits may be conducted to verify compliance with
                      license terms.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                License Management
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
                  Print Agreement
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
                  Request Quote
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
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Get Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default License;
