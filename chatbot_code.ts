export const PYTHON_CHATBOT_CODE = `"""
Rule-Based AI Chatbot
---------------------
Suitable for: AI Internship Assignment
Demonstrates: IPO Model (Input-Process-Output), string sanitization, and clean control flow.

This chatbot uses rule-based keyword matching to process user queries.
It does not use machine learning, vector embeddings, or external AI APIs.
"""

import sys

def main():
    # Print program header and intro message
    print("====================================================")
    print("        WELCOME TO THE RULE-BASED AI CHATBOT       ")
    print("====================================================")
    print("This chatbot uses standard Python rule-based logic.")
    print("Type your questions below. Type 'exit' or 'bye' to quit.\\n")

    # Continuous conversation loop using 'while True'
    while True:
        # --------------------------------------------------
        # 1. INPUT PHASE (IPO Model: Input)
        # --------------------------------------------------
        # Get raw text input from the user in the console
        try:
            user_input_raw = input("You: ")
        except (KeyboardInterrupt, EOFError):
            print("\\n\\nBot: Detected terminal exit signal. Goodbye!")
            break

        # --------------------------------------------------
        # 2. PROCESS PHASE (IPO Model: Process)
        # --------------------------------------------------
        # SANITIZATION: Clean the input text
        # - .strip() removes leading and trailing whitespaces
        # - .lower() converts all letters to lowercase for case-insensitivity
        user_input = user_input_raw.strip().lower()

        # DECISION MAKING: Using clean if, elif, else control flow to resolve responses
        
        # A. Exit commands handler
        if user_input in ["bye", "exit", "quit", "goodbye"]:
            # Set the response and break the conversation loop
            bot_response = "Goodbye! Good luck with your AI internship assignment!"
            print(f"Bot: {bot_response}")
            break

        # B. Greeting handler
        elif user_input in ["hi", "hello", "hey", "good morning", "good evening"]:
            bot_response = "Hello there! I am a rule-based AI chatbot. How can I assist you today?"

        # C. Question about the chatbot's identity
        elif "your name" in user_input or "who are you" in user_input:
            bot_response = "I am 'PyBot', a pure Python rule-based assistant created for an AI internship project."

        # D. Question about the creator
        elif "who created you" in user_input or "who built you" in user_input:
            bot_response = "I was created by an aspiring AI Engineer as part of an academic internship project."

        # E. Question about how it works (Rule-based vs Vector Embeddings)
        elif "how do you work" in user_input or "how do you process" in user_input:
            bot_response = ("I work using explicit keyword matching and if-elif-else logic! "
                            "This is a deterministic, rule-based approach. I search for specific words "
                            "in your input and return hardcoded replies. Unlike modern large language "
                            "models, I don't use vector embeddings, neural networks, or probability.")

        # F. Question about Artificial Intelligence (AI)
        elif "what is ai" in user_input or "define artificial intelligence" in user_input:
            bot_response = ("Artificial Intelligence (AI) refers to the simulation of human intelligence in machines "
                            "programmed to think, learn, and make decisions. It spans from simple rule-based systems "
                            "(like me!) to advanced Deep Learning models.")

        # G. Question about the IPO model
        elif "ipo model" in user_input or "explain ipo" in user_input:
            bot_response = ("The IPO (Input-Process-Output) model is a fundamental software design framework:\\n"
                            "1. INPUT: The raw text string entered by the user.\\n"
                            "2. PROCESS: Sanitizing the text (strip/lower) and evaluating it via if-elif-else logic.\\n"
                            "3. OUTPUT: Presenting the corresponding text response back to the user.")

        # H. Question about chatbot state / well-being
        elif "how are you" in user_input or "how's it going" in user_input:
            bot_response = "I'm running optimally on standard Python! Ready to answer your questions. How are you?"

        # I. Small talk/fun question
        elif "joke" in user_input:
            bot_response = "Why do programmers wear glasses? Because they can't C#! 😄"

        # J. Default Response (Catch-all 'else' block)
        else:
            # If no keywords match, provide a polite fallback response
            bot_response = "Sorry, I don't understand that. Please try another question (e.g., 'What is the IPO model?' or 'How do you work?')."

        # --------------------------------------------------
        # 3. OUTPUT PHASE (IPO Model: Output)
        # --------------------------------------------------
        # Deliver the calculated response back to the user
        print(f"Bot: {bot_response}\\n")

if __name__ == "__main__":
    main()
`;
