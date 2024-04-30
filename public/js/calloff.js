const callOffHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const schedule_id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/schedules/${schedule_id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace(`/schedule`);
      } else {
        alert('Failed to delete comment');
      }
    }
  };

  const callOffRequestHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      //const schedule_id = event.target.getAttribute('data-id');
      const row = event.target.closest('tr');
    
      // Get the data from the cells of the row
      const schedule_id = row.querySelector('th').innerText;
      const date_created = row.querySelector('td:nth-child(2)').innerText;
      const start_time = row.querySelector('td:nth-child(3)').innerText;
      const end_time = row.querySelector('td:nth-child(4)').innerText;
  
      const response = await fetch(`/api/calloff/request`, {
        method: 'POST',
        body: JSON.stringify({ schedule_id, date_created, start_time, end_time }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/schedule`);
      } else {
        alert('Failed to Request Call off');
      }
    }
  };


document
.querySelector('.schedule-list')
.addEventListener('click', callOffRequestHandler);