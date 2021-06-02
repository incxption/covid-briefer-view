import React, { createContext, useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { IonReactRouter } from "@ionic/react-router"

import Setup from "./pages/setup/Setup"
import Home from "./pages/Home"
import { IonApp, IonLoading, IonRouterOutlet } from "@ionic/react"
import { Config, Page } from ".."
import { Storage } from "@ionic/storage"

type StorageContextProps = {
    store: Storage | null
}

export const StorageContext = createContext<Partial<StorageContextProps>>({})
// store.create()

const App: React.FC = () => {
    // const [showSetup, setShowSetup] = useState(false)
    const [setupPage, setSetupPage] = useState<Page | undefined | null>(null) // undefined == no setup required; null == n
    const [store, setStore] = useState<Storage>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log("Getting config")
        store?.get("config").then(item => {
            if (item) {
                const parsedConf: Config = JSON.parse(item)
                setSetupPage(parsedConf.setup.currentPage)
            }
            setLoading(false)
        })
    }, [store])

    const createStorage = async () => {
        const _store = new Storage()
        _store.create()
        // _store.set("config", JSON.stringify({ setup: { done: false, currentPage: "introduction" } } as Config))

        _store.get("config").then(res => {
            if (!res) {
                console.log("No config set, setting...")
                _store.set("config", JSON.stringify({ setup: { done: false, currentPage: "introduction" } } as Config))
            }
        })
        _store.set("initialized", "true")
        setStore(_store)
        return
    }
    useEffect(() => {
        createStorage()
    }, [])
    return (
        <StorageContext.Provider value={{ store }}>
            <IonApp>
                {loading ? (
                    <IonLoading
                        isOpen={loading}
                        spinner="crescent"
                        cssClass="ion-loading-custom"
                        animated={true}
                        showBackdrop={false}
                        // onDidDismiss={() => }
                    />
                ) : (
                    <IonReactRouter>
                        <IonRouterOutlet>
                            <Route path="/" render={() => (setupPage === null ? <Home /> : <Setup />)} exact={true} />
                        </IonRouterOutlet>
                    </IonReactRouter>
                )}
            </IonApp>
        </StorageContext.Provider>
    )
}

export default App
