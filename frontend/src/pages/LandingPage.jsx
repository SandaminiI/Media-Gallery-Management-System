import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import SharingImage from "../assets/sharing.jpeg";
import UploadImage from "../assets/upload.jpeg";
import GalleryImage from "../assets/gallery.jpeg";
import ZipImage from "../assets/zip.jpeg";

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div>
      {/* HERO */}
      <div className="bg-dark text-white">
        <div className="container py-5">
          <div className="row align-items-center g-4">
            {/* LEFT */}
            <div className="col-12 col-lg-7">
              <h1 className="display-5 fw-bold">
                Media Gallery Management System
              </h1>

              <p className="lead text-white-50 mt-3">
                Upload, organize, share, and download your images safely with a
                simple, modern dashboard experience.
              </p>

              <div className="d-flex gap-2 flex-wrap mt-4">
                {user ? (
                  <Link className="btn btn-primary btn-lg" to="/dashboard">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link className="btn btn-primary btn-lg" to="/register">
                      Get Started
                    </Link>
                    <Link className="btn btn-outline-light btn-lg" to="/login">
                      Login
                    </Link>
                  </>
                )}

                <Link className="btn btn-outline-light btn-lg" to="/shared">
                  View Shared Gallery
                </Link>
              </div>

              <div className="mt-4 small text-white-50">
                Secure auth • Role-based admin • File validations • ZIP export
              </div>
            </div>

            {/* RIGHT – FEATURE HIGHLIGHTS WITH IMAGES */}
            <div className="col-12 col-lg-5">
              <div className="card shadow-lg border-0">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">Why choose this system?</h5>

                  <ul className="list-unstyled mb-0">
                    <li className="mb-3 d-flex gap-2 align-items-start">
                      <span className="badge text-bg-primary">✓</span>
                      <div>
                        <div className="fw-semibold">Secure Authentication</div>
                        <div className="text-muted small">
                          JWT-based login with protected routes
                        </div>
                      </div>
                    </li>

                    <li className="mb-3 d-flex gap-2 align-items-start">
                      <span className="badge text-bg-primary">✓</span>
                      <div>
                        <div className="fw-semibold">Smart Gallery</div>
                        <div className="text-muted small">
                          Search, filter, edit metadata & organize media
                        </div>
                      </div>
                    </li>

                    <li className="mb-3 d-flex gap-2 align-items-start">
                      <span className="badge text-bg-primary">✓</span>
                      <div>
                        <div className="fw-semibold">Easy Sharing</div>
                        <div className="text-muted small">
                          Share media publicly with one click
                        </div>
                      </div>
                    </li>

                    <li className="d-flex gap-2 align-items-start">
                      <span className="badge text-bg-primary">✓</span>
                      <div>
                        <div className="fw-semibold">ZIP Downloads</div>
                        <div className="text-muted small">
                          Download multiple images as a ZIP
                        </div>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-4 d-flex flex-wrap gap-2 justify-content-center">
                    {/* <img
                      src={SharingImage}
                      alt="Sharing feature"
                      className="img-fluid rounded shadow-sm"
                    /> */}
                   
                  </div>
                </div>
              </div>
            </div>
            {/* END RIGHT */}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="container py-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Everything you need</h2>
          <p className="text-muted">
            Built for a smooth internship-ready demo experience.
          </p>
        </div>

        <div className="row g-3">
          <FeatureCard
            title="Upload & Validate"
            text="Upload JPG/PNG with file size checks and clean error messages."
            img={UploadImage}
          />
          <FeatureCard
            title="Gallery Management"
            text="Search, edit metadata, delete items, and keep everything organized."
            img={GalleryImage}
          />
          <FeatureCard
            title="Sharing"
            text="Toggle shared/private and allow others to view shared items."
            img={SharingImage}
          />
          <FeatureCard
            title="Download ZIP"
            text="Select multiple images and download as a single ZIP file."
            img={ZipImage}
          />
        </div>

        {/* CTA */}
        <div className="card mt-5 border-0 shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
            <div>
              <h5 className="fw-bold mb-1">Ready to try it?</h5>
              <div className="text-muted">
                Create your account and start uploading your gallery in minutes.
              </div>
            </div>

            <div className="d-flex gap-2">
              {user ? (
                <Link className="btn btn-primary" to="/dashboard">
                  Open Dashboard
                </Link>
              ) : (
                <>
                  <Link className="btn btn-primary" to="/register">
                    Register
                  </Link>
                  <Link className="btn btn-outline-dark" to="/login">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-top">
        <div className="container py-3 d-flex flex-column flex-md-row justify-content-between gap-2">
          <div className="text-muted small">
            © {new Date().getFullYear()} Media Gallery • Internship Project
          </div>
          <div className="small">
            <Link to="/contact" className="text-decoration-none">
              Contact
            </Link>
            <span className="mx-2 text-muted">|</span>
            <Link to="/shared" className="text-decoration-none">
              Shared Gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Feature Card ---------- */
function FeatureCard({ title, text, img }) {
  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="card h-100 shadow-sm">
        <img src={img} className="card-img-top" alt={title} />
        <div className="card-body">
          <div className="fw-bold">{title}</div>
          <div className="text-muted mt-2">{text}</div>
        </div>
      </div>
    </div>
  );
}
