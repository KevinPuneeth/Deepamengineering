import { useEffect, useState } from 'react';

type Page = 'Home' | 'About Us' | 'Our History' | 'Products' | 'Services' | 'Industries Served' | 'Contact Us' | 'Send An Enquiry';

const navItems: Page[] = ['Home', 'About Us', 'Our History', 'Products', 'Services', 'Industries Served', 'Contact Us'];
const products = [
  ['Aluminium Castings', '/resources/component-1.jpg'], ['Zinc Castings', '/resources/component-2.jpg'],
  ['Plastic Components', '/resources/component-3.jpg'], ['Assembled Items', '/resources/component-4.jpg'],
  ['Precision Machine Components', '/resources/component-5.jpg'], ['Carbon Brushes', '/resources/component-6.jpg'],
  ['Die Casting Components', '/resources/die-casting-6.jpg'], ['Die Casting Components', '/resources/die-casting-7.jpg'],
  ['Die Casting Components', '/resources/die-casting-8.jpg'], ['Die Casting Components', '/resources/die-casting-9.jpg'],
  ['Die Casting Components', '/resources/die-casting-10.jpg'], ['Die Casting Components', '/resources/die-casting-10a.jpg'],
  ['Die Casting Components', '/resources/die-casting-11.jpg'], ['Die Casting Components', '/resources/die-casting-11a.jpg'],
  ['Die Casting Components', '/resources/die-casting-12.jpg'], ['Die Casting Components', '/resources/die-casting-12a.jpg'],
  ['Die Casting Components', '/resources/die-casting-13.jpg'], ['Die Casting Components', '/resources/die-casting-14.jpg'],
  ['Die Casting Components', '/resources/die-casting-15.jpg'], ['Die Casting Components', '/resources/die-casting-16.jpg'],
  ['Die Casting Components', '/resources/die-casting-17.jpg'], ['Die Casting Components', '/resources/die-casting-18.jpg'],
  ['Die Casting Components', '/resources/die-casting-19.jpg'], ['Die Casting Components', '/resources/die-casting-20.jpg'],
];

const industries = ['Automobile', 'Appliance', 'Defence', 'Electronics', 'Electrical', 'Machinery Parts', 'Small Engine', 'Sports Equipment', 'Textiles', 'Aeronautical'];

function pageFromHash(): Page {
  const value = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  const map: Record<string, Page> = {
    '': 'Home', home: 'Home', landing: 'Home', 'about-us': 'About Us', 'our-history': 'Our History',
    products: 'Products', services: 'Services', 'industries-served': 'Industries Served',
    'contact-us': 'Contact Us', 'send-an-enquiry': 'Send An Enquiry',
  };
  return map[value] || 'Home';
}
function pathFor(page: Page) { return `#/${page.toLowerCase().replace(/ /g, '-')}`; }

function App() {
  const [page, setPage] = useState<Page>(pageFromHash);
  const [emailOptionsOpen, setEmailOptionsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => { setPage(pageFromHash()); window.scrollTo({ top: 0, behavior: 'auto' }); };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (target: Page) => { setMobileMenuOpen(false); window.location.hash = pathFor(target); };

  useEffect(() => {
    if (!emailOptionsOpen) return;
    const closeOnOutsideTap = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (target && !(target as Element).closest?.('.email-options') && !(target as Element).closest?.('.primary-btn')) setEmailOptionsOpen(false);
    };
    document.addEventListener('click', closeOnOutsideTap, true);
    document.addEventListener('touchstart', closeOnOutsideTap, true);
    return () => {
      document.removeEventListener('click', closeOnOutsideTap, true);
      document.removeEventListener('touchstart', closeOnOutsideTap, true);
    };
  }, [emailOptionsOpen]);

  const openEmail = (provider: 'gmail' | 'yahoo' | 'outlook' | 'default') => {
    const address = 'dee@deepameng.com';
    const subject = 'Deepamm Engineering Enquiry';
    const encodedAddress = encodeURIComponent(address);
    const encodedSubject = encodeURIComponent(subject);

    // Use each provider's compose/deep-link URL rather than its inbox URL.
    // These links open a new compose window/page when the visitor is signed in.
    if (provider === 'gmail') {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodedAddress}&su=${encodedSubject}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else if (provider === 'yahoo') {
      window.open(
        `https://compose.mail.yahoo.com/?to=${encodedAddress}&subject=${encodedSubject}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else if (provider === 'outlook') {
      window.open(
        `https://outlook.live.com/mail/0/deeplink/compose?to=${encodedAddress}&subject=${encodedSubject}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      window.location.href = `mailto:${address}?subject=${encodedSubject}`;
    }

    setEmailOptionsOpen(false);
  };

  const renderNav = (landing = false) => (
    <nav className={landing ? 'landing-navbar' : 'top-navbar'} aria-label="Primary navigation">
      <button className={landing ? 'landing-brand' : 'brand'} onClick={() => navigate('Home')} aria-label="Deepamm Engineering Enterprises home">
        <img src="/resources/Logo and Name- New.jpg" alt="Deepamm Engineering Enterprises" />
      </button>
      <div className="mobile-nav-details">
        <button type="button" className="mobile-nav-toggle" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(open => !open)}>☰</button>
        {mobileMenuOpen && <ul className="nav-menu mobile-open">
          {navItems.map(item => <li key={item} className="nav-item"><a href={pathFor(item)} className={page === item ? 'active' : ''} onClick={(event) => { event.preventDefault(); navigate(item); }}>{item}</a></li>)}
          <li className="nav-item enquiry-btn"><a href={pathFor('Send An Enquiry')} onClick={(event) => { event.preventDefault(); navigate('Send An Enquiry'); }}>Send An Enquiry</a></li>
        </ul>}
      </div>
      <ul className="nav-menu desktop-nav-menu">
        {navItems.map(item => <li key={item} className="nav-item"><a href={pathFor(item)} className={page === item ? 'active' : ''} onClick={(event) => { event.preventDefault(); navigate(item); }}>{item}</a></li>)}
        <li className="nav-item enquiry-btn"><a href={pathFor('Send An Enquiry')} onClick={(event) => { event.preventDefault(); navigate('Send An Enquiry'); }}>Send An Enquiry</a></li>
      </ul>
    </nav>
  );

  return <div className="site-shell"><main>
    {page === 'Home' && <section className="landing-page"><div className="landing-overlay" aria-hidden="true" />{renderNav(true)}<div className="text-container"><h1 className="main-title">Deepamm Engineering Enterprises</h1><div className="subtitle">PRECISION | INNOVATION | EXCELLENCE</div></div></section>}

    {page === 'About Us' && <section className="page about-company-page">{renderNav()}<div className="about-company-content"><div className="about-company-copy"><p className="eyebrow">ABOUT US <span /></p><h1>Engineering<br />Excellence<br />Since 1979</h1><p className="lead">A trusted manufacturing partner specialised in die casting, plastic components and precision machined components, based in Bangalore, India.</p><div className="about-highlights"><article><strong>40+ Years</strong><span>of Manufacturing Excellence</span></article><article><strong>India + Global</strong><span>Serving customers worldwide</span></article><article><strong>Quality Driven</strong><span>Committed to quality standards</span></article></div></div><div className="about-company-focus"><p className="eyebrow">OUR FOCUS <span /></p><h2>Precision Components<br />for a Better Tomorrow</h2><p>Deepamm Engineering Enterprises specialises in pressure die casting components in Aluminium and Zinc, along with Plastic Components and Precision Machined Components.</p><button className="text-link" onClick={() => navigate('Products')}>Explore products <span>→</span></button></div></div></section>}

    {page === 'Our History' && <section className="page history-page">{renderNav()}<div className="history-grid"><div className="history-copy"><p className="eyebrow">OUR HISTORY <span /></p><h1>Built on experience.<br />Driven by precision.</h1><p className="history-lead">Starting from precision manufacturing to a trusted engineering partner. Deepamm's journey has been shaped by craftsmanship, capability and commitment to quality.</p><div className="timeline"><article><strong>1979</strong><div><h3>The Beginning</h3><p>Late Mr. R. Chandrakumar, an engineer by profession, entered the manufacturing of precision die-casting components.</p></div></article><article><strong>1989</strong><div><h3>Deepamm Engineering Enterprises</h3><p>Mr. R. Chandrakumar and his wife, K. S. Maheswari, jointly established Deepamm Engineering Enterprises with a fully equipped Tool Room and Machine Shop.</p></div></article><article><strong>Today</strong><div><h3>Continuing the Journey</h3><p>Deepamm continues to deliver quality products and services to reputed organisations in India and international markets, supported by skilled professionals and stringent quality standards.</p></div></article></div></div></div></section>}

    {page === 'Products' && <section className="page standard-page soft-page products-page">{renderNav()}<div className="products-layout"><div className="products-gallery"><div className="page-heading"><p className="eyebrow">OUR PRODUCTS <span /></p><h1>Precision components for demanding applications.</h1><p>Capabilities include - die casting, machined, plastic and assembled components.</p></div><div className="product-grid">{products.map(([name, image]) => <article className="product-card" key={`${name}-${image}`}><div className="product-image"><img src={image} alt={name} /></div></article>)}</div></div><div className="showcase-box" aria-label="3D product showcase"><h2>Product Showcase</h2><div className="component-frame"><img src="/resources/component1.png" alt="Deepamm engineering component" /></div></div></div></section>}

    {page === 'Services' && <section className="page standard-page services-page internal-standard-page">{renderNav()}<div className="services-heading page-heading"><p className="eyebrow">OUR SERVICES <span /></p><h1>From tool design to fully finished / assembled product.</h1></div><div className="service-grid">
      <article className="service-card"><div className="service-card-copy"><h3>Tool Design & Manufacturing</h3><p>Tooling support for component development and production.</p></div><div className="service-card-image"><img src="/resources/tool-1b.png" alt="Tooling and die for component production" /></div></article>
      <article className="service-card"><div className="service-card-copy"><h3>Component Production</h3><p>Pressure die casting, gravity die casting and sand casting.</p></div><div className="service-card-image"><img src="/resources/die-casting-11a-service.jpg" alt="Precision die-cast component" /></div></article>
      <article className="service-card"><div className="service-card-copy"><h3>Secondary Operations</h3><p>Fettling, drilling, tapping, sand blasting, vibro finishing and related operations.</p></div><div className="service-card-image"><img src="/resources/secondary-operations-drilling.png" alt="Secondary operations drilling" /></div></article>
      <article className="service-card"><div className="service-card-copy"><h3>Surface Treatment & Assembly</h3><p>Plating, anodizing, chromotization, passivation, heat treatment and assembly.</p></div><div className="service-card-image"><img src="/resources/plated-component.png" alt="Plated components" /></div></article>
    </div></section>}

    {page === 'Industries Served' && <section className="page standard-page soft-page industries-page internal-standard-page">{renderNav()}<div className="industries-hero"><div className="industries-copy"><p className="eyebrow">INDUSTRIES SERVED <span /></p><h1>Engineering for diverse industries.</h1><p>Deepamm Engineering Enterprises supplies precision die-cast, plastic and machined components, catering to various fields.</p><div className="industries-highlights"><div><b>Precision Manufacturing</b><span>Consistent quality and accuracy</span></div><div><b>Long-term Partnerships</b><span>Supporting customer requirements</span></div></div></div><div className="industries-motif" aria-hidden="true"><div className="motif-label">COMPONENTS THAT POWER<br />INDUSTRIES WORLDWIDE</div><div className="motif-rule" /><div className="motif-dots" /><p>Different industries.<br /><em>A common trust.</em></p></div></div><div className="industries-section-label"><p className="eyebrow">OUR SERVICES <span /></p></div><div className="industry-grid">{industries.map((item) => <article key={item}><strong>{item}</strong></article>)}</div><div className="customer-strip"><div className="customer-strip-title"><span>COMPANIES WE HAVE SUPPLIED TO</span><i /></div><div className="customer-marquee"><div className="customer-track"><span className="customer-logo"><img src="https://svgbrand.com/uploads/images/webp/202311/SVG_Brand_beml_limited.webp" alt="BEML" /></span><span className="customer-logo"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/BHEL_logo.svg" alt="BHEL" /></span><span className="customer-logo kttm">KTTM<br /><small>Kirloskar Toyoda<br />Textile Machinery</small></span><span className="customer-logo kirloskar">Kirloskar<br />Electric</span><span className="customer-logo"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Amphenol_Logo.svg" alt="Amphenol" /></span><span className="customer-logo"><img src="https://companieslogo.com/img/orig/ASHOKLEY.NS_BIG-31b899b0.png?download=true&t=1744907986" alt="Ashok Leyland" /></span><span className="customer-logo united">UNITED<br />ELECTRICALS</span><span className="customer-logo"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Pricol_logo.png" alt="Pricol" /></span><span className="customer-logo qasco">QASCO<br /><small>QATAR</small></span><span className="customer-logo peck">Peck & Hale</span><span className="customer-logo"><img src="https://svgbrand.com/uploads/images/webp/202311/SVG_Brand_beml_limited.webp" alt="BEML" /></span><span className="customer-logo"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/BHEL_logo.svg" alt="BHEL" /></span><span className="customer-logo kttm">KTTM<br /><small>Kirloskar Toyoda<br />Textile Machinery</small></span><span className="customer-logo kirloskar">Kirloskar<br />Electric</span><span className="customer-logo"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Amphenol_Logo.svg" alt="Amphenol" /></span><span className="customer-logo"><img src="https://companieslogo.com/img/orig/ASHOKLEY.NS_BIG-31b899b0.png?download=true&t=1744907986" alt="Ashok Leyland" /></span><span className="customer-logo united">UNITED<br />ELECTRICALS</span><span className="customer-logo"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Pricol_logo.png" alt="Pricol" /></span><span className="customer-logo qasco">QASCO<br /><small>QATAR</small></span><span className="customer-logo peck">Peck & Hale</span></div></div></div></section>}

    {page === 'Contact Us' && <section className="page contact-page">{renderNav()}<div className="contact-content"><div className="contact-intro"><p className="eyebrow">CONTACT US <span /></p><h1>Let's discuss your requirement.</h1><p>Reach out with your enquiries, manufacturing requirements and business discussions.</p><button className="primary-btn" onClick={() => navigate('Send An Enquiry')}>Send an Enquiry <span>→</span></button></div><div className="contact-details"><div><small>COMPANY</small><h3>Deepamm Engineering Enterprises</h3></div><div><small>REGISTERED / CORRESPONDENCE ADDRESS</small><p>V.M. Meadows, Horamavu Main Road, Banaswadi, Bangalore 560113</p></div><div><small>FACTORY ADDRESS</small><p>Unit 8/2, Chinnaswamappa layout, Ashirwad Colony, Railway Parallel Road, Horamavu, Bangalore 560113</p></div><div><small>PHONE</small><a href="tel:+919886779238">+91 98867 79238</a></div><div><small>EMAIL</small><a href="mailto:dee@deepameng.com">dee@deepameng.com</a></div></div></div></section>}

    {page === 'Send An Enquiry' && <section className="page enquiry-page">{renderNav()}<div className="enquiry-card"><div className="enquiry-copy"><p className="eyebrow">SEND AN ENQUIRY <span /></p><h1>Tell us what you need.</h1><p>Share your component details and manufacturing requirements with the Deepamm team. Your email application will open with our enquiry address.</p><div className="enquiry-note"><strong>Deepamm Engineering Enterprises</strong><span>dee@deepameng.com</span><span>+91 98867 79238</span></div></div><div className="enquiry-action"><h2>Start your enquiry</h2><p>We welcome enquiries for die casting, plastic components, precision machining, tooling and assembly requirements.</p><button className="primary-btn" onClick={() => setEmailOptionsOpen(open => !open)}>Email Deepamm <span>→</span></button>{emailOptionsOpen && <div className="email-options" role="dialog" aria-label="Choose an email service"><strong>Open with</strong><button onClick={() => openEmail('gmail')}>Gmail</button><button onClick={() => openEmail('yahoo')}>Yahoo Mail</button><button onClick={() => openEmail('outlook')}>Outlook</button><button onClick={() => openEmail('default')}>Default mail app</button></div>}</div></div></section>}
  </main></div>;
}
export default App;
