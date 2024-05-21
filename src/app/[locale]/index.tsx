import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './page.module.css';
import { SIGN_IN_ROUTE, SIGN_OUT_ROUTE } from 'config/constants.mjs';
import { Session } from 'next-auth';

type Props = {
  session: Session | null;
};

export default function Index({ session }: Props) {
  const t = useTranslations('Index');
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <h1>{t('title')}</h1>
      </div>
      <div className="flex flex-col bg-gray-100 rounded-md">
        <div className="p-4 font-bold bg-gray-200 rounded-t-md">
          Current Session
        </div>
        <pre className="py-6 px-4 whitespace-pre-wrap break-all">
          {JSON.stringify(session, null, 2)}
        </pre>
        {session ? (
          <h1>
            <a href="/api/frontend/auth/signout">Sign Out</a>
          </h1>
        ) : (
          <h1>
            <a href="/api/frontend/auth/signin">Sign In</a>
          </h1>
        )}
      </div>

      <div className={styles.grid}>
        <a href={SIGN_OUT_ROUTE} className={styles.card}>
          <h2>
            Signout <span>-&gt;</span>
          </h2>
          <p>Logout page</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a href={SIGN_IN_ROUTE} className={styles.card}>
          <h2>
            SignIn <span>-&gt;</span>
          </h2>
          <p>SignIn page</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
