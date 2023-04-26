import { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';
import { UserSelector } from './components/UserSelector';
import { client } from './utils/fetchClient';
import { Post } from './types/Post';
import { PostsList } from './components/PostsList';
import { User } from './types/User';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';

export const App: React.FC = () => {
  const [posts, setSelectedPosts] = useState<Post[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getPostByUserId = async (id: string) => {
    setIsLoading(true);
    const response = await client.get<Post[]>(`/posts?userId=${id}`);

    setIsLoading(false);
    if (Array.isArray(response)) {
      setSelectedPosts(response);
    }

    if ('Error' in response) {
      setIsError(true);
    } else {
      setSelectedPosts(response);
    }
  };

  const getPost = (user: User | null) => {
    if (user?.id) {
      getPostByUserId(user.id.toString());
    }
  };

  useEffect(() => {
    getPost(selectedPerson);
  }, [selectedPerson]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  person={selectedPerson}
                  setSelectedPerson={setSelectedPerson}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {Boolean(selectedPerson) || (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}
                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isLoading
                || (Array.isArray(posts)
                && (posts.length > 0 ? (
                  <PostsList
                    setSelectedPost={setSelectedPost}
                    selectedPost={selectedPost}
                    posts={posts}
                  />
                ) : (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )))}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              `${selectedPost ? 'Sidebar--open' : ''}`,
            )}
          >

            <div className="tile is-child box is-success ">
              {selectedPost ? (
                <PostDetails selectedPost={selectedPost} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
