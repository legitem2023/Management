'use client';

import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Collapsible({ data }: { data: { question: string, answer: string }[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [faqData, setFaqData] = useState(data);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedFaqData = faqData.map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setFaqData(updatedFaqData);
  };

  return (
    <div className="faq-accordion">
      {faqData.map((item, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question">
          <div onClick={() => toggleAccordion(index)}>
            <textarea
              value={item.question}
              onChange={(e) => handleInputChange(index, "question", e.target.value)}
              rows={2}
              style={{width: "100%",boxSizing: "border-box",display:"flex",justifyContent:"center"}}
            />
            
          </div>
          {activeIndex === index ? (<Icon icon="fa:chevron-up" />) : (<Icon icon="fa:chevron-down" />)}
          
          </div>

          {activeIndex === index && (
            <div className="faq-answer">
              <textarea
                value={item.answer}
                onChange={(e) => handleInputChange(index, "answer", e.target.value)}
                rows={4}
                style={{width: "100%",boxSizing: "border-box",display:"flex",justifyContent:"center"}}
                />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
