
const Modal = ({ value, onClose }) => {
  return (
    <div className="outcome-modal-overlay">
      <div className="outcome-modal">
        <div className="outcome-modal-content">
          <p>
            Your loan is favored to be approved {value}% of the requested value.
            Thank you for your application. We'll get in touch with you shortly
          </p>
        </div>
        <div className="outcome-modal-actions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
