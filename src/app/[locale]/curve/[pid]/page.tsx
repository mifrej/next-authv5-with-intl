'use server';

import 'server-only';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getLogger } from 'utils/log-server-esm.mjs';

const nodeLogger = getLogger('debug');

// GET /api/curves
type Curve = {
  accessRange: object;
  area: string;
  border_source?: string;
  categories: string[];
  commodity: string;
  created: string;
  curve_state: string;
  curve_type: string;
  data_type: string;
  description?: string;
  frequency: string;
  hasAccess: boolean;
  id: number;
  issue_frequency: string;
  modified: string;
  name: string;
  scenarios?: string[];
  sources?: string[];
  station?: string[];
  storage?: string;
  time_zone: string;
  unit: string;
  version?: string;
};

async function getCurve(pid: string, token?: string): Promise<Curve | unknown> {
  try {
    const res = await fetch(
      `${process.env.NODE_ENV === 'development' ? 'https://api.wsight.org' : ''}/api/curves/get?id=${pid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return await res.json();
  } catch (error) {
    nodeLogger.error('Error fetching curve', error);
    console.error(error);
  }
}

const CurveHome = async ({ params: { pid } }: { params: { pid: string } }) => {
  const session = await auth();
  const token = session?.accessToken;

  if (!token) {
    redirect(
      `/api/frontend/auth/signin?callbackUrl=${encodeURIComponent(`/curve/${pid}`)}`,
    );
  }

  nodeLogger.debug({ pid, session, token }, 'session: %o');

  const curve = await getCurve(pid, token);

  if (curve) {
    const castedCurve = curve as Curve;
    // switch (castedCurve?.curve_type) {
    //   case 'TIME_SERIES': {
    //     redirect(`/curve/${castedCurve.id}/series`);
    //     break;
    //   }
    //   case 'TAGGED': {
    //     redirect(`/curve/${castedCurve.id}/series`);
    //     break;
    //   }
    //   case 'INSTANCES': {
    //     redirect(`/curve/${castedCurve.id}/forecast/issue-dates`);
    //     break;
    //   }
    //   case 'TAGGED_INSTANCES': {
    //     redirect(`/curve/${castedCurve.id}/forecast/issue-dates`);
    //     break;
    //   }
    //   default: {
    //     redirect(`/404`);
    //     break;
    //   }
    // }
    return castedCurve ? (
      <code>{JSON.stringify(castedCurve)}</code>
    ) : (
      <h1>No Curve for you</h1>
    );
  }

  // return null;
};

export default CurveHome;
