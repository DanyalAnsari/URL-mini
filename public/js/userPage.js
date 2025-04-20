// Chart.js example (dummy data)
(() => {
  'use strict'
  const ctx = document.getElementById('myChart');
  if (ctx && window.Chart) {
    // eslint-disable-next-line no-unused-vars
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        datasets: [{
          data: [
            15339,
            21345,
            18483,
            24003,
            23489,
            24092,
            12034
          ],
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            boxPadding: 3
          }
        }
      }
    });
  }
})();

// Copy button logic
const copyButtons = document.querySelectorAll('.copy');
copyButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const shortId = button.getAttribute('data-url');
    const fullURL = `${window.location.origin}/${shortId}`;
    navigator.clipboard.writeText(fullURL).then(() => {
      alert('Copied: ' + fullURL);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  });
});
