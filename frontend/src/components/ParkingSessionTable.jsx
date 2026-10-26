import React, { useState, useMemo } from 'react';

function ParkingSessionTable({ sessions, loading, error, onView, onDelete, onRefresh }) {
  const [search, setSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const matchesSearch = s.vehicleNumber
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchesPaid =
        paymentFilter === 'all'
          ? true
          : paymentFilter === 'paid'
          ? s.paid === true
          : s.paid === false;
      return matchesSearch && matchesPaid;
    });
  }, [sessions, search, paymentFilter]);

  return (
    <div className="card shadow-sm">
      <div className="card-header section-header d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h5 className="mb-0">
          <span className="me-2">📋</span>Parking Sessions
        </h5>
        <button
          className="btn btn-sm btn-outline-light"
          onClick={onRefresh}
          title="Refresh"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Search & Filter */}
      <div className="card-body pb-0">
        <div className="row g-2 mb-3">
          <div className="col-md-7">
            <div className="input-group">
              <span className="input-group-text">🔍</span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by vehicle number…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setSearch('')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          <div className="col-md-5">
            <select
              className="form-select"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              <option value="all">All Payment Statuses</option>
              <option value="paid">Paid Only</option>
              <option value="unpaid">Unpaid Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card-body pt-0">
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
            <p className="mt-2 text-muted">Loading parking sessions…</p>
          </div>
        )}

        {!loading && error && (
          <div className="alert alert-danger" role="alert">
            <strong>⚠️ Error:</strong> {error}
            <br />
            <small>Make sure the backend is running at the configured URL.</small>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="table-responsive">
              <table className="table table-hover table-parking mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Vehicle Number</th>
                    <th>Entry Time</th>
                    <th>Fee</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSessions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-5 text-muted">
                        {sessions.length === 0
                          ? '🅿️ No parking sessions found. Add one above!'
                          : '🔍 No sessions match your search/filter criteria.'}
                      </td>
                    </tr>
                  ) : (
                    filteredSessions.map((session) => (
                      <tr key={session.id}>
                        <td>
                          <span className="badge bg-secondary">{session.id}</span>
                        </td>
                        <td className="fw-semibold vehicle-number">
                          {session.vehicleNumber}
                        </td>
                        <td className="text-muted small">
                          {session.entryTime?.replace('T', ' ')}
                        </td>
                        <td className="fw-semibold">
                          ₹{parseFloat(session.fee || 0).toFixed(2)}
                        </td>
                        <td>
                          {session.paid ? (
                            <span className="badge badge-paid">✓ Paid</span>
                          ) : (
                            <span className="badge badge-unpaid">✗ Unpaid</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-view me-2"
                            onClick={() => onView(session.id)}
                            title="View details"
                          >
                            👁 View
                          </button>
                          <button
                            className="btn btn-sm btn-delete"
                            onClick={() => onDelete(session)}
                            title="Delete session"
                          >
                            🗑 Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {filteredSessions.length > 0 && (
              <div className="text-muted small mt-2 text-end">
                Showing {filteredSessions.length} of {sessions.length} session(s)
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ParkingSessionTable;
