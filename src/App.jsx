import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const apiKey = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyC-Z7eYHL_227FXpcAAG3BFoDgDr-wapFQ";
  const [question, setQuestion] = useState("");
  const [ans, setAns] = useState("");

  async function generateAns() {
    setAns("Loading...");
    try {
      const response = await axios.post(
        apiKey,
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );
      setAns(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setAns("Sorry, something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <div className="flex-grow w-full max-w-8xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">AI Chatbot</h1>
        <div className="mb-6 h-[calc(100vh-200px)] overflow-y-auto">
          <ReactMarkdown className="p-4 bg-gray-700 rounded-lg text-gray-200">
            {ans || "Hi! I am here to answer your questions😊"}
          </ReactMarkdown>
        </div>
      </div>

      <div className="w-full fixed bottom-0 left-0 border-t bg-gray-800 p-4 flex items-center gap-4">
        <textarea
          type="text"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-grow h-16 px-4 py-2 text-gray-900 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={generateAns}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
