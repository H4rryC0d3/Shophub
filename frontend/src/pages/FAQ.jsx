import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import '../styles/FAQ.css';

export const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          q: "How long does shipping take?",
          a: "Standard shipping takes 5-7 business days within the continental US. Express shipping is available for 2-3 day delivery. International shipping times vary by destination, typically 10-15 business days."
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. You can see the exact shipping cost at checkout before completing your purchase."
        },
        {
          q: "How can I track my order?",
          a: "Once your order ships, you'll receive a tracking number via email. You can also track your orders by logging into your account and visiting the 'Order History' section in your profile."
        },
        {
          q: "Can I change my shipping address after placing an order?",
          a: "If your order hasn't shipped yet, you can contact our customer service team to update your shipping address. Once shipped, address changes are not possible."
        }
      ]
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 30-day return policy on most items. Products must be unused, in original packaging, and in the same condition you received them. Some items like perishables, custom products, and personal care items cannot be returned."
        },
        {
          q: "How do I initiate a return?",
          a: "Log into your account, go to Order History, select the order you want to return, and click 'Request Return'. Follow the instructions to print your return label and ship the item back to us."
        },
        {
          q: "When will I receive my refund?",
          a: "Refunds are processed within 5-7 business days after we receive your returned item. The refund will be credited to your original payment method. Please allow an additional 3-5 business days for it to appear in your account."
        }
      ]
    },
    {
      category: "Payment & Pricing",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption."
        },
        {
          q: "Do you offer price matching?",
          a: "Yes, we offer price matching on identical items from authorized retailers. Contact our customer service team with proof of the lower price, and we'll match it if the item qualifies."
        },
        {
          q: "Are there any hidden fees?",
          a: "No hidden fees! The price you see at checkout is the final price, including all taxes and shipping costs. We believe in transparent pricing."
        }
      ]
    },
    {
      category: "Account & Security",
      questions: [
        {
          q: "Is my personal information secure?",
          a: "Absolutely. We use industry-standard SSL encryption to protect your personal and payment information. We never share your data with third parties without your consent."
        },
        {
          q: "How do I reset my password?",
          a: "Click on 'Forgot Password' on the login page. Enter your email address, and we'll send you a link to reset your password. The link is valid for 24 hours."
        },
        {
          q: "Can I delete my account?",
          a: "Yes, you can request account deletion by contacting our customer service team. Please note that this action is permanent and cannot be undone."
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-header">
        <HelpCircle size={64} className="faq-icon" />
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <p className="faq-subtitle">
          Find answers to common questions about orders, shipping, returns, and more. 
          Can't find what you're looking for? Contact our support team.
        </p>
      </div>

      <div className="faq-categories">
        {faqs.map((category, catIndex) => (
          <div key={catIndex} className="faq-category">
            <h2 className="category-title">{category.category}</h2>
            <div className="questions-list">
              {category.questions.map((faq, qIndex) => {
                const index = `${catIndex}-${qIndex}`;
                const isOpen = openIndex === index;
                
                return (
                  <div key={qIndex} className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
                    <button
                      onClick={() => toggleQuestion(catIndex, qIndex)}
                      className="faq-question"
                    >
                      <span className="question-text">{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="chevron-icon chevron-open" size={24} />
                      ) : (
                        <ChevronDown className="chevron-icon chevron-closed" size={24} />
                      )}
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p className="answer-text">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="support-cta">
        <h3 className="cta-title">Still have questions?</h3>
        <p className="cta-text">Our support team is here to help!</p>
        <div className="cta-buttons">
          <button className="contact-button">
            Contact Support
          </button>
          <button className="chat-button">
            Live Chat
          </button>
        </div>
      </div>
    </div>
  );
};