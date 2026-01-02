import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, Loader2, CheckCircle } from 'lucide-react';

const API_BASE = 'http://localhost:8000/api/v1';

export function ContactPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    ticketNumber?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitResult({
          success: true,
          message: data.message,
          ticketNumber: data.data?.ticket_number,
        });
        // Reset form
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmitResult({
          success: false,
          message: data.message || 'Failed to send message. Please try again.',
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: 'Network error. Please check your connection and try again.',
      });
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'support@luxe.com',
      action: 'mailto:support@luxe.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: '123 Fashion Ave, NY 10001',
      action: '#',
    },
    {
      icon: Clock,
      title: 'Hours',
      details: 'Mon-Fri: 9AM-6PM EST',
      action: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl mb-6"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl"
          >
            We're here to help and answer any question you might have
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl mb-6">Send us a Message</h2>

            {/* Success Message */}
            {submitResult?.success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3"
              >
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-800 font-medium">{submitResult.message}</p>
                  {submitResult.ticketNumber && (
                    <p className="text-green-700 text-sm mt-1">
                      Your ticket number: <span className="font-semibold">{submitResult.ticketNumber}</span>
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {submitResult && !submitResult.success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
              >
                <p className="text-red-800">{submitResult.message}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />

              <select
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="">Select Subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Order Support">Order Support</option>
                <option value="Product Question">Product Question</option>
                <option value="Partnership">Partnership</option>
              </select>

              <textarea
                rows={6}
                placeholder="Your Message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
              ></textarea>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-8">
                Fill up the form and our team will get back to you within 24 hours,
                or reach out to us directly through the following channels.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={index}
                    href={info.action}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-gray-900">{info.title}</h3>
                      <p className="text-gray-600">{info.details}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Map */}
            <div className="mt-8 aspect-video bg-gray-200 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1553775282-20af80779df7?w=800"
                alt="Map"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to questions you may have</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: 'What is your return policy?',
                a: 'We offer a 30-day return policy for all unused items in original packaging.',
              },
              {
                q: 'How long does shipping take?',
                a: 'Standard shipping takes 3-5 business days. Express shipping is available.',
              },
              {
                q: 'Do you ship internationally?',
                a: 'Yes, we ship to over 50 countries worldwide with various shipping options.',
              },
              {
                q: 'How can I track my order?',
                a: 'You will receive a tracking number via email once your order ships.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <h3 className="mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
