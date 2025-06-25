// Page Components
// Export page components here as they are created

// Example:
// export { LandingPage } from './landing';
// export { LoginPage } from './auth/login';
// export { DashboardPage } from './dashboard';

// Placeholder export to prevent build errors
export {};

// Export all pages from this file
export { DocumentationPage } from "./DocumentationPage";

// Authentication & Landing
export { LandingPage } from "./LandingPage";
export { LoginPage } from "./LoginPage";
export { CorporateSignupPage } from "./CorporateSignupPage";

// Dashboard & Main Pages
export { DashboardPage } from "./DashboardPage";
export { InboxPage } from "./InboxPage";

// Settings & Profile
// export { SettingsPage } from './SettingsPage';

// Request Management
export { default as NewRequestWizard } from "./NewRequestWizard";
export { default as RequestListPage } from "./RequestListPage";
// export { ResultPage } from './ResultPage';
// export { ResultDetailPage } from './ResultDetailPage';

// Response & Consent
// export { ConsentPage } from './ConsentPage';
// export { RespondPage } from './RespondPage';

// Type definitions for page props
export interface PageProps {
  onNavigate?: (path: string) => void;
}
