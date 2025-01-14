import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"

import { ScreenOrientation } from "@ionic-native/screen-orientation"
import { setupConfig } from "@ionic/react"
import { Capacitor } from "@capacitor/core"
import { StatusBar, Style } from "@capacitor/status-bar"
import { IncidenceItem } from "./components/pages/home/incidence/Overview"

import "./styles/index.css"
import "./styles/tailwind.css"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

ScreenOrientation.lock("portrait")

if (Capacitor.isPluginAvailable("StatusBar")) {
    StatusBar.setStyle({ style: Style.Dark })
    if (Capacitor.getPlatform() === "android") StatusBar.setOverlaysWebView({ overlay: true })
}

setupConfig({
    mode: "ios"
})

export type Page = "introduction" | "configuration" | null
export type Config = {
    setup: {
        done: boolean
        currentPage: Page | null
    }
    incidence: {
        items: IncidenceItem[]
    }
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
)
