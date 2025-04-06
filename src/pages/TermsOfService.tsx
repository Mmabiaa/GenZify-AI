
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: April 6, 2025</p>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p>
                Welcome to GenZify. These Terms of Service govern your access to and use of our website, applications, and services. By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p>
                If you do not agree to these Terms, you may not access or use our services. We may revise these Terms at any time by posting an updated version. Your continued use of our services after any changes indicates your acceptance of the updated Terms.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Account Registration</h2>
              <p>
                To access certain features of our services, you may need to create an account. When you create an account, you agree to:
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Be responsible for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized access to your account</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate your account if any information provided is inaccurate, outdated, or incomplete, or if we believe you have violated these Terms.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Service Usage</h2>
              
              <h3 className="text-xl font-medium mt-6 mb-3">3.1 Permitted Use</h3>
              <p>
                You may use our services for personal, non-commercial, or commercial purposes in accordance with these Terms and applicable laws.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3">3.2 Prohibited Use</h3>
              <p>
                You agree not to:
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Use our services in any way that violates any applicable laws or regulations</li>
                <li>Use our services to transmit any material that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, invasive of another's privacy, or otherwise objectionable</li>
                <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity</li>
                <li>Interfere with or disrupt the operation of our services or servers</li>
                <li>Attempt to gain unauthorized access to our services, systems, or networks</li>
                <li>Use any automated system, including "robots," "spiders," or "offline readers," to access our services</li>
                <li>Reverse engineer, decompile, disassemble, or attempt to derive the source code of our services</li>
                <li>Remove, circumvent, disable, damage, or otherwise interfere with security-related features of our services</li>
                <li>Use our AI tools to create content that violates any third-party rights, including intellectual property rights</li>
              </ul>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. AI-Generated Content</h2>
              
              <h3 className="text-xl font-medium mt-6 mb-3">4.1 Ownership and Rights</h3>
              <p>
                Subject to your compliance with these Terms, you own the output that you create using our AI tools, to the extent that such output is your original creation. However, we retain ownership of our models, algorithms, and systems.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3">4.2 Responsibility for Generated Content</h3>
              <p>
                You are solely responsible for the prompts you provide to our AI tools and the content that is generated as a result. While our systems have safeguards in place, you acknowledge that AI systems may sometimes produce unexpected or undesired outputs.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3">4.3 Prohibited Content</h3>
              <p>
                You agree not to use our AI tools to create content that:
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Infringes on any third-party intellectual property or other rights</li>
                <li>Is illegal, harmful, fraudulent, deceptive, threatening, harassing, defamatory, obscene, or otherwise objectionable</li>
                <li>Promotes discrimination, bigotry, racism, hatred, harassment, or harm against any individual or group</li>
                <li>Is pornographic, sexually explicit, or violent</li>
                <li>Promotes illegal activities or substances</li>
              </ul>
              <p>
                We reserve the right to remove any content that violates these Terms and to restrict or terminate your access to our services.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
              <p>
                Certain features of our services may require payment. By selecting a paid subscription or feature, you agree to pay the applicable fees.
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>All fees are exclusive of taxes, which may be added to the final amount charged.</li>
                <li>Subscriptions automatically renew unless canceled before the renewal date.</li>
                <li>You may cancel your subscription at any time, but fees are non-refundable except as required by law.</li>
                <li>We reserve the right to change our prices upon notice. Continued use after a price change constitutes acceptance of the new price.</li>
              </ul>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
              <p>
                Our services, including all content, features, and functionality, are owned by GenZify and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may not use, reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of our materials, except as follows:
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Your computer may temporarily store copies of materials for your personal, non-commercial use.</li>
                <li>You may print or download one copy of a reasonable number of pages for your personal, non-commercial use.</li>
                <li>If we provide social media features with certain content, you may take actions enabled by these features.</li>
              </ul>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Disclaimer of Warranties</h2>
              <p>
                OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
              <p>
                WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, OR THAT ANY DEFECTS WILL BE CORRECTED. WE DO NOT WARRANT THE ACCURACY OR COMPLETENESS OF ANY INFORMATION OR CONTENT PROVIDED THROUGH OUR SERVICES.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p>
                IN NO EVENT SHALL GENZIFY BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>YOUR ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, OUR SERVICES;</li>
                <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON OUR SERVICES;</li>
                <li>ANY CONTENT OBTAINED FROM OUR SERVICES; AND</li>
                <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.</li>
              </ul>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located within San Francisco County, California.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> legal@genzify.ai<br />
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
