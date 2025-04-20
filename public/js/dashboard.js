document.querySelector('#Statistics').addEventListener('click', async function (e) {
  const target = e.target.closest('button');
  if (!target) return;

  // Copy URL logic
  if (target.classList.contains('copy')) {
    const shortId = target.getAttribute('data-url');
    const fullURL = `${window.location.origin}/url/${shortId}`;
    try {
      await navigator.clipboard.writeText(fullURL);
      showPopover(target, 'Copied!', 'copy-success');
    } catch (err) {
      console.error('Failed to copy: ', err);
      showPopover(target, 'Copy failed', 'copy-failed');
    }
  }

  // Delete URL logic
  else if (target.classList.contains('delete')) {
    const id = target.getAttribute('data-id');
    try {
      const response = await fetch(`${window.location.origin}/url/${id}`, { method: 'DELETE' });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Failed to delete URL');
      }
    } catch (error) {
      console.error('Error deleting URL:', error);
    }
  }
});

function showPopover(button, message, statusClass) {
  const popover = new bootstrap.Popover(button, { content: message, trigger: 'manual' });
  button.classList.add(statusClass);
  popover.show();
  setTimeout(() => {
    popover.hide();
    button.classList.remove(statusClass);
    button.disabled = false;
  }, 2000);
}
