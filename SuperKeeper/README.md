# SuperKeeper - Australian Superannuation Guide for Expats

## Overview

SuperKeeper is a modern, responsive SaaS website designed to help temporary visa holders in Australia understand and maximize their superannuation returns through the DASP (Departing Australia Superannuation Payment) scheme.

## Features

✨ **Modern & Responsive Design**
- Clean, professional layout that works on all devices
- Smooth animations and transitions
- Intuitive user experience

🧮 **Interactive Super Calculator**
- Vue.js powered calculator for real-time calculations
- Support for multiple years of employment
- Different tax rates based on visa types
- Instant results display

📚 **Comprehensive DASP Information**
- Complete eligibility requirements
- Step-by-step application process
- Tax rate breakdown by visa type
- Required documents checklist
- Frequently asked questions

💼 **Service Management**
- Three tiered service packages:
  - Just Sponsored (FREE 30-min consultation)
  - Departing Australia ($100 AUD 60-min consultation)
  - Full Agent Service (Complete handling)
- Online booking system
- Service comparison table

📊 **Statistics & Analytics**
- Unclaimed superannuation data visualization
- Key statistics about temporary residents
- Progress indicators

## Project Structure

```
SuperKeeper/
├── index.html                 # Home page
├── dasp.html                 # DASP information page
├── services.html             # Services & booking page
├── calculator.html           # Interactive calculator
├── assets/
│   ├── css/
│   │   └── style.css        # Main stylesheet (850+ lines of modern CSS)
│   ├── js/
│   │   ├── main.js          # Main JavaScript utilities
│   │   └── calculator.js    # Vue.js calculator logic
│   └── images/              # Images directory (for future use)
├── README.md                # This file
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS custom properties
- **JavaScript ES6+** - Modern JavaScript
- **Vue.js 3** - Reactive calculator interface
- **Bootstrap 5** - Responsive grid and components
- **Chart.js** - Data visualization
- **Font Awesome 6** - Icons

## Setup Instructions

### Local Setup

1. **Clone or Download** the project files to your local machine

2. **Navigate to the project directory**:
   ```bash
   cd SuperKeeper
   ```

3. **Open the website** (choose one method):
   - Double-click `index.html` in File Explorer
   - Or use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js (with http-server package)
     http-server
     ```

4. **Access the website**:
   - Open browser and navigate to: `http://localhost:8000`

## Page Descriptions

### 1. **Home (index.html)**
- Hero section with call-to-action
- Unclaimed superannuation statistics
- Quick DASP overview
- Service offerings overview
- Key statistics (by the numbers)
- Contact section

### 2. **DASP Info (dasp.html)**
- Comprehensive DASP explanation
- Eligibility requirements
- Tax rates by visa type
- Step-by-step application process
- Required documents checklist
- FAQ accordion section
- Quick information sidebar
- Useful resources links

### 3. **Services (services.html)**
- Three service packages displayed as cards
- Detailed service comparison table
- Online booking form
- Service-specific FAQs
- Alternative contact methods
- Service features breakdown

### 4. **Calculator (calculator.html)**
- Interactive Vue.js calculator
- Year range selection
- Annual salary & visa type inputs
- Real-time calculation results
- Detailed breakdown of calculations
- Information and help sections
- Next steps recommendations

## CSS Features

The stylesheet (`assets/css/style.css`) includes:

- **CSS Custom Properties** for consistent theming
- **Flexbox & Grid** layouts for responsiveness
- **CSS Animations** for smooth transitions
- **Mobile-First** responsive design
- **Utility Classes** for common patterns
- **Dark Mode Compatible** color scheme
- **Accessibility** considerations

### Key CSS Sections:
- Global Styles & Resets
- Navigation Styling
- Hero Section
- Card Components
- Form Elements
- Buttons & CTAs
- Alerts & Notifications
- Footer
- Animations & Transitions
- Responsive Breakpoints

## JavaScript Features

### main.js
- Chart.js initialization
- Smooth scroll navigation
- Active link highlighting
- Element animation on scroll
- Currency formatting
- Responsive chart handling

### calculator.js
- Vue.js calculator application
- Year range computation
- Superannuation calculations (10.5% rate)
- Tax rate application by visa type
- Input validation
- Real-time result updates
- Form reset functionality

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization Guide

### Change Colors
Edit the CSS custom properties in `assets/css/style.css`:
```css
:root {
    --primary-color: #0d6efd;
    --success-color: #198754;
    --warning-color: #ffc107;
    /* ... etc */
}
```

### Update Contact Information
Replace email and phone numbers throughout HTML files:
- `info@superkeeper.com` → your email
- `+61 000 000 000` → your phone number

### Modify Service Packages
Edit service details in `services.html`:
- Package names and descriptions
- Features included
- Pricing information
- Contact links

### Update Calculator Logic
Modify tax rates in `assets/js/calculator.js`:
```javascript
const taxRates = {
    'working': { rate: 0.35, label: 'Working Holiday (35%)' },
    // ... update as needed
};
```

## Calculator Explanation

The calculator works as follows:

1. **User Input**: Arrival year, departure year, annual salaries, visa types
2. **Year Range**: Automatically calculates financial years (e.g., 2022-2023)
3. **Superannuation Calculation**: 
   - Total Super = Sum of (Annual Salary × 10.5%)
4. **Tax Application**:
   - Tax Rate = Based on most common visa type
   - Tax Amount = Total Super × Tax Rate
5. **Net Withdrawal**:
   - Net Amount = Total Super - Tax Amount

## Tax Rates Reference

| Visa Type | Tax Rate |
|-----------|----------|
| Working Holiday (417/462) | 35% |
| Student Visa (500) | 35% |
| Skilled Visa (189/190/491) | 20% |
| Temporary Work (482) | 20% |
| Other | 35% |

## Deployment

### Deploy to Netlify
1. Create a Netlify account
2. Connect your GitHub repository
3. Deploy with one click

### Deploy to GitHub Pages
1. Push files to GitHub repository
2. Enable GitHub Pages in repository settings
3. Site is automatically published

### Deploy to Traditional Hosting
1. Upload all files to web server via FTP
2. Ensure all file paths are correct
3. Test across browsers

## Security Considerations

- No backend server required (static files only)
- No user data collection or storage
- Form submissions need backend processing (not included)
- All calculations are client-side
- Consider HTTPS for production deployment

## Performance Optimization

- Minified CSS and JavaScript recommended for production
- Images should be optimized (currently none, ready for images)
- Consider CDN for library dependencies
- Lazy loading available for future images

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Form labels properly associated
- Screen reader friendly

## Future Enhancements

Possible additions:
- Backend form submission
- User accounts and saved calculations
- Email notifications
- Payment processing
- Document upload
- Multi-language support
- Blog/articles section
- Testimonials carousel
- Video tutorials
- Live chat support

## Troubleshooting

### Calculator Not Working
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify Vue.js is loaded from CDN

### Styling Issues
- Clear browser cache (Ctrl+Shift+Del)
- Check if Bootstrap CDN is accessible
- Verify style.css path is correct

### Navigation Not Working
- Ensure all HTML files are in same directory
- Check file paths in href attributes
- Test in different browsers

## Support & Contact

For issues or questions:
- Email: info@superkeeper.com
- Phone: +61 000 000 000

## License

© 2025 SuperKeeper. All rights reserved.

---

**Disclaimer**: This website provides general information only and has been prepared without taking into account your specific objectives, financial situation or needs. Before making any financial decisions, please consult a licensed financial advisor or tax professional.
