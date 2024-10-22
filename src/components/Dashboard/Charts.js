import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { PieChart, Pie, Cell } from 'recharts'
import { Bell, Search, Flag, Maximize2, User } from 'lucide-react'

const votingData = [
  { month: 'Jan', votes: 4000 },
  { month: 'Feb', votes: 3000 },
  { month: 'Mar', votes: 5000 },
  { month: 'Apr', votes: 4500 },
  { month: 'May', votes: 6000 },
  { month: 'Jun', votes: 5500 },
]

const pieData = [
  { name: 'Completed', value: 68.9 },
  { name: 'Pending', value: 31.1 },
]

const COLORS = ['#00C49F', '#0088FE']

export default function Charts() {
  return (
    <div className="flex h-screen bg-gray-50">

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">

        {/* Election Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {['Presidential Election', 'Senate Election', 'Local Council', 'Referendum'].map((election, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-2">{election}</h3>
              <p className="text-sm text-gray-500">
                {index === 0 ? 'Voting ends in 3 days' : index === 1 ? 'Results announced' : index === 2 ? 'Voting in progress' : 'Starts in 1 week'}
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Voter Turnout</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center mt-4">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center mr-4">
                  <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Monthly Voting Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={votingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="votes" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Active Elections', value: 3 },
            { title: 'Registered Voters', value: '145,672' },
            { title: 'Votes Cast', value: '98,450' },
            { title: 'Voter Turnout', value: '67.5%' },
          ].map((summary, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{summary.title}</h3>
              <p className="text-3xl font-bold mt-2">{summary.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <ul className="space-y-4">
            {[
              'Presidential Election voting started - 2 hrs ago',
              'Senate Election results announced - 1 day ago',
              'Local Council nomination period ended - 2 days ago',
            ].map((activity, index) => (
              <li key={index} className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                <p className="text-sm">{activity}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
