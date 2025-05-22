// src/components/Features.tsx
const Features = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="mb-4 text-center">Features</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <i className="bi bi-lightning-charge-fill display-4 text-primary mb-3"></i>
            <h5>Fast Performance</h5>
            <p>Optimized with Vite for blazing-fast load times.</p>
          </div>
          <div className="col-md-4 mb-4">
            <i className="bi bi-shield-lock-fill display-4 text-primary mb-3"></i>
            <h5>Secure</h5>
            <p>Built with modern security best practices.</p>
          </div>
          <div className="col-md-4 mb-4">
            <i className="bi bi-brush-fill display-4 text-primary mb-3"></i>
            <h5>Customizable</h5>
            <p>Easily adapt components and styles to fit your brand.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
