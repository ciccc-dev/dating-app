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
