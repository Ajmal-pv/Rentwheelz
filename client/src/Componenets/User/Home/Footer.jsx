import React from 'react';

function Footer() {
  return (
    <footer className=" bg-gray-950 text-white p-6 ">
      <div className="container mx-auto">
        <div className="flex flex-col w-full  md:flex-row md:justify-between">
          <div className="mb-6 md:mb-0 w-1/2">
           <h1 className='text-2xl'>RENT WHEELZ</h1>
            <p className="mt-2 text-sm">Providing quality rental cars since 2023.</p>
          </div>
          <div className="flex flex-wrap  justify-between  w-full">
            <div className="w-full md:w-1/2 lg:w-2/4 mb-4  md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
              <ul className="text-sm">
                <li className="mb-2"><a href="#">Home</a></li>
                <li className="mb-2"><a href="/cars">Cars</a></li>
                <li className="mb-2"><a href="#">Pricing</a></li>
                <li className="mb-2"><a href="#">About Us</a></li>
                <li className="mb-2"><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 lg:w-2/4 mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
              <p className="text-sm mb-2">BROTOTYPE</p>
              <p className="text-sm mb-2">KAKKANCHERRY, KERALA,670612</p>
              <p className="text-sm mb-2">Email: ajmalpv66@gmail.com</p>
              <p className="text-sm mb-2">Phone: +91 9061992112</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-4 text-sm text-center ">
          &copy; {new Date().getFullYear()} RENTWHEELZ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
