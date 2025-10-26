import Image from 'next/image';

export default function Footer() {
  const footerLinks = {
    Product: [{name:'Dashboard', href: '#dashboard'}, {name:'Pricing', href: '#pricing'}, {name:'Documentation', href:'#docs'}],
    Company: [{name:'About', href: '#'}, {name:'Contact', href: '#'}],
    Legal: [{name:'Privacy', href: '#'}, {name:'Terms', href: '#'}],
  };

  return (
    <footer className="border-t border-border bg-subtle">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <Image
              src="/vektra-logo.svg"
              alt="Vektra"
              width={120}
              height={40}
              className="h-5 w-auto dark:invert mb-6 opacity-80"
            />
            <p className="text-sm text-muted font-light max-w-xs leading-relaxed">
              Production-ready code from natural language
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-medium text-muted/80 mb-4 tracking-wider uppercase">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground transition-colors duration-200 font-light"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-muted/70 font-light">
            &copy; {new Date().getFullYear()} Vektra. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted/70 font-light">
            <a href="#" className="hover:text-foreground transition-colors duration-200">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors duration-200">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
