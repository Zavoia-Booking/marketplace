import { Card, CardContent } from '../../components/ui/card';
import { FileText } from 'lucide-react';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center gap-4 mb-4">
            <FileText className="h-12 w-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-purple-100 text-lg">Last updated: November 23, 2024</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card>
          <CardContent className="p-8 prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing and using this marketplace platform, you accept and agree to be bound by 
              the terms and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily access the platform for personal, non-commercial 
              transitory viewing only. This is the grant of a license, not a transfer of title, and 
              under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the platform</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <p className="text-gray-600 mb-6">
              When you create an account with us, you must provide information that is accurate, 
              complete, and current at all times. Failure to do so constitutes a breach of the Terms, 
              which may result in immediate termination of your account on our Service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Bookings and Payments</h2>
            <p className="text-gray-600 mb-4">
              All bookings made through our platform are subject to availability and confirmation. 
              We reserve the right to refuse any booking at our discretion. Payment terms include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>All prices are listed in USD unless otherwise stated</li>
              <li>Payment must be made at the time of booking</li>
              <li>We accept major credit cards and other payment methods as displayed</li>
              <li>Service providers set their own cancellation policies</li>
              <li>Refunds are subject to the service provider's cancellation policy</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Service Provider Responsibilities</h2>
            <p className="text-gray-600 mb-4">
              Service providers using our platform agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Provide accurate information about their services</li>
              <li>Maintain necessary licenses and insurance</li>
              <li>Honor all confirmed bookings</li>
              <li>Provide quality services as described</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disclaimer</h2>
            <p className="text-gray-600 mb-6">
              The materials on our platform are provided on an 'as is' basis. We make no warranties, 
              expressed or implied, and hereby disclaim and negate all other warranties including, 
              without limitation, implied warranties or conditions of merchantability, fitness for a 
              particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitations</h2>
            <p className="text-gray-600 mb-6">
              In no event shall our company or its suppliers be liable for any damages (including, 
              without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on our platform, even if we or 
              our authorized representative has been notified orally or in writing of the possibility 
              of such damage.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Governing Law</h2>
            <p className="text-gray-600 mb-6">
              These terms and conditions are governed by and construed in accordance with the laws 
              and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to modify these terms at any time. We will notify users of any 
              material changes via email or through a notice on our platform. Your continued use of 
              the platform after such modifications constitutes your acceptance of the updated terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about these Terms, please contact us at: legal@marketplace.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfServicePage;

