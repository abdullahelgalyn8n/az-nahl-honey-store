import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { theme, lang, showToast } = useStore();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [submittedMessages, setSubmittedMessages] = useState<
    {
      id: string;
      name: string;
      phone: string;
      subject: string;
      message: string;
      createdAt: string;
    }[]
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setError(
        lang === 'ar'
          ? 'يرجى إدخال الاسم ورقم الهاتف ونص الرسالة لإرسال طلبك.'
          : 'Please fill in your name, phone number, and message.'
      );
      return;
    }

    setError(null);
    const newMsg = {
      id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      subject:
        formData.subject.trim() ||
        (lang === 'ar' ? 'استفسار عام / طلب جملة' : 'General Inquiry'),
      message: formData.message.trim(),
      createdAt: new Date().toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setSubmittedMessages((prev) => [newMsg, ...prev]);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    showToast(
      lang === 'ar'
        ? 'تم إرسال رسالتك بنجاح! سيتواصل معك فريق خدمة عملاء نهل قريباً.'
        : 'Your message has been sent! Our support team will contact you shortly.'
    );
  };

  return (
    <div className="pb-0">
      {/* 1. Hero Banner (Matches Contact Screenshot) */}
      <section className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden">
        <img
          src="/assets/banners/contact-hero.jpg"
          alt={lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
              {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h1>
            <p className="text-sm sm:text-base text-stone-100 mt-2 font-medium">
              {lang === 'ar'
                ? 'نحن هنا للإجابة على استفساراتك وطلبات الجملة والوكلاء'
                : 'We are here to answer your questions and wholesale inquiries'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Contact Info Cards & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Right Column in RTL: Contact Information (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h2
              className={`text-xl font-black mb-4 ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}
            >
              {lang === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
            </h2>

            {/* Card 1: Customer Service */}
            <div
              className={`p-5 rounded-2xl border flex items-start gap-4 ${
                isDark
                  ? 'bg-[#221F1B] border-stone-800'
                  : 'bg-white border-stone-200/90 shadow-xs'
              }`}
            >
              <div className="w-11 h-11 rounded-full bg-amber-500/15 text-[#E5A812] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3
                  className={`text-sm font-black ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}
                >
                  {lang === 'ar' ? 'خدمة العملاء' : 'Customer Service'}
                </h3>
                <a
                  href="tel:01011878508"
                  className={`block text-sm font-bold mt-1 tabular-nums ${
                    isDark ? 'text-stone-300' : 'text-stone-700'
                  }`}
                >
                  01011878508
                </a>
                <a
                  href="https://wa.me/201011878508"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-xs font-bold text-emerald-500 hover:underline mt-1"
                >
                  {lang === 'ar' ? 'واتساب مباشر' : 'Direct WhatsApp'}
                </a>
              </div>
            </div>

            {/* Card 2: Sales & Wholesale */}
            <div
              className={`p-5 rounded-2xl border flex items-start gap-4 ${
                isDark
                  ? 'bg-[#221F1B] border-stone-800'
                  : 'bg-white border-stone-200/90 shadow-xs'
              }`}
            >
              <div className="w-11 h-11 rounded-full bg-amber-500/15 text-[#E5A812] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3
                  className={`text-sm font-black ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}
                >
                  {lang === 'ar' ? 'المشتريات والجملة' : 'Sales & Wholesale'}
                </h3>
                <a
                  href="tel:01118831877"
                  className={`block text-sm font-bold mt-1 tabular-nums ${
                    isDark ? 'text-stone-300' : 'text-stone-700'
                  }`}
                >
                  01118831877
                </a>
              </div>
            </div>

            {/* Card 3: Location */}
            <div
              className={`p-5 rounded-2xl border flex items-start gap-4 ${
                isDark
                  ? 'bg-[#221F1B] border-stone-800'
                  : 'bg-white border-stone-200/90 shadow-xs'
              }`}
            >
              <div className="w-11 h-11 rounded-full bg-amber-500/15 text-[#E5A812] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3
                  className={`text-sm font-black ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}
                >
                  {lang === 'ar' ? 'الموقع' : 'Location'}
                </h3>
                <a
                  href="#cairo-map"
                  className={`block text-xs font-medium mt-1 hover:text-amber-500 ${
                    isDark ? 'text-stone-400' : 'text-stone-600'
                  }`}
                >
                  {lang === 'ar'
                    ? 'القاهرة - عرض على الخريطة بالأسفل'
                    : 'Cairo, Egypt - View on map below'}
                </a>
              </div>
            </div>

            {/* Card 4: Working Hours */}
            <div
              className={`p-5 rounded-2xl border flex items-start gap-4 ${
                isDark
                  ? 'bg-[#221F1B] border-stone-800'
                  : 'bg-white border-stone-200/90 shadow-xs'
              }`}
            >
              <div className="w-11 h-11 rounded-full bg-amber-500/15 text-[#E5A812] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3
                  className={`text-sm font-black ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}
                >
                  {lang === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                </h3>
                <p
                  className={`text-xs font-medium mt-1 ${
                    isDark ? 'text-stone-400' : 'text-stone-600'
                  }`}
                >
                  {lang === 'ar' ? 'السبت - الخميس' : 'Saturday - Thursday'}
                </p>
                <p
                  className={`text-xs font-bold mt-0.5 tabular-nums ${
                    isDark ? 'text-stone-300' : 'text-stone-700'
                  }`}
                >
                  {lang === 'ar' ? '9:00 ص - 6:00 م' : '9:00 AM - 6:00 PM'}
                </p>
              </div>
            </div>

            {/* Social Follow */}
            <div className="pt-2">
              <span
                className={`block text-xs font-black mb-2.5 ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}
              >
                {lang === 'ar' ? 'تابعنا وتواصل معنا' : 'Connect With Us'}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/201011878508"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href="tel:01011878508"
                  aria-label="Phone Call"
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Left Column in RTL: Contact Form (8 cols) */}
          <div className="lg:col-span-8">
            <div
              className={`p-6 sm:p-8 rounded-3xl border ${
                isDark
                  ? 'bg-[#221F1B] border-stone-800 text-white'
                  : 'bg-white border-stone-200/90 text-stone-900 shadow-sm'
              }`}
            >
              <h2 className="text-xl font-black mb-6">
                {lang === 'ar' ? 'أرسل لنا رسالة' : 'Send Us a Message'}
              </h2>

              {error && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-500 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className={`block text-xs font-bold mb-1.5 ${
                        isDark ? 'text-stone-300' : 'text-stone-700'
                      }`}
                    >
                      {lang === 'ar' ? 'الاسم' : 'Full Name'} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder={
                        lang === 'ar' ? 'أدخل اسمك' : 'Enter your name'
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none ${
                        isDark
                          ? 'bg-[#161411] border-stone-700 text-white focus:border-amber-400'
                          : 'bg-stone-50 border-stone-300 text-stone-900 focus:bg-white focus:border-amber-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className={`block text-xs font-bold mb-1.5 ${
                        isDark ? 'text-stone-300' : 'text-stone-700'
                      }`}
                    >
                      {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder={
                        lang === 'ar'
                          ? 'أدخل بريدك الإلكتروني'
                          : 'Enter your email'
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none ${
                        isDark
                          ? 'bg-[#161411] border-stone-700 text-white focus:border-amber-400'
                          : 'bg-stone-50 border-stone-300 text-stone-900 focus:bg-white focus:border-amber-600'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className={`block text-xs font-bold mb-1.5 ${
                        isDark ? 'text-stone-300' : 'text-stone-700'
                      }`}
                    >
                      {lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'} *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder={
                        lang === 'ar'
                          ? 'أدخل رقم هاتفك'
                          : 'Enter your phone number'
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none ${
                        isDark
                          ? 'bg-[#161411] border-stone-700 text-white focus:border-amber-400'
                          : 'bg-stone-50 border-stone-300 text-stone-900 focus:bg-white focus:border-amber-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className={`block text-xs font-bold mb-1.5 ${
                        isDark ? 'text-stone-300' : 'text-stone-700'
                      }`}
                    >
                      {lang === 'ar' ? 'الموضوع' : 'Subject'}
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder={
                        lang === 'ar' ? 'موضوع الرسالة' : 'Message subject'
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none ${
                        isDark
                          ? 'bg-[#161411] border-stone-700 text-white focus:border-amber-400'
                          : 'bg-stone-50 border-stone-300 text-stone-900 focus:bg-white focus:border-amber-600'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className={`block text-xs font-bold mb-1.5 ${
                      isDark ? 'text-stone-300' : 'text-stone-700'
                    }`}
                  >
                    {lang === 'ar' ? 'الرسالة' : 'Message'} *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={
                      lang === 'ar'
                        ? 'اكتب رسالتك أو تفاصيل طلب الجملة هنا...'
                        : 'Write your message or wholesale request details here...'
                    }
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none ${
                      isDark
                        ? 'bg-[#161411] border-stone-700 text-white focus:border-amber-400'
                        : 'bg-stone-50 border-stone-300 text-stone-900 focus:bg-white focus:border-amber-600'
                    }`}
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl bg-[#E5A812] hover:bg-[#d4990c] text-stone-950 font-black text-xs sm:text-sm inline-flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
                  </button>
                </div>
              </form>

              {/* Submitted Messages Log */}
              {submittedMessages.length > 0 && (
                <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 space-y-3">
                  <h3 className="text-sm font-black text-emerald-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {lang === 'ar'
                        ? 'رسائلك المرسلة حديثاً'
                        : 'Your Sent Inquiries'}
                    </span>
                  </h3>
                  {submittedMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-2xl border text-xs space-y-1 ${
                        isDark
                          ? 'bg-[#161411] border-stone-800'
                          : 'bg-emerald-50/60 border-emerald-200'
                      }`}
                    >
                      <div className="flex justify-between font-bold">
                        <span>
                          {msg.subject} ({msg.id})
                        </span>
                        <span className="opacity-70">{msg.createdAt}</span>
                      </div>
                      <p className="opacity-85">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Full-Width Map Section (Matches Contact Screenshot) */}
      <section id="cairo-map" className="w-full h-80 sm:h-96 border-t border-stone-200 dark:border-stone-800">
        <iframe
          title="Nahl Trading Location Map - Cairo"
          src="https://www.openstreetmap.org/export/embed.html?bbox=31.2150%2C30.0350%2C31.2550%2C30.0550&layer=mapnik&marker=30.0444%2C31.2357"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </section>
    </div>
  );
};
