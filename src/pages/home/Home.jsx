import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import PropertyList from '../../components/propertylist/PropertyList'
import FeaturedProperties from '../../components/featuredproperties/FeaturedProperties'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <Header />

      <div className="flex flex-col items-center gap-8 mt-8">
        {/* Featured Section */}
        <Featured />

        {/* Browse by Property Type */}
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-xl font-semibold text-gray-800">Browse by Property Type</h1>
          <PropertyList />
        </div>

        {/* Homes Guests Love */}
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-xl font-semibold text-gray-800">Homes Guests Love</h1>
          <FeaturedProperties />
        </div>

        {/* Newsletter Signup */}
        <MailList />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default Home
