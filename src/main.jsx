import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initJS } from './mainJS.js'

import { parse } from 'yaml'

const projectConfig = parse(window.CONFIG_YAML)

document.querySelector('head title').innerHTML =
    projectConfig.clientName + ' - ' + projectConfig.jobName

window['PROJECT_CONFIG'] = projectConfig

ReactDOM.createRoot(document.getElementById('wrapper')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

setTimeout(() => initJS(), 200)
