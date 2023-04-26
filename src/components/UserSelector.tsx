import React, { useRef } from 'react';
// import { useRef } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import { useGetUsers } from '../hooks/useGetUsers';
import { useToggle } from '../hooks/useToggle';

import { User } from '../types/User';

export const HASH_PREFIX = '#user-';

interface IUserSelector {
  person: User | null;
  setSelectedPerson: (user: User | null) => void;
}

export const UserSelector: React.FC<IUserSelector> = ({
  person,
  setSelectedPerson,
}) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const { toggle, toggleOff, handleToggle } = useToggle();
  const { users } = useGetUsers();

  useClickOutside(triggerRef, () => {
    toggleOff();
  });

  // console.log(toggle);
  // console.log(person);

  return (
    <div data-cy="UserSelector" ref={triggerRef} className="dropdown is-active">
      <div className="dropdown-trigger">
        <button
          onClick={handleToggle}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{person ? person.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      {toggle ? (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.map((user) => (
              <a
                href={`${HASH_PREFIX}${user.id}`}
                onClick={() => {
                  toggleOff();
                  setSelectedPerson(user);
                }}
                key={user.id}
                className="dropdown-item"
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
