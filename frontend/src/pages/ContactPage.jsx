import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <div className="container py-4" style={{ maxWidth: 700 }}>
      <h3 className="mb-3">Contact Us</h3>
      <ContactForm />
    </div>
  );
}
