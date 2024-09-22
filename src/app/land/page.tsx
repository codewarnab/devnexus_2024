import React from 'react'
import Hero from './Hero'
import Cards from './cards'
import Screenshot from './screens'
import Footer from './footer'

const page = () => {
  return (

    <div>
      <Hero />
      <Cards />
      <Screenshot />
      <Footer/>
    </div>
  )
}

export default page