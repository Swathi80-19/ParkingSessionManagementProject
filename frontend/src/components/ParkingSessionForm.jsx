import React, { useState } from 'react';
import { addParkingSession } from '../services/parkingSessionService';

const initialForm = {
  vehicleNumber: '',
  entryTime: '',
  fee: '',
  paid: '',
};

function ParkingSessionForm({ onSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!form.vehicleNumber.trim()) {
      newErrors.vehicleNumber = 'Vehicle number is required.';
    }
    if (!form.entryTime) {
      newErrors.entryTime = 'Entry time is required.';
    }
    if (form.fee === '' || form.fee === null) {
      newErrors.fee = 'Parking fee is required.';
    } else if (isNaN(Number(form.fee)) || Number(form.fee) < 0) {
      newErrors.fee = 'Fee must be a non-negative number.';
    }
    if (form.paid === '') {
      newErrors.paid = 'Payment status is required.';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        vehicleNumber: form.vehicleNumber.trim().toUpperCase(),
        entryTime: form.entryTime,
        fee: parseFloat(form.fee),
        paid: form.paid === 'true',
      };
      await addParkingSession(payload);
      setSuccessMsg('✅ Parking session added successfully!');
      setForm(initialForm);
      setErrors({});
      if (onSuccess) onSuccess();
    } catch (err) {
      const backendMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        (err?.response?.data?.fieldErrors
          ? Object.values(err.response.data.fieldErrors).join(' | ')
          : null) ||
        'Failed to add parking session. Please check your input and try again.';
      setErrorMsg(backendMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header section-header">
        <h5 className="mb-0">
          <span className="me-2">➕</span>Add Parking Session
        </h5>
      </div>
      <div className="card-body">
        {successMsg && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMsg}
            <button type="button" className="btn-close" onClick={() => setSuccessMsg('')} />
          </div>
        )}
        {errorMsg && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {errorMsg}
            <button type="button" className="btn-close" onClick={() => setErrorMsg('')} />
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            {/* Vehicle Number */}
            <div className="col-md-6">
              <label htmlFor="vehicleNumber" className="form-label fw-semibold">
                Vehicle Number <span className="text-danger">*</span>
              </label>
              <input
                id="vehicleNumber"
                name="vehicleNumber"
                type="text"
                className={`form-control ${errors.vehicleNumber ? 'is-invalid' : ''}`}
                placeholder="e.g. AP39AB1234"
                value={form.vehicleNumber}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.vehicleNumber && (
                <div className="invalid-feedback">{errors.vehicleNumber}</div>
              )}
            </div>

            {/* Entry Time */}
            <div className="col-md-6">
              <label htmlFor="entryTime" className="form-label fw-semibold">
                Entry Date &amp; Time <span className="text-danger">*</span>
              </label>
              <input
                id="entryTime"
                name="entryTime"
                type="datetime-local"
                className={`form-control ${errors.entryTime ? 'is-invalid' : ''}`}
                value={form.entryTime}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.entryTime && (
                <div className="invalid-feedback">{errors.entryTime}</div>
              )}
            </div>

            {/* Parking Fee */}
            <div className="col-md-6">
              <label htmlFor="fee" className="form-label fw-semibold">
                Parking Fee (₹) <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text">₹</span>
                <input
                  id="fee"
                  name="fee"
                  type="number"
                  min="0"
                  step="0.01"
                  className={`form-control ${errors.fee ? 'is-invalid' : ''}`}
                  placeholder="e.g. 100.00"
                  value={form.fee}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.fee && <div className="invalid-feedback">{errors.fee}</div>}
              </div>
            </div>

            {/* Payment Status */}
            <div className="col-md-6">
              <label htmlFor="paid" className="form-label fw-semibold">
                Payment Status <span className="text-danger">*</span>
              </label>
              <select
                id="paid"
                name="paid"
                className={`form-select ${errors.paid ? 'is-invalid' : ''}`}
                value={form.paid}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">-- Select Payment Status --</option>
                <option value="true">Paid</option>
                <option value="false">Unpaid</option>
              </select>
              {errors.paid && <div className="invalid-feedback">{errors.paid}</div>}
            </div>

            {/* Submit */}
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary btn-add px-4 py-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Adding Session...
                  </>
                ) : (
                  <>➕ Add Parking Session</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ParkingSessionForm;
