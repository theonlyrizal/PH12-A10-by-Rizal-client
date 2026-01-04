import React from 'react';
import { FaFileContract } from 'react-icons/fa';

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <FaFileContract className="text-6xl mx-auto mb-4 opacity-90" />
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl opacity-90">
            Last updated: January 4, 2026
          </p>
        </div>
      </div>

      <div className="section-spacing bg-base-100">
        <div className="max-w-4xl mx-auto container-padding prose prose-lg max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-base opacity-80 leading-relaxed">
                By accessing or using FoodieSpace ("Platform", "we", "us", "our"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">2. User Accounts</h2>
              <h3 className="text-2xl font-semibold mb-3">2.1 Account Creation</h3>
              <p className="text-base opacity-80 leading-relaxed mb-4">
                To use certain features of the Platform, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 opacity-80">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3 mt-6">2.2 Account Termination</h3>
              <p className="text-base opacity-80 leading-relaxed">
                We reserve the right to terminate or suspend your account at any time, without prior notice, for violating these Terms or for any other reason we deem appropriate.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">3. User Content and Conduct</h2>
              <h3 className="text-2xl font-semibold mb-3">3.1 Review Guidelines</h3>
              <p className="text-base opacity-80 leading-relaxed mb-4">
                When posting reviews, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 opacity-80">
                <li>Provide honest and accurate reviews based on your genuine experience</li>
                <li>Not post fake, misleading, or fraudulent reviews</li>
                <li>Not post reviews in exchange for compensation</li>
                <li>Not engage in review manipulation or abuse</li>
                <li>Respect intellectual property rights</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3 mt-6">3.2 Prohibited Content</h3>
              <p className="text-base opacity-80 leading-relaxed mb-4">
                You may not post content that:
              </p>
              <ul className="list-disc pl-6 space-y-2 opacity-80">
                <li>Is illegal, harmful, threatening, abusive, or harassing</li>
                <li>Contains hate speech, discrimination, or violence</li>
                <li>Violates privacy rights or contains personal information of others</li>
                <li>Is sexually explicit or pornographic</li>
                <li>Contains spam, advertising, or promotional material</li>
                <li>Infringes on intellectual property rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">4. Intellectual Property Rights</h2>
              <h3 className="text-2xl font-semibold mb-3">4.1 Platform Content</h3>
              <p className="text-base opacity-80 leading-relaxed">
                The Platform and its original content, features, and functionality are owned by FoodieSpace and are protected by international copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-6">4.2 User Content License</h3>
              <p className="text-base opacity-80 leading-relaxed">
                By posting content on the Platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and display such content for the purpose of operating and promoting the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">5. Disclaimers and Limitations</h2>
              <h3 className="text-2xl font-semibold mb-3">5.1 "As Is" Service</h3>
              <p className="text-base opacity-80 leading-relaxed">
                The Platform is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the Platform's operation, content, or availability.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-6">5.2 Limitation of Liability</h3>
              <p className="text-base opacity-80 leading-relaxed">
                To the maximum extent permitted by law, FoodieSpace shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Platform.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-6">5.3 Third-Party Content</h3>
              <p className="text-base opacity-80 leading-relaxed">
                We are not responsible for the accuracy, reliability, or completeness of user-generated reviews. Users rely on reviews at their own risk.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">6. Indemnification</h2>
              <p className="text-base opacity-80 leading-relaxed">
                You agree to indemnify and hold harmless FoodieSpace, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the Platform or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">7. Dispute Resolution</h2>
              <p className="text-base opacity-80 leading-relaxed">
                Any disputes arising from these Terms or your use of the Platform will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. You waive your right to participate in class action lawsuits.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">8. Modifications to Terms</h2>
              <p className="text-base opacity-80 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the revised Terms on the Platform. Your continued use after such changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">9. Governing Law</h2>
              <p className="text-base opacity-80 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">10. Severability</h2>
              <p className="text-base opacity-80 leading-relaxed">
                If any provision of these Terms is found to be unlawful, void, or unenforceable, that provision shall be deemed severable and shall not affect the validity and enforceability of the remaining provisions.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">11. Contact Information</h2>
              <p className="text-base opacity-80 leading-relaxed">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-base-200 p-6 rounded-xl mt-4">
                <p className="font-semibold mb-2">FoodieSpace Legal Team</p>
                <p className="opacity-80">Email: legal@foodiespace.com</p>
                <p className="opacity-80">Address: 123 Food Street, Culinary City, FC 12345</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
