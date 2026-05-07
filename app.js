const tickets = [
  {
    id: 101,
    name: "Kari Hansen",
    title: "Får ikke logget inn på e-post",
    description: "Passord fungerer på PC, men ikke i webmail.",
    priority: "Høy",
    category: "Brukerkonto",
    queue: "Førstelinje",
    status: "Ny",
  },
  {
    id: 102,
    name: "Jonas Berg",
    title: "Ustabilt nett på møterom",
    description: "Wi-Fi faller ut under Teams-møter.",
    priority: "Middels",
    category: "Nettverk",
    queue: "Drift",
    status: "Under arbeid",
  },
  {
    id: 103,
    name: "Mina Solheim",
    title: "Trenger installasjon av regnskapsprogram",
    description: "Ny ansatt trenger tilgang før opplæring.",
    priority: "Lav",
    category: "Programvare",
    queue: "Førstelinje",
    status: "Løst",
  },
];

const form = document.querySelector("#ticketForm");
const list = document.querySelector("#ticketList");
const openCount = document.querySelector("#openCount");
const filters = {
  status: document.querySelector("#statusFilter"),
  priority: document.querySelector("#priorityFilter"),
  category: document.querySelector("#categoryFilter"),
  queue: document.querySelector("#queueFilter"),
};

function matchesFilter(ticket, key) {
  const value = filters[key].value;
  return value === "Alle" || ticket[key] === value;
}

function renderTickets() {
  const visibleTickets = tickets.filter(
    (ticket) =>
      matchesFilter(ticket, "status") &&
      matchesFilter(ticket, "priority") &&
      matchesFilter(ticket, "category") &&
      matchesFilter(ticket, "queue"),
  );

  openCount.textContent = tickets.filter((ticket) => ticket.status !== "Løst").length;
  list.innerHTML = "";

  if (visibleTickets.length === 0) {
    list.innerHTML = '<div class="empty">Ingen saker matcher filtrene.</div>';
    return;
  }

  visibleTickets.forEach((ticket) => {
    const card = document.createElement("article");
    card.className = "ticket-card";
    card.innerHTML = `
      <header>
        <div>
          <h3>#${ticket.id} ${escapeHtml(ticket.title)}</h3>
          <p>${escapeHtml(ticket.description)}</p>
        </div>
        <select class="status-control" data-id="${ticket.id}" aria-label="Endre status">
          <option ${ticket.status === "Ny" ? "selected" : ""}>Ny</option>
          <option ${ticket.status === "Under arbeid" ? "selected" : ""}>Under arbeid</option>
          <option ${ticket.status === "Løst" ? "selected" : ""}>Løst</option>
        </select>
      </header>
      <div class="badges">
        <span class="badge ${ticket.priority === "Høy" ? "high" : ""}">${ticket.priority}</span>
        <span class="badge">${ticket.category}</span>
        <span class="badge">${ticket.queue}</span>
        <span class="badge">${ticket.status}</span>
        <span class="badge">Innmelder: ${escapeHtml(ticket.name)}</span>
      </div>
    `;
    list.appendChild(card);
  });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
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
    status: "Ny",
  };

  if (!ticket.name || !ticket.title || !ticket.description) {
    return;
  }

  tickets.unshift(ticket);
  form.reset();
  renderTickets();
});

list.addEventListener("change", (event) => {
  if (!event.target.matches(".status-control")) {
    return;
  }

  const ticket = tickets.find((item) => item.id === Number(event.target.dataset.id));
  ticket.status = event.target.value;
  renderTickets();
});

Object.values(filters).forEach((filter) => {
  filter.addEventListener("change", renderTickets);
});

renderTickets();
