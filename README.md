# Aphrodie
Front-end responsible for guiding user through seamless user experience and interfacing with the hermes Flask API

# Compoments

Navigators/
- Navigator: Router Navigator
Recorder/
- Recorder: Recorder used throughout application. Records audio, can play it back, and upon completion of recording, updates passed-in variables
Rebase/
- Rebase: Screen to rebase application (Creates a clone of your voice). Uses Recorder and makes appropriate Flask API call to '/train'
Practice/
- Practice: Main screen. Dynamically renders to let you see the fixed versions of the phrases you dictate, as well as hear playback of the phrase.
NavScreen/
- Picker: Navigation screen. Allows you to navigate to any other part of the application. Options are Practice Screen, ChatScreen, Rebase Screen, Log Out, or external link to more information about Highlands.
FirstScreen/
- Enter:  Flexibile ogin/register modal  
- FirstScreen: First screen you come across. Has a Login button and project name
Chatbot/
- ChatMessage: Individual chat message
- ChatScreen: Chat interface- records your voice, transcribes + fixes it, and allows you to have a friendly conversation with OpenAI's GPT-3.


# User Flow

FirstScreen -> Rebase -> Picker -> (FirstScreen, ChatScreen, Rebase, Practice)

# Screenshots


FirstScreen


Rebase



Picker


ChatScreen
- Upon first entrance

- After interaction




Practice
- Upon first entrance

- After interaction



