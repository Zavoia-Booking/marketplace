import { Card, CardContent } from '../../components/ui/card';
import { Shield } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="h-12 w-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-purple-100 text-lg">Last updated: November 23, 2024</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card>
          <CardContent className="p-8 prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-6">
              Welcome to our marketplace platform. We respect your privacy and are committed to 
              protecting your personal data. This privacy policy will inform you about how we look 
              after your personal data when you visit our platform and tell you about your privacy 
              rights and how the law protects you.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Data We Collect</h2>
            <p className="text-gray-600 mb-4">
              We may collect, use, store and transfer different kinds of personal data about you:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Identity Data: first name, last name, username</li>
              <li>Contact Data: email address, telephone numbers</li>
              <li>Financial Data: payment card details</li>
              <li>Transaction Data: details about payments and services you have booked</li>
              <li>Technical Data: internet protocol (IP) address, browser type and version</li>
              <li>Profile Data: your username and password, bookings made by you, your preferences</li>
              <li>Usage Data: information about how you use our platform and services</li>
              <li>Marketing and Communications Data: your preferences in receiving marketing</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Data</h2>
            <p className="text-gray-600 mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will 
              use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>To register you as a new customer</li>
              <li>To process and deliver your service bookings</li>
              <li>To manage our relationship with you</li>
              <li>To enable you to complete surveys or participate in competitions</li>
              <li>To administer and protect our business and platform</li>
              <li>To deliver relevant content and advertisements to you</li>
              <li>To use data analytics to improve our platform and services</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-600 mb-6">
              We have put in place appropriate security measures to prevent your personal data from 
              being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. 
              In addition, we limit access to your personal data to those employees, agents, contractors 
              and other third parties who have a business need to know.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
            <p className="text-gray-600 mb-6">
              We will only retain your personal data for as long as necessary to fulfil the purposes 
              we collected it for, including for the purposes of satisfying any legal, accounting, or 
              reporting requirements.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Legal Rights</h2>
            <p className="text-gray-600 mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to 
              your personal data, including the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about this privacy policy or our privacy practices, please 
              contact us at: privacy@marketplace.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

