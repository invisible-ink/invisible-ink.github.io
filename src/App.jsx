import React from 'react'

function renderGroup(group, parentNames = []) {
    const type = Array.isArray(group) ? 'list' : 'group'

    if (type === 'list') {
        return group.map((content, index) => {
            const [, width, height] = content.match(/(\d+)x(\d+)/)
            const size = `${width}x${height}`
            const displayTitle = [...parentNames, size].join(' - ')
            const label = size
            return (
                <div key={index} className="list-item">
                    <a
                        className="banner-link"
                        target="_blank"
                        href={content}
                        data-type="html"
                        data-ext=""
                        data-title={displayTitle}
                        data-width={width}
                        data-height={height}
                        data-missing=""
                        data-filesize="0.0"
                        data-metadata=""
                    >
                        {label}
                    </a>
                </div>
            )
        })
    } else if (type === 'group') {
        return Object.entries(group).map(([name, content], index) => {
            return (
                <div key={index}>
                    <p>{name}</p>
                    <div className="menu-group">
                        {renderGroup(content, [...parentNames, name])}
                    </div>
                </div>
            )
        })
    }
}

function App() {
    const projectConfig = window['PROJECT_CONFIG']
    return (
        <React.Fragment>
            <section id="sideNav">
                <header>
                    <div className="header-container">
                        <h1>{projectConfig.clientName}</h1>
                        <h2>{projectConfig.jobName}</h2>
                    </div>
                </header>

                <nav>
                    {Object.entries(projectConfig.groups).map(
                        ([title, contents], index) => {
                            return (
                                <div key={index} className="build">
                                    <a href="#">
                                        <div className="build-title buildClicked">
                                            {title}
                                        </div>
                                    </a>

                                    <div className="build-menu">
                                        {renderGroup(contents)}
                                    </div>
                                </div>
                            )
                        }
                    )}
                </nav>
            </section>
            <section id="display">
                <div id="displayInner">
                    <div id="bannerInfo"></div>
                    <div id="bannerDisplay">...</div>
                </div>
            </section>
            <div id="logo">
                <a href="http://invisible.ink">
                    <img src="/img/ink-logo.png" width="80" height="80" />
                </a>
            </div>
        </React.Fragment>
    )
}

export default App
