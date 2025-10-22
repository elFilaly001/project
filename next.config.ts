import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {};

// Use the next-intl plugin with default behaviour. The plugin and runtime will
// read `next-intl.config.ts` (created next to this file) to find locales and the
// messages directory.
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);