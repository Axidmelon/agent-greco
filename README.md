# ComplianceCheck - Greenwashing Compliance Prototype

A modern, intuitive frontend prototype for helping direct-to-consumer brands comply with India's greenwashing guidelines. Built with React, TypeScript, and Tailwind CSS.

## 📋 Project Overview

ComplianceCheck provides a comprehensive solution for brands to:
- **Scan websites** for greenwashing compliance issues using AI agents
- **Generate compliant content** from non-compliant copy using RAG technology
- **Monitor compliance** with an intuitive dashboard interface
- **Track progress** with detailed analytics and reporting

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd compliance-checker

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🔌 Backend Integration Guide

This frontend is designed to integrate with AI-powered backend services. Here's how to connect each component:

### 1. Google OAuth Integration

**Location**: `src/components/Layout.tsx`

**Implementation needed**:
```typescript
// Replace the placeholder authentication logic
const handleSignOut = () => {
  // TODO: Implement Google OAuth sign out
  // Example: googleAuth.signOut()
}

// Add sign-in functionality
const handleSignIn = () => {
  // TODO: Implement Google OAuth sign in
  // Example: googleAuth.signIn()
}
```

**Setup Steps**:
1. Create Google OAuth 2.0 credentials
2. Install Google OAuth library: `npm install @google-cloud/identity`
3. Configure OAuth client ID in environment variables
4. Update Layout component with actual authentication state

### 2. Scan Agent API Integration

**Location**: `src/pages/ScanPage.tsx` - `handleSingleScan()` function

**API Endpoint Format**:
```typescript
// Replace the mock API call with actual endpoint
const scanResponse = await fetch('/api/scan', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userToken}`
  },
  body: JSON.stringify({
    url: singleUrl,
    scanType: 'single', // or 'deep-crawl'
    userId: user.id
  })
});

const scanData = await scanResponse.json();
```

**Expected Response Format**:
```typescript
interface ScanResult {
  url: string;
  overallScore: number;
  issues: Array<{
    type: string;
    severity: 'High' | 'Medium' | 'Low';
    description: string;
    location: string;
  }>;
  compliantSections: string[];
  recommendations: string[];
  timestamp: string;
}
```

### 3. Content Generation (RAG) API Integration

**Location**: `src/pages/GeneratePage.tsx` - `handleGenerate()` function

**API Endpoint Format**:
```typescript
// Replace the mock API call
const generateResponse = await fetch('/api/generate-content', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userToken}`
  },
  body: JSON.stringify({
    originalContent: inputContent,
    userId: user.id,
    guidelines: 'india-greenwashing' // specify compliance standard
  })
});

const generatedData = await generateResponse.json();
```

**Expected Response Format**:
```typescript
interface GenerationResult {
  original: string;
  generated: string;
  improvements: string[];
  complianceScore: number;
  timestamp: string;
}
```

### 4. DynamoDB Integration

**Data Models Needed**:

**Scan Results Table**:
```typescript
interface ScanRecord {
  PK: string; // USER#{userId}
  SK: string; // SCAN#{timestamp}
  url: string;
  scanType: 'single' | 'deep-crawl';
  results: ScanResult;
  createdAt: string;
}
```

**Generated Content Table**:
```typescript
interface ContentRecord {
  PK: string; // USER#{userId}
  SK: string; // CONTENT#{timestamp}
  originalContent: string;
  generatedContent: string;
  improvements: string[];
  createdAt: string;
}
```

**Integration Points**:
- `src/pages/ScanPage.tsx`: Save scan results after successful scan
- `src/pages/GeneratePage.tsx`: Save generated content after creation
- `src/pages/Dashboard.tsx`: Fetch recent scans and statistics
- `src/pages/Settings.tsx`: Fetch usage statistics

## 🎯 State Management

### Current Implementation
- React hooks (`useState`, `useEffect`) for local component state
- React Router for navigation state
- Toast notifications for user feedback

### Recommended Enhancements
For production, consider implementing:
- **React Query/TanStack Query** for server state management (already included)
- **Zustand** or **Redux Toolkit** for global app state
- **Context API** for user authentication state

### Example Store Structure
```typescript
// stores/useAuthStore.ts
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isPremium: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
}

// stores/useAppStore.ts
interface AppState {
  recentScans: ScanResult[];
  generatedContent: ContentRecord[];
  usageStats: UsageStats;
  refreshData: () => void;
}
```

## 💎 Premium Features Toggle

**Location**: `src/pages/ScanPage.tsx`

**Current Implementation**:
```typescript
const isPremium = false; // TODO: Connect to user subscription status
```

**Integration Steps**:
1. Connect to user subscription data from backend
2. Update `isPremium` state based on user's subscription
3. Add subscription upgrade flow
4. Implement feature gating throughout the app

**Feature Gating Pattern**:
```typescript
{isPremium ? (
  <PremiumFeature />
) : (
  <UpgradePrompt />
)}
```

## 🔧 Extending the UI

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/components/AppSidebar.tsx`

### Adding Analytics
**Recommended Integration Points**:
- Scan completion events
- Content generation events
- Feature usage tracking
- Error monitoring

**Example Analytics Integration**:
```typescript
// utils/analytics.ts
export const trackEvent = (event: string, properties: object) => {
  // Integrate with your analytics provider
  // Example: Mixpanel, Google Analytics, Amplitude
};

// Usage in components
trackEvent('scan_completed', {
  url: scanUrl,
  score: scanResults.overallScore,
  userId: user.id
});
```

### User Profile Enhancement
**Potential Additions**:
- User profile management
- Scan history with filters
- Compliance score trends
- Team/organization management
- Custom compliance rules

### Performance Optimization
**Current Optimizations**:
- Component lazy loading ready
- Tree-shaking enabled
- Tailwind CSS purging
- Modern build tools (Vite)

**Additional Recommendations**:
- Implement virtual scrolling for large data sets
- Add image optimization for assets
- Implement service workers for offline functionality
- Add progressive web app features

## 🎨 Design System

The application uses a comprehensive design system with:
- **Semantic color tokens** defined in `src/index.css`
- **Custom gradients and shadows** for professional appearance
- **Consistent spacing and typography** via Tailwind utilities
- **Component variants** for different use cases
- **Smooth animations** and transitions

### Customizing the Design
- Update color variables in `src/index.css`
- Modify component variants in respective UI components
- Extend Tailwind configuration in `tailwind.config.ts`

## 📝 Environment Variables

Create a `.env.local` file for local development:

```bash
# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# API Configuration
VITE_API_BASE_URL=https://your-api-domain.com
VITE_SCAN_ENDPOINT=/api/scan
VITE_GENERATE_ENDPOINT=/api/generate-content

# AWS Configuration (for DynamoDB)
VITE_AWS_REGION=us-east-1
VITE_DYNAMODB_SCANS_TABLE=compliance-scans
VITE_DYNAMODB_CONTENT_TABLE=compliance-content
```

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript for all new components
3. Implement proper error handling and loading states
4. Add comments for backend integration points
5. Test responsive design across devices
6. Follow the established design system

## 📄 License

This project is a prototype for demonstration purposes. See licensing terms for production use.

---

**Note**: This is a frontend prototype with mock data and placeholder integrations. All backend connections need to be implemented according to your specific infrastructure and requirements.