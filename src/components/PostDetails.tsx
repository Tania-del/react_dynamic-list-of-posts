import { useEffect, useState } from "react";
import { Comment } from "../types/Comment";
import { Post } from "../types/Post";
import { client } from "../utils/fetchClient";
import { Error } from "./Error/Error";
import { Loader } from "./Loader";
import { NewCommentForm } from "./NewCommentForm";

interface IPostDetails {
  selectedPost: Post | null;
}

export const PostDetails: React.FC<IPostDetails> = ({ selectedPost }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isShownForm, setIsShownForm] = useState(false);

  const getCommentByUserId = async (id: number | undefined) => {
    setIsLoading(true);
    setComments(null);

    const response = await client.get<Comment[]>(`/comments?postId=${id}`);

    setIsLoading(false);

    if ("Error" in response) {
      setIsError(true);
    } else {
      setComments(response);
    }
  };

  useEffect(() => {
    getCommentByUserId(selectedPost?.id);
    setIsShownForm(false);
  }, [selectedPost?.id]);

  const deleteComment = async (id: number) => {
    await client.delete(`/comments/${id}`);

    setComments((prev) =>
      (prev || []).filter((currentComment) => currentComment.id !== id)
    );
  };

  const handleAddComment = (comment: Comment) => {
    setComments((prev) => [...(prev || []), comment]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="block">
            {isError && <Error />}

            {Array.isArray(comments) && comments.length > 0 ? (
              <>
                <p className="title is-4">Comments:</p>

                {comments?.map((comment) => (
                  <article
                    key={comment.id}
                    className="message is-small"
                    data-cy="Comment"
                  >
                    <div className="message-header">
                      <a
                        href="mailto:misha@mate.academy"
                        data-cy="CommentAuthor"
                      >
                        {comment.name}
                      </a>
                      <button
                        onClick={() => deleteComment(comment.id)}
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                ))}
              </>
            ) : (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comment yet
              </p>
            )}

            {isShownForm || (
              <button
                onClick={() => {
                  setIsShownForm(true);
                }}
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
              >
                Write a comment
              </button>
            )}
          </div>
        )}

        {isShownForm && (
          <NewCommentForm
            handleAddComment={handleAddComment}
            selectedPost={selectedPost}
          />
        )}
      </div>
    </div>
  );
};
