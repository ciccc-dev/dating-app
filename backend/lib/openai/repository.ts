import OpenAI from "openai";

class _OpenAiRepository {
  private openai: OpenAI;
  private gptModel: string;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env["OPENAI_API_KEY"] });
    this.gptModel = "gpt-3.5-turbo";
  }

  getCompletion = async () => {
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: "user", content: "Say this is a test" }],
      model: this.gptModel,
    });
    console.log(completion.choices);
  };

  getAnswersGeneratedByAi = async ({
    profile,
    question,
  }: {
    profile?: any;
    question: string;
  }) => {
    const profilePrompt = profile
      ? `You are ${profile.gender}. Your name is ${profile.username}.`
      : "";
    const purposesPrompt =
      profile.purposes.length > 0
        ? `You are looking for ${profile.purposes
            .map((purpose: { name: string }) => purpose.name)
            .toString()}.`
        : "";
    const interestsPrompt =
      profile.interests.length > 0
        ? `You are interested in ${profile.interests
            .map((interest: { name: string }) => interest.name)
            .toString()}.`
        : "";

    console.log(
      `${profilePrompt} ${purposesPrompt} ${interestsPrompt} Please answer this question from provided profile information. ${question}`
    );

    const completion = await this.openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `${profilePrompt} ${purposesPrompt} Please answer this question from provided profile information. ${question}`,
        },
      ],
      model: this.gptModel,
    });
    return completion.choices;
  };
}

export const OpenAiRepository = new _OpenAiRepository();
