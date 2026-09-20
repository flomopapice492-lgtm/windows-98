import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const eras = {
  1998: { name: 'Windows 98', browser: 'Internet Explorer 4', color: '#008080', wallpaper: 'clouds', apps: ['My Computer', 'Internet Explorer', 'Flash Player', 'Notepad', 'Paint', 'Minesweeper'] },
  1999: { name: 'Windows 98 SE', browser: 'Internet Explorer 5', color: '#008080', wallpaper: 'clouds', apps: ['My Computer', 'Internet Explorer', 'Flash Player', 'Notepad', 'Paint', 'Solitaire'] },
  2000: { name: 'Windows 2000', browser: 'Internet Explorer 5.5', color: '#3a6ea5', wallpaper: 'blue', apps: ['My Computer', 'Internet Explorer', 'Flash Player', 'Notepad', 'Control Panel'] },
  2001: { name: 'Windows XP', browser: 'Internet Explorer 6', color: '#3a6ea5', wallpaper: 'bliss', apps: ['My Computer', 'Internet Explorer', 'Flash Player', 'MSN Messenger', 'Paint'] },
  2002: { name: 'Windows XP', browser: 'Internet Explorer 6', color: '#3a6ea5', wallpaper: 'bliss', apps: ['My Computer', 'Internet Explorer', 'Flash Player', 'MSN Messenger', 'Solitaire'] },
  2003: { name: 'Windows XP', browser: 'Internet Explorer 6', color: '#3a6ea5', wallpaper: 'bliss', apps: ['My Computer', 'Internet Explorer', 'Flash Player', 'Windows Media Player', 'Notepad'] },
  2004: { name: 'Windows XP SP2', browser: 'Internet Explorer 6', color: '#3a6ea5', wallpaper: 'bliss', apps: ['My Computer', 'Internet Explorer', 'Flash Player', 'MSN Messenger', 'Control Panel'] },
  2005: { name: 'Windows XP', browser: 'Firefox 1.0', color: '#245edb', wallpaper: 'bliss', apps: ['My Computer', 'Firefox', 'Flash Player', 'MSN Messenger', 'Paint'] },
  2006: { name: 'Windows Vista', browser: 'Internet Explorer 7', color: '#5b86ad', wallpaper: 'vista', apps: ['Computer', 'Internet Explorer', 'Flash Player', 'Windows Mail', 'Control Panel'] },
  2007: { name: 'Windows Vista', browser: 'Internet Explorer 7', color: '#5b86ad', wallpaper: 'vista', apps: ['Computer', 'Internet Explorer', 'Flash Player', 'Windows Mail', 'Solitaire'] },
  2008: { name: 'Windows Vista', browser: 'Firefox 3', color: '#5b86ad', wallpaper: 'vista', apps: ['Computer', 'Firefox', 'Flash Player', 'Windows Media Player', 'Notepad'] },
  2009: { name: 'Windows 7', browser: 'Internet Explorer 8', color: '#1f6b92', wallpaper: 'windows7', apps: ['Computer', 'Internet Explorer', 'Flash Player', 'Windows Media Player', 'Paint'] },
  2010: { name: 'Windows 7', browser: 'Firefox 3.6', color: '#1f6b92', wallpaper: 'windows7', apps: ['Computer', 'Firefox', 'Flash Player', 'Windows Media Player', 'Control Panel'] },
  2011: { name: 'Windows 7', browser: 'Chrome 15', color: '#1f6b92', wallpaper: 'windows7', apps: ['Computer', 'Google Chrome', 'Flash Player', 'Notepad', 'Paint'] },
  2012: { name: 'Windows 8', browser: 'Internet Explorer 10', color: '#1683a8', wallpaper: 'windows8', apps: ['This PC', 'Internet Explorer', 'Flash Player', 'Messaging', 'Control Panel'] },
  2013: { name: 'Windows 8.1', browser: 'Internet Explorer 11', color: '#1683a8', wallpaper: 'windows8', apps: ['This PC', 'Internet Explorer', 'Flash Player', 'Skype', 'Paint'] },
  2014: { name: 'Windows 8.1', browser: 'Google Chrome', color: '#1683a8', wallpaper: 'windows8', apps: ['This PC', 'Google Chrome', 'Flash Player', 'Skype', 'Notepad'] },
  2015: { name: 'Windows 10', browser: 'Microsoft Edge', color: '#0078d7', wallpaper: 'windows10', apps: ['This PC', 'Microsoft Edge', 'Flash Player', 'Skype', 'Settings'] },
  2016: { name: 'Windows 10', browser: 'Google Chrome', color: '#0078d7', wallpaper: 'windows10', apps: ['This PC', 'Google Chrome', 'Flash Player', 'Mail', 'Settings'] },
  2017: { name: 'Windows 10', browser: 'Google Chrome', color: '#0078d7', wallpaper: 'windows10', apps: ['This PC', 'Google Chrome', 'Flash Player', 'Paint 3D', 'Settings'] },
  2018: { name: 'Windows 10', browser: 'Microsoft Edge', color: '#0078d7', wallpaper: 'windows10', apps: ['This PC', 'Microsoft Edge', 'Flash Player', 'Mail', 'Settings'] },
  2019: { name: 'Windows 10', browser: 'Microsoft Edge', color: '#0078d7', wallpaper: 'windows10', apps: ['This PC', 'Microsoft Edge', 'Flash Player', 'Mail', 'Settings'] },
}

function App() {
  const [year, setYear] = useState(1998)
  const [menu, setMenu] = useState(false)
  const [window, setWindow] = useState(null)
  const [flashFrame, setFlashFrame] = useState(0)
  const era = eras[year]
  const years = useMemo(() => Object.keys(eras).map(Number), [])

  const open = (name) => { setWindow(name); setMenu(false) }
  const changeYear = (value) => { setYear(Number(value)); setWindow(null) }

  return <main className={`desktop wallpaper-${era.wallpaper}`} style={{ '--accent': era.color }} onClick={() => menu && setMenu(false)}>
    <header className="era-bar">
      <strong>Windows 98 Time Machine</strong>
      <label>Era:
        <select value={year} onChange={e => changeYear(e.target.value)}>{years.map(y => <option key={y}>{y}</option>)}</select>
      </label>
      <span>{era.name} · {era.browser}</span>
    </header>

    <section className="icons">
      <DesktopIcon icon="🖥️" label={year < 2002 ? 'My Computer' : 'This PC'} onDoubleClick={() => open('computer')} />
      <DesktopIcon icon="🌐" label={era.browser} onDoubleClick={() => open('internet')} />
      <DesktopIcon icon="⚡" label="Flash Player" onDoubleClick={() => open('flash')} />
      <DesktopIcon icon="📁" label="My Documents" onDoubleClick={() => open('documents')} />
      <DesktopIcon icon="🗑️" label="Recycle Bin" onDoubleClick={() => open('recycle')} />
    </section>

    {window && <AppWindow title={windowTitle(window, era)} onClose={() => setWindow(null)}>
      {window === 'flash' && <FlashPlayer frame={flashFrame} setFrame={setFlashFrame} year={year} />}
      {window === 'internet' && <Internet browser={era.browser} year={year} />}
      {window === 'computer' && <FileExplorer year={year} />}
      {window === 'documents' && <FileExplorer year={year} documents />}
      {window === 'recycle' && <div className="empty">The Recycle Bin is empty.</div>}
    </AppWindow>}

    <footer className="taskbar" onClick={e => e.stopPropagation()}>
      <button className="start" onClick={() => setMenu(!menu)}>▣ Start</button>
      <span className="task">{window ? windowTitle(window, era) : 'Ready'}</span>
      <span className="clock">{year}/09/20&nbsp; 12:00 PM</span>
      {menu && <div className="start-menu"><div className="side">Windows<br />98</div><div className="menu-items">
        <button onClick={() => open('internet')}>🌐 {era.browser}</button><button onClick={() => open('flash')}>⚡ Macromedia Flash Player</button><button onClick={() => open('computer')}>🖥️ {year < 2002 ? 'My Computer' : 'This PC'}</button><hr /><button onClick={() => open('documents')}>📁 Documents</button><button onClick={() => open('recycle')}>🗑️ Recycle Bin</button><hr /><button onClick={() => setMenu(false)}>⏻ Shut Down...</button>
      </div></div>}
    </footer>
  </main>
}

function DesktopIcon({ icon, label, onDoubleClick }) { return <button className="desktop-icon" onDoubleClick={onDoubleClick}><span>{icon}</span><small>{label}</small></button> }
function windowTitle(name, era) { return ({ flash: 'Macromedia Flash Player', internet: era.browser, computer: 'My Computer', documents: 'My Documents', recycle: 'Recycle Bin' })[name] }
function AppWindow({ title, onClose, children }) { return <section className="app-window"><div className="titlebar"><b>{title}</b><button onClick={onClose}>×</button></div><div className="window-body">{children}</div></section> }
function FileExplorer({ documents }) { return <><div className="toolbar">File&nbsp;&nbsp; Edit&nbsp;&nbsp; View&nbsp;&nbsp; Help</div><div className="file-grid">{(documents ? ['readme.txt', 'vacation.jpg', 'welcome.swf'] : ['3½ Floppy (A:)', 'Local Disk (C:)', 'My Documents', 'Control Panel', 'Printers']).map(file => <div key={file} className="file"><span>{file.endsWith('.swf') ? '⚡' : file.includes('.') ? '📄' : '📁'}</span>{file}</div>)}</div></> }
function Internet({ browser, year }) { return <div className="browser"><div className="address">Address: <input value={`http://www.${year}.example/`} readOnly /><button>Go</button></div><div className="web-page"><h1>Welcome to the ${year} Web!</h1><p>This is a safe, built-in Internet museum for the {browser} era.</p><hr /><a href="#retro">Yahoo! &nbsp; GeoCities &nbsp; WebRing &nbsp; Guestbook</a><p className="blink">★ Best viewed at 800 × 600 ★</p><div className="counter">You are visitor number 00001998</div></div></div> }
function FlashPlayer({ frame, setFrame, year }) { return <div className="flash"><div className="flash-toolbar">File&nbsp;&nbsp; View&nbsp;&nbsp; Control&nbsp;&nbsp; Help <span>Macromedia Flash Player 6</span></div><div className="stage"><div className="flash-ball" style={{ transform: `translate(${frame * 5}px, ${Math.sin(frame / 3) * 30}px)` }}>⚡</div><h2>Welcome.swf</h2><p>Retro vector animation · {year}</p></div><div className="controls"><button onClick={() => setFrame(0)}>⏮</button><button onClick={() => setFrame(frame + 1)}>▶ Play</button><button onClick={() => setFrame(Math.max(0, frame - 1))}>◀ Frame</button><span>Frame {frame + 1} / 24</span></div><p className="notice">Shockwave Flash Object · Local sandbox playback. Original proprietary plug-ins are not included.</p></div> }

createRoot(document.getElementById('root')).render(<App />)
