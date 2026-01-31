import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardCards = () => {
    const [showQuantities, setShowQuantities] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            <div className="card" onClick={() => setShowQuantities(true)}>
                View Quantities
            </div>
            <div className="card" onClick={() => navigate('/event-planner/1')}>
                Plan Menu
            </div>

            {/* Example Popup for View Quantities */}
            {showQuantities && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h2>Quantities</h2>
                        <p>This is an example popup for viewing quantities.</p>
                        <button onClick={() => setShowQuantities(false)}>Close</button>
                    </div>
                </div>
            )}

            {/* Example Popup for Plan Menu */}
            {/* Removed as Plan Menu now navigates instead of showing a popup */}
        </div>
    );
};

export default DashboardCards;