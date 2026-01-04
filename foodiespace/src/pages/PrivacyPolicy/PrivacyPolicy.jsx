import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <FaShieldAlt className="text-6xl mx-auto mb-4 opacity-90" />
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl opacity-90">
            Last updated: January 4, 2026
          </p>
        </div>
      </div>

      <div className="section-spacing bg-base-100">
        <div className="max-w-4xl mx-auto container-padding prose prose-lg max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>
              <p className="text-base opacity-80 leading-relaxed">
                Welcome to FoodieSpace ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">2. Information We Collect</h2>
              <h3 className="text-2xl font-semibold mb-3">2.1 Personal Information</h3>
              <p className="text-base opacity-80 leading-relaxed mb-4">
                We collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our products and services, or otherwise contact us. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 opacity-80">
                <li>Name and email address</li>
                <li>Profile picture and display name</li>
                <li>Reviews, ratings, and comments you post</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3 mt-6">2.2 Automatically Collected Information</h3>
              <p className="text-base opacity-80 leading-relaxed mb-4">
                When you visit our platform, we automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 opacity-80">
                <li>Browser type and version</li>
                <li>IP address</li>
                <li>Time zone settings</li>
                <li>Operating system and platform</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-base opacity-80 leading-relaxed mb-4">
                We use your personal information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 opacity-80">
                <li>To provide, operate, and maintain our platform</li>
                <li>To improve, personalize, and expand our platform</li>  
                <li>To process your reviews and manage your account</li>
                <li>To communicate with you about updates, newsletters, and promotional materials</li>
                <li>To prevent fraud and enhance security</li>
                <li>To analyze usage and trends to improve user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">4. Sharing Your Information</h2>
              <p className="text-base opacity-80 leading-relaxed mb-4">
                We do not sell or rent your personal information to third parties. We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 space-y-2 opacity-80">
                <li><strong>With your consent:</strong> We may share your information when you give us explicit permission</li>
                <li><strong>Service providers:</strong> We may share data with third-party vendors who perform services on our behalf</li>
                <li><strong>Legal obligations:</strong> We may disclose information if required by law or to protect rights and safety</li>
                <li><strong>Business transfers:</strong> Information may be transferred in connection with a merger or acquisition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">5. Data Security</h2>
              <p className="text-base opacity-80 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">6. Your Privacy Rights</h2>
              <p className="text-base opacity-80 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 opacity-80">
                <li>Access and review your personal data</li>
                <li>Request correction of inaccurate or incomplete data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">7. Cookies and Tracking</h2>
              <p className="text-base opacity-80 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our platform and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our platform.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">8. Third-Party Links</h2>
              <p className="text-base opacity-80 leading-relaxed">
                Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">9. Children's Privacy</h2>
              <p className="text-base opacity-80 leading-relaxed">
                Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">10. Changes to This Policy</h2>
              <p className="text-base opacity-80 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">11. Contact Us</h2>
              <p className="text-base opacity-80 leading-relaxed">
                If you have questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-base-200 p-6 rounded-xl mt-4">
                <p className="font-semibold mb-2">FoodieSpace Privacy Team</p>
                <p className="opacity-80">Email: privacy@foodiespace.com</p>
                <p className="opacity-80">Address: 123 Food Street, Culinary City, FC 12345</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
