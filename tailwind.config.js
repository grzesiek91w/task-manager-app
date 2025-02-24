module.exports = {

    content: [
  
      "./src/**/*.{js,jsx,ts,tsx}", // Ścieżka do Twoich plików
  
    ],
  
    theme: {
  
      extend: {
        
      },
  
    },
  
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
    ],
  
  }
