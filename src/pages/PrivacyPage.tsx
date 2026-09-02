import { useEffect } from 'react';

export function PrivacyPage() {
  useEffect(() => {
    document.title = "Privacy Policy - Undetecta";
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      
      <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
        <p>Last updated: September 2, 2026</p>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
          <p>
            Undetecta is designed to be used without requiring a user account or signup. We do not collect personally identifiable information (PII) such as your name, email address, or phone number. The only data processed is the text you voluntarily submit into our tools for humanization or detection.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">2. How We Use It</h2>
          <p>
            The text you submit is used strictly for processing your request in real-time. We send this text to our secure third-party AI APIs to analyze or rewrite the content. We do not use your submitted text to train our own models, nor do we sell it to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Data Retention</h2>
          <p>
            We do not permanently store or log the text you submit. Once our API has processed your request and returned the result to your browser, the text is discarded from our active memory. 
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Third-Party Services</h2>
          <p>
            We use third-party services to keep Undetecta free and functional:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>AI APIs:</strong> We use secure third-party AI providers to process text.</li>
            <li><strong>Advertising:</strong> We partner with advertising networks like Google AdSense and Adsterra to display ads. These providers may collect technical data (like your IP address or browser type) to serve relevant ads.</li>
            <li><strong>Analytics:</strong> We use tools like Google Search Console to monitor our website's performance and search traffic.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Cookies</h2>
          <p>
            Our website uses cookies and similar tracking technologies primarily to deliver advertisements and analyze site traffic. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. You can manage or disable cookies through your browser settings at any time.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Children's Privacy</h2>
          <p>
            Our service is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us so we can delete it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Contact</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please reach out to the developer directly.
          </p>
        </section>
      </div>
    </main>
  );
}
