/* eslint-disable @typescript-eslint/no-explicit-any */
import 'plyr-react/plyr.css';
import { Box } from '@fuel-ui/react';
import { runSync } from '@mdx-js/mdx';
import * as provider from '@mdx-js/react';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import {
  BRIDGE_LINK,
  EXPLORER_LINK,
  FAUCET_LINK,
  FUEL_TESTNET,
  PLAYGROUND_LINK,
} from '../config/constants';
import { runtime } from '../lib/runtime';

import { Blockquote } from './Blockquote';
import { CardSection } from './CardSection';
import { Code } from './Code';
import { Divider } from './Divider';
import { Heading } from './Heading';
import { Link } from './Link';
import { UL, OL } from './List';
import { Paragraph } from './Paragraph';
import { Pre } from './Pre';
import { Table } from './Table';

const Player = dynamic(() => import('./Player'), {
  ssr: false,
});

export const mdxComponents = {
  a: Link,
  h1: Heading,
  h2: Heading,
  h3: Heading,
  h4: Heading,
  h5: Heading,
  h6: Heading,
  pre: Pre,
  p: Paragraph,
  code: Code,
  blockquote: Blockquote,
  table: Table,
  ul: UL,
  ol: OL,
  hr: Divider,
  Box,
  Player,
  CardSection,
} as any;

type MDXRenderProps = {
  code: string;
  components: Record<any, any>;
  isNightly: boolean;
  fuelCoreVersion?: string;
};

export function MDXRender({
  code,
  components,
  isNightly,
  fuelCoreVersion,
}: MDXRenderProps) {
  const { default: Content } = useMemo(
    () => runSync(code, { ...runtime, ...provider }),
    [code]
  );

  return (
    <provider.MDXProvider components={{ ...components, ...mdxComponents }}>
      <Content
        isNightly={isNightly}
        fuelTestnet={FUEL_TESTNET}
        fuelTestnetInlineCode={<Code>{FUEL_TESTNET}</Code>}
        faucetLink={
          <Link href={FAUCET_LINK}>
            <Code>{FUEL_TESTNET}</Code> faucet
          </Link>
        }
        faucetUrl={FAUCET_LINK}
        explorerUrl={EXPLORER_LINK}
        bridgeUrl={BRIDGE_LINK}
        GQLPlaygroundLink={
          <Link href={PLAYGROUND_LINK}>
            <Code>{FUEL_TESTNET}</Code> graphQL playground
          </Link>
        }
        fuelCoreVersion={<Code>{fuelCoreVersion}</Code>}
      />
    </provider.MDXProvider>
  );
}
