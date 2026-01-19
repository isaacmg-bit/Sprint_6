# angular-budgets

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
![Angular](https://img.shields.io/badge/Angular-21.0.1-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-06B6D4?logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4.0.14-6E9F18?logo=vitest&logoColor=white)
![Node](https://img.shields.io/badge/Node-25.1.0-339933?logo=node.js&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9.39.2-4B32C3?logo=eslint&logoColor=white)
![License: CC BY-NC](https://img.shields.io/badge/license-CC--BY--NC-orange)

**Budget estimation tool for digital services, built with Angular and Tailwind CSS, featuring reactive state management and URL-based sharing.**

---

## Table of Contents

- [Background](#background)
- [Technologies](#technologies)
- [Structure](#structure)
- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Testing](#testing)
- [Screenshots](#screenshots)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

---

## Background

Budget Calculator was developed to learn more advanced Angular development.

The application allows users to estimate budgets for digital services (SEO, Ads, Web), configure custom options, and save multiple budget requests. It showcases modern Angular (v21) features including Signals, Standalone Components, and reactive state management, with a focus on accessibility, clean architecture, and comprehensive testing.

---

## Technologies

- HTML5
- TailWindCSS v4.1.17
- JavaScript ES6
- TypeScript v5.9.3
- Node.js v25.1.0
- Vitest v4.0.14
- Angular 21.0.1
- ESLint 9.39.2

---

## Structure

```text
SPRINT_6/
├── .angular/                    # Angular cache (auto-generated)
├── .vscode/                     # VSCode workspace settings
├── node_modules/                # Installed dependencies (auto-generated)
├── public/                      # Static assets served at root
├── src/                         # Application source code
│   ├── app/                     # Main application module
│   │   ├── budgets-list/        # Budget selection component
│   │   │   ├── budgets-list.css
│   │   │   ├── budgets-list.html
│   │   │   ├── budgets-list.spec.ts
│   │   │   └── budgets-list.ts
│   │   ├── home/                # Home page component
│   │   │   ├── home.css
│   │   │   ├── home.html
│   │   │   ├── home.spec.ts
│   │   │   └── home.ts
│   │   ├── models/              # TypeScript interfaces
│   │   │   ├── budgetformvalues.ts
│   │   │   ├── budgetpersondata.ts
│   │   │   ├── budgetqueryparams.ts
│   │   │   ├── budgets.ts
│   │   │   └── panelformvalues.ts
│   │   ├── panel/               # Web budget panel component
│   │   │   ├── panel.css
│   │   │   ├── panel.html
│   │   │   ├── panel.spec.ts
│   │   │   └── panel.ts
│   │   ├── services/            # Application services
│   │   │   ├── budget.spec.ts
│   │   │   ├── budget.ts
│   │   │   ├── url-service.spec.ts
│   │   │   ├── url-service.ts
│   │   │   ├── validation.spec.ts
│   │   │   └── validation.ts
│   │   ├── stored-budgets/      # Saved budgets list component
│   │   │   ├── stored-budgets.css
│   │   │   ├── stored-budgets.html
│   │   │   ├── stored-budgets.spec.ts
│   │   │   └── stored-budgets.ts
│   │   ├── app.config.ts        # Application configuration
│   │   ├── app.css              # Root component styles
│   │   ├── app.html             # Root component template
│   │   ├── app.routes.ts        # Application routes
│   │   ├── app.spec.ts          # Root component tests
│   │   └── app.ts               # Root component
│   ├── index.html               # Main HTML entry point
│   ├── main.ts                  # Application bootstrap
│   └── styles.css               # Global styles
├── .editorconfig                # Editor configuration
├── .gitignore                   # Git ignored files
├── .postcssrc.json              # PostCSS configuration
├── angular.json                 # Angular workspace configuration
├── eslint.config.js             # ESLint configuration
├── package-lock.json            # Dependency lockfile (auto-generated)
├── package.json                 # Project manifest (dependencies, scripts, metadata)
├── README.md                    # Project documentation
├── tsconfig.app.json            # TypeScript config for app
├── tsconfig.json                # Base TypeScript configuration
└── tsconfig.spec.json           # TypeScript config for tests

```

---

## Installation

```text
# Clone the repository
git clone https://github.com/isaacmg-bit/Sprint_6.git

# Navigate to the project folder
cd Sprint_6

# Install dependencies
npm install

# Start development server
ng serve

# Open http://localhost:4200 in your browser
```

---

## Features

- Service selection with dynamic pricing (SEO, Ads, Web)
- Customizable web configurations (pages & languages)
- Save and manage multiple budgets
- Search and sort budgets by multiple criteria
- URL-based state persistence for sharing
- Fully accessible (ARIA compliant)
- Responsive design with Tailwind CSS

---

## Usage

· Creating a Budget

- Select Services: Check the boxes for desired services (SEO, Ads, Web)
- Configure Web Options (if Web is selected):
  Click + or - to adjust number of pages
  Click + or - to adjust number of languages
  Click the info icon for pricing details

- View Total: The total price updates automatically at the bottom

- Save Budget:
  Fill in client name, phone, and email
  Click "Sol·licitar pressupost" (Request Budget)

· Managing Budgets

- Search: Type a client name in the search box to filter budgets
- Sort: Click on "Data", "Import", or "Nom" buttons to sort
  Click again to toggle ascending/descending order
- View Details: Each budget card shows services, configuration, and total price

· Sharing Configurations

- The URL automatically updates with your selections
- Copy and share the URL to restore the exact same configuration
- Example: http://localhost:4200/home?seo=true&web=true&pages=3&languages=2

---

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## Screenshots

![Desktop version](./assets/img/Desktop1.png)
![Desktop version](./assets/img/Desktop2.png)
![Desktop version](./assets/img/Desktop3.png)
![Desktop version](./assets/img/Desktop4.png)

---

## Maintainers

[@Isaac Malagón](https://github.com/isaacmg-bit)

---

## Contributing

```text
1. Fork this repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes and commit (`git commit -m 'Add new feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Create a Pull Request
```

**Pull requests** are welcome.  
If you edit the README, please make sure to follow the  
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

---

## License

This work is licensed under a [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/).  
© 2025 Isaac Malagón — Commercial use and redistribution are not allowed without permission.
