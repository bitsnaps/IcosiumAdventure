document.addEventListener('DOMContentLoaded', async () => {

    const STUDENT_DISCOUNT = 0.8; // 20% discount

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const darkIcon = document.getElementById('darkIcon');
    const lightIcon = document.getElementById('lightIcon');
    // Price calculation variables
    const participantCountInput = document.getElementById('participantCount');
    const clientEnterpriseRadio = document.getElementById('clientEnterprise');
    const clientStudentRadio = document.getElementById('clientStudent');
    const serviceRadios = document.querySelectorAll('.service-radio');
    const workshopRadios = document.querySelectorAll('.workshop-radio');
    const restaurantCheckboxes = document.querySelectorAll('.service-checkbox');
    const totalPriceElement = document.getElementById('totalPrice');
    const totalParticipantsElement = document.getElementById('totalParticipants');
    const grandTotalElement = document.getElementById('grandTotal');
    const taxNotice = document.getElementById('taxNotice');
    const enterprisePrices = document.querySelectorAll('.enterprise-price');
    const studentPrices = document.querySelectorAll('.student-price');
    const participantNotice = document.getElementById('participantNotice');
    const calculateBtn = document.getElementById('calculateBtn');
    // Handle form submission
    const contactForm = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');
    const submitButton = document.getElementById('submitButton');
    const currentTimestamp = document.getElementById('form_timestamp');
    const token = document.getElementById('csrf_token');

    // Mobile menu toggle
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    
    if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const $target = document.getElementById(target);
                
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }

    // Check for saved theme preference only
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'inline';
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Toggle icons
        if (document.body.classList.contains('dark-mode')) {
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'inline';
        localStorage.setItem('theme', 'dark');
        } else {
        darkIcon.style.display = 'inline';
        lightIcon.style.display = 'none';
        localStorage.setItem('theme', 'light');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Team Building radio button (for restriction)
    const teamBuildingRadio = document.querySelector('input[name="serviceType"][id="team-building"]');

    function getElementName(inputElement) {
        let elementName = inputElement.parentElement.textContent.trim();
        return elementName.substring(0, elementName.indexOf('('));
    }
    // Function to generate quote summary
    function updateQuoteSummary() {
        // Get client type
        const clientType = clientEnterpriseRadio.checked ? clientEnterpriseRadio.value : clientStudentRadio.value;

        // Apply discount for student
        let discountRate = 1;
        if (clientType === clientStudentRadio.value) {
            discountRate = STUDENT_DISCOUNT;
        }

        // Get selected service
        let selectedService = '';
        serviceRadios.forEach(radio => {
            if (radio.checked) {
                selectedService = getElementName(radio) + ' (' + (radio.value * discountRate) + ' DA)';
            }
        });

        // Get selected workshop
        let selectedWorkshop = '';
        workshopRadios.forEach(radio => {
            if (radio.checked) {
                selectedWorkshop = getElementName(radio) + '(' + (radio.value * discountRate) +'DA)';
            }
        });

        // Get selected restaurant options
        let selectedRestaurant = [];
        restaurantCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedRestaurant.push(
                    // No discount for students
                    getElementName(checkbox) + '(' + checkbox.value + 'DA)'
                );
            }
        });

        // Create summary text
        window.quoteSummary = `
REQ #${currentTimestamp.value}:
-------------------
Client: ${clientType}
Nbr participants: ${participantCountInput.value}
Service: ${selectedService}
Workshop: ${selectedWorkshop}
Restaurant: ${selectedRestaurant.length > 0 ? selectedRestaurant.join('+ ') : 'NA'}
-------------------
Unit.: ${totalPriceElement.textContent} DA
x ${participantCountInput.value}
= Total: ${grandTotalElement.textContent} DA

${taxNotice.textContent}

`;
    }

    // Calculate price function
    function calculatePrice() {
        let basePrice = 0;
        const participants = parseInt(participantCountInput.value);
        
        // Check if participants are less than 10 and team building is selected
        if (participants < 10 && teamBuildingRadio.checked) {
            // Select another service option
            document.querySelectorAll('input[name="serviceType"]')[0].checked = true;
            teamBuildingRadio.checked = false;
        }
        
        // Add selected service price
        serviceRadios.forEach(radio => {
            if (radio.checked) {
                basePrice += parseInt(radio.value);
            }
        });
        
        // Add selected workshop price
        workshopRadios.forEach(radio => {
            if (radio.checked) {
                basePrice += parseInt(radio.value);
            }
        });
        
        // Add restaurant options
        restaurantCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                basePrice += parseInt(checkbox.value);
            }
        });
        
        // Apply student discount if applicable
        if (clientStudentRadio.checked) {
            basePrice = basePrice * STUDENT_DISCOUNT;
        }
        
        // Update price display
        totalPriceElement.textContent = Math.round(basePrice);
        totalParticipantsElement.textContent = participants;
        grandTotalElement.textContent = Math.round(basePrice * participants);
        
        // Show participant notice for less than 10 participants
        if (participants < 10) {
            participantNotice.style.display = 'block';
            teamBuildingRadio.disabled = true;
            teamBuildingRadio.parentElement.classList.add('has-text-grey-light');
        } else {
            participantNotice.style.display = 'none';
            teamBuildingRadio.disabled = false;
            teamBuildingRadio.parentElement.classList.remove('has-text-grey-light');
        }
        // Update the quote summary for potential sending
        updateQuoteSummary();
    }
    

    // Add a summmary to the message
    function placeSummary() {
            // Scroll to contact form
            const contactSection = document.querySelector('#contactForm');
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Wait for scroll to complete before focusing on the form
            setTimeout(() => {
                // Pre-fill the message field with the quote summary
                const messageField = document.getElementById('message');
                if (messageField) {
                    messageField.value = window.quoteSummary;
                }
                
                // Focus on the name field to prompt user to complete the form
                const nameField = document.getElementById('name');
                if (nameField) {
                    nameField.focus();
                }
                
                // Add a notification to guide the user
                const statusMessage = document.getElementById('statusMessage');
                if (statusMessage) {
                    statusMessage.textContent = 'Veuillez compléter vos informations pour envoyer ce devis';
                    statusMessage.className = 'notification is-info is-light mt-4';
                    statusMessage.style.display = 'block';
                    
                    // Hide the notification after 5 seconds
                    setTimeout(() => {
                        statusMessage.style.display = 'none';
                    }, 5000);
                }
            }, 800);
    }

    // Event listeners
    participantCountInput.addEventListener('input', calculatePrice);
    clientEnterpriseRadio.addEventListener('change', togglePriceDisplay);
    clientStudentRadio.addEventListener('change', togglePriceDisplay);
    
    serviceRadios.forEach(radio => {
        radio.addEventListener('change', calculatePrice);
    });
    
    workshopRadios.forEach(radio => {
        radio.addEventListener('change', calculatePrice);
    });
    
    restaurantCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculatePrice);
    });
    
    // Toggle price display based on client type
    function togglePriceDisplay() {
    if (clientStudentRadio.checked) {
        enterprisePrices.forEach(el => el.style.display = 'none');
        studentPrices.forEach(el => el.style.display = 'inline');
    } else {
        enterprisePrices.forEach(el => el.style.display = 'inline');
        studentPrices.forEach(el => el.style.display = 'none');
    }
        calculatePrice();
    }

    // Add event listeners for price calculation
    clientEnterpriseRadio.addEventListener('change', calculatePrice);
    clientStudentRadio.addEventListener('change', calculatePrice);
    participantCountInput.addEventListener('change', calculatePrice);

    // Calculate the price then place the summary
    calculateBtn.addEventListener('click', function () {
        calculatePrice();
        placeSummary();
    });
    
    // Add listeners to all service checkboxes using class selector
    document.querySelectorAll('.service-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', calculatePrice);
    });
    
    // Add listeners to all workshop checkboxes
    document.querySelectorAll('.workshop-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', calculatePrice);
    });
    
    // Initial calculation
    calculatePrice();

    const resetForm = async () => {
        currentTimestamp.value = Date.now();
        try {
            const response = await fetch(`/csrf?ts=${currentTimestamp.value}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.secret) {
                token.value = `${data.secret}.${data.stamp}`;
                submitButton.disabled = false;
            } else {
                throw new Error("Secret not found in response.");
            }
        } catch (error) {
            console.error("Failed to fetch CSRF secret:", error);
            statusMessage.textContent = 'Error initializing form security. Please refresh.';
            statusMessage.className = 'notification is-danger is-light mt-4';
            statusMessage.style.display = 'block';
        }
    };
    
    if (currentTimestamp && token) {
        resetForm();
    }

    if (contactForm && statusMessage) {
      contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        const formData = new FormData(contactForm);
        // const payload = JSON.stringify(Object.fromEntries(formData.entries())); // Send JSON data
        const payload = new URLSearchParams(formData); // Send as URL-encoded data

        statusMessage.textContent = 'Sending...'; // Indicate processing
        statusMessage.className = 'notification is-info is-light mt-4';
        statusMessage.style.display = 'block';

        fetch(contactForm.action, {
          method: contactForm.method,
          headers: {
            // 'Content-Type': 'application/json', // Send JSON data
            'Content-Type': 'application/x-www-form-urlencoded', // Send form-data
            'x-csrf-token': `${token.value}-${Date.now()}`
          },
          body: payload
        })
        .then(response => {
          if (!response.ok) {
            return response.text().then((data) => {
                const message = JSON.parse(data)['message'];
                statusMessage.textContent = message || 'Error sending message. Please try again.';
                statusMessage.className = 'notification is-danger is-light mt-4';
                statusMessage.style.display = 'block';
                throw new Error(message || `HTTP error! Status: ${response.status}`);
            });
          }
          return response.text(); // Expecting a success message text
        })
        .then(async (data) => {
          statusMessage.textContent = JSON.parse(data)['message'] || 'Message sent successfully!'; // Show success message
          statusMessage.className = 'notification is-success is-light mt-4';
          statusMessage.style.display = 'block';
          contactForm.reset(); // Clear the form
          // Re-set timestamp for potential next submission
          if (currentTimestamp) {
            resetForm();
          }
        })
        .catch(error => {
          console.error('Form submission error:', error);
          statusMessage.textContent = `Error: ${error.message || 'Could not send message. Please try again.'}`; // Show error
          statusMessage.className = 'notification is-danger is-light mt-4';
          statusMessage.style.display = 'block';
        });
      });
    }

    // Go to top functionality
    const goToTopButton = document.getElementById('go-to-top');

    // Show button when user scrolls down 300px from the top
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            goToTopButton.style.display = 'block';
        } else {
            goToTopButton.style.display = 'none';
        }
    });
    
    // Smooth scroll to top when button is clicked
    goToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
