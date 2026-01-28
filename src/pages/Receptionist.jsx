import { Calendar } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./receptionist.css";
import CompactCalendar from "../components/CompactCalendar";
import { useState } from "react";

const Receptionist = () => {
  const [showNewPatientPopup, setShowNewPatientPopup] = useState(false);
  const [showEmergencyPopup, setShowEmergencyPopup] = useState(false);

  return (
    <div className="receptionist-wrapper">

      {/* PAGE HEADER */}
      <div className="receptionist-header">
        <h1>TODAY’S APPOINTMENTS</h1>
        <p>Wed, Jan 28, 2026</p>
      </div>

      <div className="receptionist-layout">

        {/* LEFT TABLE */}
        <div className="appointments-card">
          <table>
            <thead>
              <tr>
                <th>TIME</th>
                <th>PATIENT NAME</th>
                <th>REASON</th>
                <th>Dr.Appointed</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>09:30</td>
                <td>
                  <strong>Amit Sharma</strong>
                  <span>Male • 28</span>
                </td>
                <td>General Checkup</td>
                <td>Dr. Mehta</td>
                <td>
                  <span className="status checked">Checked In</span>
                </td>
              </tr>
              <tr>
                <td>09:30</td>
                <td>
                  <strong>Shravani Chavan</strong>
                  <span>Feamle • 21</span>
                </td>
                <td>General Checkup</td>
                <td>Dr. Mehta</td>
                <td>
                  <span className="status checked">Checked In</span>
                </td>
              </tr>
              <tr>
                <td>09:30</td>
                <td>
                  <strong>Rohit Viswakarma</strong>
                  <span>Male • 21</span>
                </td>
                <td>General Checkup</td>
                <td>Dr. Mehta</td>
                <td>
                  <span className="status checked">Checked In</span>
                </td>
              </tr>
              <tr>
                <td>09:30</td>
                <td>
                  <strong>Ajay Bhalerao</strong>
                  <span>Male • 24</span>
                </td>
                <td>General Checkup</td>
                <td>Dr. Mehta</td>
                <td>
                  <span className="status checked">Checked In</span>
                </td>
              </tr>
              <tr>
                <td>09:30</td>
                <td>
                  <strong>Harsh Patil</strong>
                  <span>Male • 22</span>
                </td>
                <td>General Checkup</td>
                <td>Dr. Mehta</td>
                <td>
                  <span className="status checked">Checked In</span>
                </td>
              </tr>
              <tr>
                <td>09:30</td>
                <td>
                  <strong>Amit Sharma</strong>
                  <span>Male • 28</span>
                </td>
                <td>General Checkup</td>
                <td>Dr. Mehta</td>
                <td>
                  <span className="status checked">Checked In</span>
                </td>
              </tr>

              <tr>
                <td>10:15</td>
                <td>
                  <strong>Neha Verma</strong>
                  <span>Female • 32</span>
                </td>
                <td>Consultation</td>
                <td>Dr. Singh</td>
                <td>
                  <span className="status waiting">Waiting</span>
                </td>
              </tr>
              

              <tr>
                <td>11:00</td>
                <td>
                  <strong>Rahul Patil</strong>
                  <span>Male • 45</span>
                </td>
                <td>Follow-up</td>
                <td>Dr. Joshi</td>
                <td>
                  <span className="status completed">Completed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <CompactCalendar />

          {/* ACTION BUTTONS */}
          <button className="btn primary" onClick={() => setShowNewPatientPopup(true)}>
            + New Patient Registration
          </button>

          <button className="btn emergency" onClick={() => setShowEmergencyPopup(true)}>
            🚨 Emergency Entry
          </button>
        </div>
      </div>

      {/* POPUP COMPONENT */}
      {(showNewPatientPopup || showEmergencyPopup) && (
        <div className="popup-overlay">
          <div className="popup-box animate-popup">
            <div className="popup-header">
              <h2>{showNewPatientPopup ? "New Patient Registration" : "Emergency Entry"}</h2>
              <span className="close-btn" onClick={() => {
                setShowNewPatientPopup(false);
                setShowEmergencyPopup(false);
              }}>&times;</span>
            </div>

            <div className="popup-body">
              <form>
                <label>Name</label>
                <input type="text" placeholder="Enter patient name" />

                {showNewPatientPopup && (
                  <>
                    <label>Age</label>
                    <input type="number" placeholder="Enter age" />

                    <label>Gender</label>
                    <select>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>

                    <label>Reason</label>
                    <input type="text" placeholder="Reason for visit" />
                  </>
                )}

                {showEmergencyPopup && (
                  <>
                    <label>Condition</label>
                    <input type="text" placeholder="Describe emergency" />

                    <label>Doctor</label>
                    <select>
                      <option>Dr. Mehta</option>
                      <option>Dr. Singh</option>
                      <option>Dr. Joshi</option>
                    </select>
                  </>
                )}
              </form>
            </div>

            <div className="popup-footer">
              <button
                className="btn primary"
                onClick={() => {
                  setShowNewPatientPopup(false);
                  setShowEmergencyPopup(false);
                }}
              >
                Save
              </button>
              <button
                className="btn secondary"
                onClick={() => {
                  setShowNewPatientPopup(false);
                  setShowEmergencyPopup(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Receptionist;
