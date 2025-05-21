import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import '../Chatbot.css';
import { close_circle } from '../assets';

const Chatbot = () => {
    const [userMessage, setUserMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { role: 'bot', content: "Hi there 👋<br />How can I help you today?" }
    ]);
    const [isVisible, setIsVisible] = useState(false); // State to manage visibility
    const chatInputRef = useRef(null);

    const gemini_api_key = import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenAI({ apiKey: gemini_api_key });

    const handleInputChange = (event) => {
        setUserMessage(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey && window.innerWidth > 800) {
            event.preventDefault();
            handleChat();
        }
    };

    const handleChat = async () => {
        const message = userMessage.trim();
        if (!message) return;

        // Add the user's message to the chat messages state
        setChatMessages(prevMessages => [
            ...prevMessages,
            { role: 'user', content: message }
        ]);

        // Clear the input field
        setUserMessage('');
        chatInputRef.current.style.height = 'auto';

        // Send the user's message to the Google Generative AI and process the response
        const response = await fetchResponseFromAPI(message);

        // Add the bot's response to the chat messages state
        setChatMessages(prevMessages => [
            ...prevMessages,
            { role: 'bot', content: response }
        ]);
    };

    const fetchResponseFromAPI = async (message) => {
        const userprompt = message;
        const prompt = `YOU HELP GIVE FIRE SAFETY AND MISCELLANEOUS SAFETY TIPS TO PEOPLE. GIVE SHORT, CRISP AND TO THE POINT ANSWER AND MAKE SURE IT IS EASY TO UNDERSTAND. REMEMBER THE ANSWERS TO BE HELPFUL FOR INDIAN LOCATION. DO NOT INCLUDE SPECIAL SYMBOLS LIKE '*', GIVE POINTS USING NUMBERINGS. GIVE ANSWER TO THIS QUESTION: ${userprompt}`;
        console.log(prompt);
        const result = await genAI.models.generateContent({ model: "gemini-2.0-flash", contents: prompt });
        // Extract the bot's response from the result
        const botResponse = result.text ?? 'Sorry, I could not understand that.';
        const sanitizedResponse = botResponse.replace(/\*\*/g, '');
        console.log(sanitizedResponse);

        return sanitizedResponse;

    };

    const handleClose = () => {
        setIsVisible(false); // Set visibility to false when close button is clicked
    };

    const handleOpen = () => {
        setIsVisible(true); // Set visibility to true when open button is clicked
    };

    return (
        <>
            {isVisible ? (
                <div className="chatbot">
                    <header>
                        <h2>Chatbot</h2>
                        <img src={close_circle} className='max-w-10 cursor-pointer' onClick={handleClose} />
                    </header>
                    <ul className="chatbox">
                        {chatMessages.map((message, index) => (
                            <li key={index} className={`chat ${message.role}`}>
                                {message.role === 'bot'}
                                <p dangerouslySetInnerHTML={{ __html: message.content }}></p>
                            </li>
                        ))}
                    </ul>
                    <div className="chat-input text-black">
                        <textarea
                            placeholder="Enter a message..."
                            spellCheck="false"
                            required
                            value={userMessage}
                            onChange={handleInputChange}
                            ref={chatInputRef}
                            onKeyDown={handleKeyDown}
                        ></textarea>
                        <span id="send-btn" className="material-symbols-rounded" onClick={handleChat}>Send</span>
                    </div>
                </div>
            ) : (
                <div className="open-button z-[1000]" onClick={handleOpen}>
                    <span className="material-symbols-outlined">chat</span>
                </div>
            )}
        </>
    );
};

export default Chatbot;
