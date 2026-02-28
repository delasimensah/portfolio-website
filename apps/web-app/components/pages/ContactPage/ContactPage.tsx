import React from "react";

import ContactForm from "../../contact/ContactForm/ContactForm";
import ContactHeroSection from "../../contact/ContactHeroSection/ContactHeroSection";
import ContactWhatNextSection from "../../contact/ContactWhatNextSection/ContactWhatNextSection";

const ContactPage: React.FC = () => {
  return (
    <>
      <ContactHeroSection />
      <ContactForm />
      <ContactWhatNextSection />
    </>
  );
};

export default ContactPage;
