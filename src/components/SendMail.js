import React, { useState } from 'react';
import { sendEmail } from '../services/api';

const SendMail = () => {
  const [mailTo, setMailTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleMailToChange = (e) => {
    setMailTo(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Prepare the payload
      const payload = {
        mailTo: mailTo.split(',').map((email) => email.trim()), // Split and trim emails into an array
        subject,
        body,
      };

      // Send the email
      await sendEmail(payload);

      // Reset the form and show success message
      setMailTo('');
      setSubject('');
      setBody('');
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setError('Failed to send email');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Send Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="mailTo" className="block mb-2 text-lg font-medium text-gray-700">
            Email addresses (comma-separated)
          </label>
          <input
            type="text"
            id="mailTo"
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            value={mailTo}
            onChange={handleMailToChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block mb-2 text-lg font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            value={subject}
            onChange={handleSubjectChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block mb-2 text-lg font-medium text-gray-700">
            Body
          </label>
          <textarea
            id="body"
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            rows="6"
            value={body}
            onChange={handleBodyChange}
            required
          />
        </div>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {success && <div>Email sent successfully!</div>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          disabled={loading}
        >
          Send Email
        </button>
      </form>
    </div>
  );
};

export default SendMail;
