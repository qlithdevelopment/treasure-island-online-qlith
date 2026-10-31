import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Navigation,
  CheckCircle2,
} from "lucide-react";
import PageHero from "../../components/common/PageHero";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 4000);
  };

  return (
    <div className="w-full bg-white select-none overflow-hidden">
      <PageHero
        badge="Connect with Our Experts"
        badgeIcon={MessageSquare}
        title="Contact Us"
        subtitle="Have a question or looking for a property? Send us a message and our team will get back to you promptly."
      />

      <section className="bg-slate-50/70 px-4 sm:px-8 lg:px-10 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl w-full">
          <div className="grid gap-10 lg:gap-14 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F87907]">
                  Contact Information
                </span>
                <h2
                  className="mt-1 text-3xl sm:text-4xl font-serif font-bold text-[#0F172A] tracking-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  We are here to help you find your dream property
                </h2>
                <div className="flex items-center gap-1.5 mt-2.5 mb-4">
                  <span className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#F87907] to-[#F87907] rounded-full" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
                  <span className="w-2.5 h-2.5 rotate-45 bg-[#F87907] shadow-[0_0_8px_rgba(248,121,7,0.6)]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F87907]/60" />
                  <span className="w-12 h-[2px] bg-gradient-to-l from-transparent via-[#F87907] to-[#F87907] rounded-full" />
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Whether you are planning to purchase your dream home, invest in commercial property, or acquire prime land parcels in Bhubaneswar, our advisory team is at your service.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-[#F87907]/50 hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FFF4EB] to-orange-50 border border-[#F87907]/20 flex items-center justify-center text-[#F87907] shrink-0 shadow-xs">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#F87907] mb-0.5">
                      Our Location
                    </div>
                    <div className="text-sm sm:text-[15px] font-semibold text-slate-900 leading-snug">
                      Near KIIT University, Prasanti Vihar, Patia, Bhubaneswar
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-[#F87907]/50 hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FFF4EB] to-orange-50 border border-[#F87907]/20 flex items-center justify-center text-[#F87907] shrink-0 shadow-xs">
                    <Navigation size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#F87907] mb-0.5">
                      Find Us
                    </div>
                    <div className="text-sm text-slate-700 leading-relaxed">
                      406, Prasanti Vihar Rd, near KIIT University, Prasanti Vihar, Patia, Bhubaneswar, Odisha 751024
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-[#F87907]/50 hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FFF4EB] to-orange-50 border border-[#F87907]/20 flex items-center justify-center text-[#F87907] shrink-0 shadow-xs">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#F87907] mb-0.5">
                      Visit Us
                    </div>
                    <div className="text-sm sm:text-[15px] font-bold text-slate-900">
                      9am – 8pm
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Monday to Sunday
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <a
                  href="tel:+919348980948"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90 hover:border-[#F87907] hover:shadow-sm transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-orange-50 text-[#F87907] flex items-center justify-center shrink-0 group-hover:bg-[#F87907] group-hover:text-white transition-colors">
                    <Phone size={16} />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] text-slate-400 font-medium">Call or WhatsApp</div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-[#F87907] truncate">
                      +91 9348980948
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:sujit.masterjack@gmail.com"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200/90 hover:border-[#F87907] hover:shadow-sm transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-orange-50 text-[#F87907] flex items-center justify-center shrink-0 group-hover:bg-[#F87907] group-hover:text-white transition-colors">
                    <Mail size={16} />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] text-slate-400 font-medium">Direct Email</div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-[#F87907] truncate">
                      sujit.masterjack@gmail.com
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                <div className="mb-6">
                  <h3
                    className="text-2xl sm:text-3xl font-serif font-bold text-[#0F172A] tracking-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Get In Touch
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Please fill out the form below. Our property expert will reach out to you within a few hours.
                  </p>
                </div>

                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-xl font-bold font-serif text-slate-900 mb-2">
                      Thank you for contacting Treasure Island!
                    </h4>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      We have received your message and will connect with you shortly at your provided phone number or email.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700">
                        Name <span className="text-[#F87907]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="What's your name?"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#F87907] focus:bg-white focus:ring-2 focus:ring-[#F87907]/20 transition-all placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700">
                        Email <span className="text-[#F87907]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="What's your email?"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#F87907] focus:bg-white focus:ring-2 focus:ring-[#F87907]/20 transition-all placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700">
                        Phone <span className="text-[#F87907]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="What's your phone number?"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#F87907] focus:bg-white focus:ring-2 focus:ring-[#F87907]/20 transition-all placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700">
                        Message <span className="text-[#F87907]">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message. . . ."
                        rows={4}
                        required
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#F87907] focus:bg-white focus:ring-2 focus:ring-[#F87907]/20 transition-all placeholder:text-slate-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F87907] via-[#F86E00] to-[#EA580C] px-6 py-3.5 font-semibold text-sm text-white shadow-[0_8px_25px_rgba(248,121,7,0.35)] hover:shadow-[0_12px_32px_rgba(248,121,7,0.48)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                    >
                      <span>Send Message</span>
                      <Send size={16} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-t border-slate-200 bg-white">
        <div className="w-full h-[360px] sm:h-[420px] relative">
          <iframe
            title="Treasure Island Location Map"
            src="https://maps.google.com/maps?q=406,+Prasanti+Vihar+Rd,+near+KIIT+University,+Prasanti+Vihar,+Patia,+Bhubaneswar,+Odisha+751024&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 filter grayscale-[25%] contrast-[1.05]"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
}
