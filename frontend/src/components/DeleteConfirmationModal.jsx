import React, { useState } from 'react';
import { deleteParkingSessionById } from '../services/parkingSessionService';

function DeleteConfirmationModal({ session, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!session) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    try {
      await deleteParkingSessionById(session.id);
      onSuccess();
      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          'Failed to delete parking session. Please try again.'
      );
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop-custom" onClick={!loading ? onClose : undefined} />

      {/* Modal */}
      <div className="modal-custom show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">🗑 Confirm Deletion</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
                disabled={loading}
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger">{error}</div>
              )}
              <p className="mb-3">
                Are you sure you want to delete this parking session? This action{' '}
                <strong>cannot be undone</strong>.
              </p>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Session ID</span>
                  <span className="detail-value">
                    <span className="badge bg-secondary">{session.id}</span>
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Vehicle Number</span>
                  <span className="detail-value fw-bold vehicle-number">
                    {session.vehicleNumber}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Fee</span>
                  <span className="detail-value">
                    ₹{parseFloat(session.fee || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Deleting…
                  </>
                ) : (
                  '🗑 Delete Session'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteConfirmationModal;
