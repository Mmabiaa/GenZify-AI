
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: April 6, 2025</p>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                This Cookie Policy explains how GenZify ("we," "our," or "us") uses cookies and similar technologies on our website. This policy provides you with information about how we use cookies, what types of cookies we use, and how you can control them.
              </p>
              <p>
                By using our website, you consent to the use of cookies in accordance with this Cookie Policy. If you do not agree with our use of cookies, you should set your browser settings accordingly or not use our website.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. Cookies are widely used to make websites work more efficiently and to provide information to the website owners.
              </p>
              <p>
                Cookies help websites remember your preferences, understand how you interact with the website, and improve your browsing experience. They can also help ensure that advertisements you see online are more relevant to you and your interests.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
              <p>
                We use different types of cookies for various purposes. The cookies we use can be categorized as follows:
              </p>
              
              <Table className="my-6">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Cookie Type</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Essential Cookies</TableCell>
                    <TableCell>
                      These cookies are necessary for the website to function properly. They enable basic functions like page navigation, secure areas access, and authentication. The website cannot function properly without these cookies.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Preference Cookies</TableCell>
                    <TableCell>
                      These cookies allow the website to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features. They collect information about your preferences and choices on the website.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Analytics Cookies</TableCell>
                    <TableCell>
                      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They provide insights into metrics such as number of visitors, bounce rate, traffic source, and visitor behavior.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Marketing Cookies</TableCell>
                    <TableCell>
                      These cookies track your browsing habits across websites to deliver advertising that is relevant to your interests. They are also used to limit the number of times you see an ad and help measure the effectiveness of advertising campaigns.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Third-Party Cookies</TableCell>
                    <TableCell>
                      These cookies are placed by third-party services that appear on our pages, such as social media plugins or external analytics services. They may track your browsing across different websites and build a profile of your interests.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Specific Cookies We Use</h2>
              <p>
                Below is a list of the main cookies we use and what we use them for:
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3">4.1 Essential Cookies</h3>
              <Table className="my-6">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Cookie Name</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead className="w-1/5">Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">auth_token</TableCell>
                    <TableCell>Used for authentication and session management</TableCell>
                    <TableCell>Session</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">csrf_token</TableCell>
                    <TableCell>Helps prevent Cross-Site Request Forgery attacks</TableCell>
                    <TableCell>Session</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">user_session</TableCell>
                    <TableCell>Maintains user session state across page visits</TableCell>
                    <TableCell>2 weeks</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <h3 className="text-xl font-medium mt-6 mb-3">4.2 Analytics Cookies</h3>
              <Table className="my-6">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Cookie Name</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead className="w-1/5">Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">_ga</TableCell>
                    <TableCell>Used by Google Analytics to distinguish users</TableCell>
                    <TableCell>2 years</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">_gid</TableCell>
                    <TableCell>Used by Google Analytics to distinguish users</TableCell>
                    <TableCell>24 hours</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">_gat</TableCell>
                    <TableCell>Used by Google Analytics to throttle request rate</TableCell>
                    <TableCell>1 minute</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. How to Control Cookies</h2>
              <p>
                You can control and manage cookies in various ways. Please note that removing or blocking cookies may impact your user experience and parts of our website may no longer be fully accessible.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3">5.1 Browser Controls</h3>
              <p>
                Most browsers allow you to control cookies through their settings. These settings are typically found in the "Options," "Preferences," or "Settings" menu of your browser. You can:
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Delete cookies that have already been stored</li>
                <li>Block cookies from being placed on your device</li>
                <li>Allow only certain types of cookies</li>
                <li>Block specific cookies</li>
                <li>Clear cookies when you close your browser</li>
              </ul>
              <p>
                For more information about these controls, visit your browser's help page:
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li><a href="https://support.google.com/chrome/answer/95647" className="text-primary hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-primary hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-primary hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-primary hover:underline">Microsoft Edge</a></li>
              </ul>
              
              <h3 className="text-xl font-medium mt-6 mb-3">5.2 Opt-Out of Analytics</h3>
              <p>
                You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline">Google Analytics Opt-out Browser Add-on</a>.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3">5.3 Do Not Track</h3>
              <p>
                Some browsers have a "Do Not Track" feature that signals to websites that you visit that you do not want to have your online activity tracked. These features are not yet uniform, so we currently do not respond to such signals.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Changes to This Cookie Policy</h2>
              <p>
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
              </p>
              <p>
                You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
              <p>
                If you have any questions about our Cookie Policy, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> privacy@genzify.ai<br />
                <strong>Address:</strong> 1234 Innovation Street, Tech District, San Francisco, CA 94107
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
