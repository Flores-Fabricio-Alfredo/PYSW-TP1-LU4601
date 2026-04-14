# Documentación Técnica: Proyecto Turismo Jujuy

Este documento detalla exhaustivamente las decisiones de diseño, la arquitectura frontend y el código implementado en el desarrollo de la plataforma web "Turismo Jujuy".

## 1. Arquitectura y Tecnologías Utilizadas

La plataforma ha sido construida como una aplicación web multipágina (MPA) tradicional, lo que asegura un fácil indexado SEO y un ruteo nativo por parte del navegador. 

**Tecnologías Base:**
- **HTML5 Semántico:** Uso de etiquetas modernas (`<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`) para mejorar la accesibilidad (a11y) y el SEO.
- **CSS3 Vanilla:** Implementación de estilos sin preprocesadores. Se utilizaron técnicas modernas como Flexbox, CSS Grid, Custom Properties (Variables CSS) y CSS Scroll Snap.
- **JavaScript Moderno (ES6+):** Utilizado de manera modular para interacciones DOM específicas (sin frameworks pesados como React o Angular), asegurando una carga ultra rápida y alta performance.

### Estructura de Archivos
```text
/
├── index.html        (Página principal con Hero, Destinos, Contadores, Testimonios)
├── destino.html      (Página de destinos y detalles por región)
├── agencia.html      (Listado de agencias con animaciones interactivas)
├── blog.html         (Sección de artículos)
├── contacto.html     (Formulario de consultas)
├── subcripcion.html  (Planes y paquetes turísticos)
├── /css
│   └── styles.css    (Única hoja de estilos centralizada)
├── /js
│   └── script.js     (Lógica interactiva centralizada)
└── /img              (Recursos estáticos: imágenes y video)
```

---

## 2. Decisiones de Diseño y Estilo (CSS)

### 2.1. Sistema de Temas (Modo Oscuro/Claro)
Para brindar una experiencia de usuario moderna y adaptada a las preferencias del sistema o del usuario, se implementó un sistema de tema dinámico.

**Decisión Lógica:**
En lugar de crear múltiples hojas de estilo, se aprovecharon las *CSS Custom Properties* (`:root`). El tema oscuro se aplica mediante un selector de atributo `[data-theme="dark"]` adjuntado al elemento `<body>`.

```css
/* Definición de Variables */
:root {
    --bg-color: #f0f0f0;
    --text-color: #333;
    --link-hover: #D35400; /* Color Terracota representativo de Jujuy */
}

[data-theme="dark"] {
    --bg-color: #1a1512;
    --text-color: #f4efea;
    --link-hover: #FF7043;
}
```

### 2.2. Menú de Navegación "Mega Menu"
Se integró un "Mega Menú" desplegable con CSS puro en la pestaña "Destinos".
- **Por qué:** Permite organizar múltiples regiones (Valles, Quebrada, Yungas) sin requerir clicks adicionales y expone visualmente el contenido mediante el uso de imágenes (`<img>`) dentro del dropdown.
- **Cómo:** Se utiliza `:hover` sobre los elementos principales del nav (`.nav-links li:hover .mega-menu`), cambiando la opacidad y visibilidad de `0`/`hidden` a `1`/`visible` con una transición fluida.

### 2.3. Layouts Responsivos
Se delegó la responsabilidad estructural a **CSS Grid** y **Flexbox**, asegurando adaptabilidad a dispositivos móviles sin recurrir a demasiadas Media Queries exhaustivas.

- **Grid Auto-Fit:** Usado intensivamente en tarjetas (por ejemplo en sección clases/destinos).
  ```css
  .cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
  }
  ```
  *Nota:* Esto hace que las columnas colapsen dinámicamente si el ancho de la pantalla baja del tamaño mínimo definido.

### 2.4. Animaciones e Iteracciones CSS
Para mantener el rendimiento alto y ofrecer un diseño "Wow":
- **Carrousel Scroll Snap:** La sección de *Testimonios* utiliza `scroll-snap-type: x mandatory` en su contenedor y `scroll-snap-align: center` en sus hijos. Esto reemplaza un pesado carrousel de JS nativo con uno puramente CSS super ligero para móviles.
- **Tarjetas 3D (Flip Cards):** Usadas en la sección de agencias/entrenadores. Usando `perspective: 1000px` en el contenedor y `transform-style: preserve-3d;` con rotaciones en el eje Y (`rotateY(180deg)`) al hacer *hover*.
- **Filtrado Visual Puramente CSS:** En la galería, el filtrado se ha logrado sin depender de JS, utilizando _radio buttons_ ocultos y el combinador hermano general (`~`). Cuando el usuario hace click en una etiqueta, se activa un radio que fuerza a mostrar u ocultar determinados bloques.

---

## 3. Implementación de Lógica Front-End (JavaScript)

El archivo `script.js` está diseñado como pequeñas utilidades que actúan mediante Progressive Enhancement (Mejora Progresiva).

### 3.1. Persistencia del Modo Oscuro
El JS se encarga de actualizar dinámicamente el `dataset` del `body`, y además hace uso de `localStorage` para garantizar que la recarga de página no destrozara la elección del usuario.

```javascript
const savedTheme = localStorage.getItem('theme') || ''; 
applyTheme(savedTheme); // Se aplica instantáneamente al inicio

toggleBtn.addEventListener('click', () => {
    // Intercambio lógico y guardado
    const currentTheme = document.body.dataset.theme === 'dark' ? '' : 'dark';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme); 
});
```

### 3.2. Contadores Numéricos y Observador de Intersección
En la sección "Cifras de Turismo", los contadores inician en 0 y suben hasta su número de objetivo determinado por el atributo de datos HTML `data-target`.

**Decisión Técnica:** Evitar procesar estas animaciones si no están en pantalla. Se empleó **`IntersectionObserver`**, una potente API moderna.
- El observador mira los números. Cuando entran al *viewport* (`entry.isIntersecting`), se dispara el bucle con `requestAnimationFrame`. Se desconecta al elemento inmediatamente (`obs.unobserve()`) para consumir cero recursos una vez realizada la animación.

### 3.3. Simulación de Formulario y Modales
El formulario de contacto (`contact-form`) cuenta con prevención nativa de recarga de sitio (`e.preventDefault()`).
Implementa inyección visual controlada:
1. Muestra un "Spinner" (Rueda de carga).
2. Deshabilita el botón (evita múltiples clicks involuntarios).
3. Simula la latencia de un servidor backend mediante un `setTimeout`.
4. Renderiza un pop-up "Modal" (`#success-modal`) confirmando el estado al final de la operación.

---

## 4. Consideraciones de Rendimiento y UX Visual
1. **Video de Fondo de Baja Demanda:** El hero utiliza una etiqueta `<video>` usando los atributos `muted loop playsinline autoplay` para asegurar una reproducción automática sin bloqueos directos y compatible con reglas estrictas de navegadores web móviles modernos.
2. **Uso de Íconos Vectoriales:** Se priorizó el uso de "Boxicons" y "FontAwesome" mediante CDN para mantener vectores escalables que no pixelen ni penalicen la velocidad de red con múltiples imágenes rasterizadas.
3. **Control Descriptivo del Color:** En elementos de UI dinámicos como Avatares, se utilizaron en HTML variables de estilo en línea como `<div class="css-avatar" style="--bg: #e65100">B</div>`. Esto da la posibilidad al *backend* futuro a generar combinaciones de colores únicas a perfiles con suma facilidad delegando el estilo al componente CSS base.

## 5. Resumen Web
Se optó por un enfoque libre de dependencias enormes en favor de las API nativas modernas del ecosistema Frontend (CSS Variables + CSS Grid/Subgrid + ES6 Web APIs). Esto resultó en un portal ágil y atractivo, con animaciones fluidas y una estructura sumamente escalable para futuras integraciones.
