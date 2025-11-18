// Career.tsx
import React, { useState } from "react";

// Type definitions
interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  isActive: boolean;
}

interface Benefit {
  icon: string;
  title: string;
  desc: string;
}

interface ApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string;
  resume: File | null;
}

const Career: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showApplicationForm, setShowApplicationForm] =
    useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState<ApplicationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null,
  });

  // Job openings data
  const jobOpenings: Job[] = [
    {
      id: 1,
      title: "Fashion Designer",
      department: "Design",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      experience: "3-5 years",
      description:
        "We are looking for a creative Fashion Designer to join our design team. You will be responsible for researching trends, creating designs, and developing new collections.",
      requirements: [
        "Bachelor's degree in Fashion Design or related field",
        "Proficiency in Adobe Creative Suite",
        "Strong portfolio showcasing design skills",
        "Knowledge of textile and garment construction",
      ],
      isActive: false,
    },
    {
      id: 2,
      title: "Production Manager",
      department: "Production",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      experience: "5-7 years",
      description:
        "Seeking an experienced Production Manager to oversee our garment manufacturing process and ensure quality standards are met.",
      requirements: [
        "Bachelor's degree in Textile Engineering or related field",
        "5+ years experience in garment production",
        "Strong knowledge of quality control processes",
        "Excellent leadership and communication skills",
      ],
      isActive: false,
    },
    {
      id: 3,
      title: "Quality Control Inspector",
      department: "Quality Assurance",
      location: "Chittagong, Bangladesh",
      type: "Full-time",
      experience: "2-4 years",
      description:
        "Join our quality team to maintain the highest standards in our garment production and ensure customer satisfaction.",
      requirements: [
        "Diploma or degree in Textile Technology",
        "Experience in garment quality control",
        "Knowledge of AQL standards",
        "Attention to detail",
      ],
      isActive: false,
    },
    {
      id: 4,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      experience: "2-3 years",
      description:
        "Looking for a creative Marketing Specialist to promote our global fashion brand and drive customer engagement.",
      requirements: [
        "Bachelor's degree in Marketing or related field",
        "Experience in digital marketing",
        "Knowledge of social media platforms",
        "Excellent communication skills",
      ],
      isActive: false,
    },
    {
      id: 5,
      title: "Graphic Designer",
      department: "Design",
      location: "Dhaka, Bangladesh",
      type: "Part-time",
      experience: "1-2 years",
      description:
        "Create compelling visual content for our fashion brand across various digital platforms.",
      requirements: [
        "Proficiency in Adobe Creative Suite",
        "Experience in fashion graphics",
        "Strong portfolio",
        "Creative thinking skills",
      ],
      isActive: false,
    },
  ];

  // Departments for filtering
  const departments: string[] = [
    "all",
    "design",
    "production",
    "quality assurance",
    "marketing",
  ];

  // Benefits data
  const benefits: Benefit[] = [
    {
      icon: "💰",
      title: "Competitive Salary",
      desc: "Industry-competitive compensation package",
    },
    {
      icon: "🏥",
      title: "Health Insurance",
      desc: "Comprehensive medical coverage",
    },
    {
      icon: "🎓",
      title: "Training & Development",
      desc: "Continuous learning opportunities",
    },
    {
      icon: "🍽️",
      title: "Meal Allowance",
      desc: "Daily meal and transportation benefits",
    },
    {
      icon: "🏖️",
      title: "Paid Time Off",
      desc: "Generous vacation and leave policies",
    },
    {
      icon: "👕",
      title: "Product Discounts",
      desc: "Employee discounts on our fashion products",
    },
    {
      icon: "🏆",
      title: "Performance Bonus",
      desc: "Recognition and reward programs",
    },
    {
      icon: "🌱",
      title: "Work-Life Balance",
      desc: "Flexible working arrangements",
    },
  ];

  const filteredJobs: Job[] =
    activeTab === "all"
      ? jobOpenings
      : jobOpenings.filter((job) => job.department.toLowerCase() === activeTab);

  const handleApply = (job: Job): void => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const handleSubmitApplication = (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();
    // Handle form submission logic here
    if (selectedJob) {
      alert(`Application submitted for ${selectedJob.title}`);
    }
    setShowApplicationForm(false);
    setSelectedJob(null);
    // Reset form data
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      coverLetter: "",
      resume: null,
    });
  };

  const handleCloseModal = (): void => {
    setShowApplicationForm(false);
    setSelectedJob(null);
    // Reset form data when closing without submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      coverLetter: "",
      resume: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Careers at DK Global Fashion Wear Ltd.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our passionate team and help shape the future of global
            fashion. We're always looking for talented individuals who share our
            vision for innovation and excellence.
          </p>
        </div>

        {/* Why Work With Us */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Work With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                Work with cutting-edge fashion technology and sustainable
                practices.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Team</h3>
              <p className="text-gray-600">
                Collaborate with diverse talents from around the world.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Growth Opportunities
              </h3>
              <p className="text-gray-600">
                Continuous learning and career advancement programs.
              </p>
            </div>
          </div>
        </div>

        {/* Job Openings */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Current Openings
          </h2>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveTab(dept)}
                className={`px-6 py-2 rounded-full font-medium capitalize ${
                  activeTab === dept
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {dept === "all" ? "All Departments" : dept}
              </button>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        {job.department}
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {job.type}
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        {job.experience}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Requirements:
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="lg:ml-6 mt-4 lg:mt-0">
                    <button
                      disabled={!job.isActive ? true : false}
                      onClick={() => handleApply(job)}
                      className={`${!job.isActive ? "bg-gray-600" : "bg-blue-600"} text-white px-6 py-2 rounded-lg hover:${!job.isActive ? "bg-gray-600" : "bg-blue-700"} transition-colors font-medium`}
                    >
                      {job.isActive ? "Apply Now" : "Session Closed"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Employee Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
              >
                <div className="text-3xl mb-2">{benefit.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">
                  Apply for {selectedJob.title}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Letter
                  </label>
                  <textarea
                    rows={4}
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us why you're interested in this position..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resume/CV
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept=".pdf,.doc,.docx"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Career;
