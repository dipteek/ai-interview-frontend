// app/page.js
import Link from 'next/link';
import styles from '../page.module.css';


export default function Home() {
  const jobRoles = [
    { id: 1, title: 'Frontend Developer' },
    { id: 2, title: 'Backend Developer' },
    { id: 3, title: 'Full Stack Developer' },
    { id: 4, title: 'DevOps Engineer' },
    { id: 5, title: 'Data Scientist' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Job Role Based Interview</h1>
      <div className={styles.cardContainer}>
        {jobRoles.map((role) => (
          <Link key={role.id} href={`/voice_interview/${role.id}`} passHref>
            <div className={styles.card}>
              <h2>{role.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}