import React from 'react'

function Footer() {

  const currentYear = new Date().getFullYear();
  
  return (

  <div className="min-auto flex flex-col bg-gray-100">
  <main className="flex-grow p-4">
    {/* Form or content goes here */}
  </main>

  <footer className="bg-[#333] text-white text-center p-1">
    &copy; {currentYear} Swarovski
  </footer>
</div>

    //<footer className='bg-[#333] justify-center items-center p-2 text-white text-center'>
    //    <p>Swarovski 2025.</p>
    //</footer>
  )
}

export default Footer