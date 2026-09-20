import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import Icon from '../ui/Icon';
import './AdminDashboard.css';

const API_URL = import.meta.env.VITE_API_URL ?? '';

const NAV_ITEMS = [
  { key: 'analytics', label: 'Analytics', icon: 'network' },
  { key: 'checkin', label: 'Check-in', icon: 'check' },
  { key: 'contact', label: 'Contact Us', icon: 'mail' },
  { key: 'events', label: 'Event Photos', icon: 'image' },
];

function Stat({ label, value, color }) {
  return (
    <div className="admin-stat" style={color ? { color } : undefined}>
      <div className="admin-stat__value" style={color ? { color } : undefined}>{value}</div>
      <div className="admin-stat__label">{label}</div>
    </div>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button type="button" className={`admin-tab ${active ? 'admin-tab--active' : ''}`} onClick={onClick}>
      {label}
    </button>
  );
}

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = Math.min(safePage * pageSize, total);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="admin-pagination">
      <div className="admin-pagination__size">
        <label htmlFor="admin-pagination-size">Rows per page</label>
        <select
          id="admin-pagination-size"
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
            onPageChange(1);
          }}
        >
          {PAGE_SIZE_OPTIONS.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <span className="admin-pagination__info">
        {total === 0 ? '0 results' : `${start}–${end} of ${total}`}
      </span>

      <div className="admin-pagination__nav">
        <button
          type="button"
          className="admin-pagination__btn"
          disabled={safePage <= 1}
          onClick={() => onPageChange(safePage - 1)}
          aria-label="Previous page"
        >
          <Icon name="arrow" size={12} className="admin-pagination__icon--prev" />
        </button>
        {pageNumbers.map((n) => (
          <button
            key={n}
            type="button"
            className={`admin-pagination__btn ${n === safePage ? 'admin-pagination__btn--active' : ''}`}
            onClick={() => onPageChange(n)}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          className="admin-pagination__btn"
          disabled={safePage >= totalPages}
          onClick={() => onPageChange(safePage + 1)}
          aria-label="Next page"
        >
          <Icon name="arrow" size={12} />
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('analytics');
  const [checkinView, setCheckinView] = useState('scanner');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanDropdownOpen, setScanDropdownOpen] = useState(false);

  const [contactMessages, setContactMessages] = useState([]);
  const [contactLoading, setContactLoading] = useState(false);

  const [attendeePage, setAttendeePage] = useState(1);
  const [attendeePageSize, setAttendeePageSize] = useState(10);
  const [attendeeSearch, setAttendeeSearch] = useState('');
  const [contactPage, setContactPage] = useState(1);
  const [contactPageSize, setContactPageSize] = useState(10);
  const [contactSearch, setContactSearch] = useState('');

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDesc, setNewEventDesc] = useState('');
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [uploadingEventId, setUploadingEventId] = useState(null);
  const [eventsError, setEventsError] = useState('');

  // Enhanced photo management
  const [photoTargetEventId, setPhotoTargetEventId] = useState('');
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [photoCaptionInput, setPhotoCaptionInput] = useState('');
  const [addingPhotoByUrl, setAddingPhotoByUrl] = useState(false);
  const [photoSuccessMsg, setPhotoSuccessMsg] = useState('');

  // Event Name & Detail Editing Control
  const [editingEventId, setEditingEventId] = useState(null);
  const [editEventTitle, setEditEventTitle] = useState('');
  const [editEventDesc, setEditEventDesc] = useState('');
  const [savingEvent, setSavingEvent] = useState(false);

  const startEditingEvent = (ev) => {
    setEditingEventId(ev.id);
    setEditEventTitle(ev.title || '');
    setEditEventDesc(ev.description || '');
  };

  const cancelEditingEvent = () => {
    setEditingEventId(null);
    setEditEventTitle('');
    setEditEventDesc('');
  };

  const handleSaveEvent = async (eventId) => {
    if (!editEventTitle.trim()) {
      setEventsError('Event title cannot be empty.');
      return;
    }
    setSavingEvent(true);
    setEventsError('');
    setPhotoSuccessMsg('');
    try {
      const res = await fetch(`${API_URL}/api/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editEventTitle.trim(),
          description: editEventDesc.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEventsError(data.error || 'Failed to update event name.');
        return;
      }
      setEvents((prev) =>
        prev.map((ev) => (ev.id === eventId ? { ...ev, title: data.title, description: data.description } : ev))
      );
      setEditingEventId(null);
      setPhotoSuccessMsg(`Event title updated to "${data.title}" successfully! Live across user portal.`);
      setTimeout(() => setPhotoSuccessMsg(''), 4000);
    } catch {
      setEventsError('Failed to save event details. Please verify server connection.');
    } finally {
      setSavingEvent(false);
    }
  };

  const loadEvents = async () => {
    setEventsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/events`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setEvents(list);
      if (list.length > 0 && !photoTargetEventId) {
        setPhotoTargetEventId(String(list[0].id));
      }
    } catch {
      setEvents([]);
    } finally {
      setEventsLoading(false);
    }
  };

  useEffect(() => {
    if (tab === 'events') loadEvents();
  }, [tab]);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;
    setCreatingEvent(true);
    setEventsError('');
    setPhotoSuccessMsg('');
    try {
      const res = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newEventTitle.trim(), description: newEventDesc.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEventsError(data.error || 'Could not create the event.');
        return;
      }
      setEvents((prev) => [...prev, { ...data, photos: [] }]);
      setNewEventTitle('');
      setNewEventDesc('');
      setPhotoSuccessMsg(`Event "${data.title}" created successfully!`);
      setTimeout(() => setPhotoSuccessMsg(''), 4000);
    } catch {
      setEventsError('Something went wrong. Please try again.');
    } finally {
      setCreatingEvent(false);
    }
  };

  const handleUploadPhotos = async (eventId, fileList) => {
    if (!fileList || fileList.length === 0) return;
    setUploadingEventId(eventId);
    setEventsError('');
    setPhotoSuccessMsg('');
    try {
      const formData = new FormData();
      Array.from(fileList).forEach((file) => formData.append('photos', file));
      const res = await fetch(`${API_URL}/api/events/${eventId}/photos`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setEventsError(data.error || 'Could not upload photos.');
        return;
      }
      setEvents((prev) =>
        prev.map((ev) => (ev.id === eventId ? { ...ev, photos: [...(ev.photos || []), ...data] } : ev))
      );
      setPhotoSuccessMsg(`${data.length} photo(s) uploaded successfully! Live on website now.`);
      setTimeout(() => setPhotoSuccessMsg(''), 4000);
    } catch {
      setEventsError('Upload failed. Please try again.');
    } finally {
      setUploadingEventId(null);
    }
  };

  const handleAddPhotoByUrl = async (e) => {
    e.preventDefault();
    const eventId = Number(photoTargetEventId);
    if (!eventId || !photoUrlInput.trim()) {
      setEventsError('Please choose an event and enter a valid image URL / path.');
      return;
    }
    setAddingPhotoByUrl(true);
    setEventsError('');
    setPhotoSuccessMsg('');
    try {
      const res = await fetch(`${API_URL}/api/events/${eventId}/photo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: photoUrlInput.trim(),
          caption: photoCaptionInput.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setEventsError(data.error || 'Could not add photo.');
        return;
      }
      setEvents((prev) =>
        prev.map((ev) => (ev.id === eventId ? { ...ev, photos: [...(ev.photos || []), data] } : ev))
      );
      setPhotoUrlInput('');
      setPhotoCaptionInput('');
      setPhotoSuccessMsg('Photo added successfully! It is now live on the homepage.');
      setTimeout(() => setPhotoSuccessMsg(''), 4000);
    } catch {
      setEventsError('Failed to add photo. Please verify server connectivity.');
    } finally {
      setAddingPhotoByUrl(false);
    }
  };

  const handleDeletePhoto = async (eventId, photoId) => {
    if (!window.confirm('Delete this photo from the event and homepage gallery?')) return;
    setEventsError('');
    try {
      const res = await fetch(`${API_URL}/api/events/photos/${photoId}`, { method: 'DELETE' });
      if (res.ok) {
        setEvents((prev) =>
          prev.map((ev) =>
            ev.id === eventId ? { ...ev, photos: ev.photos.filter((p) => p.id !== photoId) } : ev
          )
        );
        setPhotoSuccessMsg('Photo removed successfully.');
        setTimeout(() => setPhotoSuccessMsg(''), 3000);
      } else {
        setEventsError('Could not delete photo.');
      }
    } catch {
      setEventsError('Failed to delete photo.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Delete this entire event and all its photos?')) return;
    const res = await fetch(`${API_URL}/api/events/${eventId}`, { method: 'DELETE' });
    if (res.ok) {
      setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
      setPhotoSuccessMsg('Event deleted successfully.');
      setTimeout(() => setPhotoSuccessMsg(''), 3000);
    }
  };

  useEffect(() => {
    let ignore = false;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/event-registrations`);
        const data = await res.json();
        if (!ignore) setRegistrations(Array.isArray(data) ? data : []);
      } catch {
        if (!ignore) setRegistrations([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    (async () => {
      setContactLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/contact-messages`);
        const data = await res.json();
        if (!ignore) setContactMessages(Array.isArray(data) ? data : []);
      } catch {
        if (!ignore) setContactMessages([]);
      } finally {
        if (!ignore) setContactLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  const handleScan = async () => {
    const passId = scanInput.trim().toUpperCase();
    if (!passId) return;
    setScanning(true);
    setScanResult(null);
    try {
      const res = await fetch(`${API_URL}/api/event-registrations/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setScanResult({ error: data.error || 'Pass not found. Check the ID and try again.' });
        return;
      }
      setScanResult({ warning: data.alreadyCheckedIn, registration: data.registration });
      setRegistrations((prev) =>
        prev.map((r) => (r.passId === data.registration.passId ? data.registration : r))
      );
    } catch {
      setScanResult({ error: 'Something went wrong. Please try again.' });
    } finally {
      setScanning(false);
    }
  };

  const checkInFromList = async (passId) => {
    const res = await fetch(`${API_URL}/api/event-registrations/checkin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passId }),
    });
    const data = await res.json();
    if (res.ok) {
      setRegistrations((prev) => prev.map((r) => (r.passId === passId ? data.registration : r)));
    }
  };

  const totalCheckedIn = registrations.filter((r) => r.checkedIn).length;

  const scanQuery = scanInput.trim().toLowerCase();
  const pendingMatches = registrations
    .filter((r) => !r.checkedIn)
    .filter((r) =>
      !scanQuery || [r.name, r.passId, r.address].some((v) => v?.toLowerCase().includes(scanQuery))
    )
    .slice(0, 6);

  const attendeeQuery = attendeeSearch.trim().toLowerCase();
  const filteredRegistrations = attendeeQuery
    ? registrations.filter((r) =>
        [r.name, r.address, r.passId].some((v) => v?.toLowerCase().includes(attendeeQuery))
      )
    : registrations;

  const contactQuery = contactSearch.trim().toLowerCase();
  const filteredContactMessages = contactQuery
    ? contactMessages.filter((m) =>
        [m.name, m.email, m.message].some((v) => v?.toLowerCase().includes(contactQuery))
      )
    : contactMessages;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__top">
          <Link to="/" className="admin-sidebar__brand">
            <img src={logo} alt="Quality Thought" className="admin-sidebar__brand-logo" />
            <span className="admin-sidebar__brand-text">
              Event <span>Dashboard</span>
            </span>
          </Link>
        </div>

        <nav className="admin-sidebar__nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`admin-sidebar__link ${tab === item.key ? 'admin-sidebar__link--active' : ''}`}
              onClick={() => setTab(item.key)}
              title={item.label}
            >
              <Icon name={item.icon} size={17} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <h1 className="admin-topbar__title">
            {NAV_ITEMS.find((item) => item.key === tab)?.label}
          </h1>
          <div className="admin-topbar__right">
            <Link to="/" className="admin-topbar__home">Back to site</Link>
            <button type="button" className="btn btn-outline-dark admin-topbar__logout" onClick={onLogout}>
              Log out
            </button>
          </div>
        </header>

        <div className="admin-content">
        {tab === 'checkin' && (
          <div>
            <div className="admin-subtabs">
              <Tab label="Scanner" active={checkinView === 'scanner'} onClick={() => setCheckinView('scanner')} />
              <Tab label="Attendee List" active={checkinView === 'list'} onClick={() => setCheckinView('list')} />
            </div>

            {checkinView === 'scanner' && (
              <div>
                <h3 className="admin-subheading">Event Check-in</h3>
                <p className="admin-hint">Enter the Pass ID, or search a pending attendee by name below.</p>
                <div className="admin-scan-row">
                  <div className="admin-scan-search">
                    <input
                      value={scanInput}
                      onChange={(e) => { setScanInput(e.target.value); setScanResult(null); setScanDropdownOpen(true); }}
                      onFocus={() => setScanDropdownOpen(true)}
                      onBlur={() => setTimeout(() => setScanDropdownOpen(false), 150)}
                      onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                      placeholder="e.g. FSS-001 or attendee name"
                      className="admin-scan-input"
                    />
                    {scanDropdownOpen && (
                      <div className="admin-scan-dropdown">
                        {pendingMatches.length === 0 && (
                          <div className="admin-scan-dropdown__empty">No pending attendees match.</div>
                        )}
                        {pendingMatches.map((r) => (
                          <button
                            type="button"
                            key={r.passId}
                            className="admin-scan-dropdown__item"
                            onMouseDown={() => {
                              setScanInput(r.passId);
                              setScanResult(null);
                              setScanDropdownOpen(false);
                            }}
                          >
                            <span className="admin-scan-dropdown__name">{r.name}</span>
                            <span className="admin-scan-dropdown__meta">{r.passId}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleScan} disabled={scanning}>
                    {scanning ? 'Checking…' : 'Check In'}
                  </button>
                </div>

                {scanResult && (
                  <div className={`admin-scan-result ${scanResult.error ? 'admin-scan-result--error' : scanResult.warning ? 'admin-scan-result--warn' : 'admin-scan-result--ok'}`}>
                    {scanResult.error && <strong>{scanResult.error}</strong>}
                    {scanResult.warning && (
                      <div>
                        <strong>Already checked in</strong>
                        <div>{scanResult.registration.name}</div>
                      </div>
                    )}
                    {scanResult.registration && !scanResult.warning && (
                      <div>
                        <strong>Check-in successful</strong>
                        <div>{scanResult.registration.name}</div>
                        <div className="admin-scan-result__meta">Pass {scanResult.registration.passId}</div>
                      </div>
                    )}
                  </div>
                )}

                <div className="admin-stats-row">
                  <Stat label="Total Registered" value={registrations.length} />
                  <Stat label="Checked In" value={totalCheckedIn} color="var(--teal)" />
                  <Stat label="Pending" value={registrations.length - totalCheckedIn} color="var(--muted)" />
                </div>
              </div>
            )}

            {checkinView === 'list' && (
              <div>
                <h3 className="admin-subheading">All Attendees</h3>
                <div className="admin-search">
                  <Icon name="search" size={15} className="admin-search__icon" />
                  <input
                    type="text"
                    value={attendeeSearch}
                    onChange={(e) => { setAttendeeSearch(e.target.value); setAttendeePage(1); }}
                    placeholder="Search by name, address or pass ID…"
                    className="admin-search__input"
                  />
                </div>
                {loading && <p className="admin-hint">Loading…</p>}
                {!loading && registrations.length === 0 && <p className="admin-hint">No registrations yet.</p>}
                {!loading && registrations.length > 0 && filteredRegistrations.length === 0 && (
                  <p className="admin-hint">No attendees match "{attendeeSearch}".</p>
                )}
                {!loading && filteredRegistrations.length > 0 && (
                  <>
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>SNO</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Pass ID</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRegistrations
                            .slice((attendeePage - 1) * attendeePageSize, attendeePage * attendeePageSize)
                            .map((r, i) => (
                              <tr key={r.passId}>
                                <td>{(attendeePage - 1) * attendeePageSize + i + 1}</td>
                                <td>{r.name}</td>
                                <td>{r.address}</td>
                                <td>{r.passId}</td>
                                <td>
                                  <span className={`admin-pill ${r.checkedIn ? 'admin-pill--in' : ''}`}>
                                    {r.checkedIn ? '✓ In' : 'Pending'}
                                  </span>
                                </td>
                                <td>
                                  {!r.checkedIn && (
                                    <button type="button" className="admin-pill-btn" onClick={() => checkInFromList(r.passId)}>
                                      Check In
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <Pagination
                      page={attendeePage}
                      pageSize={attendeePageSize}
                      total={filteredRegistrations.length}
                      onPageChange={setAttendeePage}
                      onPageSizeChange={setAttendeePageSize}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {tab === 'analytics' && (
          <div>
            <h3 className="admin-subheading">Event Analytics</h3>
            <div className="admin-stats-row">
              <Stat label="Total Registrations" value={registrations.length} />
              <Stat label="Check-in Rate" value={`${Math.round((totalCheckedIn / registrations.length) * 100) || 0}%`} color="var(--teal)" />
              <Stat label="Checked In" value={totalCheckedIn} color="var(--accent, #7C6AF7)" />
              <Stat label="Pending" value={registrations.length - totalCheckedIn} color="var(--orange)" />
            </div>

            <h3 className="admin-subheading">Recent Registrations</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>SNO</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Pass ID</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...registrations].slice(0, 5).map((r, i) => (
                    <tr key={r.passId}>
                      <td>{i + 1}</td>
                      <td>{r.name}</td>
                      <td>{r.address}</td>
                      <td>{r.passId}</td>
                      <td>
                        <span className={`admin-pill ${r.checkedIn ? 'admin-pill--in' : ''}`}>
                          {r.checkedIn ? '✓ In' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'contact' && (
          <div>
            <h3 className="admin-subheading">Contact Us Requests</h3>
            <p className="admin-hint">Messages submitted through the website's Contact Us form.</p>

            <div className="admin-stats-row">
              <Stat label="Total Requests" value={contactMessages.length} />
            </div>

            <div className="admin-search">
              <Icon name="search" size={15} className="admin-search__icon" />
              <input
                type="text"
                value={contactSearch}
                onChange={(e) => { setContactSearch(e.target.value); setContactPage(1); }}
                placeholder="Search by name, email or message…"
                className="admin-search__input"
              />
            </div>

            {contactLoading && <p className="admin-hint">Loading…</p>}
            {!contactLoading && contactMessages.length === 0 && (
              <p className="admin-hint">No contact requests yet.</p>
            )}
            {!contactLoading && contactMessages.length > 0 && filteredContactMessages.length === 0 && (
              <p className="admin-hint">No requests match "{contactSearch}".</p>
            )}
            {!contactLoading && filteredContactMessages.length > 0 && (
              <>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>SNO</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContactMessages
                        .slice((contactPage - 1) * contactPageSize, contactPage * contactPageSize)
                        .map((m, i) => (
                          <tr key={m.id}>
                            <td>{(contactPage - 1) * contactPageSize + i + 1}</td>
                            <td>{m.name}</td>
                            <td>
                              <a href={`mailto:${m.email}`} className="admin-table__email">
                                {m.email}
                              </a>
                            </td>
                            <td className="admin-table__message">{m.message}</td>
                            <td>
                              {new Date(m.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  page={contactPage}
                  pageSize={contactPageSize}
                  total={filteredContactMessages.length}
                  onPageChange={setContactPage}
                  onPageSizeChange={setContactPageSize}
                />
              </>
            )}
          </div>
        )}

        {tab === 'events' && (
          <div className="admin-photo-portal">
            <div className="admin-photo-portal__top">
              <div>
                <h3 className="admin-subheading">Event Photos & Gallery Manager</h3>
                <p className="admin-hint">
                  Admin portal control for uploading, previewing, and deleting real event photos across all events.
                  Any changes here appear immediately in the real photos section on the homepage and the events page.
                </p>
              </div>
              <div className="admin-photo-portal__badges">
                <div className="admin-stat-chip">
                  <strong>{events.length}</strong> Events
                </div>
                <div className="admin-stat-chip admin-stat-chip--orange">
                  <strong>
                    {events.reduce((sum, ev) => sum + (ev.photos ? ev.photos.length : 0), 0)}
                  </strong>{' '}
                  Photos Live
                </div>
                <a href="/#event-photos" className="admin-pill-btn admin-pill-btn--primary">
                  View Live Showcase ↗
                </a>
              </div>
            </div>

            {photoSuccessMsg && (
              <div className="admin-alert admin-alert--success">
                <Icon name="check" size={16} />
                <span>{photoSuccessMsg}</span>
              </div>
            )}

            {eventsError && (
              <div className="admin-alert admin-alert--error">
                <Icon name="x" size={16} />
                <span>{eventsError}</span>
              </div>
            )}

            {/* Quick Add Photo Form */}
            <div className="admin-card admin-photo-upload-card">
              <h4 className="admin-card__title">
                <Icon name="image" size={18} color="#ea580c" />
                Add / Upload Photo to Event
              </h4>
              <p className="admin-card__sub">
                Upload image files directly or link a repository asset / external image URL with a caption.
              </p>

              <div className="admin-photo-upload-grid">
                {/* File Upload Option */}
                <div className="admin-upload-box">
                  <span className="admin-upload-box__tag">Option 1: Upload Files</span>
                  <label className="admin-file-dropzone">
                    <Icon name="image" size={24} color="#ea580c" />
                    <span>
                      {uploadingEventId ? 'Uploading photos…' : 'Choose or Drag Photo Files'}
                    </span>
                    <small>Supports JPG, PNG, WebP</small>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      hidden
                      disabled={uploadingEventId !== null || events.length === 0}
                      onChange={(e) => {
                        const targetId = Number(photoTargetEventId) || (events[0] ? events[0].id : null);
                        if (targetId) {
                          handleUploadPhotos(targetId, e.target.files);
                        } else {
                          setEventsError('Please create an event first.');
                        }
                        e.target.value = '';
                      }}
                    />
                  </label>
                  <div className="admin-upload-box__select">
                    <label htmlFor="upload-event-select">Target Event:</label>
                    <select
                      id="upload-event-select"
                      value={photoTargetEventId}
                      onChange={(e) => setPhotoTargetEventId(e.target.value)}
                    >
                      {events.map((ev) => (
                        <option key={ev.id} value={ev.id}>
                          {ev.title} ({ev.photos ? ev.photos.length : 0} photos)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Direct URL / Preset Asset Option */}
                <form className="admin-upload-box" onSubmit={handleAddPhotoByUrl}>
                  <span className="admin-upload-box__tag">Option 2: Add by Asset URL / Preset</span>
                  <div className="admin-input-group">
                    <label htmlFor="photo-url-input">Image Path or URL:</label>
                    <input
                      id="photo-url-input"
                      type="text"
                      placeholder="/assets/images/gallery/gallery-1.jpg or https://..."
                      value={photoUrlInput}
                      onChange={(e) => setPhotoUrlInput(e.target.value)}
                    />
                  </div>
                  <div className="admin-input-group">
                    <label htmlFor="photo-caption-input">Photo Caption:</label>
                    <input
                      id="photo-caption-input"
                      type="text"
                      placeholder="e.g. Learnathon 5.0 Hackathon Grand Finale"
                      value={photoCaptionInput}
                      onChange={(e) => setPhotoCaptionInput(e.target.value)}
                    />
                  </div>
                  {/* Preset helpers */}
                  <div className="admin-presets">
                    <span>Quick Presets:</span>
                    <button
                      type="button"
                      className="admin-preset-btn"
                      onClick={() => {
                        setPhotoUrlInput('/assets/images/gallery/gallery-7.jpg');
                        setPhotoCaptionInput('Keynote address to young engineering graduates');
                      }}
                    >
                      Gallery 7
                    </button>
                    <button
                      type="button"
                      className="admin-preset-btn"
                      onClick={() => {
                        setPhotoUrlInput('/assets/images/gallery/gallery-8.jpg');
                        setPhotoCaptionInput('Panel discussion on Future Skills curriculum');
                      }}
                    >
                      Gallery 8
                    </button>
                    <button
                      type="button"
                      className="admin-preset-btn"
                      onClick={() => {
                        setPhotoUrlInput('/assets/images/skilling/skilling-3.jpg');
                        setPhotoCaptionInput('Hands-on cloud architecture skilling lab');
                      }}
                    >
                      Skilling 3
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-add-photo"
                    disabled={addingPhotoByUrl || !photoUrlInput.trim() || events.length === 0}
                  >
                    {addingPhotoByUrl ? 'Adding Photo…' : 'Add Photo to Live Gallery'}
                  </button>
                </form>
              </div>
            </div>

            {/* Create Event Card */}
            <div className="admin-card admin-new-event-card">
              <h4 className="admin-card__title">
                <Icon name="calendar" size={18} color="#ea580c" />
                Create New Event Album
              </h4>
              <form className="admin-event-form" onSubmit={handleCreateEvent}>
                <input
                  type="text"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="New Event Title, e.g. National Hackathon 2026"
                  className="admin-search__input"
                />
                <input
                  type="text"
                  value={newEventDesc}
                  onChange={(e) => setNewEventDesc(e.target.value)}
                  placeholder="Event description or theme"
                  className="admin-search__input"
                />
                <button type="submit" className="btn btn-outline-orange" disabled={creatingEvent}>
                  {creatingEvent ? 'Creating…' : 'Create Event Album'}
                </button>
              </form>
            </div>

            {/* Manage & Delete Existing Photos */}
            <div className="admin-photo-mgmt-section">
              <h4 className="admin-section-title">
                Manage & Delete Live Event Photos ({events.reduce((sum, ev) => sum + (ev.photos ? ev.photos.length : 0), 0)} Total)
              </h4>

              {eventsLoading && <p className="admin-hint">Loading live events from database…</p>}
              {!eventsLoading && events.length === 0 && (
                <p className="admin-hint">No events created yet. Create one above.</p>
              )}

              <div className="admin-events-list">
                {events.map((event) => (
                  <div className="admin-event-card" key={event.id}>
                    <div className="admin-event-card__head">
                      <div>
                        <h4>{event.title}</h4>
                        <p>{event.description || 'No description provided.'}</p>
                        <span className="admin-event-badge">
                          {event.photos ? event.photos.length : 0} Photos in this Event
                        </span>
                      </div>
                      <div className="admin-event-card__actions">
                        <button
                          type="button"
                          className="admin-pill-btn admin-pill-btn--edit"
                          onClick={() => (editingEventId === event.id ? cancelEditingEvent() : startEditingEvent(event))}
                        >
                          <Icon name="pencil" size={13} />
                          {editingEventId === event.id ? 'Cancel' : 'Edit Event Name'}
                        </button>
                        <label className="admin-pill-btn admin-pill-btn--primary">
                          <Icon name="image" size={14} />
                          {uploadingEventId === event.id ? 'Uploading…' : 'Upload Photos'}
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            hidden
                            disabled={uploadingEventId === event.id}
                            onChange={(e) => {
                              handleUploadPhotos(event.id, e.target.files);
                              e.target.value = '';
                            }}
                          />
                        </label>
                        <button
                          type="button"
                          className="admin-pill-btn admin-pill-btn--danger"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          Delete Album
                        </button>
                      </div>
                    </div>

                    {/* Inline Event Name & Detail Editor */}
                    {editingEventId === event.id && (
                      <div className="admin-event-edit-box">
                        <h5>
                          <Icon name="pencil" size={14} color="#2563eb" />
                          Edit Event Name & Description
                        </h5>
                        <div className="admin-event-edit-row">
                          <div className="admin-input-group">
                            <label htmlFor={`edit-title-${event.id}`}>Event Title / Name *</label>
                            <input
                              id={`edit-title-${event.id}`}
                              type="text"
                              value={editEventTitle}
                              onChange={(e) => setEditEventTitle(e.target.value)}
                              placeholder="e.g. Learnathon 5.0 Hackathon"
                            />
                          </div>
                          <div className="admin-input-group">
                            <label htmlFor={`edit-desc-${event.id}`}>Event Description</label>
                            <input
                              id={`edit-desc-${event.id}`}
                              type="text"
                              value={editEventDesc}
                              onChange={(e) => setEditEventDesc(e.target.value)}
                              placeholder="e.g. Collaborative Problem-Solving & Coding Marathon"
                            />
                          </div>
                        </div>
                        <div className="admin-event-edit-btns">
                          <button
                            type="button"
                            className="btn btn-primary"
                            style={{ padding: '6px 14px', fontSize: '12.5px' }}
                            disabled={savingEvent}
                            onClick={() => handleSaveEvent(event.id)}
                          >
                            {savingEvent ? 'Saving Changes…' : 'Save Event Details'}
                          </button>
                          <button
                            type="button"
                            className="admin-pill-btn"
                            style={{ background: '#94a3b8', color: '#fff', padding: '6px 12px' }}
                            onClick={cancelEditingEvent}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {!event.photos || event.photos.length === 0 ? (
                      <div className="admin-empty-photos">
                        <p>No photos uploaded for this event yet. Use the uploader above to add photos.</p>
                      </div>
                    ) : (
                      <div className="admin-event-photos">
                        {event.photos.map((photo) => (
                          <div className="admin-photo-card" key={photo.id}>
                            <div className="admin-photo-card__thumb">
                              <img
                                src={photo.imageUrl.startsWith('http') || photo.imageUrl.startsWith('/') ? photo.imageUrl : `/${photo.imageUrl}`}
                                alt={photo.caption || event.title}
                                onError={(e) => {
                                  e.currentTarget.src = '/assets/images/gallery/gallery-1.jpg';
                                }}
                              />
                              <button
                                type="button"
                                className="admin-photo-card__delete-btn"
                                title="Delete this photo from event and homepage"
                                onClick={() => handleDeletePhoto(event.id, photo.id)}
                              >
                                <Icon name="x" size={14} color="#ffffff" />
                                <span>Delete</span>
                              </button>
                            </div>
                            <div className="admin-photo-card__details">
                              <p className="admin-photo-card__caption">
                                {photo.caption || 'Event photograph'}
                              </p>
                              <span className="admin-photo-card__id">ID: #{photo.id}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
}
