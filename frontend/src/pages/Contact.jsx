import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import '../styles/Contact.css';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        
        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form-card">
            <h2 className="form-heading">
              <Send size={24} className="form-icon" />
              Get in Touch
            </h2>
            
            {submitted && (
              <div className="success-message">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}
            
            <div className="contact-form">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="Your full name"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="What is this about?"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="5"
                  required
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              
              <button onClick={handleSubmit} className="send-button">
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-info-section">
            <div className="info-card">
              <h3 className="info-heading">Contact Information</h3>
              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <Phone className="info-icon" size={20} />
                  </div>
                  <div className="info-content">
                    <p className="info-title">Phone</p>
                    <p className="info-text">+91 98765 43210</p>
                    <p className="info-text">+91 87654 32109</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <Mail className="info-icon" size={20} />
                  </div>
                  <div className="info-content">
                    <p className="info-title">Email</p>
                    <p className="info-text">support@HarryStore.com</p>
                    <p className="info-text">sales@HarryStore.com</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon-wrapper">
                    <MapPin className="info-icon" size={20} />
                  </div>
                  <div className="info-content">
                    <p className="info-title">Address</p>
                    <p className="info-text">123 MG Road, Banjara Hills</p>
                    <p className="info-text">Hyderabad, Telangana 500034</p>
                    <p className="info-text">India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hours-card">
              <h3 className="hours-heading">
                <Clock size={20} />
                <span>Business Hours</span>
              </h3>
              <div className="hours-list">
                <div className="hours-row">
                  <span className="hours-day">Monday - Friday</span>
                  <span className="hours-time">9:00 AM - 6:00 PM</span>
                </div>
                <div className="hours-row">
                  <span className="hours-day">Saturday</span>
                  <span className="hours-time">10:00 AM - 4:00 PM</span>
                </div>
                <div className="hours-row">
                  <span className="hours-day">Sunday</span>
                  <span className="hours-closed">Closed</span>
                </div>
              </div>
            </div>

            <div className="live-chat-card">
              <h3 className="live-chat-heading">Need Immediate Help?</h3>
              <p className="live-chat-text">
                Our customer support team is available 24/7 via live chat
              </p>
              <button className="live-chat-button">
                Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};