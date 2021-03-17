import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Image from 'next/image';

const name = 'Keitaroooo';

const Profile = (): JSX.Element => {
  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <Link href="/">
        <Image
          priority
          src="/images/profile2.jpg"
          className={utilStyles.borderCircle}
          height={180}
          width={320}
          alt={name}
        />
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
      </Link>
    </section>
  );
};

export default Profile;
