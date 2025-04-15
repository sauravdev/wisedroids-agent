import { Calendar, Clock, ChevronRight, Tag, User } from 'lucide-react';

export function BlogPage() {
  const featuredPost = {
    id: 'ai-agent-revolution',
    title: 'The AI Agent Revolution: How Businesses Are Transforming Customer Support',
    excerpt: 'Discover how AI agents are revolutionizing customer support operations across industries, leading to higher satisfaction rates and operational efficiency.',
    coverImage: 'https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg',
    date: 'April 10, 2025',
    readTime: '8 min read',
    author: 'Sarah Johnson',
    authorRole: 'Chief AI Officer',
    authorImage: 'https://www.fakepersongenerator.com/Face/female/female2014102368369611.jpg',
    tags: ['AI Agents', 'Customer Support', 'Business Transformation']
  };

  const recentPosts = [
    {
      id: 'training-effective-agents',
      title: 'Best Practices for Training Effective AI Agents',
      excerpt: 'Learn the proven methodologies for training AI agents that deliver consistent and valuable interactions with your customers.',
      coverImage: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      date: 'April 3, 2025',
      readTime: '6 min read',
      author: 'Michael Chen',
      tags: ['Training', 'Best Practices']
    },
    {
      id: 'enterprise-deployment',
      title: 'Enterprise-Scale Agent Deployment: Lessons From The Field',
      excerpt: 'Real-world insights from enterprises that successfully deployed AI agents across their organization.',
      coverImage: 'https://images.pexels.com/photos/6476783/pexels-photo-6476783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      date: 'March 28, 2025',
      readTime: '10 min read',
      author: 'Priya Patel',
      tags: ['Enterprise', 'Implementation']
    },
    {
      id: 'measuring-agent-roi',
      title: 'Measuring ROI: The True Value of AI Agents',
      excerpt: 'How to accurately measure the return on investment from your AI agent implementation and justify further expansion.',
      coverImage: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      date: 'March 21, 2025',
      readTime: '7 min read',
      author: 'David Wilson',
      tags: ['ROI', 'Analytics']
    }
  ];

  const categories = [
    { name: 'Implementation Guides', count: 14 },
    { name: 'Case Studies', count: 8 },
    { name: 'Industry Insights', count: 12 },
    { name: 'Product Updates', count: 6 },
    { name: 'AI Research', count: 9 }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">WiseDroid AI Blog</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Insights, updates, and expert perspectives on AI agents and the future of automation
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Featured Post */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <img 
                  src={featuredPost.coverImage} 
                  alt={featuredPost.title}
                  className="w-full h-64 object-cover" 
                />
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags.map(tag => (
                      <span key={tag} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img 
                        src={featuredPost.authorImage} 
                        alt={featuredPost.author}
                        className="w-10 h-10 rounded-full mr-3" 
                      />
                      <div>
                        <p className="font-medium text-gray-900">{featuredPost.author}</p>
                        <p className="text-sm text-gray-500">{featuredPost.authorRole}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="flex items-center mr-4">
                        <Calendar className="w-4 h-4 mr-1" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                  <button className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition">
                    Read Article <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Posts */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {recentPosts.map(post => (
                  <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md">
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className="w-full h-48 object-cover" 
                    />
                    <div className="p-6">
                      <div className="flex gap-2 mb-3">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{post.excerpt}</p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {post.date}
                        </div>
                      </div>
                      <button className="text-indigo-600 text-sm font-medium flex items-center hover:text-indigo-800 transition">
                        Read Article <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <button className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition">
                  View All Articles
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 mt-12 lg:mt-0">
            {/* Search */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Search</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
                <button className="absolute right-3 top-2.5 text-gray-400 hover:text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-3">
                {categories.map(category => (
                  <li key={category.name}>
                    <a href="#" className="flex items-center justify-between text-gray-600 hover:text-indigo-600">
                      <span>{category.name}</span>
                      <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {category.count}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="bg-indigo-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Subscribe to our Newsletter</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get the latest articles and industry updates straight to your inbox.
              </p>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}