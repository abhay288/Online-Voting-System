import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Election, ElectionOption } from '../../types';
import { calculatePercentage } from '../../utils/electionHelpers';

interface ElectionResultsProps {
  election: Election;
}

const ElectionResults: React.FC<ElectionResultsProps> = ({ election }) => {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#6366F1'];
  
  const data = election.options.map((option, index) => ({
    name: option.text,
    value: option.votes,
    color: colors[index % colors.length],
    percentage: calculatePercentage(option.votes, election.totalVotes)
  }));
  
  // Sort by highest votes first
  data.sort((a, b) => b.value - a.value);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">{`${data.value} votes (${data.percentage}%)`}</p>
        </div>
      );
    }
    return null;
  };
  
  if (election.totalVotes === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-700">No votes have been cast yet.</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percentage }) => `${name}: ${percentage}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-3">
        {data.map((option, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: option.color }}
            ></div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">{option.name}</span>
                <span className="text-sm text-gray-600">
                  {option.value} votes ({option.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${option.percentage}%`,
                    backgroundColor: option.color,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        Total votes: {election.totalVotes}
      </div>
    </div>
  );
};

export default ElectionResults;