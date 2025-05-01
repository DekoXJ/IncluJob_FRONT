import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import RecentWork from '../components/RecentWork'
import Contact from '../components/Contact'
import WhatWeDo from '../components/WhatWeDo'

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <WhatWeDo />
      <Testimonials />
      <RecentWork />
      <Contact />
    </>
  )
}

export default LandingPage
