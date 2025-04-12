document.addEventListener('DOMContentLoaded', () => {
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
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const darkIcon = document.getElementById('darkIcon');
    const lightIcon = document.getElementById('lightIcon');
    
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
    

    const participantCountInput = document.getElementById('participantCount');
    const clientEnterpriseRadio = document.getElementById('clientEnterprise');
    const clientStudentRadio = document.getElementById('clientStudent');
    const serviceRadios = document.querySelectorAll('.service-radio');
    const workshopRadios = document.querySelectorAll('.workshop-radio');
    const restaurationCheckboxes = document.querySelectorAll('.service-checkbox');
    const totalPriceElement = document.getElementById('totalPrice');
    const totalParticipantsElement = document.getElementById('totalParticipants');
    const grandTotalElement = document.getElementById('grandTotal');
    const enterprisePrices = document.querySelectorAll('.enterprise-price');
    const studentPrices = document.querySelectorAll('.student-price');
    const participantNotice = document.getElementById('participantNotice');
    
    // Team Building radio button (for restriction)
    const teamBuildingRadio = document.querySelector('input[name="serviceType"][value="3500"]');
    // Calculate price function
    function calculatePrice() {
    let basePrice = 0;
    const participants = parseInt(participantCountInput.value);
    
    // Check if participants are less than 10 and team building is selected
    if (participants < 10 && teamBuildingRadio.checked) {
        // Show warning or switch to another service
        alert("Le service Team Building nécessite au moins 10 participants. Veuillez choisir un autre service ou augmenter le nombre de participants.");
        // Select another service option
        document.querySelector('input[name="serviceType"][value="2000"]').checked = true;
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
    
    // Add restauration options
    restaurationCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
        basePrice += parseInt(checkbox.value);
        }
    });
    
    // Apply student discount if applicable
    if (clientStudentRadio.checked) {
        basePrice = basePrice * 0.8; // 20% discount
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
    
    restaurationCheckboxes.forEach(checkbox => {
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
    document.getElementById('calculateBtn').addEventListener('click', calculatePrice);
    
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