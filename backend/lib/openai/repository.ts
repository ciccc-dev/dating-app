import OpenAI from "openai";
import { calculateAge } from "../../utils/caluculateAge";
import { Completion } from "./completion";

class _OpenAiRepository {
  private openai: OpenAI;
  private gptModel: string;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env["OPENAI_API_KEY"] });
    this.gptModel = "gpt-3.5-turbo";
  }

  getAnswersGeneratedByAi = async ({
    profile,
    question,
  }: {
    profile?: any;
    // profile?: {
    //   gender: string;
    //   username: string;
    //   purposes: { name: string }[];
    //   interests: { name: string }[];
    // };
    question: string;
  }) => {
    const profilePrompt = profile
      ? `You are ${profile.gender}.` +
        ` Your name is ${profile.userName}.` +
        ` You are ${calculateAge(profile.birthday)} years old` +
        ` Your sexual orientation is ${profile.sexualOrientation}.`
      : "";
    const aboutMePrompt =
      profile && profile.aboutMe.length > 0
        ? `This is your explanation: ${profile.aboutMe}.`
        : "";
    const purposesPrompt =
      profile && profile.purposes.length > 0
        ? `You are looking for ${profile.purposes
            .map((purpose: { name: string }) => purpose.name)
            .toString()}.`
        : "";
    const interestsPrompt =
      profile && profile.interests.length > 0
        ? `You are interested in ${profile.interests
            .map((interest: { name: string }) => interest.name)
            .toString()}.`
        : "";

    const completion: OpenAI.Chat.Completions.ChatCompletion =
      await this.openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `${profilePrompt} ${purposesPrompt} ${interestsPrompt} ${aboutMePrompt} Please answer this question from provided profile information. ${question}`,
          },
        ],
        model: this.gptModel,
      });

    return new Completion({
      id: completion.id,
      created: completion.created,
      model: completion.model,
      content: completion.choices[0].message.content,
    });
  };
}

export const OpenAiRepository = new _OpenAiRepository();
