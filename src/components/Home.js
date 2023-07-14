import React from 'react';
import { AiOutlineCustomerService, AiOutlineLineChart } from 'react-icons/ai';
import { BsPeopleFill } from 'react-icons/bs';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-900">Welcome to OmegaZero Technology</h1>
        <p className="text-lg text-blue-700 mb-5">Empowering Businesses with Advanced Software Solutions</p>
        <a href="#services" className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors">Explore Our Solutions</a>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-blue-900">Our Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <div className="max-w-xs p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full text-white">
              <AiOutlineCustomerService className="w-8 h-8" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-blue-900">CRM Software</h3>
            <p className="mt-2 text-gray-600">Streamline your customer relationship management with our powerful CRM software. Manage leads, track interactions, and drive customer satisfaction.</p>
          </div>
          <div className="max-w-xs p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full text-white">
              <BsPeopleFill className="w-8 h-8" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-blue-900">Social Listening Software</h3>
            <p className="mt-2 text-gray-600">Stay ahead of the competition and understand your audience better with our advanced social listening software. Monitor online conversations, analyze sentiment, and gain valuable insights.</p>
          </div>
          <div className="max-w-xs p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full text-white">
              <AiOutlineLineChart className="w-8 h-8" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-blue-900">Analytics Platform</h3>
            <p className="mt-2 text-gray-600">Harness the power of data with our advanced analytics platform. Gain valuable insights, make data-driven decisions, and optimize your business performance.</p>
          </div>
        </div>
      </div>
      <div className="mt-16 text-center">
        <p className="text-gray-700">&copy; {new Date().getFullYear()} OmegaZero Technology. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
