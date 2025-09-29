import React, { useState } from 'react';

export default function PostQuestionModal({ open, onClose, onSubmit }) {
  const [question, setQuestion] = useState('');

  if (!open) return null;

  const handleSubmit = () => {
    if (question.trim() === '') return;
    if (onSubmit) onSubmit(question.trim());
    setQuestion('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Post your Question</h2>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question"
          className="w-full border border-gray-200 rounded p-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-orange-200"
        />

        <div className="mt-4 p-4 bg-blue-50 text-sm text-gray-700 rounded">
          Your question may be answered by sellers, manufacturers, or customers who purchased this item, who are all part of the BonziCart community.
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded font-semibold">Post my Question</button>
          <button onClick={onClose} className="bg-gray-400 text-white px-3 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}
