# AI Chat Module (MAZ-AI)

## 1. Purpose

The AI Chat module provides the primary user interface for interacting with the MAZDADY AI assistant (MAZ-AI). It's designed as a multi-modal input component, allowing users to interact via text, voice, and file uploads (e.g., images for visual search). Its purpose is to offer a seamless, intuitive, and highly animated conversational experience that serves as a central hub for search, assistance, and action within the marketplace.

This component is built to be a visually engaging, standalone widget that can be present across the entire application.

## 2. How It Works and Connects to Other Modules

### How It Works

- **UI Logic**: The component's state (e.g., text input vs. voice input mode) is managed internally using CSS and checkbox inputs (`<input type="checkbox">`). This allows for complex UI transitions and animations without heavy JavaScript logic, keeping the component lightweight.
- **Styling**: The component uses self-contained, embedded CSS. The styles and animations are not dependent on the main Tailwind CSS configuration, ensuring its appearance is consistent and self-contained, as per design requirements.
- **Multi-modal Input**: It features distinct UI elements for:
  - **Text Input**: A standard text field for typing queries.
  - **Voice Input**: A voice activation button that transitions the UI into a listening state with rich animations.
  - **File Upload**: Icons for uploading various file types, intended for future integration with visual search or data analysis.

### How It Connects

- **Integration**: The `AiChat` component is designed as a global widget. It is rendered in `App.tsx` with fixed positioning, making it float above other content and accessible from any page within the MAZDADY application.
- **API/Data Flow (Future)**: This UI module will serve as the frontend for the `MAZ-AI Engine`. It will connect to the AI Gateway service (`src/api/aiGateway.ts`) to:
  - Send user queries (text or transcribed voice) to the on-device AI model.
  - Handle file uploads and convert them into a format suitable for the AI (e.g., base64 strings for images).
  - Receive responses from the AI and trigger actions in other modules (e.g., display search results in the marketplace view, initiate a chat with another user).

## 3. Future Extension Notes

- **State Management**: Convert the CSS-based state management to React state (`useState`) to have better control over the component's behavior and to integrate it with the rest of the application's logic.
- **Voice Recognition**: Integrate the Web Speech API (`SpeechRecognition`) to capture and transcribe user voice input when the voice mode is activated.
- **File Handling**: Implement the logic for the file upload buttons to allow users to select files, and process them for AI interaction.
- **Gemini API Integration**: Connect the text input to the Gemini API via the AI Gateway for advanced query understanding, suggestions, and generating descriptive ad copy.
- **Real-time Feedback**: The component should provide real-time feedback, such as displaying transcribed text as the user speaks or showing a processing state while waiting for an AI response.

---
*Theme changed to Light/Day mode on 2024-07-25 — main variables updated in `index.html`*
*HUD and Search Bar set to 100% transparent; visual elements remain on top.*
