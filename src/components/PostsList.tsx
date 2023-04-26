import { Post } from '../types/Post';

interface IPostsList {
  posts: Post[];
  setSelectedPost: (post: Post | null) => void;
  selectedPost: Post | null;
}

export const PostsList: React.FC<IPostsList> = ({
  posts,
  setSelectedPost,
  selectedPost,
}) => {
  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  onClick={() => {
                    setSelectedPost(
                      selectedPost?.id === post?.id ? null : post,
                    );
                  }}
                  className="button is-link is-light"
                >
                  {selectedPost?.id === post?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
