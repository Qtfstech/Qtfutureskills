import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import Icon from '../ui/Icon';
import './AdminDashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4177';

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

  const loadEvents = async () => {
    setEventsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/events`);
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
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
      setEvents((prev) => [...prev, data]);
      setNewEventTitle('');
      setNewEventDesc('');
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
        prev.map((ev) => (ev.id === eventId ? { ...ev, photos: [...ev.photos, ...data] } : ev))
      );
    } catch {
      setEventsError('Upload failed. Please try again.');
    } finally {
      setUploadingEventId(null);
    }
  };

  const handleDeletePhoto = async (eventId, photoId) => {
    const res = await fetch(`${API_URL}/api/events/photos/${photoId}`, { method: 'DELETE' });
    if (res.ok) {
      setEvents((prev) =>
        prev.map((ev) => (ev.id === eventId ? { ...ev, photos: ev.photos.filter((p) => p.id !== photoId) } : ev))
      );
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Delete this event and all its photos?')) return;
    const res = await fetch(`${API_URL}/api/events/${eventId}`, { method: 'DELETE' });
    if (res.ok) {
      setEvents((prev) => prev.filter((ev) => ev.id !== eventId));
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
          <div>
            <h3 className="admin-subheading">Event Photo Albums</h3>
            <p className="admin-hint">
              Create an album for each event and upload photos. They appear instantly on the
              public Events Gallery page, grouped event by event.
            </p>

            <form className="admin-event-form" onSubmit={handleCreateEvent}>
              <input
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="Event title, e.g. Learnathon 6.0"
                className="admin-search__input"
              />
              <input
                type="text"
                value={newEventDesc}
                onChange={(e) => setNewEventDesc(e.target.value)}
                placeholder="Short description"
                className="admin-search__input"
              />
              <button type="submit" className="btn btn-primary" disabled={creatingEvent}>
                {creatingEvent ? 'Adding…' : 'Add Event'}
              </button>
            </form>

            {eventsError && <p className="admin-scan-result admin-scan-result--error">{eventsError}</p>}

            {eventsLoading && <p className="admin-hint">Loading events…</p>}
            {!eventsLoading && events.length === 0 && <p className="admin-hint">No events yet. Add one above.</p>}

            <div className="admin-events-list">
              {events.map((event) => (
                <div className="admin-event-card" key={event.id}>
                  <div className="admin-event-card__head">
                    <div>
                      <h4>{event.title}</h4>
                      <p>{event.description}</p>
                    </div>
                    <button
                      type="button"
                      className="admin-pill-btn admin-pill-btn--danger"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      Delete Event
                    </button>
                  </div>

                  <label className="admin-upload-btn">
                    <Icon name="image" size={16} />
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

                  {event.photos.length === 0 ? (
                    <p className="admin-hint">No photos uploaded yet.</p>
                  ) : (
                    <div className="admin-event-photos">
                      {event.photos.map((photo) => (
                        <div className="admin-photo-thumb" key={photo.id}>
                          <img src={`${API_URL}${photo.imageUrl}`} alt={event.title} />
                          <button
                            type="button"
                            className="admin-photo-thumb__delete"
                            aria-label="Delete photo"
                            onClick={() => handleDeletePhoto(event.id, photo.id)}
                          >
                            <Icon name="x" size={12} color="#fff" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
