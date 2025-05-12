
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Error boundary for production
if (import.meta.env.PROD) {
  window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
    // In a real production app, you could send error reports to a service
    event.preventDefault();
  });
}

const rootElement = document.getElementById("root");

// Add validation to ensure we have a root element
if (!rootElement) {
  throw new Error("No root element found! Please add a div with id 'root' to your HTML.");
}

// Create root element with proper error handling
const root = createRoot(rootElement);

// Wrap in try-catch to prevent complete app crashes
try {
  root.render(<App />);
} catch (error) {
  console.error('Error rendering application:', error);
  root.render(
    <div className="error-container">
      <h1>Something went wrong</h1>
      <p>The application couldn't load properly. Please try refreshing the page.</p>
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
}
