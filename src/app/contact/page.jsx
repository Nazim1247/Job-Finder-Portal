import ContactForm from '@/components/ContactForm';
import NewsletterSignup from '@/components/Newsletter';
import React from 'react';

const ContactPage = () => {
    return (
        <div>
            <ContactForm />
            <NewsletterSignup />
        </div>
    );
};

export default ContactPage;