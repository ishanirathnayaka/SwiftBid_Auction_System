import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Contact.css'; 
import ContactImage from './assets/Contact.png';


function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // Here you would typically send data to your backend
      console.log('Contact form submitted:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Show success message and redirect after delay
      setTimeout(() => {
        setSubmitted(false);
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact">
        <div className="success-message">
          <h2>Thank You!</h2>
          <p>Your message has been sent successfully. We'll get back to you soon!</p>
          <p>Redirecting to home page...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="contact">
      <div className="leftSide" style={{ backgroundImage: `url(${ContactImage})` }}></div>
      <div className="rightSide">
        <h1>Contact Us</h1>
        <form id="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name"
              name="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter your name'
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter email address'
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message"
              name="message" 
              rows="6" 
              value={formData.message}
              onChange={handleChange}
              placeholder='Enter your message'
              required
              disabled={isSubmitting}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={isSubmitting ? 'submitting' : ''}
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>

          
        </form>
      </div>
    </div>
  );
}

export default Contact;
