// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scroll para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Manejar el botón CTA
    const ctaButton = document.getElementById('cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert('¡Gracias por tu interés! Pronto nos pondremos en contacto contigo.');
            
            // Efecto visual en el botón
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Manejar el formulario de contacto
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validación básica
            if (name && email && message) {
                // Simular envío del formulario
                console.log('Formulario enviado:', { name, email, message });
                
                // Mostrar mensaje de éxito
                alert('¡Mensaje enviado con éxito! Te contactaremos pronto.');
                
                // Limpiar el formulario
                contactForm.reset();
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }

    // Efecto de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar efecto a las secciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(26, 26, 46, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                header.style.background = 'var(--dark)';
                header.style.backdropFilter = 'none';
                header.style.boxShadow = 'none';
            }
        }
    });

    // Contador de visitas
    let visitCount = localStorage.getItem('moviguiaVisitCount') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('moviguiaVisitCount', visitCount);
    
    console.log(`Visitas a Moviguia: ${visitCount}`);

    // Efectos hover mejorados para tarjetas
    document.addEventListener('mouseover', function(e) {
        const routeCard = e.target.closest('.route-card');
        if (routeCard) {
            routeCard.style.transform = 'translateY(-8px) scale(1.02)';
        }
    });

    document.addEventListener('mouseout', function(e) {
        const routeCard = e.target.closest('.route-card');
        if (routeCard) {
            routeCard.style.transform = 'translateY(0) scale(1)';
        }
    });

    // Variables para el carrusel
    let currentSlide = 0;
    let carouselInterval;

    // Array de imágenes del carrusel
    const carouselImages = [
        {
            url: "https://machupicchuviajesperu.com/wp-content/uploads/2024/04/image-6.png",
            title: "Plaza de Armas del Cusco",
            caption: "Corazón histórico de la ciudad imperial"
        },
        {
            url: "https://takeanadventureblog.wordpress.com/wp-content/uploads/2016/12/img_9658.jpg",
            title: "Óvalo Pachacútec",
            caption: "Importante intersección vial en el centro de Cusco",
            position: "top center"
        },
        {
            url: "https://www.defensoria.gob.pe/wp-content/uploads/2022/11/unsaac-cusco.jpg",
            title: "UNSAAC",
            caption: "Universidad Nacional de San Antonio Abad del Cusco"
        },
        {
            url: "https://e.rpp-noticias.io/xlarge/2023/12/21/243524_1516370.webp",
            title: "UAC",
            caption: "Universidad Andina del Cusco"
        },
        {
            url: "https://resources.krowdy.com/krowdy/portales/bolsas/continental/25653-continental.jpeg",
            title: "UC",
            caption: "Universidad Continental"
        },
        {
            url: "https://www.enigmaperu.com/blog/wp-content/uploads/2023/07/Cusco-2.jpg",
            title: "Vista Panorámica de Cusco",
            caption: "Panorámica de la ciudad imperial desde las alturas"
        }
    ];

    // Datos completos de todas las rutas
    const todasLasRutas = [
        { 
            id: 1, 
            numero: "RTU-01", 
            nombre: "Patrón de San Jerónimo", 
            tiempo: "25-35 min", 
            tarifa: "S/ 1.00", 
            color: 'san-jeronimo',
            paradas: [
                "Peaje", "Encantada", "Quinta", "Universidad Andina", "Entrada Collana",
                "Puente Huacoto", "Kayra", "Forestal", "Tapia", "Posta", "Romeritos",
                "Tercer Paradero", "Farmacia", "Medio", "Mercado Vinocanchon", "Control",
                "San Juan", "Penal", "Miraflores", "San Martin", "Aprovite", "Tingo",
                "Telefono", "Grifo Movil", "Puente Tupac Amaru", "Cachimayo", "Enaco",
                "Sol De Oro", "San Miguel", "Mercadillo", "Santa Rosa", "Camionero",
                "Septimo Paradero De San Sebastian", "Sexto Paradero De San Sebastian",
                "Quinto Paradero De San Sebastian", "Cuarto Paradero De San Sebastian",
                "Tercer Paradero De San Sebastian", "Segundo Paradero De San Sebastian",
                "Callejon", "Primer Paradero De San Sebastian", "Santa Úrsula",
                "Marcavalle", "Magisterio", "Seminario", "Prado", "Hospital Regional",
                "Puerta Unsaac", "Amauta", "Servicentro", "Garcilaso", "Clorinda Matto",
                "Mercado Wanchaq", "Paccha", "Paacha", "Estacion", "Gradas", "Grau",
                "Belén", "Puente Belén", "Paraiso", "Puente Santiago", "Plaza Santiago",
                "Colegio Fe Y Alegría", "Entrada Zarzuela", "Jose Manuvera, 6611",
                "Puente Zarzuela", "Esquina", "Libertad", "Desvio", "Colegio",
                "Mercado De Huancaro", "Puerto", "Esquina", "Salcantay", "Puente",
                "Grifo", "Subida", "Primero", "Segundo", "Reservorio", "Cuarto",
                "Quinto", "Sexto", "Septimo", "Octavo", "Final Cachona"
            ]
        },
        { 
            id: 2, 
            numero: "RTU-02", 
            nombre: "Satélite", 
            tiempo: "20-30 min", 
            tarifa: "S/ 1.00",
            color: 'satelite',
            paradas: [
                "Cll S/N. - Apv. Kantu (Pto Final)",
                "Paraderosat",
                "Arco Tica Tica",
                "Paradero",
                "Reservorio",
                "Huanca",
                "Huasa Huara",
                "Posta",
                "Grifo Tica Tica",
                "Cruce",
                "Huertos",
                "Chosas",
                "Paradero",
                "Chinchero",
                "Gradas",
                "San Benito",
                "Humberto Vidal Unda, 535",
                "Humberto Vidal Unda, 1262",
                "Humberto Vidal Unda, 1223",
                "De La Raza, 981",
                "Plazoleta Santa Ana",
                "Avenida Abancay, 41",
                "Arcopata",
                "Esquina Arcopata",
                "Meloc",
                "Arones",
                "Plaza San Francisco",
                "Mezon De La Estrella",
                "Matara",
                "Matara",
                "Ayacucho",
                "Qoricancha",
                "Correo",
                "Avenida El Sol, 1010",
                "Estacion",
                "Confraternidad",
                "Cruce Andina",
                "Ovalo Pachacuteq",
                "Cruce",
                "Primero",
                "Segundo Antiguo",
                "Segundo Puente",
                "Mercado De Ttio",
                "Espinar",
                "Segundo Huayruropata",
                "Seguro",
                "Anselmo Alvarez, 402",
                "Avenida Los Incas, 900",
                "Universidad San Antonio Abad",
                "Hospital Regional",
                "Manuel Prado",
                "Seminario",
                "Magisterio",
                "Marcavalle",
                "Santa Úrsula",
                "Primer Paradero De San Sebastian",
                "Callejon",
                "Segundo Paradero De San Sebastian",
                "Tercer Paradero De San Sebastián",
                "Cuarto Paradero De San Sebastián",
                "Quinto Paradero De San Sebastian",
                "Sexto Paradero De San Sebastián",
                "Séptimo Paradero De San Sebastián",
                "Camionero",
                "Santa Rosa",
                "Mercadillo",
                "San Miguel",
                "Sol De Oro",
                "Enaco",
                "Cachimayo",
                "Puente",
                "Grifo",
                "Universidad Andina",
                "Telefono",
                "Tingo",
                "Aprovite",
                "San Martin",
                "Miraflores",
                "Penal",
                "San Juan",
                "Control",
                "Primero"
            ]
        },
        { 
            id: 3, 
            numero: "RTU-04", 
            nombre: "El Dorado", 
            tiempo: "30-40 min", 
            tarifa: "S/ 1.50",
            color: 'dorado',
            paradas: [
                "Terminal El Dorado", "Mercado Central", "Plaza de Armas", 
                "Colegio Sciences", "Hospital Regional", "Universidad UAC",
                "Óvalo Pachacútec", "Urb. Magisterio", "Parque de la Madre",
                "Mercado Ttio", "Terminal Terrestre", "Colegio Amauta"
            ]
        },
        { 
            id: 4, 
            numero: "RTU-05", 
            nombre: "Pegaso", 
            tiempo: "25-35 min", 
            tarifa: "S/ 1.00",
            color: 'pegaso',
            paradas: [
                "Base Pegaso", "Av. La Cultura", "Plaza San Francisco", 
                "Mercado San Pedro", "Estación Wanchaq", "UNSAAC",
                "Hospital Regional", "Óvalo Pachacútec", "Urb. Larapa",
                "Colegio Saco Oliveros", "Parque Zonal"
            ]
        },
        { 
            id: 5, 
            numero: "RTU-07", 
            nombre: "Inka express", 
            tiempo: "20-25 min", 
            tarifa: "S/ 1.00",
            color: 'inka-express',
            paradas: [
                "Terminal Inka", "Av. El Sol", "Qoricancha", "Plaza de Armas",
                "Calle Mantas", "Mercado Central", "Colegio Sciences",
                "Municipalidad", "Biblioteca Regional", "Parque Ollantaytambo"
            ]
        },
        { 
            id: 6, 
            numero: "RTU-08", 
            nombre: "Wimpillay", 
            tiempo: "35-45 min", 
            tarifa: "S/ 1.50",
            color: 'wimpillay',
            paradas: [
                "Wimpillay", "Santiago", "Plaza Tupac Amaru", "Av. La Cultura",
                "UNSAAC", "Hospital Regional", "Óvalo Pachacútec",
                "Urb. Magisterio", "Parque de la Madre", "Terminal Terrestre"
            ]
        },
        { 
            id: 7, 
            numero: "RTU-09", 
            nombre: "Liebre", 
            tiempo: "15-25 min", 
            tarifa: "S/ 1.00",
            color: 'liebre',
            paradas: [
                "Base Liebre", "Av. Garcilaso", "Plaza Regocijo", "Mercado San Pedro",
                "Calle del Medio", "Plaza de Armas", "Catedral", "Museo Inka"
            ]
        },
        { 
            id: 8, 
            numero: "RTU-10", 
            nombre: "Columbia", 
            tiempo: "30-40 min", 
            tarifa: "S/ 1.50",
            color: 'columbia',
            paradas: [
                "Columbia", "San Sebastián", "Plaza Tupac Amaru", "Av. La Cultura",
                "UNSAAC", "Hospital Regional", "Óvalo Pachacútec", "Urb. Magisterio"
            ]
        },
        { 
            id: 9, 
            numero: "RTU-11A", 
            nombre: "Nuevo Amanecer", 
            tiempo: "25-35 min", 
            tarifa: "S/ 1.00",
            color: 'nuevo-amanecer',
            paradas: [
                "Nuevo Amanecer", "San Jerónimo", "Plaza de Armas", "Mercado Central",
                "Colegio Sciences", "Hospital Regional", "UNSAAC"
            ]
        },
        { 
            id: 10, 
            numero: "RTU-11B", 
            nombre: "Luis Vallejos Santoni", 
            tiempo: "20-30 min", 
            tarifa: "S/ 1.00",
            color: 'luis-vallejos',
            paradas: [
                "Luis Vallejos", "Santiago", "Plaza Tupac Amaru", "Av. La Cultura",
                "UNSAAC", "Hospital Regional", "Óvalo Pachacútec"
            ]
        },
        { 
            id: 11, 
            numero: "RTU-12", 
            nombre: "Imperial", 
            tiempo: "35-45 min", 
            tarifa: "S/ 1.50",
            color: 'imperial',
            paradas: [
                "Imperial", "San Sebastián", "Plaza Tupac Amaru", "Av. La Cultura",
                "UNSAAC", "Hospital Regional", "Óvalo Pachacútec", "Urb. Magisterio"
            ]
        },
        { 
            id: 12, 
            numero: "RTU-13", 
            nombre: "Tupac Amaru", 
            tiempo: "25-35 min", 
            tarifa: "S/ 1.00",
            color: 'tupac-amaru',
            paradas: [
                "Tupac Amaru", "Santiago", "Plaza Tupac Amaru", "Av. La Cultura",
                "UNSAAC", "Hospital Regional", "Óvalo Pachacútec"
            ]
        },
        { 
            id: 13, 
            numero: "RTU-14", 
            nombre: "El Chaski", 
            tiempo: "20-30 min", 
            tarifa: "S/ 1.00",
            color: 'chaski',
            paradas: [
                "El Chaski", "San Jerónimo", "Plaza de Armas", "Mercado Central",
                "Colegio Sciences", "Hospital Regional", "UNSAAC"
            ]
        },
        { 
            id: 14, 
            numero: "RTU-15", 
            nombre: "Rápidos", 
            tiempo: "15-25 min", 
            tarifa: "S/ 1.00",
            color: 'rapidos',
            paradas: [
                "Base Rápidos", "Av. Garcilaso", "Plaza Regocijo", "Mercado San Pedro",
                "Calle del Medio", "Plaza de Armas", "Catedral"
            ]
        },
        { 
            id: 15, 
            numero: "RTU-16", 
            nombre: "Servicio Rápido", 
            tiempo: "20-30 min", 
            tarifa: "S/ 1.00",
            color: 'servicio-rapido',
            paradas: [
                "Terminal", "Av. El Sol", "Qoricancha", "Plaza de Armas",
                "Calle Mantas", "Mercado Central", "Colegio Sciences"
            ]
        },
        { 
            id: 16, 
            numero: "RTU-17", 
            nombre: "Ttio la Florida", 
            tiempo: "30-40 min", 
            tarifa: "S/ 1.50",
            color: 'ttio-florida',
            paradas: [
                "Ttio", "La Florida", "Plaza Tupac Amaru", "Av. La Cultura",
                "UNSAAC", "Hospital Regional", "Óvalo Pachacútec", "Urb. Magisterio"
            ]
        },
        { 
            id: 17, 
            numero: "RTU-18", 
            nombre: "Correcaminos", 
            tiempo: "25-35 min", 
            tarifa: "S/ 1.00",
            color: 'correcaminos',
            paradas: [
                "Base Correcaminos", "San Jerónimo", "Plaza de Armas", "Mercado Central",
                "Colegio Sciences", "Hospital Regional", "UNSAAC"
            ]
        },
        { 
            id: 18, 
            numero: "RTU-19", 
            nombre: "C4M", 
            tiempo: "20-30 min", 
            tarifa: "S/ 1.00",
            color: 'c4m',
            paradas: [
                "C4M", "Santiago", "Plaza Tupac Amaru", "Av. La Cultura",
                "UNSAAC", "Hospital Regional", "Óvalo Pachacútec"
            ]
        },
        { 
            id: 19, 
            numero: "RTU-20", 
            nombre: "Arco Iris", 
            tiempo: "35-45 min", 
            tarifa: "S/ 1.50",
            color: 'arco-iris',
            paradas: [
                "Arco Iris", "San Sebastián", "Plaza Tupac Amaru", "Av. La Cultura",
                "UNSAAC", "Hospital Regional", "Óvalo Pachacútec", "Urb. Magisterio"
            ]
        },
        { 
            id: 20, 
            numero: "RTU-21", 
            nombre: "Huancaro", 
            tiempo: "25-35 min", 
            tarifa: "S/ 1.00",
            color: 'huancaro',
            paradas: [
                "Huancaro", "San Jerónimo", "Plaza de Armas", "Mercado Central",
                "Colegio Sciences", "Hospital Regional", "UNSAAC"
            ]
        },
        { 
            id: 21, 
            numero: "RTU-22", 
            nombre: "Servicio Andino", 
            tiempo: "30-40 min", 
            tarifa: "S/ 1.50",
            color: 'servicio-andino',
            paradas: [
                "Base Andino", "Santiago", "Plaza Tupac Amaru", "Av. La Cultura",
                "UNSAAC", "Hospital Regional", "Óvalo Pachacútec", "Urb. Magisterio"
            ]
        },
        { 
            id: 22, 
            numero: "RTU-23", 
            nombre: "Batman", 
            tiempo: "20-30 min", 
            tarifa: "S/ 1.00",
            color: 'batman',
            paradas: [
                "Base Batman", "Av. Garcilaso", "Plaza Regocijo", "Mercado San Pedro",
                "Calle del Medio", "Plaza de Armas", "Catedral"
            ]
        },
        { 
            id: 23, 
            numero: "RTU-24", 
            nombre: "Expreso Santiago", 
            tiempo: "25-35 min", 
            tarifa: "S/ 1.00",
            color: 'expreso-santiago',
            paradas: [
                "Santiago", "Plaza Tupac Amaru", "Av. La Cultura", "UNSAAC",
                "Hospital Regional", "Óvalo Pachacútec", "Urb. Magisterio"
            ]
        },
        { 
            id: 24, 
            numero: "RTU-25", 
            nombre: "Illary Qosqo", 
            tiempo: "30-40 min", 
            tarifa: "S/ 1.50",
            color: 'illary-qosqo',
            paradas: [
                "Illary Qosqo", "San Sebastián", "Plaza Tupac Amaru", "Av. La Cultura",
                "UNSAAC", "Hospital Regional", "Óvalo Pachacútec", "Urb. Magisterio"
            ]
        },
        { 
            id: 25, 
            numero: "RTU-26", 
            nombre: "Expreso San Sebastian", 
            tiempo: "25-35 min", 
            tarifa: "S/ 1.00",
            color: 'expreso-san-sebastian',
            paradas: [
                "San Sebastián", "Plaza Tupac Amaru", "Av. La Cultura", "UNSAAC",
                "Hospital Regional", "Óvalo Pachacútec", "Urb. Magisterio"
            ]
        },
        { 
            id: 26, 
            numero: "RTU-27", 
            nombre: "Expreso el Zorro", 
            tiempo: "20-30 min", 
            tarifa: "S/ 1.00",
            color: 'expreso-zorro',
            paradas: [
                "Base Zorro", "Av. El Sol", "Qoricancha", "Plaza de Armas",
                "Calle Mantas", "Mercado Central", "Colegio Sciences"
            ]
        },
        { 
            id: 27, 
            numero: "RTU-28", 
            nombre: "Nueva Chaska", 
            tiempo: "35-45 min", 
            tarifa: "S/ 1.50",
            color: 'nueva-chaska',
            paradas: [
                "Nueva Chaska", "San Sebastián", "Plaza Tupac Amaru", "Av. La Cultura",
                "UNSAAC", "Hospital Regional", "Óvalo Pachacútec", "Urb. Magisterio"
            ]
        },
        { 
            id: 28, 
            numero: "RTU-30", 
            nombre: "Doradino", 
            tiempo: "25-35 min", 
            tarifa: "S/ 1.00",
            color: 'doradino',
            paradas: [
                "Doradino", "San Jerónimo", "Plaza de Armas", "Mercado Central",
                "Colegio Sciences", "Hospital Regional", "UNSAAC"
            ]
        }
    ];

    // Inicializar carrusel simplificado
    function initCarousel() {
        const carouselContainer = document.querySelector('.carousel-container');
        if (!carouselContainer) return;
        
        // Crear slides usando el array de imágenes
        carouselImages.forEach((image, index) => {
            // Crear slide
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slide.style.backgroundImage = `url('${image.url}')`;
            
            // Aplicar posición especial si está definida
            if (image.position) {
                slide.style.backgroundPosition = image.position;
            } else {
                slide.style.backgroundPosition = 'center';
            }
            
            slide.setAttribute('data-index', index);
            
            // Crear caption para el slide
            const caption = document.createElement('div');
            caption.className = 'carousel-caption';
            caption.innerHTML = `<h3>${image.title}</h3><p>${image.caption}</p>`;
            slide.appendChild(caption);
            
            carouselContainer.appendChild(slide);
        });
        
        // Iniciar cambio automático cada 5 segundos
        startCarouselInterval();
    }
    
    // Cambiar slide
    function goToSlide(index) {
        const slides = document.querySelectorAll('.carousel-slide');
        
        // Remover clase active de todos
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Agregar clase active al slide actual
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // Siguiente slide
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= carouselImages.length) {
            nextIndex = 0;
        }
        goToSlide(nextIndex);
    }
    
    // Iniciar intervalo automático
    function startCarouselInterval() {
        carouselInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    }
    
    // Detener intervalo automático
    function stopCarouselInterval() {
        clearInterval(carouselInterval);
    }

    // Cargar rutas en el DOM
    function cargarRutas() {
        const container = document.getElementById('routes-container');
        if (!container) return;
        
        container.innerHTML = ''; // Limpiar contenedor primero
        
        todasLasRutas.forEach(ruta => {
            const routeCard = document.createElement('div');
            routeCard.className = 'route-card';
            routeCard.setAttribute('data-id', ruta.id);
            
            const headerClass = ruta.color ? `route-header ${ruta.color}` : 'route-header';
            
            const numParadasIntermedias = ruta.paradas ? ruta.paradas.length - 2 : 0;
            const paradasTexto = `${numParadasIntermedias} paradas`;
            
            routeCard.innerHTML = `
                <div class="${headerClass}">
                    <div class="route-number">${ruta.numero}</div>
                    <div class="route-name">${ruta.nombre}</div>
                </div>
                <div class="route-body">
                    <div class="route-stops">
                        <div class="route-stop">
                            <i class="fas fa-play-circle" style="color: #10B981;"></i>
                            <span>${ruta.paradas[0]}</span>
                        </div>
                        <div class="route-stop">
                            <i class="fas fa-ellipsis-h"></i>
                            <span>${paradasTexto}</span>
                        </div>
                        <div class="route-stop">
                            <i class="fas fa-flag-checkered" style="color: #EF4444;"></i>
                            <span>${ruta.paradas[ruta.paradas.length - 1]}</span>
                        </div>
                    </div>
                    <div class="route-info">
                        <span><i class="far fa-clock"></i> ${ruta.tiempo}</span>
                        <span><i class="fas fa-money-bill-wave"></i> ${ruta.tarifa}</span>
                    </div>
                </div>
            `;
            
            container.appendChild(routeCard);
        });
    }

    // Modal functionality
    const modal = document.getElementById('route-modal');
    const closeModal = document.querySelector('.close-modal');

    function abrirModal(rutaId) {
        const ruta = todasLasRutas.find(r => r.id === rutaId);
        
        if (ruta && modal) {
            document.getElementById('modal-route-number').textContent = ruta.numero;
            document.getElementById('modal-route-name').textContent = ruta.nombre;
            document.getElementById('modal-route-time').textContent = ruta.tiempo;
            document.getElementById('modal-route-fare').textContent = ruta.tarifa;
            
            const stopsContainer = document.getElementById('modal-route-stops');
            if (stopsContainer) {
                stopsContainer.innerHTML = '';
                
                // Mostrar todas las paradas
                ruta.paradas.forEach((parada, index) => {
                    const stopElement = document.createElement('div');
                    stopElement.className = 'modal-stop';
                    
                    // Marcar primera y última parada como activas
                    if (index === 0) {
                        stopElement.classList.add('active');
                        stopElement.innerHTML = `
                            <i class="fas fa-play-circle" style="color: #10B981;"></i>
                            <span><strong>Inicio: ${parada}</strong></span>
                        `;
                    } else if (index === ruta.paradas.length - 1) {
                        stopElement.classList.add('active');
                        stopElement.innerHTML = `
                            <i class="fas fa-flag-checkered" style="color: #EF4444;"></i>
                            <span><strong>Final: ${parada}</strong></span>
                        `;
                    } else {
                        stopElement.innerHTML = `
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${parada}</span>
                        `;
                    }
                    
                    stopsContainer.appendChild(stopElement);
                });
            }
            
            modal.style.display = 'flex';
            
            // Agregar contador de paradas en el modal
            const routeHeader = document.querySelector('.modal-route-header');
            if (routeHeader) {
                const existingCount = routeHeader.querySelector('.paradas-count');
                if (existingCount) {
                    existingCount.remove();
                }
                
                const paradasCount = document.createElement('div');
                paradasCount.className = 'paradas-count';
                paradasCount.style.fontSize = '0.9rem';
                paradasCount.style.opacity = '0.8';
                paradasCount.style.marginTop = '5px';
                paradasCount.textContent = `${ruta.paradas.length} paradas`;
                routeHeader.appendChild(paradasCount);
            }
        }
    }

    // Event listeners para las tarjetas de ruta
    document.addEventListener('click', function(e) {
        const routeCard = e.target.closest('.route-card');
        if (routeCard) {
            const rutaId = parseInt(routeCard.getAttribute('data-id'));
            abrirModal(rutaId);
        }
    });

    // Cerrar modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Inicializar la página
    initCarousel();
    cargarRutas();
    
    // Pausar carrusel al pasar el mouse
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopCarouselInterval);
        carouselContainer.addEventListener('mouseleave', startCarouselInterval);
    }

    // Agregar funcionalidad de búsqueda simple
    function inicializarBusqueda() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar rutas...';
        searchInput.style.cssText = `
            padding: 12px 20px;
            margin: 20px auto;
            width: 90%;
            max-width: 500px;
            display: block;
            border: 2px solid var(--primary);
            border-radius: 25px;
            font-size: 1rem;
            outline: none;
            transition: all 0.3s ease;
        `;

        const routesSection = document.querySelector('#rutas .container');
        if (routesSection) {
            const sectionTitle = routesSection.querySelector('.section-title');
            if (sectionTitle) {
                sectionTitle.parentNode.insertBefore(searchInput, sectionTitle.nextSibling);
            }
        }

        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const routeCards = document.querySelectorAll('.route-card');
            
            routeCards.forEach(card => {
                const routeName = card.querySelector('.route-name').textContent.toLowerCase();
                const routeNumber = card.querySelector('.route-number').textContent.toLowerCase();
                
                if (routeName.includes(searchTerm) || routeNumber.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Inicializar búsqueda
    inicializarBusqueda();
});