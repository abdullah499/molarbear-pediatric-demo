/* global React, ReactDOM, SiteHeader, SiteFooter, BookingModal, Hero, TrustStrip, Services, WhyUs, Team, InsuranceChecker, FirstVisit, Reviews, Locations, FAQ, BlogPreview, DecideToolkit, Manifesto, HomeClosingCTA */
const { useState } = React;

function HomePage() {
  const openBook = () => { window.location.href = "Contact.html"; };

  return (
    <>
      <SiteHeader onBookClick={openBook} currentPage="home" />
      <main>
        <Hero onBookClick={openBook} />
        <TrustStrip />
        <Manifesto />
        <Services onBookClick={openBook} />
        <WhyUs />
        <Team />
        <FirstVisit />
        <DecideToolkit />
        <InsuranceChecker />
        <Reviews />
        <Locations />
        <FAQ />
        <BlogPreview />
        <HomeClosingCTA onBookClick={openBook} />
      </main>
      <SiteFooter onBookClick={openBook} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<HomePage />);
