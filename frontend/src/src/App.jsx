import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import ParkingSessionForm from './components/ParkingSessionForm';
import ParkingSessionTable from './components/ParkingSessionTable';
import ParkingSessionDetailsModal from './components/ParkingSessionDetailsModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import { displayAllParkingSessions } from './services/parkingSessionService';

function App() {
  const [sessions, setSessions] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [tableError, setTableError] = useState('');
  const [deleteSuccessMsg, setDeleteSuccessMsg] = useState('');

  // Modal state
  const [viewSessionId, setViewSessionId] = useState(null);
  const [deleteSession, setDeleteSession] = useState(null);

  const fetchSessions = useCallback(async () => {
    setTableLoading(true);
    setTableError('');
    try {
      const data = await displayAllParkingSessions();
      setSessions(Array.isArray(data) ? data : []);
    } catch (err) {
      setTableError(
        err?.response?.data?.message ||
          'Unable to connect to the backend. Please ensure the server is running.'
      );
    } finally {
      setTableLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleAddSuccess = () => {
    fetchSessions();
  };

  const handleDeleteSuccess = () => {
    setDeleteSuccessMsg('✅ Parking session deleted successfully!');
    fetchSessions();
    setTimeout(() => setDeleteSuccessMsg(''), 4000);
  };

  return (
    <div className="app-wrapper">
      <Navbar />

      <main className="container py-4">
        {/* Page Header */}
        <div className="page-header mb-4">
          <div>
            <h1 className="page-title">Parking Session Dashboard</h1>
            <p className="page-subtitle">
              Manage, track, and monitor parking sessions in real-time.
            </p>
          </div>
        </div>

        {/* Delete success banner */}
        {deleteSuccessMsg && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {deleteSuccessMsg}
            <button
              type="button"
              className="btn-close"
              onClick={() => setDeleteSuccessMsg('')}
            />
          </div>
        )}

        {/* Summary Cards */}
        <SummaryCards sessions={sessions} />

        {/* Add Form */}
        <ParkingSessionForm onSuccess={handleAddSuccess} />

        {/* Sessions Table */}
        <ParkingSessionTable
          sessions={sessions}
          loading={tableLoading}
          error={tableError}
          onView={(id) => setViewSessionId(id)}
          onDelete={(session) => setDeleteSession(session)}
          onRefresh={fetchSessions}
        />
      </main>

      {/* View Details Modal */}
      <ParkingSessionDetailsModal
        sessionId={viewSessionId}
        onClose={() => setViewSessionId(null)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        session={deleteSession}
        onClose={() => setDeleteSession(null)}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
}

export default App;
