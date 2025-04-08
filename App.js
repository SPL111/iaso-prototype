import { useState } from "react";
import { MapPin, Phone, Bot } from "lucide-react";

export default function App() {
  const [visitType, setVisitType] = useState("outpatient");
  const [lang, setLang] = useState("EN");
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const visitInstructions = {
    outpatient: {
      documents: ["ID Card", "Insurance Card", "Doctor Referral"],
      directions: "Check in at Reception A, then proceed to Floor 2 - Cardiology. Use Elevator 3.",
    },
    inpatient: {
      documents: ["ID Card", "Insurance Approval", "Hospital Admission Form"],
      directions: "Go to Floor 1 - Admissions Office, sign documents, then to assigned room."
    },
    lab: {
      documents: ["ID Card", "Lab Order Slip"],
      directions: "Check in at Reception B, then proceed to Floor -1, Lab Area 3."
    }
  };

  const contacts = [
    { name: "General Info", phone: "210-1234567" },
    { name: "Emergency", phone: "210-7654321" },
    { name: "Admissions Office", phone: "210-8888888" },
  ];

  const handleChat = () => {
    if (chatInput.trim()) {
      const reply = `Answering your question: "${chatInput}" (example response)`;
      setChatHistory([...chatHistory, { user: chatInput, bot: reply }]);
      setChatInput("");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
      <div style={{ textAlign: "right" }}>
        <button onClick={() => setLang(lang === "EN" ? "GR" : "EN")}>🌐 {lang}</button>
      </div>

      <h2>IASO Hospital Visit Guidance ({lang})</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button onClick={() => setVisitType("outpatient")}>Outpatient</button>
        <button onClick={() => setVisitType("inpatient")}>Inpatient</button>
        <button onClick={() => setVisitType("lab")}>Lab Visit</button>
      </div>

      <h3>Required Documents:</h3>
      <ul>
        {visitInstructions[visitType].documents.map((doc, index) => (
          <li key={index}>{doc}</li>
        ))}
      </ul>

      <h3>Directions:</h3>
      <p><MapPin size={16} /> {visitInstructions[visitType].directions}</p>

      <h3>Useful Contacts:</h3>
      <ul>
        {contacts.map((c, i) => (
          <li key={i}><Phone size={16} /> <strong>{c.name}:</strong> <a href={`tel:${c.phone}`}>{c.phone}</a></li>
        ))}
      </ul>

      <button onClick={() => alert("Interactive hospital map opens here...")}>🗺️ View Hospital Floor Map</button>

      <hr style={{ margin: "2rem 0" }} />

      <h3><Bot size={16} /> Ask the Assistant</h3>
      <div style={{ maxHeight: 200, overflowY: "auto", fontSize: "0.9rem" }}>
        {chatHistory.map((entry, i) => (
          <div key={i}>
            <p><strong>You:</strong> {entry.user}</p>
            <p><strong>Bot:</strong> {entry.bot}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Ask something about your visit..."
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleChat()}
      />
      <button onClick={handleChat}>Send</button>
    </div>
  );
}
