import React from "react";

const AgentCard = ({ agent }) => {
  const handleAgentClick = () => {
    window.location.href = agent.website;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:-translate-y-1 hover:shadow-xl"
      onClick={handleAgentClick}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            {agent.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
        </div>

        <p className="text-gray-600 mb-4">{agent.description}</p>

        <div className="flex items-center text-sm text-gray-500">
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                clipRule="evenodd"
              />
            </svg>
            {agent.category}
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            {agent.users}+ users
          </span>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4">
        <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
          Visit {agent.name} →
        </button>
      </div>
    </div>
  );
};

export function AgentShowcase() {
  const featuredAgents = [
    {
      id: 1,
      name: "SocialDroids",
      description:
        "AI assistant for managing and optimizing your social media presence across multiple platforms.",
      category: "Social Media",
      users: "1.2k",
      website: "https://droids.social",
      icon: (
        <svg
          className="w-6 h-6 text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
    },
    {
      id: 2,
      name: "TransformBuddy",
      description:
        "Your personal AI coach for fitness, nutrition, and wellness transformation journeys.",
      category: "Health & Fitness",
      users: "3.4k",
      website: "https://transformbuddy.ai",
      icon: (
        <svg
          className="w-6 h-6 text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    // {
    //   id: 3,
    //   name: "RecruiterAI",
    //   description:
    //     "AI-powered job candidate screening and interview preparation assistant.",
    //   category: "Recruitment",
    //   users: "950",
    //   website: "https://recruiter.wisedroids.ai/",
    //   icon: (
    //     <svg
    //       className="w-6 h-6 text-purple-500"
    //       fill="currentColor"
    //       viewBox="0 0 20 20"
    //     >
    //       <path
    //         fillRule="evenodd"
    //         d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
    //         clipRule="evenodd"
    //       />
    //       <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
    //     </svg>
    //   ),
    // },
    {
      id: 4,
      name: "Skillsurger",
      description:
        "Transform your career with our intelligent AI agent that provides personalized guidance, job matching, skill development, and interview preparation - all powered by cutting-edge artificial intelligence.",
      category: "Recruitment",
      users: "950",
      website: "https://skillsurger.com/",
      icon: (
        <svg
          className="w-6 h-6 text-purple-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Agents
          </h2>
          <p className="text-xl text-gray-600">
            Discover powerful AI agents developed using the WiseDroids platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AgentShowcase;
