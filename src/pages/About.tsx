import { Users, Brain, Shield, Star, Zap, Globe } from 'lucide-react';

export function About() {
  const milestones = [
    {
      year: "2023",
      title: "The Idea Takes Shape",
      description: "Our founders, a team of AI researchers and industry veterans, recognized the growing gap between cutting-edge AI capabilities and practical business applications."
    },
    {
      year: "2024",
      title: "WiseDroid AI is Born",
      description: "After months of development, we launched our beta platform with a small group of early adopters, focusing on creating intuitive AI agents that required minimal technical expertise."
    },
    {
      year: "2024",
      title: "Rapid Growth",
      description: "Following overwhelming positive feedback, we secured Series A funding to scale our infrastructure and expand our team of AI specialists and engineers."
    },
    {
      year: "2025",
      title: "Where We Are Today",
      description: "Now serving clients across 20+ countries, our platform processes over 5 million AI interactions daily while maintaining our commitment to ethical AI development."
    }
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">About WiseDroids</h2>
          <p className="mt-4 text-lg text-gray-500">
            Empowering businesses with intelligent AI solutions
          </p>
        </div>
        
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <Users className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Our Team</h3>
              <p className="mt-2 text-base text-gray-500">
                A diverse group of AI experts, engineers, and researchers working together to push the boundaries of AI technology.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center">
                <Brain className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Our Mission</h3>
              <p className="mt-2 text-base text-gray-500">
                To democratize AI technology and make it accessible to businesses of all sizes through our innovative platform.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center">
                <Shield className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Our Values</h3>
              <p className="mt-2 text-base text-gray-500">
                We believe in transparency, security, and ethical AI development that benefits humanity.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-24">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-6 text-2xl font-bold text-gray-900">Our Story</span>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="prose prose-lg">
                <p className="text-gray-700 leading-relaxed">
                  WiseDroid AI was born from a vision to bridge the gap between advanced AI technology and everyday business challenges. In late 2023, our founders—a group of AI researchers, engineers, and industry experts—came together with a shared frustration: despite the incredible advances in AI capabilities, most businesses struggled to implement and benefit from these technologies.
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  What began in a small innovation lab quickly evolved into a mission to democratize AI. We recognized that for AI to truly transform businesses, it needed to be accessible without requiring deep technical expertise or massive budgets. This insight became our guiding principle.
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  Today, WiseDroid AI stands at the forefront of the AI revolution. Our platform has processed over 50 million AI interactions and powers thousands of intelligent agents across industries ranging from healthcare and finance to retail and manufacturing. But beyond the numbers, what truly drives us is seeing how our technology empowers businesses to solve real-world problems and create value for their customers.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-gray-700 font-medium">4.9/5 Customer Satisfaction</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-indigo-500" />
                  <span className="text-gray-700 font-medium">99.9% Platform Uptime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 font-medium">Clients in 20+ Countries</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-8">Our Journey</h4>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative">
                    {index !== milestones.length - 1 && (
                      <div className="absolute top-5 left-4 -ml-px h-full w-0.5 bg-indigo-200" aria-hidden="true"></div>
                    )}
                    <div className="relative flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">{milestone.year.substring(2)}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h5 className="text-lg font-medium text-gray-900">{milestone.title}</h5>
                        <p className="mt-1 text-sm text-gray-500">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}