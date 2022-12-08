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

## Screenshots


# FirstScreen
<img width="200" alt="Simulator Screen Shot - iPhone 13 - 2022-12-08 at 11 42 08" src="https://user-images.githubusercontent.com/92952901/206552430-f3db713a-25e2-472f-9e7d-e09e2719524f.png">

# Rebase
<img width="200" alt="Simulator Screen Shot - iPhone 13 - 2022-12-08 at 11 42 29" src="https://user-images.githubusercontent.com/92952901/206552458-64a3f12e-2905-4347-a837-37b25587c46e.png">



# Picker
<img src="https://user-images.githubusercontent.com/92952901/206552473-869f5cae-1fcb-44d0-997c-4ea04c9c115a.png" alt="Simulator Screen Shot - iPhone 13 - 2022-12-08 at 11 42 18" width="200"/>



# ChatScreen
- Upon first entrance
<img width="200" alt="Simulator Screen Shot - iPhone 13 - 2022-12-08 at 11 42 49" src="https://user-images.githubusercontent.com/92952901/206552488-08aeb3d5-1f70-4d12-ae5e-ea1bc2a367d7.png">


- After interaction
<img width="200" alt="Screen Shot 2022-12-08 at 04 52 01" src="https://user-images.githubusercontent.com/92952901/206552496-770926e6-26cb-4e58-ba70-17804fd4f536.png">



# Practice
<img width="200" alt="Simulator Screen Shot - iPhone 13 - 2022-12-08 at 11 42 37" src="https://user-images.githubusercontent.com/92952901/206552556-bfb16cfd-c417-473e-ae3e-44f583e728b9.png">


