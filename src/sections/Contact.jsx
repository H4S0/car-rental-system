import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic, e.g., send data to backend or display a message
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto my-10">
      <h2 className="bg-white text-3xl font-semibold text-gray-800 mb-4">
        Contact Us
      </h2>
      <form onSubmit={handleSubmit} className="bg-white">
        <div className="bg-white mb-4">
          <label
            htmlFor="name"
            className="bg-white block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className=" block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-4 bg-white">
          <label
            htmlFor="email"
            className=" bg-white block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="bg-white mb-4">
          <label
            htmlFor="message"
            className="bg-white block text-gray-700 font-medium mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Your Message"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
