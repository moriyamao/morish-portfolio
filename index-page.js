
      document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const form = e.target;
        const button = form.querySelector('button[type="submit"]');
        if (button.disabled) return; // guards against double-fast-submit
        button.disabled = true;
        const originalLabel = button.textContent;
        button.textContent = 'Sending…';
        const status = document.getElementById('formStatus');
        const data = new FormData(form);
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data).toString()
        })
        .then(() => {
          status.textContent = "Sent — thanks, I'll get back to you soon.";
          status.style.color = 'var(--teal)';
          form.reset();
        })
        .catch(() => {
          status.textContent = "Something went wrong — try again, or just email me directly.";
          status.style.color = '#B04A3F';
        })
        .finally(() => {
          button.disabled = false;
          button.textContent = originalLabel;
        });
      });
    