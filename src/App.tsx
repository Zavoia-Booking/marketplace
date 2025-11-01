import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { hydrateSessionAction, closeAccountLinkModal, closeAccountLinkingModal } from './features/auth/actions';
import Header from './components/Header';
import AccountLinkModal from './components/AccountLinkModal';
import ReauthLinkModal from './components/ReauthLinkModal';

// Home & Search
import HomePage from './pages/home/index';
import SearchPage from './pages/search/index';

// Auth
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import VerifyAccountLinkPage from './pages/auth/verify-account-link';
import VerifyEmailPage from './pages/auth/verify-email';
import GoogleCallbackPage from './pages/auth/google-callback';

// Business
import BusinessDetailPage from './pages/business/detail/index';
import BusinessTeamPage from './pages/business/detail/team';

// Team
import TeamMemberPage from './pages/team/member';

// Profile
import ProfilePage from './pages/profile/index';
import ProfileSettingsPage from './pages/profile/settings';

// Booking
import BookingConfirmPage from './pages/booking/confirm';

// Business Info (Public)
import BusinessPricingPage from './pages/business-info/pricing';
import BusinessBenefitsPage from './pages/business-info/benefits';

// Category & Location
import CategoryPage from './pages/category/category';
import LocationPage from './pages/location/location';

// Blog
import BlogIndexPage from './pages/blog/index';
import BlogPostPage from './pages/blog/post';

// Legal
import PrivacyPolicyPage from './pages/legal/privacy';
import TermsOfServicePage from './pages/legal/terms';

// 404
import NotFoundPage from './pages/404/index';

import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const { isAccountLinkModalOpen, accountLinkUserDetails, isAccountLinkingModalOpen } = useAppSelector((state) => state.auth);

  // Hydrate session on app mount (check for existing refresh token)
  useEffect(() => {
    dispatch(hydrateSessionAction.request());
  }, [dispatch]);
  return (
    <Router>
      <Header />
      <Routes>
        {/* Home & Search */}
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-account-link" element={<VerifyAccountLinkPage />} />
        <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
        <Route path="/auth/callback" element={<GoogleCallbackPage />} />

        {/* Business Routes */}
        <Route path="/business/:businessId" element={<BusinessDetailPage />} />
        <Route path="/business/:businessId/team" element={<BusinessTeamPage />} />

        {/* Team Member Routes */}
        <Route path="/team/:memberId" element={<TeamMemberPage />} />

        {/* Profile Routes */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/settings" element={<ProfileSettingsPage />} />

        {/* Booking Routes */}
        <Route path="/booking/confirm" element={<BookingConfirmPage />} />

        {/* Business Info (Public Pages) */}
        <Route path="/business/pricing" element={<BusinessPricingPage />} />
        <Route path="/business/benefits" element={<BusinessBenefitsPage />} />

        {/* Category & Location */}
        <Route path="/category/:categorySlug" element={<CategoryPage />} />
        <Route path="/location/:locationSlug" element={<LocationPage />} />

        {/* Blog */}
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />

        {/* Legal */}
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />

        {/* 404 - Catch all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
      {/* Account Link Modal - for business owners adding marketplace access */}
      {isAccountLinkModalOpen && accountLinkUserDetails && (
        <AccountLinkModal
          isOpen={isAccountLinkModalOpen}
          userDetails={accountLinkUserDetails}
          onClose={() => dispatch(closeAccountLinkModal())}
        />
      )}

      {/* Reauth Link Modal - for linking Google to existing email account */}
      {isAccountLinkingModalOpen && (
        <ReauthLinkModal
          isOpen={isAccountLinkingModalOpen}
          onClose={() => dispatch(closeAccountLinkingModal())}
        />
      )}
    </Router>
  );
}

export default App;
