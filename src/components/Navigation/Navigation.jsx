import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

const getNavStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <header>
      <nav>
        <ul className={css.list}>
          <li>
            <NavLink to="/" className={getNavStyles}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={getNavStyles}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
