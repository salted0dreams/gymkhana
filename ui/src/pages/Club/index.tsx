import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAuthFetch} from '../../api/useAuthFetch';
import ClubEvents from '../../components/ClubEvents';
import {Layout} from '../../components/Layout/Layout';
import {useLogout} from '../../hooks/useLogout';
import styles from './styles.module.scss';

interface IClub {
  id: number;
  category: string;
  description: string;
  email: string;
  logo: string;
  name: string;
}
export const Club: React.FC = () => {
  const demoCoverImage =
    'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  const {data, error} = useAuthFetch('/clubs');
  const clubsData: IClub[] = data ? data.results : null;
  const logout = useLogout();
  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error]);
  const {clubName} = useParams();
  const club = clubsData?.find(club => club.name === clubName);
  return (
    <Layout>
      <div className={styles.container}>
        <div
          className={styles.header}
          style={{
            backgroundImage: `url(${demoCoverImage})`,
          }}
        >
          <div className={styles.headerContent}>
            <img className={styles.logo} src={club?.logo} alt="logo" />
            <h1 className={styles.clubName}>{club?.name}</h1>
            <button className={styles.registerBtn}>Register Now</button>
          </div>
        </div>
        <div className={styles.pageContent}>
          <div className={styles.sidebar}>
            <h2 className={styles.h2}>Past Events</h2>
            <ClubEvents type="past" />
          </div>
          <div className={styles.main}>
            <div className={styles.about}>
              <h2 className={styles.h2}>About the club</h2>
              <p className={styles.description}>{club?.description}</p>
            </div>
            <div className={styles.activeEvents}>
              <h2 className={styles.h2}>Active Events</h2>

              <ClubEvents type="active" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
