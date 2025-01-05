// Handle Agent Login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const agentId = document.getElementById('agentId').value;
    const password = document.getElementById('password').value;
  
    // Fetch agent data from the JSON file (you can later load the data dynamically from a backend)
    fetch('agents.json')
      .then(response => response.json())
      .then(agents => {
        // Find the agent with the provided ID and password
        const agent = agents.find(agent => agent.agentId === agentId && agent.password === password);
  
        if (agent) {
          // If agent found, store data in session storage and redirect
          sessionStorage.setItem('loggedInAgent', JSON.stringify(agent));
          window.location.href = 'personal-details.html';
        } else {
          // If agent not found, show error message
          alert('Invalid Agent ID or Password');
        }
      })
      .catch(error => console.log('Error loading agent data:', error));
  });
  
  // Handling the Personal Details Page (When agent is logged in)
  const loggedInAgent = JSON.parse(sessionStorage.getItem('loggedInAgent'));
  
  if (loggedInAgent) {
    // Populate the personal details page with agent information
    if (window.location.pathname.includes("personal-details.html")) {
      document.getElementById('agentId').textContent = loggedInAgent.agentId;
      document.getElementById('name').textContent = loggedInAgent.name;
      document.getElementById('rank').textContent = loggedInAgent.rank;
      document.getElementById('missionAssigned').textContent = loggedInAgent.missionAssigned;
      document.getElementById('lastLogin').textContent = loggedInAgent.lastLogin;
      document.getElementById('status').textContent = loggedInAgent.status;
    }
  } else {
    // If no agent is logged in, redirect back to the login page
    if (window.location.pathname.includes("personal-details.html")) {
      window.location.href = 'login.html';
    }
  }
  
  // Logout function to clear session storage
  function logout() {
    sessionStorage.removeItem('loggedInAgent');
    window.location.href = 'login.html';
  }
  