import React, { useState, useEffect } from "react";
import { RiDeleteBinLine, RiCheckboxCircleLine, RiMailLine, RiMailOpenLine } from "react-icons/ri";
import dayjs from "dayjs";
import { getAndDelete, getAndupdateOne } from "../services/alert";

export function MarkAllRead({ onClick, count }) {
  if (count === 0) return null;
  return (
    <div className="d-flex justify-content-end mb-2">
      <button 
        onClick={onClick} 
        className="btn btn-sm d-flex align-items-center gap-2 px-3 py-2 rounded-3 shadow-sm border-0"
        style={{ 
          fontSize: '0.85rem', 
          fontWeight: '600',
          backgroundColor: 'var(--primary)',
          color: 'white'
        }}
      >
        <RiMailOpenLine size={18} />
        Mark all as read
      </button>
    </div>
  );
}

export default function Notification({ data, onDelete }) {
  const [isRead, setIsRead] = useState(data.isRead);
  const formatted = dayjs(data.createdAt).format("h:mm A");

  useEffect(() => {
    setIsRead(data.isRead);
  }, [data.isRead]);

  const handleToggleRead = async () => {
    try {
      const newStatus = !isRead;
      setIsRead(newStatus);
      await getAndupdateOne(data._id, { isRead: newStatus });
    } catch (error) {
      console.error("Failed to update read status:", error);
      // Revert state if API call fails
      setIsRead(isRead);
    }
  };

  const handleDelete = async () => {
    try {
      await getAndDelete(data._id);
      if (onDelete) onDelete(data._id);
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  return (
    <div
      className={`d-flex align-items-center p-3 rounded-4 notification-card ${
        !isRead ? "unread" : "bg-white"
      }`}
      style={{ maxWidth: "900px" }}
    >
      {!isRead && <div className="unread-indicator" />}

      <div
        className={`d-flex align-items-center justify-content-center rounded-circle me-3 flex-shrink-0 icon-box ${
          !isRead ? "bg-primary text-white" : "bg-light text-muted border text-opacity-50"
        }`}
        style={{ width: "52px", height: "52px", fontSize: "1.25rem", fontWeight: "600" }}
      >
        {data.title ? data.title.charAt(0).toUpperCase() : <RiMailLine />}
      </div>

      <div className="flex-grow-1 min-width-0 me-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h6 className={`m-0 text-truncate ${!isRead ? "fw-bold" : "fw-medium text-muted"}`}>
            {data.title}
          </h6>
          <span className="text-muted small" style={{ fontSize: '0.8rem' }}>
            {formatted}
          </span>
        </div>
        <p className={`m-0 text-truncate-2 small ${!isRead ? "text-dark" : "text-muted opacity-75"}`} style={{ lineHeight: '1.5' }}>
          {data.message}
        </p>
      </div>

      <div className="d-flex gap-2 align-items-center justify-content-end" style={{ minWidth: '88px' }}>
        <button 
          className="btn btn-sm p-2 rounded-circle border-0 btn-icon-hover"
          title="Mark as read"
          style={{ 
            color: 'var(--primary)', 
            backgroundColor: 'transparent',
            visibility: !isRead ? 'visible' : 'hidden' 
          }}
          onClick={handleToggleRead}
        >
          <RiCheckboxCircleLine size={24} />
        </button>
        <button 
          className="btn btn-sm p-2 rounded-circle border-0 text-muted btn-delete-hover"
          title="Delete"
          style={{ backgroundColor: 'transparent' }}
          onClick={handleDelete}
        >
          <RiDeleteBinLine size={20} />
        </button>
      </div>
    </div>
  );
}
