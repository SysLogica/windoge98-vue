/// <reference types="vite/client" />
declare module "vue-draggable-resizable-vue3";
declare module "./hooks/icrc1-idl";
declare module "./hooks/clippy-idl";

type WindowType = "welcome" | "developers" | "newbie_guide" | "ad" | VirtualWindowType;

type Dimensions = {
  height: number | string;
  width: number | string;
  x: number;
  y: number;
};

type DesktopWindow = {
  id: string;
  zIndex: number;
  component?: any;
  url?: string;
  icon?: string;
  title?: string;
  type: WindowType;
  color?: string;
  subType: VirtualWindowSubtype;
  visible: boolean;
  active: boolean;
  maximised: boolean;
  dimensions: Dimensions;
};

type MenuItem = {
  name: string;
  visible: boolean;
  url?: string;
  type?: WindowType;
  color?: string;
  virtualWindow: VirtualWindowType;
  subType: VirtualWindowSubtype;
  icon?: string;
  iconHeight?: number;
  height?: number;
  width?: number;
  submenu?: StartMenuItem[];
  action?: () => void;
  init?: () => void;
  position?: { x: number; y: number };
};

type ToolbarItem = MenuItem & {
  class: string;
};

type StartMenuData = {
  main: MenuItem[];
  bottom: MenuItem[];
};

type VirtualWindowType =
  | "iframe"
  | "none"
  | "welcome"
  | "newbie_guide"
  | "blank"
  | "dogvertiser"
  | "shutdown";

type VirtualWindowSubtype = "openchat" | "unknown" | "none" | "dogvertiser";

type Subaccount = Uint8Array | number[];

interface WindogeActor { }

interface Advertisement {
  index: BigInt;
  title: string;
  description?: string;
  image: string;
  link: string;
  total_burned: BigInt;
  timestamp: BigInt;
}
type Subaccount = Uint8Array | number[];
