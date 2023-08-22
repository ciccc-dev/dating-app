// {
//   "id": "chatcmpl-7qGXtUlMX4SA1xWB8psDpgaxthsgR",
//   "object": "chat.completion",
//   "created": 1692691013,
//   "model": "gpt-3.5-turbo-0613",
//   "choices": [
//     {
//       "index": 0,
//       "message": {
//         "role": "assistant",
//         "content": "No, I am not looking for friends. I am specifically looking for a partner."
//       },
//       "finish_reason": "stop"
//     }
//   ],
//   "usage": {
//     "prompt_tokens": 82,
//     "completion_tokens": 17,
//     "total_tokens": 99
//   }
// }

export class Completion {
  private _id: string;
  private _unixCreateAt: number;
  private _model: string;
  private _content: string;

  constructor({
    id,
    created,
    model,
    content,
  }: {
    id: string;
    created: number;
    model: string;
    content: string | null;
  }) {
    if (!content) throw "OpenAI API response `content` is missing";

    this._id = id;
    this._unixCreateAt = created;
    this._model = model;
    this._content = content;
  }

  id = () => this._id;
  unixCreateAt = () => this._unixCreateAt;
  model = () => this._model;
  content = () => this._content;
}
