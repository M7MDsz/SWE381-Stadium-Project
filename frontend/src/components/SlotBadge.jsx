import React from 'react';
function SlotBadge({ slot, onReserve }) {
  return (
    <div className={`slot-box ${slot.isReserved ? 'reserved' : 'available'}`}>
      <div className="fw-bold">{slot.date}</div>
      <div>{slot.startTime} - {slot.endTime}</div>
      <span className="badge bg-light text-dark my-2">
        {slot.isReserved ? 'Reserved' : 'Available'}
      </span>
      {onReserve && !slot.isReserved && (
        <button className="btn btn-sm btn-primary d-block" onClick={() => onReserve(slot._id)}>
          Reserve
        </button>
      )}
    </div>
  );
}

export default SlotBadge;
