import { useTheme, makeStyles, Typography, Button } from "@material-ui/core";
import { BottomCard } from "./Unlocked/Balances/Send";
import { useActiveWallet } from "../hooks/useWallet";
import { walletAddressDisplay } from "../components/common";
import { WithEphemeralNav } from "../components/Layout/NavEphemeral";
import { useApproveOrigin } from "../hooks/useKeyringStoreState";

const useStyles = makeStyles((theme: any) => ({
  activeWallet: {
    color: theme.custom.colors.secondary,
    fontSize: "12px",
    lineHeight: "24px",
    fontWeight: 500,
    marginTop: "12px",
    textAlign: "center",
  },
  contentContainer: {
    position: "absolute",
    marginTop: 150,
    paddingLeft: "24px",
    paddingRight: "24px",
    width: "100%",
  },
  contentTitle: {
    fontSize: "18px",
    lineHeight: "24px",
    fontWeight: 500,
    color: theme.custom.colors.fontColor,
  },
  contentSubTitle: {
    marginTop: "16px",
    color: theme.custom.colors.secondary,
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 500,
  },
  contentBullet: {
    marginTop: "12px",
    fontSize: "12px",
    lineHeight: "16px",
    color: theme.custom.colors.fontColor,
    fontWeight: 500,
    marginLeft: "6px",
  },
  txChangesRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  txChangesRowLeft: {
    color: theme.custom.colors.secondary,
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 500,
  },
  txChangesRowRight: {
    color: theme.custom.colors.fontColor,
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 500,
  },
  approveMessageData: {
    textAlign: "center",
    color: theme.custom.colors.fontColor,
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 500,
  },
}));

export function Approval({ origin, onCompletion }: any) {
  const approveOrigin = useApproveOrigin();
  const approve = async () => {
    await approveOrigin(origin);
    await onCompletion(true);
  };
  const reject = async () => {
    await onCompletion(false);
  };
  return (
    <WithApproval title={"Connect"} onApproval={approve} onReject={reject}>
      <ConnectContent origin={origin} />
    </WithApproval>
  );
}

export function ApproveTransaction({ origin, onCompletion }: any) {
  const classes = useStyles();
  const approve = async () => {
    onCompletion(true);
  };
  const onReject = async () => {
    onCompletion(false);
  };
  const rows = [
    ["Network", "Solana"],
    ["Network Fee", "- SOL"],
  ];
  return (
    <WithApproval
      title={"Approve Transaction"}
      onApproval={approve}
      onReject={onReject}
      origin={origin}
    >
      <Typography
        className={classes.contentTitle}
        style={{ marginBottom: "16px" }}
      >
        Transaction Changes
      </Typography>
      {rows.map((r) => (
        <div className={classes.txChangesRow}>
          <Typography className={classes.txChangesRowLeft}>{r[0]}</Typography>
          <Typography className={classes.txChangesRowRight}>{r[1]}</Typography>
        </div>
      ))}
    </WithApproval>
  );
}

export function ApproveMessage({ message, origin, onCompletion }: any) {
  const classes = useStyles();
  const approve = async () => {
    onCompletion(true);
  };
  const onReject = async () => {
    onCompletion(false);
  };
  return (
    <WithApproval
      title={"Approve Message"}
      onApproval={approve}
      onReject={onReject}
      origin={origin}
    >
      <Typography
        className={classes.contentTitle}
        style={{ marginBottom: "16px" }}
      >
        Message
      </Typography>
      <Typography className={classes.approveMessageData}>{message}</Typography>
    </WithApproval>
  );
}

function WithApproval({ title, onApproval, onReject, origin, children }: any) {
  const classes = useStyles();
  return (
    <WithEphemeralNav title={title}>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        >
          <ActiveWallet />
        </div>
        <div
          style={{
            height: "439px",
          }}
        >
          <BottomCard
            buttonLabel={"Approve"}
            onButtonClick={onApproval}
            onReject={onReject}
            cancelButton={true}
          >
            <AppLogo origin={origin} />
            <div className={classes.contentContainer}>{children}</div>
          </BottomCard>
        </div>
      </div>
    </WithEphemeralNav>
  );
}

function AppLogo({ origin }: any) {
  const theme = useTheme() as any;
  return (
    <div
      style={{
        position: "absolute",
        top: 48,
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
        width: "128px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          height: "128px",
          width: "128px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography style={{ textAlign: "center" }}>Logo</Typography>
      </div>
      <Typography
        style={{
          color: theme.custom.colors.secondary,
          lineHeight: "24px",
          fontSize: "12px",
          fontWeight: 500,
          marginTop: "12px",
          textAlign: "center",
        }}
      >
        {origin}
      </Typography>
    </div>
  );
}

function ActiveWallet() {
  const classes = useStyles();
  const activeWallet = useActiveWallet();
  return (
    <Typography className={classes.activeWallet}>
      {activeWallet.name} ({walletAddressDisplay(activeWallet.publicKey)})
    </Typography>
  );
}

function ConnectContent({ origin }: any) {
  const classes = useStyles();
  const url = new URL(origin);
  return (
    <>
      <Typography className={classes.contentTitle}>
        Connect Wallet to {url.hostname}
      </Typography>
      <Typography className={classes.contentSubTitle}>
        By approving, the app can
      </Typography>
      <Typography className={classes.contentBullet}>
        1.{" "}
        <span style={{ marginLeft: "8px" }}>
          View your wallet abalance and activity
        </span>
      </Typography>
      <Typography className={classes.contentBullet}>
        2.{" "}
        <span style={{ marginLeft: "8px" }}>
          Request approval for transactions
        </span>
      </Typography>
    </>
  );
}