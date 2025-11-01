import React from 'react';

const AiChat: React.FC = () => {
  const aiChatCSS = `
    .container-ia-chat {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: end;
      width: 300px;
    }

    .container-upload-files {
      position: absolute;
      left: 0;
      display: flex;
      color: #38bdf8; /* Sky Blue */
      transition: all 0.5s;
    }

    .container-upload-files .upload-file {
      margin: 5px;
      padding: 2px;
      cursor: pointer;
      transition: all 0.5s;
    }
    
    .container-upload-files .upload-file:hover {
      color: #0ea5e9; /* Darker Sky Blue */
      scale: 1.1;
    }

    .input-text {
      max-width: 190px;
      width: 100%;
      margin-left: 72px;
      padding: 0.75rem 1rem;
      padding-right: 46px;
      border-radius: 50px;
      border: 1px solid #38bdf8; /* Sky Blue */
      outline: none;
      background-color: transparent;
      color: #0000FF; /* Normal Blue */
      font-size: 14px;
      line-height: 18px;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      font-weight: 500;
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.05);
      z-index: 999;
    }

    .input-text::placeholder {
      color: #38bdf8; /* Sky Blue */
      opacity: 0.7;
    }

    .input-text:focus-within,
    .input-text:valid {
      max-width: 250px;
      margin-left: 42px;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.4); /* Sky Blue Focus Ring */
    }

    .input-text:focus-within ~ .container-upload-files,
    .input-text:valid ~ .container-upload-files {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      filter: blur(5px);
    }

    .input-text:focus-within ~ .label-files,
    .input-text:valid ~ .label-files {
      transform: translateX(0) translateY(-50%) scale(1);
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }

    .input-text::selection {
      background-color: #38bdf8; /* Sky Blue */
      color: #ffffff;
    }

    .input-text:valid ~ .label-text {
      transform: translateX(0) translateY(-50%) scale(1);
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    }

    .input-text:valid ~ .label-voice {
      transform: translateX(0) translateY(-50%) scale(0.25);
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .input-voice {
      display: none;
    }

    .input-voice:checked ~ .container-upload-files {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      filter: blur(5px);
    }

    .input-voice:checked ~ .input-text {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      filter: blur(5px);
    }

    .label-files {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateX(-20px) translateY(-50%) scale(1);
      display: flex;
      padding: 0.5rem;
      color: #38bdf8; /* Sky Blue */
      background-color: transparent;
      border-radius: 50px;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.05);
    }

    .label-files:focus-visible,
    .label-files:hover {
      color: #0ea5e9; /* Darker Sky Blue */
    }
    
    @keyframes zoom-in-conversation {
      from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.5);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(0.62);
      }
    }

    .label-voice,
    .label-text {
      position: absolute;
      top: 50%;
      right: 0.25rem;
      transform: translateX(0) translateY(-50%) scale(1);
      width: 36px;
      height: 36px;
      display: flex;
      padding: 6px;
      border: none;
      outline: none;
      cursor: pointer;
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.05);
      z-index: 999;
    }

    .input-voice:checked ~ .label-voice {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 300px; /* Keep base size for internal animations */
      height: 300px; /* Keep base size for internal animations */
      transform: translate(-50%, -50%) scale(0.62); /* Final state for animation */
      
      /* Light Glassmorphism Effect */
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px); /* For Safari */
      border: 1px solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);

      border-radius: 3rem;
      z-index: 1000;
      animation: zoom-in-conversation 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    
    .input-voice:checked ~ .label-voice .icon-voice {
      opacity: 0;
    }

    .input-voice:checked ~ .label-voice .text-voice p {
      opacity: 1;
    }

    .label-voice {
      color: #38bdf8; /* Sky Blue */
      overflow: hidden;
    }
    
    .label-voice:hover,
    .label-voice:focus-visible {
      color: #0ea5e9; /* Darker Sky Blue */
    }

    .label-voice:active svg {
      scale: 1.1;
    }

    .label-voice .icon-voice {
      position: absolute;
      transition: all 0.3s;
    }

    .label-voice .text-voice {
      position: absolute;
      inset: 1.25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
    
    .label-voice .text-voice p {
      opacity: 0;
      transition: all 0.3s;
      text-wrap: nowrap;
    }

    .label-voice .text-voice p:first-child {
      font-size: 20px;
      font-weight: 500;
      color: transparent;
      background-image: linear-gradient(
        -40deg,
        #a0aec0 0% 35%,
        #38bdf8 40%,
        #4A5568 50%,
        #38bdf8 60%,
        #a0aec0 65% 100%
      );
      background-clip: text;
      -webkit-background-clip: text;
      background-size: 900px;
      animation: text-light 6s ease infinite;
    }

    .label-voice .text-voice p:last-child {
      font-size: 12px;
      color: #4b5563;
      mix-blend-mode: normal;
    }

    .close-conversation-btn {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      color: #374151;
      mix-blend-mode: normal;
      opacity: 0;
      visibility: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 1001;
    }

    .input-voice:checked ~ .label-voice .close-conversation-btn {
      opacity: 0.6;
      visibility: visible;
    }

    .close-conversation-btn:hover {
      opacity: 1;
      transform: scale(1.1);
    }

    .close-conversation-btn svg {
      width: 20px;
      height: 20px;
    }

    @keyframes text-light {
      0% {
        background-position: 0px;
      }

      100% {
        background-position: 900px;
      }
    }

    .label-text {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transform: translateY(-50%) scale(0.25);
      color: #ffffff;
      background: linear-gradient(to top right, #38bdf8, #0ea5e9); /* Sky Blue Gradient */
      box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.5);
      border-radius: 50px;
    }
    
    .label-text:hover,
    .label-text:focus-visible {
      transform-origin: top center;
      box-shadow: 0 0 10px #38bdf8, inset 0 0 4px rgba(255, 255, 255, 0.5); /* Sky Blue Glow */
    }

    .label-text:active {
      scale: 0.9;
    }

    .ai {
      --z: 0;
      --s: 300px;
      --p: calc(var(--s) / 4);
      width: var(--s);
      aspect-ratio: 1;
      padding: var(--p);
      display: grid;
      place-items: center;
      position: relative;
      animation: circle1 5s ease-in-out infinite;
    }

    .ai::before,
    .ai::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      height: 50%;
      border-radius: 50%;
      border: 2px solid #38bdf8; /* Sky Blue */
      box-shadow: 0 0 30px rgba(56, 189, 248, 0.7); /* Sky Blue */
      filter: blur(5px);
      transform: translate(-50%, -50%);
      animation: wave 1.5s linear infinite;
    }

    .ai::after {
      animation-delay: 0.4s;
    }

    @keyframes wave {
      0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0;
        box-shadow: 0 0 50px rgba(56, 189, 248, 0.6); /* Sky Blue */
      }
      35% {
        transform: translate(-50%, -50%) scale(1.3);
        opacity: 1;
      }
      70%,
      100% {
        transform: translate(-50%, -50%) scale(1.6);
        opacity: 0;
        box-shadow: 0 0 50px rgba(56, 189, 248, 0.2); /* Sky Blue */
      }
    }

    @keyframes ai1 {
      0% {
        transform: rotate(0deg) translate(50%) scale(0.9);
        opacity: 0;
      }

      25% {
        transform: rotate(90deg) translate(50%) scale(1.8);
        opacity: 1;
      }

      50% {
        transform: rotate(180deg) translate(50%) scale(0.7);
        opacity: 0.4;
      }

      75% {
        transform: rotate(270deg) translate(50%) scale(1.2);
        opacity: 1;
      }

      100% {
        transform: rotate(360deg) translate(50%) scale(0.9);
        opacity: 0;
      }
    }

    @keyframes ai2 {
      0% {
        transform: rotate(90deg) translate(50%) scale(0.5);
      }

      25% {
        transform: rotate(180deg) translate(50%) scale(1.7);
        opacity: 0;
      }

      50% {
        transform: rotate(270deg) translate(50%) scale(1);
        opacity: 0;
      }

      75% {
        transform: rotate(360deg) translate(50%) scale(0.8);
        opacity: 0;
      }

      100% {
        transform: rotate(450deg) translate(50%) scale(0.5);
        opacity: 1;
      }
    }

    @keyframes ai3 {
      0% {
        transform: rotate(180deg) translate(50%) scale(0.8);
        opacity: 0.8;
      }

      25% {
        transform: rotate(270deg) translate(50%) scale(1.5);
      }

      50% {
        transform: rotate(360deg) translate(50%) scale(0.6);
        opacity: 0.4;
      }

      75% {
        transform: rotate(450deg) translate(50%) scale(1.3);
        opacity: 0.7;
      }

      100% {
        transform: rotate(540deg) translate(50%) scale(0.8);
        opacity: 0.8;
      }
    }

    @keyframes ai4 {
      0% {
        transform: rotate(270deg) translate(50%) scale(1);
        opacity: 1;
      }

      25% {
        transform: rotate(360deg) translate(50%) scale(0.7);
      }

      50% {
        transform: rotate(450deg) translate(50%) scale(1.6);
        opacity: 0.5;
      }

      75% {
        transform: rotate(540deg) translate(50%) scale(0.9);
        opacity: 0.8;
      }

      100% {
        transform: rotate(630deg) translate(50%) scale(1);
        opacity: 1;
      }
    }

    .c {
      position: absolute;
      width: 300px;
      aspect-ratio: 1;
      border-radius: 50%;
    }

    .c1 {
      background: radial-gradient(50% 50% at center, #a78bfa, #38bdf8); /* Adjusted to Sky Blue */
      width: 200px;
      animation: ai1 5.5s linear infinite;
    }

    .c2 {
      background: radial-gradient(50% 50% at center, #f472b6, #e5e7eb);
      width: 100px;
      animation: ai2 6s linear infinite;
    }

    .c3 {
      background: radial-gradient(50% 50% at center, #f87171, transparent);
      width: 150px;
      opacity: 0.6;
      animation: ai3 4.8s linear infinite;
    }

    .c4 {
      background: #818cf8;
      animation: ai4 5.2s linear infinite;
    }

    .container {
      overflow: hidden;
      background: #c4b5fd;
      width: 100%;
      border-radius: 50%;
      aspect-ratio: 1;
      position: relative;
      display: grid;
      place-items: center;
    }

    .glass {
      overflow: hidden;
      position: absolute;
      inset: calc(var(--p) - 4px);
      border-radius: 50%;
      backdrop-filter: blur(10px);
      box-shadow:
        0 0 50px rgba(0, 0, 0, 0.1),
        0 50px 50px rgba(0, 0, 0, 0.1),
        0 0 25px rgba(255, 255, 255, 0.8);
      background: radial-gradient(
        75px at 70% 30%,
        rgba(255, 255, 255, 0.7),
        transparent
      );
    }

    .rings {
      aspect-ratio: 1;
      border-radius: 50%;
      position: absolute;
      inset: 0;
      perspective: 11rem;
      opacity: 0.9;
    }
    
    .rings:before,
    .rings:after {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(255, 0, 0, 1);
      border-radius: 50%;
      border: 6px solid transparent;
      mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
      -webkit-mask:
        linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
      background: linear-gradient(#38bdf8, #6D28D9, #fde047, #ec4899) /* Adjusted to Sky Blue */
        border-box;
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }

    .rings::before {
      animation: ring180 10s ease-in-out infinite;
    }

    .rings::after {
      animation: ring90 10s ease-in-out infinite;
    }

    @keyframes ring180 {
      0% {
        transform: rotateY(180deg) rotateX(180deg) rotateZ(180deg);
      }

      25% {
        transform: rotateY(180deg) rotateX(180deg) rotateZ(180deg);
      }

      50% {
        transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg);
      }

      80% {
        transform: rotateY(360deg) rotateX(360deg) rotateZ(360deg);
      }

      100% {
        transform: rotateY(540deg) rotateX(540deg) rotateZ(540deg);
      }
    }

    @keyframes ring90 {
      0% {
        transform: rotateY(90deg) rotateX(90deg) rotateZ(90deg);
      }

      25% {
        transform: rotateY(90deg) rotateX(90deg) rotateZ(90deg) scale(1.1);
      }

      50% {
        transform: rotateY(270deg) rotateX(270deg) rotateZ(270deg);
      }

      75% {
        transform: rotateY(270deg) rotateX(270deg) rotateZ(270deg);
      }

      100% {
        transform: rotateY(450deg) rotateX(450deg) rotateZ(450deg);
      }
    }

    @keyframes circle1 {
      0% {
        transform: scale(0.97);
      }

      15% {
        transform: scale(1);
      }

      30% {
        transform: scale(0.98);
      }

      45% {
        transform: scale(1);
      }

      60% {
        transform: scale(0.97);
      }

      85% {
        transform: scale(1);
      }

      100% {
        transform: scale(0.97);
      }
    }
  `;

  return (
    <>
      <style>{aiChatCSS}</style>
      <div className="container-ia-chat">
        <input
          type="checkbox"
          name="input-voice"
          id="input-voice"
          className="input-voice"
          style={{ display: 'none' }}
        />
        <input
          type="text"
          name="input-text"
          id="input-text"
          placeholder="Ask MAZ AI"
          className="input-text"
          required
          title=""
        />
        <input
          type="checkbox"
          name="input-files"
          id="input-files"
          className="input-files"
          style={{ display: 'none' }}
        />
        <div className="container-upload-files">
          <svg
            className="upload-file"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="13" r="3"></circle>
              <path
                d="M9.778 21h4.444c3.121 0 4.682 0 5.803-.735a4.4 4.4 0 0 0 1.226-1.204c.749-1.1.749-2.633.749-5.697s0-4.597-.749-5.697a4.4 4.4 0 0 0-1.226-1.204c-.72-.473-1.622-.642-3.003-.702c-.659 0-1.226-.49-1.355-1.125A2.064 2.064 0 0 0 13.634 3h-3.268c-.988 0-1.839.685-2.033 1.636c-.129.635-.696 1.125-1.355 1.125c-1.38.06-2.282.23-3.003.702A4.4 4.4 0 0 0 2.75 7.667C2 8.767 2 10.299 2 13.364s0 4.596.749 5.697c.324.476.74.885 1.226 1.204C5.096 21 6.657 21 9.778 21Z"
              ></path>
            </g>
          </svg>
          <svg
            className="upload-file"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
              <circle cx="9" cy="9" r="2"></circle>
              <path d="m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
            </g>
          </svg>
          <svg
            className="upload-file"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m6 14l1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
            ></path>
          </svg>
        </div>
        <label htmlFor="input-files" className="label-files">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14m-7-7v14"
            ></path>
          </svg>
        </label>
        <label htmlFor="input-voice" className="label-voice">
          <div className="close-conversation-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <svg
            className="icon-voice"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M12 4v16m4-13v10M8 7v10m12-6v2M4 11v2"
            ></path>
          </svg>
          <div className="ai">
            <div className="container">
              <div className="c c4"></div>
              <div className="c c1"></div>
              <div className="c c2"></div>
              <div className="c c3"></div>
              <div className="rings"></div>
            </div>

            <div className="glass"></div>
          </div>
          <div className="text-voice">
            <p>Conversation Started</p>
          </div>
        </label>
        <label htmlFor="input-text" className="label-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m5 12l7-7l7 7m-7 7V5"
            ></path>
          </svg>
        </label>
      </div>
    </>
  );
};

export default AiChat;
