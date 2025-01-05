// Check if an agent is logged in
const loggedInAgent = JSON.parse(sessionStorage.getItem('loggedInAgent'));

if (loggedInAgent) {
  // Populate the dashboard with agent information
  document.getElementById('agentId').textContent = loggedInAgent.agentId || 'N/A';
  document.getElementById('agentName').textContent = loggedInAgent.name || 'Unknown Agent';
  document.getElementById('missionAssigned').textContent = loggedInAgent.missionAssigned || 'None';
  document.getElementById('missionStatus').textContent = loggedInAgent.missionStatus || 'No Status';
  document.getElementById('missionDeadline').textContent = loggedInAgent.missionDeadline || 'N/A';
  document.getElementById('rank').textContent = loggedInAgent.rank || 'Unknown';
  document.getElementById('missionSuccessRate').textContent = (loggedInAgent.missionSuccessRate || 0) + '%';
  document.getElementById('agentHealth').textContent = loggedInAgent.health || 'N/A';

  // Populate the alerts
  const alertsList = document.getElementById('alertsList');
  const alerts = loggedInAgent.alerts || [];
  alerts.forEach(alert => {
    const alertItem = document.createElement('li');
    alertItem.classList.add('alert-item');
    alertItem.textContent = alert;
    alertsList.appendChild(alertItem);
  });

  // Upcoming Missions
  const upcomingMissionsList = document.getElementById('upcomingMissionsList');
  const upcomingMissions = loggedInAgent.upcomingMissions || [];
  upcomingMissions.forEach(mission => {
    const missionItem = document.createElement('li');
    missionItem.textContent = `${mission.name} - Deadline: ${mission.deadline}`;
    upcomingMissionsList.appendChild(missionItem);
  });

  // Create Performance Chart
  const ctx = document.getElementById('performanceChart').getContext('2d');
  const performanceChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mission Success', 'Mission Failure', 'Pending Missions'],
      datasets: [{
        label: 'Mission Status',
        data: [
          loggedInAgent.missionSuccessRate || 0, // Success Rate
          loggedInAgent.missionFailureRate || 0, // Failure Rate
          loggedInAgent.pendingMissions || 0,    // Pending Missions
        ],
        backgroundColor: ['#4caf50', '#f44336', '#ffeb3b'],
        borderColor: ['#388e3c', '#d32f2f', '#fbc02d'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 10
          }
        }
      }
    }
  });
} else {
  // If no agent is logged in, redirect to login
  window.location.href = 'login.html';
}

// Sidebar Toggle Functionality
document.getElementById('sidebarToggle').addEventListener('click', function () {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');

  // Toggle the sidebar visibility using class manipulation for smooth transition
  sidebar.classList.toggle('expanded');
  mainContent.classList.toggle('expanded');
});

// Function to handle logout
function logout() {
  // Clear session storage and redirect to login page (simulate logout)
  sessionStorage.removeItem('loggedInAgent');
  window.location.href = 'login.html';
}
