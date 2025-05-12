import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#333] text-white text-center p-1 w-full mt-auto">
      &copy; {currentYear} Swarovski
    </footer>
  )
}

export default Footer