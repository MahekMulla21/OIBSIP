# Personal Portfolio Website

A modern, responsive personal portfolio website built with HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean and professional design with smooth animations
- **Interactive Elements**: Hover effects, smooth scrolling, and animated skill bars
- **Contact Form**: Functional contact form with validation
- **Skills Section**: Visual representation of your technical skills
- **Projects Gallery**: Showcase your work with project cards
- **Social Media Integration**: Links to your social profiles

## Sections Included

1. **Navigation Bar**: Sticky navigation with smooth scrolling
2. **Hero Section**: Eye-catching introduction with your photo and brief description
3. **About Section**: Detailed information about yourself with statistics
4. **Skills Section**: Visual skill bars showing your proficiencies
5. **Projects Section**: Gallery of your work with project descriptions
6. **Contact Section**: Contact form and your contact information
7. **Footer**: Copyright and additional information

## Customization Guide

### 1. Personal Information

Replace the placeholder text in `index.html`:

- Update "Your Name" with your actual name
- Change "Web Developer & Designer" to your actual title
- Update the description text
- Add your email, phone, and location in the contact section

### 2. Images

Add your images to the `images/` folder:

- `profile.jpg`: Your profile picture (recommended: 300x300px, square)
- `about.jpg`: An image for the about section
- `project1.jpg`, `project2.jpg`, `project3.jpg`: Screenshots of your projects

### 3. Skills

Modify the skills section in `index.html`:

- Update skill names to match your expertise
- Adjust the `data-skill` percentages (0-100)
- Change the Font Awesome icons if needed

### 4. Projects

Update the project information:

- Replace project titles and descriptions
- Update the technology tags
- Add links to your GitHub repositories and live demos
- Replace project images

### 5. Contact Information

Update your contact details:

- Email address
- Phone number
- Location
- Social media links (LinkedIn, GitHub, Twitter, Instagram)

### 6. Resume

Add your resume as `resume.pdf` in the root directory, or update the link in the hero section.

### 7. Colors and Styling

Customize the color scheme in `styles.css`:

- Primary color: `#3498db` (blue)
- Secondary color: `#2c3e50` (dark blue)
- Accent color: `#f39c12` (orange)
- Background colors: `#f8f9fa` (light gray) and `white`

## Font Awesome Icons

This project uses Font Awesome 6 for icons. You can:

- Browse icons at: https://fontawesome.com/icons
- Replace icon classes in the HTML (e.g., `fas fa-envelope` for email icon)

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## File Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles.css         # CSS styles
├── script.js          # JavaScript functionality
├── resume.pdf         # Your resume (add this)
├── images/            # Image folder
│   ├── profile.jpg    # Your profile picture
│   ├── about.jpg      # About section image
│   ├── project1.jpg   # Project screenshots
│   ├── project2.jpg
│   └── project3.jpg
└── README.md          # This file
```

## Getting Started

1. **Add your images**: Place your profile picture and project images in the `images/` folder
2. **Update content**: Modify the HTML content with your personal information
3. **Customize colors**: Adjust the CSS colors to match your preference
4. **Add your resume**: Include your resume as `resume.pdf`
5. **Test**: Open `index.html` in a web browser to see your portfolio

## Tips for Images

- **Profile Picture**: Use a professional headshot, square aspect ratio (300x300px recommended)
- **Project Images**: Use screenshots or mockups of your projects (recommended: 600x400px)
- **About Image**: A professional or candid photo that represents you
- **Format**: JPG or PNG format recommended
- **Size**: Optimize images for web (keep file sizes under 500KB for better loading times)

## Deployment

You can deploy this portfolio to various hosting platforms:

### GitHub Pages (Free)

1. Create a GitHub repository
2. Upload your files
3. Go to Settings > Pages
4. Select source branch
5. Your site will be available at `username.github.io/repository-name`

### Netlify (Free)

1. Visit netlify.com
2. Drag and drop your project folder
3. Your site will be automatically deployed

### Vercel (Free)

1. Visit vercel.com
2. Import your GitHub repository
3. Your site will be automatically deployed

## Maintenance

- Regularly update your projects section with new work
- Keep your skills section current
- Update your resume periodically
- Ensure all links are working
- Test on different devices and browsers

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding! 🚀**

_Remember to personalize this portfolio to reflect your unique style and personality._
