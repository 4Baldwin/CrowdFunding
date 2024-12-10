import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { useNavigate } from 'react-router-dom';

export function CreateCampaign() {
  const navigate = useNavigate();
  const { createCampaign } = useWeb3();
  const [form, setForm] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCampaign(form);
      navigate('/');
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-bold text-center">Create a New Campaign</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Target Amount (ETH)</label>
          <input
            type="number"
            step="0.01"
            value={form.target}
            onChange={(e) => setForm({ ...form, target: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Campaign Image URL</label>
          <input
            type="url"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            required
          />
        </div>

        {/* Image Preview */}
        {form.image && (
          <div className="mt-4">
            <p className="block text-sm text-gray-500 mb-2">Image Preview:</p>
            <img
              src={form.image}
              className="w-full h-64 object-cover rounded-md shadow-md"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300?text=Invalid+Image'; 
              }}
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 font-medium text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-500"
        >
          Create Campaign
        </button>
      </form>
    </div>
  );
}
