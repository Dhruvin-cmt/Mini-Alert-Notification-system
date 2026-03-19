import React, { useEffect, useState } from "react";
import Notification, { MarkAllRead } from "../components/Notification";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { getAllMsgs, getAllAndUpdate } from "../services/alert";

function AllMessages() {
  const [loading, setLoading] = useState(true);
  const [arr, setArr] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  console.log(maxPage)

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const ans = await getAllMsgs(page);
        setMaxPage(ans?.data?.pagination?.totalPages);
        const list = ans.data?.data ?? [];
        const ary = Array.isArray(list) ? list : [];
        if (!cancelled) setArr(ary);
      } catch (error) {
        if (!cancelled) setArr([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page]);

  const onDelete = (id) => {
    setArr((prev) => prev.filter((msg) => msg._id !== id));
  };

  const handleMarkAllRead = async () => {
    try {
      await getAllAndUpdate({ isRead: true });
      setArr((prev) => prev.map((msg) => ({ ...msg, isRead: true })));
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const unreadCount = arr.filter((m) => !m.isRead).length;

  return (
    <div className="d-flex flex-column gap-4 p-2">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h4 className="m-0 fw-bold text-main">All Messages</h4>
        <MarkAllRead onClick={handleMarkAllRead} count={unreadCount} />
      </div>

      <div className="message-list-container">
        {loading && (
          <div className="d-flex justify-content-center align-items-center position-absolute w-100 h-100 top-0 start-0 bg-white bg-opacity-50 rounded-4 z-3">
            <div
              className="spinner-border text-primary opacity-75"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {arr.length === 0 && !loading ? (
          <div className="text-center p-5 text-muted border rounded-4 bg-light bg-opacity-50">
            <p className="fs-5 m-0 italic">No messages found in this list.</p>
          </div>
        ) : (
          <div
            className={`d-flex flex-column gap-3 transition-opacity ${
              loading ? "opacity-25" : "opacity-100"
            }`}
          >
            {arr.map((msg, index) => (
              <Notification
                key={msg._id || index}
                data={msg}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>

      {maxPage > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-2 mb-4">
          <button
            className="btn btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center pagination-btn shadow-sm"
            onClick={() => {
              if (page > 1) setPage((prev) => prev - 1);
            }}
            disabled={page <= 1}
            style={{ width: "44px", height: "44px" }}
            title="Previous Page"
          >
            <GrLinkPrevious size={18} />
          </button>

          <div className="d-flex align-items-center gap-2 px-4 py-2 bg-white rounded-pill border shadow-sm border-light">
            <span className="fw-bold text-primary">{page}</span>
            <span className="text-muted opacity-25">|</span>
            <span className="text-muted small">Total {maxPage}</span>
          </div>

          <button
            className="btn btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center pagination-btn shadow-sm"
            onClick={() => {
              if (page < maxPage) setPage((prev) => prev + 1);
            }}
            disabled={page >= maxPage}
            style={{ width: "44px", height: "44px" }}
            title="Next Page"
          >
            <GrLinkNext size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export default AllMessages;
