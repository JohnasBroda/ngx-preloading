// W3C Spec Draft http://wicg.github.io/netinfo/
// Edition: Draft Community Group Report 20 February 2019

// http://wicg.github.io/netinfo/#navigatornetworkinformation-interface
interface Navigator extends NavigatorNetworkInformation {}
interface WorkerNavigator extends NavigatorNetworkInformation {}

// http://wicg.github.io/netinfo/#navigatornetworkinformation-interface
interface NavigatorNetworkInformation {
  readonly connection?: NetworkInformation;
}

// http://wicg.github.io/netinfo/#connection-types
type ConnectionType =
  | "bluetooth"
  | "cellular"
  | "ethernet"
  | "mixed"
  | "none"
  | "other"
  | "unknown"
  | "wifi"
  | "wimax";

// http://wicg.github.io/netinfo/#effectiveconnectiontype-enum
declare type EffectiveConnectionType = "2g" | "3g" | "4g" | "slow-2g";

// http://wicg.github.io/netinfo/#dom-megabit
declare type Megabit = number;
// http://wicg.github.io/netinfo/#dom-millisecond
declare type Millisecond = number;

// http://wicg.github.io/netinfo/#networkinformation-interface
declare interface NetworkInformation extends EventTarget {
  // http://wicg.github.io/netinfo/#type-attribute
  readonly type?: ConnectionType;
  // http://wicg.github.io/netinfo/#effectivetype-attribute
  readonly effectiveType?: EffectiveConnectionType;
  // http://wicg.github.io/netinfo/#downlinkmax-attribute
  readonly downlinkMax?: Megabit;
  // http://wicg.github.io/netinfo/#downlink-attribute
  readonly downlink?: Megabit;
  // http://wicg.github.io/netinfo/#rtt-attribute
  readonly rtt?: Millisecond;
  // http://wicg.github.io/netinfo/#savedata-attribute
  readonly saveData?: boolean;
  // http://wicg.github.io/netinfo/#handling-changes-to-the-underlying-connection
  onchange?: EventListener;
}

declare type RequestIdleCallbackHandle = any;
declare type RequestIdleCallbackOptions = {
  timeout: number;
};

declare type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
};


declare interface Window {
  requestIdleCallback: (
    callback: (deadline: RequestIdleCallbackDeadline) => void,
    opts?: RequestIdleCallbackOptions
  ) => RequestIdleCallbackHandle;
  cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
}
