import React from "react";

export const metadata = {
  title: "About Us | Classic Racks",
  description: "Learn about Classic Racks, established in 2007 in New Delhi. Discover our manufacturing infrastructure, facility capabilities, and quality control systems.",
};

export default function About() {
  return (
    <div className="about-container animate-fade">
      {/* Intro Header */}
      <section className="about-hero">
        <div className="container">
          <span className="badge">SINCE 2007</span>
          <h2>About Classic Racks</h2>
          <p>
            Established in the year 2007 in New Delhi, Classic Racks has grown into a leading manufacturer 
            and supplier of highly durable and fine-finished storage solutions.
          </p>
        </div>
      </section>

      {/* Main Profile */}
      <section className="section container profile-grid">
        <div className="profile-text">
          <h3>Our Journey & Company Profile</h3>
          <p>
            At Classic Racks, we believe in providing the best possible space utilization and product 
            accommodation to our customers. We manufacture different types of racks which are highly durable 
            and fine-finished, ensuring that retail stores and industrial warehouses achieve maximum density and visual appeal.
          </p>
          <p>
            Our extensive line of products includes Crockery Racks, L Shape Cash Desk Counters, Book Display 
            Shelves, Library Book Display Racks, Magazine Display Racks, Shopping Trolleys, SS Shopping Baskets, 
            Mild Steel Wall Side Racks, Wall Side Wall Mount Racks, Industrial Heavy Duty Racks, Grocery Display 
            Racks, and many more. Over the past two decades, we have remained committed to providing excellent service 
            and premium products to our clients across India.
          </p>
        </div>
        <div className="profile-stats">
          <div className="profile-stat-box">
            <h4>Verified Manufacturer</h4>
            <p>100% compliant and registered under GST No. 07ACDPH0124M1ZX.</p>
          </div>
          <div className="profile-stat-box">
            <h4>Uttam Nagar, Delhi</h4>
            <p>Centrally located manufacturing unit servicing the entire NCR region and countrywide shipments.</p>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="infra-section">
        <div className="container">
          <div className="infra-grid">
            <div className="infra-visual">
              <div className="infra-box-glow"></div>
              <div className="infra-card">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  color="var(--primary)"
                >
                  <path d="M22 10v6M2 10v6" />
                  <path d="M6 10h12v6H6z" />
                  <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
                  <path d="M9 16v4M15 16v4" />
                </svg>
                <h4>Advanced Factory Setup</h4>
                <p>Equipped with state-of-the-art machinery including sheet shearers, CNC presses, and welding bays.</p>
              </div>
            </div>
            <div className="infra-text">
              <span className="badge">Infrastructure & Facilities</span>
              <h3>Modern Manufacturing Facility</h3>
              <p>
                Our production unit in New Delhi houses high-capacity machinery that ensures precision bending, 
                shearing, and punching of cold-rolled steel sheets. This allows us to manufacture components 
                with zero deviation in sizing and structural integrity.
              </p>
              <ul className="infra-list">
                <li>
                  <strong>High-Speed Hydraulic Press:</strong> For uniform folding of shelves and column profiles.
                </li>
                <li>
                  <strong>Argon & Spot Welding:</strong> Guarantees high joint strength on wire baskets and brackets.
                </li>
                <li>
                  <strong>Electrostatic Paint Line:</strong> Integrated conveyor line for powder coating and oven baking.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Control Section */}
      <section className="section container quality-sec">
        <div className="section-header">
          <span className="badge">Quality Policy</span>
          <h2>High Standards of Quality Assurance</h2>
          <p>We source only high-grade raw materials to ensure durability and resistance to wear.</p>
        </div>

        <div className="grid-3">
          <div className="quality-point">
            <div className="point-number">01</div>
            <h4>Steel Strength Check</h4>
            <p>Every batch of CRCA (Cold Rolled Close Annealed) steel sheets undergoes thickness and tensile strength checks before going to the cutting floor.</p>
          </div>
          <div className="quality-point">
            <div className="point-number">02</div>
            <h4>Pre-Treatment Anti-Rust</h4>
            <p>All fabricated sheets undergo a 7-tank chemical pre-treatment (degreasing, phosphating, and de-rusting) to ensure powder coating binds tightly.</p>
          </div>
          <div className="quality-point">
            <div className="point-number">03</div>
            <h4>Load Capacity Testing</h4>
            <p>Sample batches of shelves and uprights are subjected to dead-weight loading tests to certify safety limits before shipment.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
