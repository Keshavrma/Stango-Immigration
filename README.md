# Stango Immigration & Stango Clothing

**Stango Immigration** is a modern, responsive, and minimalist website designed to help individuals and families navigate international migration processes with clarity and confidence. The project is built using modern HTML5, clean CSS3 (design system with custom properties and responsive grid/flexbox), and vanilla JavaScript.

## Highlights & Features

- **Modern Minimalist Homepage**: Focused on brand clarity with the organization name **Stango Immigration** and a prominent, high-conversion Contact & Assessment Form.
- **Stango Clothing E-Commerce Store**: Introducing an official apparel & travel gear store (`shop.html`) with interactive cart drawer, local storage persistence, category filters, instant search, size pickers, and checkout demo.
- **Comprehensive Form Fields**:
  - Full Name
  - Phone Number
  - Age (numeric validation)
  - States & Union Territories (complete alphabetical dropdown of Indian states, UTs, and international options)
  - Email Address
  - Visa / Service Interest Category
  - Notes & Questions
- **Responsive & Accessible**: Optimized for desktops, tablets, and mobile smartphones with a collapsible mobile navigation drawer.
- **Streamlined Content**: Pared down unnecessary walls of text across all pages to highlight only essential information.
- **Polished Visual Design**: Premium navy and royal blue palette, subtle gradients, elegant cards, SVG vector logo branding, and smooth feedback alerts upon submission.

## Folder Structure

```
Stango Immigration/
├── index.html                  # Main homepage with hero and eligibility assessment form
├── shop.html                   # Stango Clothing official e-commerce apparel store
├── about.html                  # About Us, company story, and core values
├── services.html               # Streamlined overview of immigration services
├── contact.html                # Dedicated contact page and direct inquiry form
├── css/
│   └── styles.css              # Unified modern CSS design system and shop styling
├── js/
│   ├── script.js               # Form validation, feedback alerts, and cart sync
│   └── shop.js                 # Stango Clothing store catalog, cart engine & checkout
└── resources/
    ├── logo.svg                # Crisp vector SVG brand logo (light background)
    ├── logo-white.svg          # Crisp vector SVG brand logo (dark background)
    └── Stango Immigration Logo.png
```

## Technologies Used

- **HTML5**: Semantic document structuring with accessible form controls and metadata.
- **CSS3**: Modern CSS variables, flexbox, CSS grid, backdrop filters, and mobile-first responsive breakpoints.
- **JavaScript (ES6+)**: Interactive client-side validation, e-commerce cart engine with `localStorage`, and mobile menu interactions.

## Instructions to Run Locally

You can open the HTML files directly in any web browser, or launch a lightweight local server:

1. **Direct File Access**:
   Double click `index.html` or `shop.html` or open it with your browser of choice (Chrome, Edge, Firefox, Safari).

2. **Using a Local Server (Recommended)**:
   ```bash
   # Using Python
   python -m http.server 8080

   # Or using npx
   npx serve .
   ```
   Then navigate to `http://localhost:8080` in your web browser.

## License

This project is licensed under the MIT License.
