import { LOCALES } from 'config/constants.mjs';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = LOCALES;
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
