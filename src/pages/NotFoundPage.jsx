import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <p>
        Page not found, return to the <Link to="/">Home Page</Link>
      </p>
    </div>
  );
}
