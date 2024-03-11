import { reactive, watch, ref } from "vue";
import { defineStore } from "pinia";
import { useAuthStore } from "../auth";

import icpcoinsLogo from "../assets/icpcoins_logo.png";
import ocDogeIcon from "../assets/oc_doge_icon.png";
import pinballIcon from "../assets/pinball-icon.png";
import junoIcon from "../assets/juno_icon.png";
import computerIcon from "../assets/computer-5.png";
import programsIcon from "../assets/programs_icon.png";
import taggrIcon from "../assets/taggr_icon.png";
import dmailIcon from "../assets/dmail_icon.png";
import beaconIcon from "../assets/beacon_icon.png";
import icdrawIcon from "../assets/icdraw_icon.png";
import icpSwapIcon from "../assets/icpswap_icon.png";
import sonicIcon from "../assets/sonic_icon.png";
import pixelIcon from "../assets/start-icon.png";
import xIcon from "../assets/x-pixel.png";
import socialIcon from "../assets/socials.png";
import telegramIcon from "../assets/telegram-pixel.png";
import discordIcon from "../assets/discord-pixel.png";
import gamesIcon from "../assets/game.png";
import sfIcon from "../assets/sf-pixel.png";
import fileIcon from "../assets/file.png";
import walletIcon from "../assets/wallet.png";
import coinGeckoIcon from "../assets/coingecko_logo.png";
import cmcIcon from "../assets/cmc_logo.png";
import mergeIcon from "../assets/merge_icon.png";
import keysIcon from "../assets/keys-4.png";
import { initialise } from "@open-ic/openchat-xframe";
import adsIcon from "../assets/advertise_icon.png";

export const useMenuItemStore = defineStore("startMenu", () => {
  const authStore = useAuthStore();
  const whoami = ref("");
  const fullWho = ref("");
  // const devOnly = import.meta.env.DEV;

  function handleSignIn() {
    authStore.login();
  }

  function initialiseOpenChat(frame: HTMLIFrameElement) {
    initialise(frame, {
      targetOrigin: "https://oc.app",
      initialPath:
        "/community/ow6el-gyaaa-aaaar-av5na-cai/?ref=y3rqn-fyaaa-aaaaf-a7z6a-cai",
      theme: {
        base: "light",
        name: "windoge98",
        overrides: {},
      },
    });
  }

  watch(
    () => authStore.isAuthenticated,
    async (isAuthenticated) => {
      if (isAuthenticated) {
        if (authStore.dogvertiserActor) {
          // @ts-ignore
          fullWho.value = await authStore.dogvertiserActor.whoami();
          console.log("Got whoami", fullWho.value);
          whoami.value = fullWho.value.substring(0, 8);
          startMenuData.bottom[2].name = `Sign Out (${whoami.value})`;
          startMenuData.bottom[2].action = authStore.logout;
        }
      } else {
        startMenuData.bottom[2].name = "Sign In";
        startMenuData.bottom[2].action = handleSignIn;
      }
    },
  );

  // Define the state as a function that returns the data structure
  const startMenuData: StartMenuData = reactive({
    main: [
      {
        name: "DApps",
        iconHeight: 30,
        url: "#",
        virtualWindow: "none",
        icon: programsIcon,
        subType: "unknown",
        visible: true,
        submenu: [
          {
            name: "Beacon DEX",
            icon: beaconIcon,
            url: "https://beacondex.link/#/rh2pm-ryaaa-aaaan-qeniq-cai",
            iconHeight: 30,
            virtualWindow: "iframe",
            subType: "unknown",
            visible: true,
          },

          {
            name: "Dmail",
            icon: dmailIcon,
            url: "https://mail.dmail.ai/",
            iconHeight: 30,
            virtualWindow: "blank",
            subType: "unknown",
            visible: true,
          },
          {
            name: "Dogvertiser",
            icon: adsIcon,
            iconHeight: 28,
            height: 494,
            width: 700,
            subType: "unknown",
            visible: false,
            virtualWindow: "dogvertiser",
          },
          {
            name: "ICPCoins",
            icon: icpcoinsLogo,
            url: "https://icpcoins.com/#/token/EXE",
            iconHeight: 30,
            virtualWindow: "iframe",
            subType: "unknown",
            visible: true,
          },
          {
            name: "ICPSwap DEX",
            icon: icpSwapIcon,
            url: "https://app.icpswap.com/swap?input=ryjl3-tyaaa-aaaaa-aaaba-cai&output=rh2pm-ryaaa-aaaan-qeniq-cai",
            iconHeight: 30,
            height: 600,
            virtualWindow: "blank",
            subType: "unknown",
            visible: true,
          },
          {
            name: "OpenChat",
            icon: ocDogeIcon,
            url: "https://oc.app/community/ow6el-gyaaa-aaaar-av5na-cai/?ref=y3rqn-fyaaa-aaaaf-a7z6a-cai",
            iconHeight: 30,
            virtualWindow: "iframe",
            subType: "openchat",
            init: initialiseOpenChat,
          },
          {
            name: "Sonic DEX",
            icon: sonicIcon,
            url: "https://app.sonic.ooo/swap?from=rh2pm-ryaaa-aaaan-qeniq-cai&to=ryjl3-tyaaa-aaaaa-aaaba-cai",
            iconHeight: 30,
            height: 600,
            virtualWindow: "iframe",
            subType: "unknown",
            visible: true,
          },
          {
            name: "Taggr",
            icon: taggrIcon,
            url: "https://6qfxa-ryaaa-aaaai-qbhsq-cai.ic0.app",
            iconHeight: 30,
            virtualWindow: "iframe",
            subType: "unknown",
            visible: true,
          },
          {
            name: "ICDraw",
            icon: icdrawIcon,
            url: "https://icdraw.com",
            iconHeight: 30,
            virtualWindow: "iframe",
            subType: "unknown",
            visible: true,
          },
        ],
      },
      {
        name: "Games",
        iconHeight: 30,
        url: "#",
        virtualWindow: "none",
        icon: gamesIcon,
        subType: "unknown",
        visible: true,
        submenu: [
          {
            name: "3D Pinball",
            icon: pinballIcon,
            url: "https://desktop.windoge98.com/spacecadetpinball.html",
            iconHeight: 28,
            height: 494,
            width: 632,
            virtualWindow: "iframe",
            subType: "unknown",
            visible: true,
          },
          {
            name: "MoonMerge98",
            icon: mergeIcon,
            url: "https://desktop.windoge98.com/moon_merge/index.html",
            iconHeight: 30,
            height: 840,
            width: 1078,
            virtualWindow: "iframe",
            subType: "unknown",
            visible: true,
          },
        ],
      },
      {
        name: "Guides",
        iconHeight: 30,
        url: "#",
        virtualWindow: "none",
        icon: fileIcon,
        subType: "unknown",
        visible: false,
        submenu: [
          {
            name: "Wallet Guide",
            icon: walletIcon,
            iconHeight: 28,
            height: 494,
            width: 632,
            subType: "unknown",
            visible: false,
            virtualWindow: "newbie_guide",
          },
        ],
      },
      {
        name: "Socials/Off Chain",
        iconHeight: 30,
        url: "#",
        virtualWindow: "none",
        icon: socialIcon,
        subType: "unknown",
        visible: true,
        submenu: [
          {
            name: "CoinGecko",
            icon: coinGeckoIcon,
            iconHeight: 25,
            url: "https://www.coingecko.com/en/coins/windoge98",
            virtualWindow: "blank",
            subType: "unknown",
            visible: true,
          },
          {
            name: "CoinMarketCap",
            icon: cmcIcon,
            iconHeight: 25,
            url: "https://coinmarketcap.com/currencies/windoge98",
            virtualWindow: "blank",
            subType: "unknown",
            visible: true,
          },
          {
            name: "Discord",
            icon: discordIcon,
            iconHeight: 25,
            url: "https://discord.gg/CnMRrtaj3h",
            virtualWindow: "blank",
            subType: "unknown",
            visible: true,
          },
          {
            name: "SourceForge",
            icon: sfIcon,
            iconHeight: 25,
            url: "https://sourceforge.net/p/windoge98-token/code/ci/main/tree",
            virtualWindow: "blank",
            subType: "unknown",
            visible: true,
          },
          {
            name: "Telegram",
            icon: telegramIcon,
            url: "https://x.com/windoge_98",
            iconHeight: 25,
            virtualWindow: "blank",
            subType: "unknown",
            visible: true,
          },
          {
            name: "X",
            icon: xIcon,
            iconHeight: 25,
            url: "https://x.com/windoge_98",
            virtualWindow: "blank",
            subType: "unknown",
            visible: true,
          },
        ],
      },
    ],
    bottom: [
      {
        name: "About Windoge98",
        iconHeight: 30,
        icon: pixelIcon,
        subType: "unknown",
        visible: true,
        virtualWindow: "welcome",
      },
      {
        name: "Deployed with Juno",
        icon: junoIcon,
        url: "https://juno.build/",
        iconHeight: 25,
        virtualWindow: "blank",
        subType: "unknown",
        visible: true,
      },
      {
        name: "Sign In",
        icon: keysIcon,
        iconHeight: 25,
        url: undefined,
        virtualWindow: "none",
        subType: "unknown",
        visible: true,
        action: handleSignIn,
      },
      {
        name: "Shut Down",
        icon: computerIcon,
        url: undefined,
        iconHeight: 30,
        virtualWindow: "shutdown",
        subType: "unknown",
        visible: true,
      },
    ],
  });
  return {
    startMenuData,
  };
});
