import React, { useState, useEffect } from 'react';
import { displayParkingSessionById } from '../services/parkingSessionService';

function ParkingSessionDetailsModal({ sessionId, onClose }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionId == null) return;
    setLoading(true);
    setError('');
    setSession(null);
    displayParkingSessionById(sessionId)
      .then((data) => setSession(data))
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
            'Failed to load parking session details.'
        );
      })
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (sessionId == null) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop-custom" onClick={onClose} />

      {/* Modal */}
      <div className="modal-custom show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg">
            <div className="modal-header section-header">
              <h5 className="modal-title">👁 Parking Session Details</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {loading && (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status" />
                  <p className="mt-2 text-muted">Loading details…</p>
                </div>
              )}
              {error && (
                <div className="alert alert-danger">{error}</div>
              )}
              {session && !loading && (
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Session ID</span>
                    <span className="detail-value">
                      <span className="badge bg-secondary fs-6">{session.id}</span>
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Vehicle Number</span>
                    <span className="detail-value fw-bold vehicle-number">
                      {session.vehicleNumber}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Entry Time</span>
                    <span className="detail-value">
                      {session.entryTime?.replace('T', ' ')}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Parking Fee</span>
                    <span className="detail-value fw-bold text-primary">
                      ₹{parseFloat(session.fee || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Payment Status</span>
                    <span className="detail-value">
                      {session.paid ? (
                        <span className="badge badge-paid fs-6">✓ Paid</span>
                      ) : (
                        <span className="badge badge-unpaid fs-6">✗ Unpaid</span>
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ParkingSessionDetailsModal;
