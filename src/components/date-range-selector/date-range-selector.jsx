import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import "./date-range-selector.css"

const DateRangeSelector = ({ earliestDate, initialDateRange, onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(initialDateRange.start);
  const [endDate, setEndDate] = useState(initialDateRange.end);
  const buttonRef = useRef(null);
  const popupRef = useRef(null);

  // Update local state when initialDateRange changes
  useEffect(() => {
    setStartDate(initialDateRange.start);
    setEndDate(initialDateRange.end);
  }, [initialDateRange]);

  // Format date to YYYY-MM-DD for input value
  const formatDateForInput = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Parse date from input ensuring consistent timezone
  const parseInputDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    d.setHours(12, 0, 0, 0);
    return d;
  };

  // Handle clicks outside of the date picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen &&
          !buttonRef.current?.contains(event.target) &&
          !popupRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onDateRangeChange(startDate, endDate);
    setIsOpen(false);
  };

  const toggleDatePicker = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="date-range-selector">
      <button
        ref={buttonRef}
        className="calendar-icon"
        onClick={toggleDatePicker}
        aria-label="Select date range"
        type="button"
      >
        <span role="img" aria-label="calendar">📆</span>
      </button>

      {isOpen && ReactDOM.createPortal(
        <div
          ref={popupRef}
          className="date-picker-popup"
          style={{
            top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + 8 : 0,
            left: buttonRef.current ? buttonRef.current.getBoundingClientRect().left : 0,
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="date-inputs">
              <div className="date-input-group">
                <label htmlFor="start-date">From:</label>
                <input
                  type="date"
                  id="start-date"
                  value={formatDateForInput(startDate)}
                  min={formatDateForInput(earliestDate)}
                  max={formatDateForInput(new Date())}
                  onChange={(e) => setStartDate(parseInputDate(e.target.value))}
                />
              </div>
              <div className="date-input-group">
                <label htmlFor="end-date">To:</label>
                <input
                  type="date"
                  id="end-date"
                  value={formatDateForInput(endDate)}
                  min={formatDateForInput(startDate)}
                  max={formatDateForInput(new Date())}
                  onChange={(e) => setEndDate(parseInputDate(e.target.value))}
                />
              </div>
            </div>
            <div className="date-picker-actions">
              <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
              <button type="submit">Apply</button>
            </div>
          </form>
        </div>,
        document.body
      )}
    </div>
  );
};

export default DateRangeSelector;







