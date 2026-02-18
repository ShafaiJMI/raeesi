import Link from 'next/link';

const Footer = () => {
  const footerLinks = {
    shop: [
      { name: 'New Arrivals', href: '/new-arrivals' },
      { name: 'Best Sellers', href: '/best-sellers' },
      { name: 'Festive Collection', href: '/festive-collection' },
      { name: 'Wedding Collection', href: '/wedding-collection' },
    ],
    help: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faq' },
      { name: 'Shipping Policy', href: '/shipping' },
      { name: 'Returns & Exchanges', href: '/returns' },
    ],
    about: [
      { name: 'Our Story', href: '/about' },
      { name: 'Artisans', href: '/artisans' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Blog', href: '/blog' },
    ],
  };

  const paymentMethods = [
    'visa', 'mastercard', 'paypal', 'upi', 'cashondelivery'
  ];

  return (
    <footer className="bg-amber-900 text-amber-50">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Raeesi</h2>
            <p className="mb-4">
              Celebrating traditional craftsmanship with authentic ethnic wear and handcrafted decor since 2010.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'instagram', 'pinterest', 'youtube'].map((social) => (
                <Link 
                  key={social}
                  href={`https://${social}.com/ethnicbazaar`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-200"
                >
                  <span className="sr-only">{social}</span>
                  <img 
                    src={`/social/${social}.svg`} 
                    alt={social} 
                    className="h-6 w-6"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="hover:text-amber-200 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">
              Subscribe for exclusive offers and traditional styling tips.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l text-gray-800"
                required
              />
              <button 
                type="submit"
                className="bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded-r"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {paymentMethods.map((method) => (
            <img
              key={method}
              src={`/payments/${method}.svg`}
              alt={method}
              className="h-8"
            />
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-amber-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EthnicBazaar. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:underline">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-sm hover:underline">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;