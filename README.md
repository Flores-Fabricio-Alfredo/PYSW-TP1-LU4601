# 🌵 Proyecto Turismo Jujuy 🏔️

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Bienvenido al repositorio de la plataforma web **Turismo Jujuy**. Este documento detalla exhaustivamente las decisiones de diseño, la arquitectura frontend y el código implementado.

## 🚀 Demo en Vivo
Puedes visitar el proyecto funcionando de manera pública a través de GitHub Pages:  
👉 **[Ver Turismo Jujuy en vivo](https://Flores-Fabricio-Alfredo.github.io/PYSW-TP1-LU4601/)**

---

## 🏗️ 1. Arquitectura y Tecnologías Utilizadas

La plataforma ha sido construida como una aplicación web multipágina (MPA) tradicional, lo que asegura un fácil indexado SEO y un ruteo nativo por parte del navegador. 

**Tecnologías Base:**
- **HTML5 Semántico:** Uso de etiquetas modernas (`<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`) para mejorar la accesibilidad.
- **CSS3 Vanilla:** Implementación de estilos sin preprocesadores. Se utilizaron técnicas modernas como Flexbox, CSS Grid, Custom Properties (Variables CSS) y CSS Scroll Snap.
- **JavaScript Moderno :** Utilizado de manera modular para interacciones DOM específicas, asegurando una carga ultra rápida y alta performance.

### Estructura de Archivos
```text
/
├── index.html        (Página principal con Hero, Destinos, Contadores, Testimonios)
├── destino.html      (Página de destinos y detalles por región)
├── agencia.html      (Listado de agencias con animaciones interactivas)
├── blog.html         (Sección de artículos)
├── contacto.html     (Formulario de consultas)
├── subcripcion.html  (Planes y paquetes turísticos)
├── /css/
│   └── styles.css    (Única hoja de estilos centralizada)
├── /js/
│   └── script.js     (Lógica interactiva centralizada)
└── /img/             (Recursos estáticos: imágenes y video)
```

---

## 🎨 2. Decisiones de Diseño y Estilo (CSS)

### 🌓 2.1. Sistema de Temas (Modo Oscuro/Claro)
Para brindar una experiencia de usuario moderna y adaptada a las preferencias del sistema o del usuario, se implementó un sistema de tema dinámico.

**Decisión Lógica:**
En lugar de crear múltiples hojas de estilo, se aprovecharon las *CSS Custom Properties* (`:root`). El tema oscuro se aplica mediante un selector de atributo `[data-theme="dark"]` adjuntado al elemento `<body>`.

### 🧭 2.2. Menú de Navegación "Mega Menu"
Se integró un "Mega Menú" desplegable con CSS puro en la pestaña "Destinos".
- **Por qué:** Permite organizar múltiples regiones sin requerir clicks adicionales y expone visualmente el contenido mediante el uso de imágenes atractivas dentro del dropdown.
- **Cómo:** Se utiliza `:hover` sobre los elementos principales del nav (`.nav-links li:hover .mega-menu`), cambiando la opacidad y visibilidad con una transición fluida.

### 📱 2.3. Layouts Responsivos
Se delegó la responsabilidad estructural a **CSS Grid** y **Flexbox**, asegurando adaptabilidad a dispositivos móviles (Mobile-First) sin recurrir a excesivas *Media Queries*.
- **Grid Auto-Fit:** Usado intensivamente en tarjetas para que las columnas colapsen dinámicamente según la pantalla.

### ✨ 2.4. Animaciones e Interacciones CSS
- **Carrousel Scroll Snap:** La sección de *Testimonios* utiliza `scroll-snap-type` en su contenedor. Esto reemplaza un pesado carrousel de JS con uno puramente fluido y nativo en móviles.
- **Tarjetas 3D (Flip Cards):** Usadas en la sección de agencias/entrenadores con soporte de rotaciones espaciales en el eje Y (`rotateY`).
- **Filtrado Visual Nativo:** En la galería, el filtrado se ha logrado utilizando _radio buttons_ ocultos y el combinador hermano general (`~`), sin dependencias en scripts de JS.

---

## ⚙️ 3. Implementación Lógica (JavaScript)

El archivo `script.js` está diseñado como pequeñas utilidades que actúan bajo la ideología de **Progressive Enhancement**.

- **Persistencia de Modo:** Interacción con `localStorage` para garantizar la elección visual al recargar la plantilla.
- **Contadores In-Sight:** Animación temporal de los contadores ejecutada mediante `IntersectionObserver`. Gastan 0% en CPU hasta que el usuario se desplaza exactamente hacia la sección visible.
- **Mock-up Modales asíncronos:** Prevención en flujos de formularios nativos `e.preventDefault()`, spinners controlados y simulación de latencias (Timeouts).

---

## ⚡ 4. Rendimiento y UX
- **Video Hero Económico:** Background optimizado con `muted loop playsinline autoplay` para cero penalización en navegadores restrictivos móviles.
- **Vectores e Íconos Ligantes:** Implementación de íconos por medio de librerías tipo tipografía como CDN (BoxIcons & FontAwesome) ganando la máxima escalabilidad de rendering sin pixeleo en resoluciones densas.

> Desarrollado para vivir Jujuy.
