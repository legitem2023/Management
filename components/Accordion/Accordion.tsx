import { Icon } from '@iconify/react';
import React from 'react';
import { useState } from 'react';

const Accordion = ({ faqs }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null); // Collapse if clicked again
        } else {
            setActiveIndex(index); // Expand clicked item
        }
    };


    // return
    return (
        <div className=''> 
            <div className="faq-accordion">
                {faqs.length > 0?faqs.map((faq, index) => (
                    <div className="faq-item" key={index}>
                        <div className="faq-question" onClick={() => toggleAccordion(index)}>
                            {faq.fullname}
                            <span className={`arrow ${activeIndex === index ? 'open' : ''}`}>&#9660;</span>
                        </div>
                        {activeIndex === index?(
                            <div className="faq-answer">
                                <p>{faq.Address}</p>
                            </div>
                        ):""}
                    </div>
                )):<div className='faq-item'>
                    <div className="faq-question"></div>
                </div>}
            </div>
        </div>
    );
};

export default Accordion;