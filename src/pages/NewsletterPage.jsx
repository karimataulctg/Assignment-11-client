import { useState } from 'react';
import { useTheme } from "../components/ThemeContext"; // Import the useTheme hook

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useTheme(); // Use the theme context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "" : "bg-gray-50"}`}>
      {/* Hero Section */}
      <div className={`relative ${isDarkMode ? "bg-gray-600" : "bg-blue-900"} text-white py-8 px-4`}>
        <div className={`absolute inset-0 ${isDarkMode ? "bg-gray-900 opacity-70" : "bg-black opacity-50"}`} />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${isDarkMode ? "text-yellow-400" : "text-white"}`}>
            Library Updates Newsletter
          </h1>
          <p className={`text-xl md:text-2xl mb-8 ${isDarkMode ? "text-gray-300" : "text-white"}`}>
            Stay informed about new arrivals, events, and special announcements
          </p>
        </div>
      </div>

      {/* Subscription Form */}
      <div className="max-w-2xl mx-auto  px-4 py-8 mt-4">
        <div className={`${isDarkMode ? "bg-gray-600 text-white" : "bg-white text-gray-800"} rounded-lg shadow-xl p-8`}>
          {!isSubscribed ? (
            <>
              <h2 className={`text-2xl font-bold my-8 text-center ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Subscribe to Our Newsletter
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className={`w-full p-3 border rounded-lg focus:ring-2 ${
                      isDarkMode 
                        ? "bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400" 
                        : "bg-white text-gray-800 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full ${
                    isDarkMode ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
                  } text-white py-3 px-6 rounded-lg transition-colors disabled:opacity-50`}
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe Now'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-green-600 text-5xl mb-4">✓</div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Thank you for subscribing!
              </h3>
              <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                You'll receive our next newsletter in your inbox.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="w-11/12 mx-auto px-4 pt-8">
        <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          What to Expect in Our Newsletter
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '📚',
              title: 'New Arrivals',
              description: 'Be the first to know about newly added books and resources'
            },
            {
              icon: '🎉',
              title: 'Library Events',
              description: 'Updates on workshops, readings, and special events'
            },
            {
              icon: '⏰',
              title: 'Due Reminders',
              description: 'Helpful reminders about your book due dates'
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${
                isDarkMode ? "bg-gray-600 text-white" : "bg-white text-gray-800"
              }`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-yellow-400" : "text-gray-800"}`}>
                {feature.title}
              </h3>
              <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className={`w-11/12 mx-auto shadow-lg rounded-lg my-8 pt-8 px-4 ${
        isDarkMode ? "bg-gray-600" : "bg-white"
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Never Miss an Update from Your Library
          </h3>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-8`}>
            Join thousands of subscribers who stay connected with our library community
          </p>
          <button
            onClick={() => window.scrollTo(0, 0)}
            className={`${
              isDarkMode ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
            } text-white py-3 mb-4 px-8 rounded-lg transition-colors`}
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
}