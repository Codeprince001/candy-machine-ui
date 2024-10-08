import { createTheme, ThemeProvider } from "@mui/material";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  BackpackWalletAdapter,
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SafePalWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";

import { useMemo } from "react";

import Home from "./Home";
import { rpcHost, candyMachineId, network } from "./config";

const theme = createTheme({
  palette: {
    mode: "light",
  }
});

const Main = ({}) => {
  // Custom RPC endpoint.
  const endpoint = useMemo(() => rpcHost, []);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
      new BackpackWalletAdapter(),
      new GlowWalletAdapter(),
      new LedgerWalletAdapter(),
      new PhantomWalletAdapter(),
      new SafePalWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new SolletExtensionWalletAdapter(),
      new SolletWalletAdapter(),
    ],
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect={true}>
          <WalletModalProvider>
            <Home candyMachineId={candyMachineId} />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
};

export default Main;
