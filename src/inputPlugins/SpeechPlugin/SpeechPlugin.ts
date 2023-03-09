import { State } from "../../types";
import { InputPlugin } from "../types";

export class SpeechPlugin implements InputPlugin {
  state: State;
  speechRecognition: SpeechRecognition;

  constructor() {
    this.state = {
      isPaused: false,
      player: { isJumping: false, isLaying: false },
    };

    this.speechRecognition = new webkitSpeechRecognition();

    this.speechRecognition.continuous = true;
    this.speechRecognition.lang = "en-US";
    this.speechRecognition.interimResults = false;
    this.speechRecognition.maxAlternatives = 20;
  }

  initialize(onChange: (state: State) => void) {
    this.speechRecognition.onresult = (e) => {
      const lastSpeechRecognitionResult = e.results.item(e.resultIndex);
      const transcripts = [];

      for (let i = 0; i < lastSpeechRecognitionResult.length; i++) {
        transcripts.push(
          lastSpeechRecognitionResult[i].transcript.trim().toLowerCase()
        );
      }

      if (transcripts.includes("stand up")) {
        this.state.player.isLaying = false;
      }

      if (transcripts.includes("lay down")) {
        this.state.player.isLaying = true;
      }

      if (transcripts.includes("jump over")) {
        this.state.player.isJumping = true;
        this.state.player.isLaying = false;

        setTimeout(() => (this.state.player.isJumping = false), 100);
      }
    };

    this.speechRecognition.start();
  }
}
