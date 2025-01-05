// Check if an agent is logged in
const loggedInAgent = JSON.parse(sessionStorage.getItem('loggedInAgent'));

if (loggedInAgent) {
  // Populate the personal details page with agent information
  document.getElementById('agentId').textContent = loggedInAgent.agentId;
  document.getElementById('name').textContent = loggedInAgent.name;
  document.getElementById('rank').textContent = loggedInAgent.rank;
  document.getElementById('missionAssigned').textContent = loggedInAgent.missionAssigned;
  document.getElementById('lastLogin').textContent = loggedInAgent.lastLogin;
  document.getElementById('status').textContent = loggedInAgent.status;
} else {
  // If no agent is logged in, redirect back to the login page
  window.location.href = 'login.html';
}

// Logout function to clear session storage
function logout() {
  sessionStorage.removeItem('loggedInAgent');
  window.location.href = 'login.html';
}
