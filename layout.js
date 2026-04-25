import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ticket Routing System',
  description: 'Automated ticket classification and routing',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen`}>
        <nav className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TicketFlow
            </h1>
            <div className="space-x-6 text-sm font-medium">
              <a href="/" className="hover:text-blue-600 transition-colors">Submit Ticket</a>
              <a href="/dashboard" className="hover:text-blue-600 transition-colors">Admin Dashboard</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
