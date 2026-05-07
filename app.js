const tickets = [
  {
    id: 241,
    name: "Kari Hansen",
    title: "Får ikke logget inn på e-post",
    description: "Passord fungerer på PC, men webmail avviser innlogging.",
    priority: "Høy",
    category: "Tilgang",
    queue: "Førstelinje",
    status: "Åpen",
    assigned: "Marius",
    time: "12 min",
    activity: ["Sak opprettet av ansatt", "Førstelinje varslet"],
  },
  {
    id: 242,
    name: "Jonas Berg",
    title: "Ustabilt nett på møterom",
    description: "Wi-Fi faller ut under Teams-møter i møterom B.",
    priority: "Normal",
    category: "Nettverk",
    queue: "Drift",
    status: "Under arbeid",
    assigned: "Drift",
    time: "34 min",
    activity: ["Ping-test startet", "Aksesspunkt sjekkes"],
  },
  {
    id: 243,
    name: "Mina Solheim",
    title: "Installer regnskapsprogram",
    description: "Ny ansatt trenger program før opplæring klokken 13.",
    priority: "Lav",
    category: "Software",
    queue: "Førstelinje",
    status: "Løst",
    assigned: "Ida",
    time: "1 t",
    activity: ["Program installert", "Bruker bekreftet tilgang"],
  },
  {
    id: 244,
    name: "Eirik Moen",
    title: "Mistenkelig e-post mottatt",
    description: "Bruker har fått e-post med lenke som ber om passord.",
    priority: "Kritisk",
    category: "Tilgang",
    queue: "Sikkerhet",
    status: "Åpen",
    assigned: "Sikkerhet",
    time: "5 min",
    activity: ["Lenke blokkert", "Bruker bedt om å ikke klikke"],
  },
];

let selectedTicketId = tickets[0].id;

const form = document.querySelector("#ticketForm");
const formMessage = document.querySelector("#formMessage");
const ticketTable = document.querySelector("#ticketTable");
const detailPanel = document.querySelector("#detailPanel");
const filters = {
  status: document.querySelector("#statusFilter"),
  priority: document.querySelector("#priorityFilter"),
  category: document.querySelector("#categoryFilter"),
  queue: document.querySelector("#queueFilter"),
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

function tone(value) {
  const tones = {
    Åpen: "open",
    "Under arbeid": "working",
    Løst: "solved",
    Kritisk: "critical",
    Høy: "high",
    Normal: "normal",
    Lav: "low",
  };
  return tones[value] || "normal";
}

function matchesFilter(ticket, key) {
  const value = filters[key].value;
  return value === "Alle" || ticket[key] === value;
}

function visibleTickets() {
  return tickets.filter(
    (ticket) =>
      matchesFilter(ticket, "status") &&
      matchesFilter(ticket, "priority") &&
      matchesFilter(ticket, "category") &&
      matchesFilter(ticket, "queue"),
  );
}

function updateMetrics() {
  document.querySelector("#openCount").textContent = tickets.filter((ticket) => ticket.status === "Åpen").length;
  document.querySelector("#workingCount").textContent = tickets.filter((ticket) => ticket.status === "Under arbeid").length;
  document.querySelector("#solvedCount").textContent = tickets.filter((ticket) => ticket.status === "Løst").length;
  document.querySelector("#allCount").textContent = tickets.length;
}

function renderTable() {
  const rows = visibleTickets();
  ticketTable.innerHTML = "";

  if (rows.length === 0) {
    ticketTable.innerHTML = '<tr><td colspan="7">Ingen saker matcher filtrene.</td></tr>';
    return;
  }

  rows.forEach((ticket) => {
    const row = document.createElement("tr");
    row.dataset.id = ticket.id;
    row.className = ticket.id === selectedTicketId ? "selected" : "";
    row.innerHTML = `
      <td>#${ticket.id}</td>
      <td>
        <div class="ticket-title">${escapeHtml(ticket.title)}</div>
        <div class="ticket-subtitle">${escapeHtml(ticket.name)} · ${escapeHtml(ticket.queue)}</div>
      </td>
      <td><span class="badge status-${tone(ticket.status)}">${escapeHtml(ticket.status)}</span></td>
      <td><span class="badge priority-${tone(ticket.priority)}">${escapeHtml(ticket.priority)}</span></td>
      <td>${escapeHtml(ticket.category)}</td>
      <td>${escapeHtml(ticket.assigned)}</td>
      <td>${escapeHtml(ticket.time)}</td>
    `;
    ticketTable.appendChild(row);
  });
}

function renderDetail() {
  const ticket = tickets.find((item) => item.id === selectedTicketId);

  if (!ticket) {
    detailPanel.innerHTML = '<div class="detail-empty">Velg en ticket for detaljer.</div>';
    return;
  }

  detailPanel.innerHTML = `
    <p class="eyebrow">Detaljpanel</p>
    <h2>#${ticket.id} ${escapeHtml(ticket.title)}</h2>
    <span class="badge status-${tone(ticket.status)}">${escapeHtml(ticket.status)}</span>

    <div class="detail-meta">
      <div><span>Innmelder</span><strong>${escapeHtml(ticket.name)}</strong></div>
      <div><span>Tildelt</span><strong>${escapeHtml(ticket.assigned)}</strong></div>
      <div><span>Prioritet</span><strong>${escapeHtml(ticket.priority)}</strong></div>
      <div><span>Kø</span><strong>${escapeHtml(ticket.queue)}</strong></div>
    </div>

    <section class="detail-section">
      <h3>Beskrivelse</h3>
      <p>${escapeHtml(ticket.description)}</p>
    </section>

    <section class="detail-section">
      <h3>Aktivitetslogg</h3>
      <div class="activity-list">
        ${ticket.activity.map((item) => `<div class="activity-item"><span>I dag</span>${escapeHtml(item)}</div>`).join("")}
      </div>
    </section>

    <div class="detail-actions">
      <button type="button" class="ghost-button" id="debugButton">Feilsøk</button>
      <button type="button" class="primary-button" id="solveButton">Merk løst</button>
    </div>
  `;
}

function render() {
  updateMetrics();
  renderTable();
  renderDetail();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const ticket = {
    id: Math.max(...tickets.map((item) => item.id)) + 1,
    name: document.querySelector("#name").value.trim(),
    title: document.querySelector("#title").value.trim(),
    description: document.querySelector("#description").value.trim(),
    priority: document.querySelector("#priority").value,
    category: document.querySelector("#category").value,
    queue: document.querySelector("#queue").value,
    status: "Åpen",
    assigned: "Ikke tildelt",
    time: "nå",
    activity: ["Sak opprettet via ansatt-skjema"],
  };

  if (!ticket.name || !ticket.title || !ticket.description) {
    return;
  }

  tickets.unshift(ticket);
  selectedTicketId = ticket.id;
  form.reset();
  formMessage.hidden = false;
  render();
});

ticketTable.addEventListener("click", (event) => {
  const row = event.target.closest("tr");
  if (!row?.dataset.id) {
    return;
  }

  selectedTicketId = Number(row.dataset.id);
  render();
});

detailPanel.addEventListener("click", (event) => {
  if (!event.target.matches("#solveButton")) {
    return;
  }

  const ticket = tickets.find((item) => item.id === selectedTicketId);
  if (!ticket) {
    return;
  }

  ticket.status = "Løst";
  ticket.activity.unshift("IT markerte saken som løst");
  render();
});

Object.values(filters).forEach((filter) => {
  filter.addEventListener("change", render);
});

document.querySelectorAll("[data-queue-shortcut]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-queue-shortcut]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    filters.queue.value = button.dataset.queueShortcut;
    render();
  });
});

document.querySelector("#focusFormButton").addEventListener("click", () => {
  document.querySelector("#newTicketCard").scrollIntoView({ behavior: "smooth", block: "start" });
  document.querySelector("#title").focus();
});

render();
