# 📖 Documentación del Proyecto - Xicalango Frontend

## 🏗️ Descripción General

**Xicalango Frontend** es una aplicación web React que combina una **Landing Page corporativa** con una **tienda en línea (e-commerce)** para una empresa de paisajismo y jardinería. El proyecto está desarrollado con tecnologías modernas y sigue una arquitectura modular y escalable.

## 🎯 Propósito del Proyecto

- **Landing Page**: Presentar los servicios de paisajismo de Xicalango
- **E-commerce**: Vender productos relacionados con jardinería (plantas, macetas, césped, herramientas)
- **Galería de Servicios**: Mostrar trabajos realizados por categorías
- **Generación de Leads**: Convertir visitantes en clientes potenciales

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.0.0 | Biblioteca principal para UI |
| **Vite** | 4.4.0 | Build tool y servidor de desarrollo |
| **React Router DOM** | 6.0.0 | Routing del lado del cliente |
| **Tailwind CSS** | 3.4.17 | Framework de CSS utilitario |
| **PostCSS** | 8.5.3 | Procesador de CSS |
| **Autoprefixer** | 10.4.21 | Prefijos CSS automáticos |

---

## 📁 Estructura del Proyecto

```
xicalango-frontend/
├── public/                          # Archivos estáticos
│   ├── images/                      # Imágenes del proyecto
│   └── vite.svg                     # Favicon
├── src/                             # Código fuente
│   ├── components/                  # Componentes reutilizables
│   │   ├── landing/                 # Componentes específicos de landing
│   │   │   ├── aboutUs.jsx          # Sección "Sobre nosotros"
│   │   │   ├── contact.jsx          # Formulario de contacto
│   │   │   ├── hero.jsx             # Hero section principal
│   │   │   ├── navbar.jsx           # Navbar de landing
│   │   │   ├── services.jsx         # Grid de servicios
│   │   │   └── whyUs.jsx            # "Por qué elegirnos"
│   │   ├── store/                   # Componentes específicos de tienda
│   │   │   ├── carrousel.jsx        # Carousel de productos
│   │   │   └── navbar.jsx           # Navbar de tienda
│   │   ├── footer.jsx               # Footer global
│   │   └── whatsappFlotante.jsx     # Widget de WhatsApp
│   ├── layouts/                     # Layouts principales
│   │   ├── LandingLayout.jsx        # Layout para landing page
│   │   └── StoreLayout.jsx          # Layout para tienda
│   ├── Pages/                       # Páginas principales
│   │   ├── LandingPage/             # Módulo de landing
│   │   │   ├── Home.jsx             # Página principal
│   │   │   └── servicesPages/       # Páginas de servicios
│   │   │       ├── comerciales.jsx  # Servicios comerciales
│   │   │       ├── eventos.jsx      # Servicios de eventos
│   │   │       ├── hoteleros.jsx    # Servicios hoteleros
│   │   │       ├── jardineria.jsx   # Servicios de jardinería
│   │   │       └── residenciales.jsx # Servicios residenciales
│   │   └── StorePages/              # Módulo de tienda
│   │       └── Homepage.jsx         # Página principal de tienda
│   ├── routes/                      # Configuración de rutas
│   │   └── router.jsx               # Router principal
│   ├── App.jsx                      # Componente raíz
│   ├── main.jsx                     # Punto de entrada
│   └── index.css                    # Estilos globales
├── .gitignore                       # Archivos ignorados por Git
├── index.html                       # HTML base
├── package.json                     # Dependencias y scripts
├── postcss.config.js               # Configuración de PostCSS
├── tailwind.config.js              # Configuración de Tailwind
└── vite.config.js                  # Configuración de Vite
```

---

## 🌐 Arquitectura de Rutas

### **Landing Page (Sitio Principal)**
```
/ - Landing page principal
├── Hero Section
├── About Us
├── Services (Grid)
├── Why Choose Us
└── Contact Form

/servicios/* - Páginas de servicios específicos
├── /servicios/residencial - Proyectos residenciales
├── /servicios/comercial - Proyectos comerciales  
├── /servicios/hotelero - Proyectos hoteleros
├── /servicios/jardineria - Servicios de jardinería
└── /servicios/eventos - Servicios de eventos
```

### **E-commerce (Tienda)**
```
/store - Página principal de tienda
├── Carousel de productos
├── Categorías de productos
├── Productos destacados
└── Beneficios de compra
```

---

## 🧩 Componentes Principales

### **📱 Layouts**

#### `LandingLayout.jsx`
```jsx
// Layout principal para todas las páginas del sitio corporativo
// Incluye: Navbar + Contenido + Footer + WhatsApp flotante
```

#### `StoreLayout.jsx`
```jsx
// Layout específico para la tienda en línea
// Incluye: Navbar de tienda + Contenido + Footer
```

### **🏠 Landing Components**

#### `hero.jsx`
- **Propósito**: Hero section principal con CTA
- **Características**: Imagen de fondo, título principal, botón de acción
- **Ubicación**: Primera sección de la landing page

#### `services.jsx`
- **Propósito**: Grid de servicios principales
- **Características**: Cards interactivas que redirigen a páginas específicas
- **Servicios**: Residencial, Comercial, Hotelero, Jardinería, Eventos

#### `aboutUs.jsx`
- **Propósito**: Información corporativa sobre Xicalango
- **Características**: Descripción de la empresa y experiencia

#### `whyUs.jsx`
- **Propósito**: Diferenciadores y propuesta de valor
- **Características**: Razones para elegir Xicalango

#### `contact.jsx`
- **Propósito**: Formulario de contacto para generar leads
- **Características**: Formulario funcional con validación

### **🛒 Store Components**

#### `carrousel.jsx`
- **Propósito**: Carousel de productos destacados en tienda
- **Características**: Slider automático con productos principales

#### `navbar.jsx` (Store)
- **Propósito**: Navegación específica para la tienda
- **Características**: Diferente del navbar de landing

### **🌐 Global Components**

#### `footer.jsx`
- **Propósito**: Footer compartido entre landing y tienda
- **Características**: Información de contacto, redes sociales, links importantes

#### `whatsappFlotante.jsx`
- **Propósito**: Widget de WhatsApp para contacto directo
- **Características**: Botón flotante que abre WhatsApp Web

---

## 🚀 Comandos de Desarrollo

### **Instalación inicial**
```bash
npm install
```

### **Desarrollo**
```bash
npm run dev
# Inicia servidor en http://localhost:5173
```

### **Build para producción**
```bash
npm run build
# Genera archivos optimizados en /dist
```

### **Preview de build**
```bash
npm run serve
# Previsualiza el build de producción
```

---

## 🎨 Sistema de Diseño

### **Colores Principales**
```css
/* Verde principal de Xicalango */
--primary: #6FAD46

/* Colores de apoyo */
--primary-dark: #5a9639
--secondary: #16A34A
--gray-50: #f9fafb
--gray-800: #1f2937
```

### **Tipografía**
- **Font Family**: Sistema de fuentes por defecto de Tailwind
- **Escalas**: text-sm, text-base, text-lg, text-xl, text-2xl, etc.
- **Pesos**: font-normal, font-medium, font-bold

### **Espaciado**
- **Padding/Margin**: Escala de Tailwind (px-4, py-8, mb-6, etc.)
- **Container**: max-w-7xl mx-auto para contenido principal

---

## 📊 Flujo de Usuario

### **Landing Page Flow**
1. **Llegada** → Hero Section con mensaje principal
2. **Información** → About Us para conocer la empresa  
3. **Servicios** → Grid de servicios con navegación a páginas específicas
4. **Convencimiento** → Why Choose Us con diferenciadores
5. **Conversión** → Contact Form para generar leads
6. **Contacto directo** → WhatsApp flotante en toda la página

### **Store Flow**
1. **Llegada** → Carousel con productos destacados
2. **Exploración** → Categorías de productos
3. **Selección** → Productos destacados con detalles
4. **Conversión** → Beneficios de compra y CTAs

---

## 🔧 Configuraciones Importantes

### **Vite Config**
```javascript
// vite.config.js - Configuración del bundler
export default defineConfig({
  plugins: [react()],
  // Configuraciones de build y development server
})
```

### **Tailwind Config**
```javascript
// tailwind.config.js - Personalización de Tailwind
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Colores personalizados de Xicalango
      }
    }
  }
}
```

---

## 🌍 Integración con Servicios Externos

### **WhatsApp Business**
- **Implementación**: Enlaces directos a WhatsApp Web
- **Parámetros**: Número de teléfono y mensaje predefinido
- **Ubicación**: Widget flotante y botones de contacto

### **Unsplash (Imágenes)**
- **Uso**: Imágenes placeholder para galerías de servicios
- **Implementación**: URLs directas en componentes de galería

---

## 📱 Responsive Design

### **Breakpoints de Tailwind**
- **sm**: 640px - Móviles grandes
- **md**: 768px - Tablets  
- **lg**: 1024px - Desktop pequeño
- **xl**: 1280px - Desktop grande

### **Estrategia Mobile-First**
- Diseño base para móvil
- Adaptaciones progresivas para pantallas más grandes
- Grid responsivo en todas las secciones

---

## 🚀 Optimizaciones

### **Performance**
- **Vite**: Build tool optimizado para desarrollo rápido
- **Code Splitting**: Automático con React Router
- **Tree Shaking**: Eliminación de código no utilizado

### **SEO Ready**
- **Meta Tags**: Configurables en index.html
- **Semantic HTML**: Uso de elementos semánticos
- **Alt Text**: Imágenes con textos alternativos

---

## 🔮 Futuras Expansiones

### **Funcionalidades Planeadas**
- [ ] **Carrito de compras** funcional en tienda
- [ ] **Sistema de autenticación** de usuarios
- [ ] **Panel administrativo** para gestión de productos
- [ ] **Blog/Noticias** para contenido SEO
- [ ] **Galería de proyectos** más robusta
- [ ] **Integración con CRM** para leads

### **Mejoras Técnicas**
- [ ] **TypeScript** para mayor seguridad de tipos
- [ ] **Testing** con Jest y React Testing Library
- [ ] **Storybook** para documentación de componentes
- [ ] **PWA** para experiencia mobile app
- [ ] **Analytics** con Google Analytics 4

---

## 👥 Guía para Nuevos Desarrolladores

### **1. Setup Inicial**
```bash
# Clonar repositorio
git clone [repository-url]
cd xicalango-frontend

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
```

### **2. Flujo de Desarrollo**
1. **Crear rama** para nueva feature
2. **Desarrollar** en modo dev con hot reload
3. **Testear** en diferentes dispositivos
4. **Build** para verificar producción
5. **Commit** con mensajes descriptivos

### **3. Convenciones del Código**
- **Componentes**: PascalCase (ej: `HeroSection.jsx`)
- **Archivos**: camelCase (ej: `whyChooseUs.jsx`)
- **CSS Classes**: Tailwind utilities
- **Comentarios**: JSDoc para componentes principales

### **4. Estructura de Componentes**
```jsx
import React from 'react';

/**
 * Descripción del componente
 * @param {Object} props - Props del componente
 * @returns {JSX.Element}
 */
export default function ComponentName({ prop1, prop2 }) {
  return (
    <div className="container">
      {/* Contenido del componente */}
    </div>
  );
}
```

---

## 📞 Soporte y Contacto

- **Proyecto**: Xicalango Frontend
- **Tecnología Principal**: React + Vite + Tailwind CSS
- **Tipo**: Landing Page + E-commerce
- **Estado**: En desarrollo activo

---

## 📝 Changelog

### **Version 1.0.0** (Actual)
- ✅ Landing page completa
- ✅ Estructura de tienda básica  
- ✅ Sistema de rutas configurado
- ✅ Diseño responsive
- ✅ Integración WhatsApp
- ✅ Galería de servicios

---

**📅 Última actualización**: Diciembre 2024  
**👨‍💻 Mantenido por**: Equipo de desarrollo Xicalango
