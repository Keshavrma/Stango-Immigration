/**
 * STANGO IMMIGRATION & CLOTHING - MAIN INTERACTIVE SCRIPT
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking nav links on mobile
    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Assessment / Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Retrieve form elements
      const nameInput = document.getElementById('name');
      const phoneInput = document.getElementById('phone');
      const ageInput = document.getElementById('age');
      const stateInput = document.getElementById('state');
      const emailInput = document.getElementById('email');
      const submitBtn = contactForm.querySelector('.btn-submit-form') || contactForm.querySelector('button[type="submit"]');

      // Basic Validation
      const ageVal = parseInt(ageInput ? ageInput.value.trim() : '0', 10);
      if (ageInput && (isNaN(ageVal) || ageVal < 16 || ageVal > 99)) {
        alert('Please enter a valid age between 16 and 99.');
        ageInput.focus();
        return;
      }

      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const cleanPhone = phoneVal.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 7) {
        alert('Please enter a valid phone number (at least 7 to 10 digits).');
        phoneInput.focus();
        return;
      }

      if (stateInput && !stateInput.value) {
        alert('Please select your state.');
        stateInput.focus();
        return;
      }

      // UI Feedback - Button state
      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Submit form';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor"></path>
          </svg>
          Submitting...
        `;
      }

      // Submit via FormSubmit.co endpoint using AJAX
      const formData = new FormData(contactForm);
      const actionUrl = contactForm.getAttribute('action') || 'https://formsubmit.co/ajax/stango.marketing@gmail.com';
      const endpoint = actionUrl.replace('formsubmit.co/', 'formsubmit.co/ajax/');

      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const userName = nameInput ? nameInput.value.trim() : 'Applicant';
        const userState = stateInput ? stateInput.options[stateInput.selectedIndex].text : '';

        if (formAlert) {
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div>
              <strong>Thank you, ${userName}!</strong> Your inquiry from <strong>${userState || 'your state'}</strong> has been received. Our immigration consultant will contact you via phone shortly.
            </div>
          `;
          formAlert.style.display = 'flex';
          formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          alert(`Thank you, ${userName}! Your consultation request has been received. We will contact you at ${phoneVal} shortly.`);
        }

        contactForm.reset();
      })
      .catch(function (error) {
        console.error('FormSubmit error:', error);
        // Fallback standard submit if fetch fails or blocked
        contactForm.submit();
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }
      });
    });
  }

  // 3. Sync Store Cart Count across all pages
  function syncNavCartCount() {
    try {
      const stored = localStorage.getItem('stango_clothing_cart');
      if (stored) {
        const items = JSON.parse(stored);
        const total = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
        document.querySelectorAll('.cart-count-pill').forEach(pill => {
          pill.textContent = total;
        });
      }
    } catch (e) {
      console.error('Cart sync error:', e);
    }
  }

  syncNavCartCount();
});
