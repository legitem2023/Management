import React from 'react'
import Collapsible from '../Management_ui/Collapsible'
import faq from '../../../json/faq.json'
const FAQ = () => {
  const faqItems = [
    { question: "What is your return policy?", answer: "Our return policy is..." },
    { question: "How long does shipping take?", answer: "Shipping typically takes..." },
  ];
  return (
    <div>
      <Collapsible data = {faq}/>
    </div>
  )
}

export default FAQ