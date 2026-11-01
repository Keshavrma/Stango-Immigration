# Stango Immigration

**Stango Immigration** is a modern, responsive, and minimalist website designed to help individuals and families navigate international migration processes with clarity and confidence. The project is built using modern HTML5, clean CSS3 (design system with custom properties and responsive grid/flexbox), and vanilla JavaScript.

## Highlights & Features

- **Modern Minimalist Homepage**: Focused on brand clarity with the organization name **Stango Immigration** and a prominent, high-conversion Contact & Assessment Form.
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
├── about.html                  # About Us, company story, and core values
├── services.html               # Streamlined overview of immigration services
├── contact.html                # Dedicated contact page and direct inquiry form
├── css/
│   └── styles.css              # Unified modern CSS design system and media queries
├── js/
│   └── script.js               # Form validation, feedback alerts, and mobile menu toggle
└── resources/
    ├── logo.svg                # Crisp vector SVG brand logo (light background)
    ├── logo-white.svg          # Crisp vector SVG brand logo (dark background)
    └── Stango Immigration Logo.png
```

## Technologies Used

- **HTML5**: Semantic document structuring with accessible form controls and metadata.
- **CSS3**: Modern CSS variables, flexbox, CSS grid, backdrop filters, and mobile-first responsive breakpoints.
- **JavaScript (ES6+)**: Interactive client-side validation, asynchronous submission simulation, and mobile menu interactions.

## Instructions to Run Locally

You can open the HTML files directly in any web browser, or launch a lightweight local server:

1. **Direct File Access**:
   Double click `index.html` or open it with your browser of choice (Chrome, Edge, Firefox, Safari).

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
