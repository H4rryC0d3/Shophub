import { useState } from 'react';
import { Package, MapPin, Truck, CheckCircle, Search } from 'lucide-react';
import '../styles/TrackOrder.css';

export const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingData({
        orderId: orderId,
        status: 'In Transit',
        estimatedDelivery: '29 Dec 2025',
        currentLocation: 'Distribution Center - Hyderabad, Telangana',
        timeline: [
          {
            status: 'Order Placed',
            date: '24 Dec 2025',
            time: '10:30 AM',
            completed: true
          },
          {
            status: 'Order Confirmed',
            date: '24 Dec 2025',
            time: '11:00 AM',
            completed: true
          },
          {
            status: 'Shipped',
            date: '25 Dec 2025',
            time: '09:15 AM',
            completed: true
          },
          {
            status: 'In Transit',
            date: '26 Dec 2025',
            time: '02:30 PM',
            completed: true,
            current: true
          },
          {
            status: 'Out for Delivery',
            date: '29 Dec 2025',
            time: 'Pending',
            completed: false
          },
          {
            status: 'Delivered',
            date: '29 Dec 2025',
            time: 'Pending',
            completed: false
          }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="track-order-page">
      <div className="track-header">
        <Package size={64} className="track-icon" />
        <h1 className="track-title">Track Your Order</h1>
        <p className="track-subtitle">
          Enter your order ID to track your package in real-time
        </p>
      </div>

      {/* Tracking Form */}
      <div className="tracking-form-card">
        <div className="form-container">
          <label className="form-label">Order ID</label>
          <div className="form-input-group">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="track-input"
              placeholder="Enter your order ID (e.g., ORD123456)"
            />
            <button
              onClick={handleTrack}
              disabled={loading || !orderId}
              className="track-button"
            >
              <Search size={20} />
              {loading ? 'Tracking...' : 'Track'}
            </button>
          </div>
        </div>
      </div>

      {/* Tracking Results */}
      {trackingData && (
        <div className="tracking-results">
          {/* Status Card */}
          <div className="status-card">
            <div className="status-header">
              <div>
                <h2 className="order-number">
                  Order #{trackingData.orderId}
                </h2>
                <p className="delivery-estimate">
                  Estimated Delivery: <span className="delivery-date">
                    {trackingData.estimatedDelivery}
                  </span>
                </p>
              </div>
              <div className="status-badge-container">
                <div className="status-badge">
                  {trackingData.status}
                </div>
              </div>
            </div>

            <div className="location-info">
              <MapPin className="location-icon" size={24} />
              <div>
                <p className="location-label">Current Location</p>
                <p className="location-text">{trackingData.currentLocation}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="timeline-card">
            <h3 className="timeline-heading">Shipping Timeline</h3>
            <div className="timeline-container">
              {trackingData.timeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  {/* Icon */}
                  <div className="timeline-icon-column">
                    <div className={`timeline-icon ${
                      item.completed ? 'icon-completed' : 'icon-pending'
                    } ${item.current ? 'icon-current' : ''}`}>
                      {item.completed ? (
                        <CheckCircle size={24} />
                      ) : index === 4 ? (
                        <Truck size={24} />
                      ) : (
                        <Package size={24} />
                      )}
                    </div>
                    {index < trackingData.timeline.length - 1 && (
                      <div className={`timeline-connector ${
                        item.completed ? 'connector-completed' : 'connector-pending'
                      }`}></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="timeline-content">
                    <div className="timeline-content-header">
                      <h4 className={`timeline-status ${
                        item.current ? 'status-current' : 'status-normal'
                      }`}>
                        {item.status}
                      </h4>
                      <span className="timeline-time">{item.time}</span>
                    </div>
                    <p className="timeline-date">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="actions-card">
            <h3 className="actions-heading">Need Help?</h3>
            <div className="actions-buttons">
              <button className="support-button">
                Contact Support
              </button>
              <button className="issue-button">
                Report an Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};