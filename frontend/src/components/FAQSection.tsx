import  { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

const FAQSection = () => {
  const faqs = [
    {
      question: "How can I book a hotel?",
      answer: "To book a hotel, search for your desired destination, select your dates, and choose from the available hotels. Follow the prompts to complete your booking."
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can cancel or modify your booking through our website or app. Please note that cancellation policies vary by hotel."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept a variety of payment methods, including credit/debit cards, PayPal, and other popular payment gateways."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can contact our customer support team through the 'Contact Us' section on our website or by calling our support hotline."
    },
    {
      question: "Are there any additional fees?",
      answer: "Some hotels may charge additional fees such as resort fees or local taxes. These fees are usually disclosed during the booking process."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full pt-10">
      <div className=" mx-auto bg-white rounded-xl shadow-md">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => handleToggle(index)}
              className="w-full text-left px-4 py-2 flex justify-between items-center text-lg font-medium shadow-md border border-gray-200 rounded-md focus:outline-none"
            >
              {faq.question}
              <span>
                {openIndex ===index ? (<FaAngleUp />) :(<FaAngleDown />)}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-2 text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
