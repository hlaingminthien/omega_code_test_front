import React, { useState, useEffect } from 'react';
import { getProfitLossData } from '../services/api';

const Report = () => {
  const [profitLossData, setProfitLossData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfitLossData();
  }, []);

  const fetchProfitLossData = async () => {
    try {
      const data = await getProfitLossData();
      setProfitLossData(data.profitLosses);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch profit-loss data');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Profit-Loss Report</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left">Year</th>
              <th className="py-3 px-4 border-b text-left">Customer Name</th>
              <th className="py-3 px-4 border-b text-left">Contact Person</th>
              <th className="py-3 px-4 border-b text-left">Deal Status</th>
              <th className="py-3 px-4 border-b text-left">Revenue</th>
              <th className="py-3 px-4 border-b text-left">Expenses</th>
              <th className="py-3 px-4 border-b text-left">Net Profit</th>
            </tr>
          </thead>
          <tbody>
            {profitLossData.map((profitLoss) => (
              <tr key={profitLoss.id}>
                <td className="py-3 px-4 border-b">{profitLoss.year}</td>
                <td className="py-3 px-4 border-b">{profitLoss.customer_name}</td>
                <td className="py-3 px-4 border-b">{profitLoss.contact_person}</td>
                <td className="py-3 px-4 border-b">{profitLoss.deal_status}</td>
                <td className="py-3 px-4 border-b">{profitLoss.revenue.toLocaleString()}</td>
                <td className="py-3 px-4 border-b">{profitLoss.expenses.toLocaleString()}</td>
                <td className="py-3 px-4 border-b">{profitLoss.net_profit.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
