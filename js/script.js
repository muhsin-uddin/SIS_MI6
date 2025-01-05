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
          // If agent found, store data in session storage and redirect to dashboard
          sessionStorage.setItem('loggedInAgent', JSON.stringify(agent));
          window.location.href = 'dashboard.html';  // Redirect to Dashboard after login
        } else {
          // If agent not found, show error message
          alert('Invalid Agent ID or Password');
        }
      })
      .catch(error => console.log('Error loading agent data:', error));
  });
  