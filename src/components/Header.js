import { Link } from 'react-router-dom';
import { FaArrowLeft, FaMicrophone, FaWhmcs } from 'react-icons/fa';

const Header = () => (
  <header>
    <Link to="/">
      {' '}
      <FaArrowLeft />
&nbsp;2022
      {' '}
    </Link>
    <h1>Air Report</h1>
    <span className="icons">
      <FaMicrophone />
      <FaWhmcs />
    </span>
  </header>
);

export default Header;
