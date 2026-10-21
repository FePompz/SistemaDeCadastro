const API_URL = "https://crudcrud.com/api/df6ed067e55448f780cc407af90f8e1f/clientes";

const clientForm = document.getElementById("client-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const clientsList = document.getElementById("clients-list");

async function fetchClients() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Erro: ${response.status}`);

    const clients = await response.json();
    renderClients(clients);
  } catch (error) {
    console.error("Erro na requisição GET:", error);
  }
}

function renderClients(clients) {
  clientsList.innerHTML = ""; 

  if (clients.length === 0) {
    clientsList.innerHTML = "<li><p>Nenhum cliente cadastrado.</p></li>";
    return;
  }

  clients.forEach((client) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <article class="client-card">
        <header class="client-info">
          <strong class="client-name">${client.name}</strong>
          <span class="client-email">${client.email}</span>
        </header>
        <button class="btn-delete" aria-label="Excluir cliente ${client.name}" onclick="deleteClient('${client._id}')">
          Excluir
        </button>
      </article>
    `;

    clientsList.appendChild(li);
  });
}

async function createClient(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) return;

  const newClient = { name, email };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newClient),
    });

    if (!response.ok) throw new Error(`Erro: ${response.status}`);

    clientForm.reset();
    fetchClients();
  } catch (error) {
    console.error("Erro na requisição POST:", error);
  }
}

async function deleteClient(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(`Erro: ${response.status}`);

    fetchClients();
  } catch (error) {
    console.error("Erro na requisição DELETE:", error);
  }
}

clientForm.addEventListener("submit", createClient);
document.addEventListener("DOMContentLoaded", fetchClients);