// import React from 'react';
// import './Footer.css';

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <p>&copy; 2024 Furniture Shop. All rights reserved.</p>
//       <nav>
//         <ul>
//           <li><a href="/terms">Terms of Service</a></li>
//           <li><a href="/privacy">Privacy Policy</a></li>
//         </ul>
//       </nav>
//     </footer>
//   );
// };

// export default Footer;


// Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-[#333] text-white py-8">
      <div className="container mx-auto text-center">
        <p className="mb-4">&copy; 2024 Laxmi Furniture. All rights reserved.</p>
        <nav>
          <ul className="flex justify-center gap-6">
            <li><a href="/terms" className="hover:text-[#e30217]">Terms of Service</a></li>
            <li><a href="/privacy" className="hover:text-[#e30217]">Privacy Policy</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
