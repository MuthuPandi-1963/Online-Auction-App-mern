import { useState } from 'react';
import { FiSettings, FiActivity, FiDollarSign, FiClock, FiAward, FiUser } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ProfileDashboard = ({ profile }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  
  // Sample chart data
  const bidActivityData = [
    { date: 'Jan', bids: 12 },
    { date: 'Feb', bids: 18 },
    { date: 'Mar', bids: 15 },
    { date: 'Apr', bids: 22 },
  ];

  const navigation = [
    { id: 'overview', icon: <FiActivity />, label: 'Overview' },
    { id: 'activity', icon: <FiClock />, label: 'Bid History' },
    { id: 'auctions', icon: <FiAward />, label: 'My Auctions' },
    { id: 'settings', icon: <FiSettings />, label: 'Settings' },
  ];

  const StatsCard = ({ icon, title, value, percentage }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">{icon}</div>
        <div>
          <h3 className="text-sm text-gray-500">{title}</h3>
          <p className="text-xl font-semibold">{value}</p>
          {percentage && (
            <span className={`text-xs ${percentage > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {percentage > 0 ? '+' : ''}{percentage}%
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-full lg:w-64 xl:w-80 bg-white border-r border-gray-200 p-6">
        {/* Profile Summary */}
        <div className="mb-8">
          <div className="relative mb-4">
            <img
              src={profile.profilePicture || '/default-avatar.png'}
              className="w-20 h-20 rounded-xl object-cover border-2 border-white shadow-sm"
              alt="Profile"
            />
            <button 
              className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm"
              onClick={() => setEditMode(!editMode)}
            >
              <FiSettings className="w-4 h-4" />
            </button>
          </div>
          
          <h2 className="text-xl font-semibold mb-1">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-sm text-gray-500 mb-4">{profile.bio || 'No bio added'}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Member Since</span>
              <span>2023</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Success Rate</span>
              <span className="text-green-500">
                {((profile.wonAuctions.length / profile.bidHistory.length) * 100 || 0).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-6 lg:p-8">
        {/* Overview Content */}
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              <StatsCard 
                icon={<FiDollarSign className="w-5 h-5" />} 
                title="Total Bids" 
                value={profile.bidHistory.length} 
                percentage={12.5}
              />
              <StatsCard 
                icon={<FiAward className="w-5 h-5" />} 
                title="Auctions Won" 
                value={profile.wonAuctions.length} 
              />
              <StatsCard 
                icon={<FiUser className="w-5 h-5" />} 
                title="Active Bids" 
                value={profile.bidHistory.filter(bid => bid.status === 'active').length} 
              />
              <StatsCard 
                icon={<FiClock className="w-5 h-5" />} 
                title="Avg. Bid Time" 
                value="28h" 
              />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h3 className="text-lg font-semibold mb-6">Bid Activity</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bidActivityData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="bids" 
                      stroke="#3B82F6" 
                      strokeWidth={2} 
                      dot={{ fill: '#3B82F6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Bid History Content */}
        {activeTab === 'activity' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold">Bid History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Auction</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {profile.bidHistory.map((bid, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium">{bid.auction.title}</td>
                      <td className="px-6 py-4 text-sm">${bid.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(bid.bidTime).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          bid.status === 'won' 
                            ? 'bg-green-100 text-green-800'
                            : bid.status === 'active'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {bid.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Content */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-6">Account Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={profile.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue={profile.phone}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Add more settings fields as needed */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDashboard;