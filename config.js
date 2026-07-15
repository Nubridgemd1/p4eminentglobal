/* P4 Eminent Global — shared config.
   Defaults live here; the admin portal overrides them via localStorage ("p4-settings").
   Replace the PLACEHOLDER values with the real business details. */
window.P4_DEFAULTS = {
  brand: 'P4 Eminent Global',
  tagline: 'Your Global Service Partner',
  promise: "Instead of buying a new one, we fix it for you.",
  phone: '(347) 812-9270',
  email: 'samuel.jumbo@gmail.com',
  area: 'Houston, TX & surrounding areas',
  reviewUrl: '',        // Google review link — set in admin
  hours: 'Mon–Sat, 8:00 AM – 6:00 PM',
  site: 'p4eminentglobal.com',
};

window.P4 = (function () {
  const KEY = 'p4-settings';
  function get() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
    return Object.assign({}, window.P4_DEFAULTS, saved);
  }
  function save(patch) {
    const next = Object.assign({}, get(), patch);
    localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  }
  function telHref(p) { return 'tel:' + String(p || '').replace(/[^0-9+]/g, ''); }
  function isSet(v) { return !!(v && String(v).trim()); }
  return { KEY, get, save, telHref, isSet };
})();

/* Services + indicative quote ranges. Admin can edit these (localStorage "p4-services"). */
window.P4_SERVICES_DEFAULT = [
  { id: 'handyman', icon: '🛠️', name: 'Handyman & Repairs',
    blurb: 'Doors, drywall, fixtures, mounting, assembly, plumbing and general fixes around the home or office.',
    items: ['Door & lock repair', 'Drywall patching', 'TV & shelf mounting', 'Furniture assembly', 'Faucet & fixture swaps'],
    from: 75 },
  { id: 'electronics', icon: '🔌', name: 'Electronics Repair',
    blurb: 'Diagnostics and board-level repair for the devices you rely on — before you replace them.',
    items: ['TVs & monitors', 'Laptops & PCs', 'Audio equipment', 'Power supplies', 'Small consumer electronics'],
    from: 60 },
  { id: 'appliance', icon: '🧰', name: 'Appliance Restoration',
    blurb: 'Washers, dryers, microwaves and more — restored to working order instead of hauled to landfill.',
    items: ['Washers & dryers', 'Microwaves', 'Fridges & freezers', 'Cookers & ovens', 'Vacuums'],
    from: 90 },
  { id: 'equipment', icon: '⚙️', name: 'Equipment Servicing',
    blurb: 'Preventive servicing and restoration for tools, generators and light commercial equipment.',
    items: ['Generators', 'Power tools', 'Pumps & motors', 'Light commercial gear', 'Preventive servicing'],
    from: 120 },
];
