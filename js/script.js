// Alternar modo oscuro
const toggleBtn = document.querySelector('.toggle-btn');
const themeIcon = document.getElementById('theme-icon');

// Función para aplicar el tema
function applyTheme(theme) {
    document.body.dataset.theme = theme;
    if (theme === 'dark') {
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
    } else {
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
    }
}

// Cargar el tema guardado al iniciar
const savedTheme = localStorage.getItem('theme') || ''; // Por defecto, modo claro
applyTheme(savedTheme);

// Alternar tema al hacer clic
toggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.dataset.theme === 'dark' ? '' : 'dark';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme); // Guardar la preferencia
});

// Menú hamburguesa
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');
menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuIcon.innerHTML = navLinks.classList.contains('active') ? "<i class='bx bx-x'></i>" : "<i class='bx bx-menu'></i>";
});

// Contadores
const counters = document.querySelectorAll('.counter-number');
function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const speed = 50; 
    const increment = target / speed;

    const updateCount = () => {
        count += increment;
        if (count < target) {
            counter.textContent = Math.ceil(count);
            requestAnimationFrame(updateCount);
        } else {
            counter.textContent = target;
        }
    };
    updateCount();
}

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target); // Anima solo una vez
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counter.textContent = '0'; 
    observer.observe(counter);
});

// Manejo del formulario de contacto
const contactForm = document.getElementById('contact-form');
const spinner = document.querySelector('.spinner');
const submitBtn = document.querySelector('.submit-btn');
const successModal = document.getElementById('success-modal');
const closeModalBtn = document.querySelector('.close-btn');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Mostrar spinner y deshabilitar botón
        spinner.style.display = 'block';
        submitBtn.disabled = true;

        // Simular envío (reemplaza esto con tu lógica real de envío)
        setTimeout(() => {
            // Ocultar spinner y mostrar modal
            spinner.style.display = 'none';
            submitBtn.disabled = false;
            successModal.style.display = 'flex';

            // Limpiar formulario
            contactForm.reset();
        }, 2000); // Simula 2 segundos de "envío"
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        successModal.style.display = 'none';
    });
}

// Cerrar modal al hacer clic fuera
window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.style.display = 'none';
    }
});

// Manejo del toggle de precios
const planToggle = document.getElementById('plan-toggle');
const pricingTable = document.getElementById('pricing-table');

if (planToggle && pricingTable) {
    planToggle.addEventListener('change', () => {
        if (planToggle.checked) {
            pricingTable.classList.remove('monthly');
            pricingTable.classList.add('annual');
        } else {
            pricingTable.classList.remove('annual');
            pricingTable.classList.add('monthly');
        }
    });

    // Establecer estado inicial
    pricingTable.classList.add('monthly');
}

