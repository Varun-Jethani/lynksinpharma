import React, { useState } from "react";
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

const CareersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $160k",
      experience: "5+ years",
      description:
        "Join our engineering team to build cutting-edge web applications using React, TypeScript, and modern web technologies.",
      requirements: [
        "5+ years of experience with React and JavaScript",
        "Strong understanding of TypeScript",
        "Experience with modern CSS frameworks",
        "Knowledge of web performance optimization",
      ],
      benefits: [
        "Health Insurance",
        "401k Matching",
        "Flexible Hours",
        "Remote Work",
      ],
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "New York, NY",
      type: "Full-time",
      salary: "$140k - $180k",
      experience: "4+ years",
      description:
        "Lead product strategy and roadmap for our core platform, working closely with engineering and design teams.",
      requirements: [
        "4+ years of product management experience",
        "Strong analytical and strategic thinking skills",
        "Experience with Agile methodologies",
        "Excellent communication skills",
      ],
      benefits: [
        "Health Insurance",
        "Stock Options",
        "Flexible PTO",
        "Learning Budget",
      ],
    },
    {
      id: 3,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      salary: "$90k - $130k",
      experience: "3+ years",
      description:
        "Create beautiful and intuitive user experiences for our web and mobile applications.",
      requirements: [
        "3+ years of UX/UI design experience",
        "Proficiency in Figma and design systems",
        "Strong portfolio showcasing user-centered design",
        "Understanding of accessibility principles",
      ],
      benefits: [
        "Health Insurance",
        "Remote Work",
        "Design Budget",
        "Conference Attendance",
      ],
    },
    {
      id: 4,
      title: "Data Scientist",
      department: "Analytics",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110k - $150k",
      experience: "3+ years",
      description:
        "Analyze complex datasets to drive business insights and build predictive models.",
      requirements: [
        "3+ years of data science experience",
        "Proficiency in Python and SQL",
        "Experience with machine learning frameworks",
        "Strong statistical analysis skills",
      ],
      benefits: [
        "Health Insurance",
        "401k Matching",
        "Research Time",
        "Flexible Hours",
      ],
    },
    {
      id: 5,
      title: "Marketing Manager",
      department: "Marketing",
      location: "Los Angeles, CA",
      type: "Full-time",
      salary: "$85k - $115k",
      experience: "4+ years",
      description:
        "Drive growth through innovative marketing campaigns and strategic partnerships.",
      requirements: [
        "4+ years of marketing experience",
        "Experience with digital marketing channels",
        "Strong analytical skills",
        "Creative problem-solving abilities",
      ],
      benefits: [
        "Health Insurance",
        "Creative Budget",
        "Flexible PTO",
        "Growth Opportunities",
      ],
    },
    {
      id: 6,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$130k - $170k",
      experience: "4+ years",
      description:
        "Build and maintain our cloud infrastructure and deployment pipelines.",
      requirements: [
        "4+ years of DevOps experience",
        "Experience with AWS/Azure/GCP",
        "Knowledge of Docker and Kubernetes",
        "Strong scripting skills",
      ],
      benefits: [
        "Health Insurance",
        "Stock Options",
        "Remote Work",
        "Tech Budget",
      ],
    },
  ];

  const departments = [
    "All",
    "Engineering",
    "Product",
    "Design",
    "Analytics",
    "Marketing",
  ];
  const locations = [
    "All",
    "San Francisco, CA",
    "New York, NY",
    "Remote",
    "Austin, TX",
    "Los Angeles, CA",
    "Seattle, WA",
  ];

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

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All" || job.department === selectedDepartment;
    const matchesLocation =
      selectedLocation === "All" || job.location === selectedLocation;

    return matchesSearch && matchesDepartment && matchesLocation;
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
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              View Open Positions
            </button>
            <button className="px-8 py-4 border-2 border-white/30 hover:bg-white/10 rounded-xl font-semibold text-lg transition-all duration-300">
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
      <div className="py-20 bg-white">
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
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "All" ? "All Departments" : dept}
                  </option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location === "All" ? "All Locations" : location}
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
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                          {job.title}
                        </h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {job.department}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          <span>{job.experience}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-4">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {job.benefits.slice(0, 3).map((benefit, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                          >
                            {benefit}
                          </span>
                        ))}
                        {job.benefits.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                            +{job.benefits.length - 3} more
                          </span>
                        )}
                      </div>
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
                        onClick={() => handleApply(job.id)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                      >
                        Apply Now
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

            <div className="p-6">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {selectedJob.department}
                </span>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedJob.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>{selectedJob.salary}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Job Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Benefits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleApply(selectedJob.id)}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
              >
                Apply for This Position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
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
      </div>
    </div>
  );
};

export default CareersPage;
