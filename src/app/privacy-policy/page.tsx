"use client"
import React from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Printer } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <>
        <SiteHeader/>
        <PrivacyContent/>
        <SiteFooter/>
        </>
    );
};

export default PrivacyPolicy;

function PrivacyContent() {
    const handlePrint = () => {
        window.print();
    };
    return (
        <div className="max-w-4xl mx-auto p-6 mt-16 relative">
            {/* Print Button */}
            <button 
                onClick={() => handlePrint()} 
                className="absolute top-4 right-4 text-white p-2 rounded flex items-center"
                aria-label="Print"
            >
                <Printer className="h-5 w-5 mr-1" />
                Print
            </button>

            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold">Privacy Policy</h1>
                <p className="text-sm text-gray-500">Last updated: September 25, 2024</p>
            </header>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p>
                    This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <ul className="list-disc list-inside">
                    <li>Personal identification information (name, email address, etc.)</li>
                    <li>Non-personal identification information (browser type, IP address, etc.)</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <p>
                    We use your Personal data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Disclosure of Your Personal Data</h2>
                <p>
                    We may disclose your personal data in the good faith belief that such action is necessary to comply with a legal obligation or protect the rights and safety of our users.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Security of Your Personal Data</h2>
                <p>
                    The security of Your Personal Data is important to Us. However, remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
                <p>
                    Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under 13.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
                <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
            </section>

        </div>
    );
}