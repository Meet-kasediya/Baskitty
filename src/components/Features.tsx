export default function Features() {
  return (
    <section className="py-5 bg-light text-center">
      <div className="container">
        <h2 className="mb-4">Features</h2>
        <div className="row">
          <div className="col-md-4">
            <h4>Fast</h4>
            <p>Blazing fast React + Vite + Bootstrap app.</p>
          </div>
          <div className="col-md-4">
            <h4>Modern</h4>
            <p>Built with modern tech: Vite, TypeScript, React 19.</p>
          </div>
          <div className="col-md-4">
            <h4>Deployable</h4>
            <p>Easily deploy to platforms like Railway with zero config.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
