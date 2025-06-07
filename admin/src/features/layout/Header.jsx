import { useNavigate } from "react-router-dom";
import styles from './Header.module.css';

function Header() {
  const navigate = useNavigate();

    return (
      <header className={styles.header}>
        <h1 className={styles.title}>UES Stationbook Admin Page</h1>
        <nav className={styles.nav}>
            <button onClick={() => navigate('./')}>Dashboard</button>
            <button onClick={() => navigate('./events')}>Events</button>
            <button onClick={() => navigate('./conductors')}>Conductors</button>
        </nav>
      </header>
    );
  }


export default Header;