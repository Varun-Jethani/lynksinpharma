import React, { useState, useRef } from "react";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Heart,
  Coffee,
  Award,
  TrendingUp,
  Globe,
  ChevronRight,
  Filter,
  X,
  Briefcase,
  GraduationCap,
  Star,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CareersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const openPositionsRef = useRef(null);

  // Sample job data
  const jobs = [
    {
      title: "Synthetic Chemist",
      qualification: "B.Sc/M.Sc [Organic Chemistry]",
      experience: "0-3 Years",
      overview:
        "Join our synthetic team to build new molecules for serving a human being",
      details: {
        qualification: "B.Sc/M.Sc [Organic Chemistry]",
        experience: "0-5 Years",
        responsibilities:
          "To synthesize and characterize new organic molecules. The work involves developing and optimizing synthetic routes, process development, scale-up, and troubleshooting.",
        keySkills: [
          "Designing and synthesizing new organic molecules",
          "Developing and optimizing synthetic routes",
          "Purifying and characterizing compounds",
          "Maintaining detailed records and documentation",
          "Presenting research findings",
        ],
      },
      applyText: "Apply Now",
    },
    {
      title: "Synthetic Chemist",
      qualification: "M.Sc/PhD [Organic Chemistry]",
      experience: "0-5 Years",
      overview:
        "Join our synthetic team to build new molecules for serving a human being",
      details: {
        qualification: "M.Sc/PhD [Organic Chemistry]",
        experience: "0-5 Years",
        responsibilities: [
          "Designing and Synthesizing Molecules: Creating new organic molecules often through multi-step synthesis.",
          "Developing Synthetic Routes: Optimizing existing or developing new chemical processes for synthesizing target compounds, ensuring efficiency, scalability, and cost-effectiveness.",
          "Troubleshooting: Investigating and resolving any issues that arise during the synthesis process.",
          "Process Optimization: Continuously improving the efficiency, yield, and safety of chemical processes.",
          "Purification and Characterization: Isolating and purifying synthesized compounds using chromatography and spectroscopy, and analyzing them using Mass, NMR, LCMS, and GCMS.",
          "Literature Review: Staying up-to-date on the latest scientific literature and applying new techniques and methodologies.",
          "Collaboration: Working with other scientists and external collaborators to achieve project goals.",
          "Documentation & Reporting: Maintaining detailed records of experiments, writing reports, contributing to publications and patents.",
        ],
      },
      applyText: "Apply Now",
    },
    {
      title: "Peptide Chemist",
      qualification: "M.Sc/PhD [Organic Chemistry]",
      experience: "0-5 Years",
      overview:
        "Join our synthetic team to build new molecules for serving a human being",
      details: {
        qualification: "M.Sc/PhD [Organic Chemistry]",
        experience: "0-5 Years",
        responsibilities:
          "To synthesize peptides by solid-phase peptide synthesis (SPPS), solution-phase synthesis, and analyze the structure by analytical methods like HPLC and mass spectrometry, including development of new linker chemistries.",
        keySkills: [
          "Expert in Peptide Synthesis by SPPS and solution-phase synthesis",
          "Analytical Characterization: Using HPLC, LCMS, NMR to determine peptide purity and structure",
          "Process Development: Optimizing synthesis for scalability and efficiency",
          "Conjugation Chemistry: Conjugating peptides to other molecules",
          "Project Management: Collaborating in cross-functional teams to achieve project goals",
        ],
      },
      applyText: "Apply Now",
    },
    {
      title: "Analytical Chemist",
      qualification: "B.Sc/M.Sc [Analytical Chemistry]",
      experience: "0-3 Years",
      overview:
        "Join our Analytical team to build new molecules for serving a human being",
      details: {
        qualification: "B.Sc/M.Sc [Analytical Chemistry]",
        experience: "0-3 Years",
        responsibilities: [
          "Sample Analysis: Performing qualitative and quantitative analysis using techniques like spectroscopy, HPLC, and GC-MS.",
          "Method Development and Validation: Creating and validating methods for accuracy and reliability.",
          "Data Interpretation and Reporting: Drawing insights and reporting experimental outcomes.",
          "Quality Control: Ensuring products meet safety and quality standards.",
          "Equipment Maintenance and Calibration: Ensuring lab instruments are accurate and functional.",
        ],
        keySkills: [
          "Strong analytical and problem-solving skills",
          "Proficiency in analytical techniques and instrumentation",
          "Ability to work independently and collaboratively",
          "Knowledge of safety protocols and regulatory compliance",
        ],
      },
      applyText: "Apply Now",
    },
  ];

  // Removed departments section as per request
  const locations = ["Nagpur"];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs",
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Flexible hours and unlimited PTO policy",
    },
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      description: "Career development and learning budget",
    },
    {
      icon: Users,
      title: "Great Team",
      description: "Work with talented and passionate people",
    },
    {
      icon: Globe,
      title: "Remote Friendly",
      description: "Work from anywhere with our remote-first culture",
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Performance bonuses and equity participation",
    },
  ];

  const companyValues = [
    {
      title: "Innovation First",
      description:
        "We embrace new technologies and creative solutions to solve complex problems.",
      icon: "🚀",
    },
    {
      title: "Collaborative Spirit",
      description:
        "We believe the best work happens when diverse minds come together.",
      icon: "🤝",
    },
    {
      title: "Customer Focus",
      description:
        "Everything we do is centered around creating value for our customers.",
      icon: "💡",
    },
    {
      title: "Continuous Learning",
      description:
        "We invest in our people's growth and encourage lifelong learning.",
      icon: "📚",
    },
  ];

  // Filter jobs based on search and location only
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "Nagpur" ? true : true;
    return matchesSearch && matchesLocation;
  });

  const handleApply = (jobId) => {
    // In a real app, this would open an application form or redirect to an application page
    alert(`Application form for job ${jobId} would open here!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Join Our Amazing Team
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Build the future with us. We're looking for passionate individuals
            who want to make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() =>
                openPositionsRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Open Positions
            </button>
            <button
              onClick={() => navigate("/company-profile")}
              className="px-8 py-4 border-2 border-white/30 hover:bg-white/10 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Learn About Our Culture
            </button>
          </div>
        </div>
      </div>

      {/* Company Values */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape our company
              culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Work With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer competitive benefits and a culture that values work-life
              balance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <benefit.icon className="w-12 h-12 text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div ref={openPositionsRef} className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find your next opportunity and grow your career with us.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center justify-center gap-2 px-6 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>

            <div
              className={`flex-col lg:flex-row gap-4 ${
                showFilters ? "flex" : "hidden lg:flex"
              }`}
            >
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria
                </p>
              </div>
            ) : (
              filteredJobs.map((job, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                          {job.title}
                        </h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {job.qualification}
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          {job.experience}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {job.overview}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleApply(idx)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                      >
                        {job.applyText || "Apply Now"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedJob.title}
              </h2>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {selectedJob.details.qualification}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {selectedJob.details.experience}
                </span>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Overview
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedJob.overview}
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Responsibilities
                </h3>
                {Array.isArray(selectedJob.details.responsibilities) ? (
                  <ul className="list-disc pl-6 space-y-2">
                    {selectedJob.details.responsibilities.map((resp, i) => (
                      <li key={i} className="text-gray-700">
                        {resp}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">
                    {selectedJob.details.responsibilities}
                  </p>
                )}
              </div>
              {selectedJob.details.keySkills && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Key Skills
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {selectedJob.details.keySkills.map((skill, i) => (
                      <li key={i} className="text-gray-700">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                onClick={() => handleApply(selectedJob.title)}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
              >
                {selectedJob.applyText || "Apply for This Position"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      {/* <div className="py-20 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Our Team?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't see a perfect fit? We're always looking for talented
            individuals. Send us your resume and let's talk!
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
            Send Your Resume
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default CareersPage;
