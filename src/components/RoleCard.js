'use client';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function RoleCard({ role }) {
  return (
    <Link href={`/interview-setup?role=${encodeURIComponent(role.title)}&desc=${encodeURIComponent(role.description)}`}>
      <div className={styles.roleCard}>
        <h2>{role.title}</h2>
        <p>{role.description}</p>
      </div>
    </Link>
  );
}