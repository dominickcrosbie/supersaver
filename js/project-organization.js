document.addEventListener('DOMContentLoaded', function () {
    const sprints = [
      { id: 1, number: 'API Dev #1', startDate: '2025-07-01', endDate: '2025-07-06', goals: 'Travel (60k) API Integration' },
      { id: 1, number: 'API Dev #2', startDate: '2025-07-01', endDate: '2025-07-06', goals: 'Retail (20k) API Integration' },
      { id: 2, number: 'UI Dev #1', startDate: '2025-07-08', endDate: '2025-07-11', goals: 'Long Term Forecast Dashboard' },
      { id: 2, number: 'UI Dev #1', startDate: '2025-07-11', endDate: '2025-07-13', goals: 'High Winds Dashboard' },
      { id: 2, number: 'API Dev #1', startDate: '2025-07-08', endDate: '2025-07-13', goals: 'Retail (100k) API Integration' },
      { id: 2, number: 'API Dev #2', startDate: '2025-07-08', endDate: '2025-07-13', goals: 'Retail (100k) API Integration' },
      { id: 3, number: 'UI Dev #1', startDate: '2025-07-16', endDate: '2025-07-17', goals: 'High Winds Dashboard' },
      { id: 3, number: 'UI Dev #1', startDate: '2025-07-17', endDate: '2025-07-20', goals: 'Comprehensive Report Dashboard' },
      { id: 3, number: 'UI Dev #1', startDate: '2025-07-20', endDate: '2025-07-21', goals: 'Snow Warning Dashboard' },
      { id: 3, number: 'API Dev #1', startDate: '2025-07-16', endDate: '2025-07-17', goals: 'Travel (60k) Training' },
      { id: 3, number: 'API Dev #2', startDate: '2025-07-16', endDate: '2025-07-17', goals: 'Retail (25k) Training' },
      { id: 3, number: 'API Dev #2', startDate: '2025-07-17', endDate: '2025-07-21', goals: 'Travel (60k) Testing and Release' },
      { id: 3, number: 'API Dev #1', startDate: '2025-07-17', endDate: '2025-07-21', goals: 'Travel (60k) Testing and Release' },
      { id: 4, number: 'UI Dev #1', startDate: '2025-07-20', endDate: '2025-07-22', goals: 'Snow Warning Dashboard' },
      { id: 4, number: 'UI Dev #1', startDate: '2025-07-22', endDate: '2025-07-25', goals: 'Historic Weather Dashboard' },
      { id: 4, number: 'API Dev #2', startDate: '2025-07-20', endDate: '2025-07-25', goals: 'Retail (25k) Testing and Release' },
      { id: 4, number: 'API Dev #2', startDate: '2025-07-20', endDate: '2025-07-25', goals: 'Travel (25k) Testing and Release' },
      { id: 5, number: 'UI Dev #1', startDate: '2025-07-27', endDate: '2025-07-30', goals: 'City Rainfall Dashboard' },
      { id: 5, number: 'API Dev #1', startDate: '2025-07-30', endDate: '2025-07-31', goals: 'Retail (100k) Training' },
      { id: 5, number: 'API Dev #2', startDate: '2025-07-27', endDate: '2025-07-31', goals: 'Retail (100k) Testing and Release' },
      { id: 5, number: 'API Dev #1', startDate: '2025-07-27', endDate: '2025-08-03', goals: 'Retail (100k) Testing and Release' }
    ];

    function getTimeline(sprints) {
      const dateSet = new Set();
      sprints.forEach(s => {
        let current = new Date(s.startDate);
        const end = new Date(s.endDate);
        while (current <= end) {
          dateSet.add(current.toISOString().split('T')[0]);
          current.setDate(current.getDate() + 1);
        }
      });
      return Array.from(dateSet).sort();
    }

    function getBurndownData(timeline) {
      const maxWork = 100;
      const decrement = maxWork / timeline.length;
      return timeline.map((_, i) => Math.round(maxWork - i * decrement));
    }

    function getResourceData(sprints) {
      const allocation = {};
      sprints.forEach(s => {
        const dev = s.number.split(' ')[0];
        const start = new Date(s.startDate);
        const end = new Date(s.endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        allocation[dev] = (allocation[dev] || 0) + days;
      });
      return allocation;
    }

    const timeline = getTimeline(sprints);
    const burndownData = getBurndownData(timeline);

    new Chart(document.getElementById('burndownChart'), {
      type: 'line',
      data: {
        labels: timeline,
        datasets: [{
          label: 'Remaining Work (%)',
          data: burndownData,
          borderColor: 'crimson',
          fill: false,
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Burndown Chart' }
        }
      }
    });

    const resource = getResourceData(sprints);

    new Chart(document.getElementById('resourceChart'), {
      type: 'bar',
      data: {
        labels: Object.keys(resource),
        datasets: [{
          label: 'Total Days Assigned',
          data: Object.values(resource),
          backgroundColor: 'steelblue'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Resource Allocation' }
        },
        scales: { y: { beginAtZero: true } }
      }
    });

    const tableBody = document.getElementById('sprintTableBody');
    sprints.forEach(sprint => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>Sprint ${sprint.id}</td>
        <td>${sprint.number}</td>
        <td>${sprint.startDate}</td>
        <td>${sprint.endDate}</td>
        <td>${sprint.goals}</td>
      `;
      tableBody?.appendChild(row);
    });
  });
