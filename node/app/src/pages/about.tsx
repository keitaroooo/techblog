import Image from 'next/image';
import Layout from '../components/layout';

const name = 'Keitaroooo';

const About = (): JSX.Element => {
  return (
    <Layout title="About" id="about">
      <section>
        <Image
          priority
          src="/images/profile2.jpg"
          height={180}
          width={320}
          alt={name}
        />
        <h1>{name}</h1>
      </section>
    </Layout>
  );
};

export default About;
