import { useState } from "react";

const defaultValues = {
  name: "",
  email: "",
  body: "",
};

export const NewCommentForm: React.FC = () => {
  const [form, setForm] = useState<{ [key in string]: any }>(defaultValues);
  const [error, setError] = useState<{ [key in string]: boolean } | null>(null);
  // const [newComment, setNewComment] = useState<Comment[]>([]);

  // const sendComment = async () => {
  //   const request = await client.post<Comment[]>('/comments', []);
  //   // console.log(request)
  //   setNewComment(request);
  // };

  const handleChange = ({ target: { name, value } }: any) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) {
      setError((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const objectKeys = Object.keys(form);

    // eslint-disable-next-line no-restricted-syntax
    for (const key of objectKeys) {
      const value = form[key];

      setError((prev) => ({ ...prev, [key]: !value }));

      // console.log(value)
    }
  };

  const handleReset = () => {
    setForm(defaultValues);
  };

  return (
    <form
      data-cy="NewCommentForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            value={form.name}
            onChange={handleChange}
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={`input ${error?.name ? "is-danger" : ""}`}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          <span
            className={`icon is-small is-right  ${
              error?.name ? "has-text-danger" : ""
            }`}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          {error?.name ? "Name is required" : ""}
        </p>
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            id="comment-author-email"
            placeholder="email@test.com"
            className={`input ${error?.email ? "is-danger" : ""}`}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          <span
            className={`icon is-small is-right ${
              error?.email ? "has-text-danger" : ""
            }`}
            data-cy="ErrorIcon"
          >
            <i className="fas fa-exclamation-triangle" />
          </span>
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          {`${error?.email ? "Email is required" : ""}`}
        </p>
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            value={form.body}
            onChange={handleChange}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={`textarea ${error?.body ? "is-danger" : ""}`}
          />
        </div>

        <p className="help is-danger" data-cy="ErrorMessage">
          {`${error?.body ? "Enter some text" : ""}`}
        </p>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">
            {/* <button type="submit" className="button is-link is-loading"> */}
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
