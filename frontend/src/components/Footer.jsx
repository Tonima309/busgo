const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} BusGo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
