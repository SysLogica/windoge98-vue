// stores/windowStore.js
import { defineStore } from "pinia";
import { watch } from "vue";
import WelcomeWindow from "../components/WelcomeWindow.vue";
import PopupWindow from "../components/PopupWindow.vue";
import ShutDownWindow from "../components/ShutDownWindow.vue";
import IframeWindow from "../components/IframeWindow.vue";
import defaultAppIcon from "../assets/default_app_icon.png";
import startIcon from "../assets/start-icon.png";
import NewbieGuide from "../components/NewbieGuide.vue";
import DogVertiser from "../components/dogvertiser/DogVertiser.vue";
import { v4 as uuidv4 } from "uuid";

export const useWindowStore = defineStore("windowStore", {
  setup() {
    const store = useWindowStore();
    watch(
      () => store.$state,
      (newState) => {
        localStorage.setItem("my-window-store", JSON.stringify(newState));
      },
      { deep: true },
    );
    watch((windows) => {}, { deep: true });

    return store;
  },
  state: () => {
    const defaultState = {
      windows: [
        {
          id: uuidv4(),
          zIndex: 50,
          title: "About Windoge98",
          icon: startIcon,
          component: WelcomeWindow,
          visible: true,
          active: true,
          maximised: false,
          type: "welcome",
          subType: "unknown",
          dimensions: {
            height: 570,
            width: 600,
            x: 100,
            y: 5,
          },
        },
      ],
      highestZIndex: 99,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight - 40,
      // Add more default state properties if needed
    };

    // Load state from local storage if available
    let savedState = localStorage.getItem("my-window-store");
    if (savedState) {
      return JSON.parse(savedState);
    } else {
      return defaultState;
    }
  },
  actions: {
    persistToLocalStorage() {
      localStorage.setItem("my-window-store", JSON.stringify(this.windows));
    },
    activateWindow(id) {
      this.windows.forEach((w) => {
        w.active = w.id == id;
        if (w.id == id) {
          w.visible = true;
          if (w.active) {
            this.highestZIndex++;
            w.zIndex = this.highestZIndex;
          } else {
            w.zIndex = 1;
          }
        }
      });
    },

    openAdWindow() {
      let id = uuidv4();
      this.windows.push({
        id: id,
        zIndex: 101,
        title: "Congratulations! Much wow! You just won an annoying ad!",
        icon: defaultAppIcon,
        component: PopupWindow,
        visible: true,
        active: false,
        maximised: false,
        type: "ad",
        subType: "unknown",
        dimensions: {
          height: 440,
          width: 650,
          x: 200,
          y: 400,
        },
      });
      this.activateWindow(id);
    },

    openDogvertiserWindow() {
      let id = uuidv4();
      this.windows.push({
        id: id,
        zIndex: 101,
        title: "Dogvertiser",
        icon: defaultAppIcon,
        component: DogVertiser,
        visible: true,
        active: false,
        maximised: false,
        type: "dogvertiser",
        subType: "unknown",
        dimensions: {
          height: 440,
          width: 650,
          x: 200,
          y: 400,
        },
      });
      this.activateWindow(id);
    },

    closeWindow(id) {
      const index = this.windows.findIndex((w) => w.id == id);
      if (index != -1) {
        this.windows.splice(index, 1);
      }
      this.setActiveToLastWindow();
    },

    maximiseWindow(id) {
      const window = this.getWindowById(id);
      window.maximised = !window.maximised;
    },

    minimiseWindow(id) {
      this.windows.forEach((w) => {
        if (w.id == id) {
          w.visible = false;
        }
      });
      this.setActiveToLastWindow();
    },

    setActiveToLastWindow() {
      const visibleWindows = this.windows.filter((w) => w.visible);
      if (visibleWindows.length > 0) {
        const lastWindow = this.windows[this.windows.length - 2];
        if (lastWindow) {
          this.activateWindow(lastWindow.id);
        }
      }
    },

    onResize(id, left, top, width, height) {
      const win = this.windows.find((w) => w.id === id);
      if (win) {
        win.dimensions.x = left;
        win.dimensions.y = top;
        win.dimensions.width = width;
        win.dimensions.height = height;
      }
    },
    onDragEnd(id, left, top) {
      const winIndex = this.windows.findIndex((win) => win.id === id);
      if (winIndex !== -1) {
        this.windows[winIndex].dimensions.x = left;
        this.windows[winIndex].dimensions.y = top;
      }
    },
  },

  getters: {
    getWindowById: (state) => (id) => {
      return state.windows.find((w) => w.id == id);
    },

    getComponentForWindowType: (state) => (windowData) => {
      switch (windowData.type) {
        case "welcome":
          return { component: WelcomeWindow, props: {} };
        case "ad":
          return { component: PopupWindow, props: {} };
        case "newbie_guide":
          return { component: NewbieGuide, props: {} };
        case "shutdown":
          return { component: ShutDownWindow, props: {} };
        case "dogvertiser":
          return { component: DogVertiser, props: {} };
        default:
          return {
            component: IframeWindow,
            props: {
              title: windowData.title,
              url: windowData.url,
              color: windowData.color,
              subType: windowData?.subType,
              init: windowData?.init,
            },
          };
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "my-window-store",
        storage: sessionStorage, // You can also use sessionStorage
      },
    ],
  },
});
