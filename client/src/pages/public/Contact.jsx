
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form:", formData);
  };

  return (
    <section className="bg-bg-light px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        <div>
          <p className="font-semibold text-secondary">Contact Us</p>

          <h1 className="mt-3 text-4xl font-bold text-text">
            Let's Talk About Your Property
          </h1>

          <p className="mt-4 leading-7 text-text-light">
            Have a question or looking for a property? Send us a message
            and our team will get back to you.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-center gap-3 text-text-light">
              <Mail className="text-primary" size={20} />
              <span>info@example.com</span>
            </div>

            <div className="flex items-center gap-3 text-text-light">
              <Phone className="text-primary" size={20} />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-3 text-text-light">
              <MapPin className="text-primary" size={20} />
              <span>Bhubaneswar, Odisha</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-bg-light bg-bg p-8 shadow-sm"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-text">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full rounded-lg border border-bg-light bg-bg-light px-4 py-3 text-text outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-bg-light bg-bg-light px-4 py-3 text-text outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              rows={4}
              required
              className="w-full resize-none rounded-lg border border-bg-light bg-bg-light px-4 py-3 text-text outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Send Message <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
