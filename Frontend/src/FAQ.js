
import React, { useState } from 'react';

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqData = [
    { question: "What types of items can be sold on an online auction platform?", answer: "Various items including electronics, antiques, collectibles, and more." },
    { question: "How do I participate in an auction?", answer: "You can participate by creating an account, browsing auctions, and placing bids." },
    { question: "What happens if I win an item in an auction?", answer: "You'll be notified and can proceed with payment and item collection." },
    { question: "What is a reserve price in an auction?", answer: "A reserve price is the minimum price a seller is willing to accept for an item." },
    { question: "What happens if there is a dispute between the buyer and seller in an auction?", answer: "The platform will mediate based on its policies to resolve disputes." },
    { question: "How does an online auction work?", answer: "Sellers list items, buyers place bids, and the highest bid wins at the end of the auction." },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", color: "#003399" }}>Frequently Asked Questions</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {faqData.map((faq, index) => (
          <div key={index} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
            <div
              style={{ cursor: "pointer", fontWeight: "bold", color: "#333" }}
              onClick={() => toggleQuestion(index)}
            >
              {faq.question}
            </div>
            {openQuestion === index && (
              <div style={{ marginTop: "10px", color: "#555" }}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
