import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const eras = Object.fromEntries(Array.from({ length: 22 }, (_, i) => {
  const year = 1998 + i
  const name = year < 2000 ? 'Windows 98' : year < 2001 ? 'Windows 2000' : year < 2006 ? 'Windows XP' : year < 2009 ? 'Windows Vista' : year < 2012 ? 'Windows 7' : year < 2015 ? 'Windows 8.1' : 'Windows 10'
  const browser = year < 2000 ? 'Internet Explorer 4' : year < 2005 ? 'Internet Explorer 6' : year < 2009 ? 'Internet Explorer 7' : year < 2012 ? 'Firefox' : year < 2015 ? 'Internet Explorer 11' : 'Microsoft Edge'
  return [year, { name, browser, color: year < 2006 ? '#008080' : '#0078d7', wallpaper: year < 2001 ? 'clouds' : year < 2006 ? 'bliss' : year < 2012 ? 'vista' : 'windows10' }]
}))

function App() {
  const [year, setYear] = useState(1998)
  const [menu, setMenu] = useState(false)
  const [activeWindow, setActiveWindow] = useState(null)
  const era = eras[year]
  const years = useMemo(() => Object.keys(eras).map(Number), [])
  const open = name => { setActiveWindow(name); setMenu(false) }
  return <main className={`desktop wallpaper-${era.wallpaper}`} style={{ '--accent': era.color }} onClick={() => menu && setMenu(false)}>
    <header className="era-bar"><strong>Windows 98 Time Machine</strong><label>Era: <select value={year} onChange={e => { setYear(Number(e.target.value)); setActiveWindow(null) }}>{years.map(y => <option key={y}>{y}</option>)}</select></label><span>{era.name} · {era.browser}</span></header>
    <section className="icons"><DesktopIcon icon="🖥️" label={year < 2002 ? 'My Computer' : 'This PC'} onDoubleClick={() => open('computer')} /><DesktopIcon icon="🌐" label={era.browser} onDoubleClick={() => open('internet')} /><DesktopIcon icon="⚡" label="Flash Player" onDoubleClick={() => open('flash')} /><DesktopIcon icon="📁" label="My Documents" onDoubleClick={() => open('documents')} /><DesktopIcon icon="🗑️" label="Recycle Bin" onDoubleClick={() => open('recycle')} /></section>
    {activeWindow && <AppWindow title={windowTitle(activeWindow, era)} onClose={() => setActiveWindow(null)}>{activeWindow === 'flash' && <FlashPlayer year={year} />}{activeWindow === 'internet' && <Internet browser={era.browser} year={year} onFlash={() => open('flash')} />}{activeWindow === 'computer' && <FileExplorer />}{activeWindow === 'documents' && <FileExplorer documents />}{activeWindow === 'recycle' && <div className="empty">The Recycle Bin is empty.</div>}</AppWindow>}
    <footer className="taskbar" onClick={e => e.stopPropagation()}><button className="start" onClick={() => setMenu(!menu)}>▣ Start</button><span className="task">{activeWindow ? windowTitle(activeWindow, era) : 'Ready'}</span><span className="clock">{year}/09/20&nbsp; 12:00 PM</span>{menu && <div className="start-menu"><div className="side">Windows<br />98</div><div className="menu-items"><button onClick={() => open('internet')}>🌐 {era.browser}</button><button onClick={() => open('flash')}>⚡ Macromedia Flash Player / Ruffle</button><button onClick={() => open('computer')}>🖥️ {year < 2002 ? 'My Computer' : 'This PC'}</button><hr /><button onClick={() => open('documents')}>📁 Documents</button><button onClick={() => open('recycle')}>🗑️ Recycle Bin</button></div></div>}</footer>
  </main>
}

function DesktopIcon({ icon, label, onDoubleClick }) { return <button className="desktop-icon" onDoubleClick={onDoubleClick}><span>{icon}</span><small>{label}</small></button> }
function windowTitle(name, era) { return ({ flash: 'Macromedia Flash Player', internet: era.browser, computer: 'My Computer', documents: 'My Documents', recycle: 'Recycle Bin' })[name] }
function AppWindow({ title, onClose, children }) { return <section className="app-window"><div className="titlebar"><b>{title}</b><button onClick={onClose}>×</button></div><div className="window-body">{children}</div></section> }
function FileExplorer({ documents }) { const files = documents ? ['readme.txt', 'vacation.jpg', 'welcome.swf'] : ['3½ Floppy (A:)', 'Local Disk (C:)', 'My Documents', 'Control Panel', 'Printers']; return <><div className="toolbar">File&nbsp;&nbsp; Edit&nbsp;&nbsp; View&nbsp;&nbsp; Help</div><div className="file-grid">{files.map(file => <div key={file} className="file"><span>{file.endsWith('.swf') ? '⚡' : file.includes('.') ? '📄' : '📁'}</span>{file}</div>)}</div></> }
function Internet({ browser, year, onFlash }) { return <div className="browser"><div className="address">Address: <input value={`http://www.${year}.example/`} readOnly /><button>Go</button></div><div className="web-page"><h1>Welcome to the {year} Web!</h1><p>This safe Internet museum is displayed by {browser}.</p><hr /><a href="#retro">Yahoo! &nbsp; GeoCities &nbsp; WebRing &nbsp; Guestbook</a><p className="blink">★ Best viewed at 800 × 600 ★</p><button onClick={onFlash}>▶ Play this Shockwave Flash movie</button><p className="counter">You are visitor number 00001998</p></div></div> }

function FlashPlayer() {
  const host = useRef(null)
  const player = useRef(null)
  const [url, setUrl] = useState('https://ruffle.rs/demo.swf')
  const [status, setStatus] = useState('Loading Ruffle…')
  const [fileName, setFileName] = useState('welcome.swf')

  useEffect(() => {
    let cancelled = false
    const start = () => {
      if (cancelled || !host.current || !globalThis.RufflePlayer) return
      const instance = globalThis.RufflePlayer.newest().createPlayer()
      instance.style.width = '100%'; instance.style.height = '100%'
      host.current.replaceChildren(instance); player.current = instance
      setStatus('Ruffle ready — choose a local SWF or load an approved URL.')
      instance.load({ url }).catch(() => setStatus('Unable to load this SWF. Check its URL and CORS permissions.'))
    }
    if (globalThis.RufflePlayer) start()
    else {
      let script = document.querySelector('script[data-ruffle]')
      if (!script) { script = document.createElement('script'); script.src = 'https://unpkg.com/@ruffle-rs/ruffle/ruffle.js'; script.dataset.ruffle = 'true'; document.body.appendChild(script) }
      script.addEventListener('load', start)
      script.addEventListener('error', () => setStatus('Ruffle could not be downloaded. Check your connection or deploy the Ruffle assets locally.'))
    }
    return () => { cancelled = true; player.current?.remove() }
  }, [])

  const loadUrl = () => { if (!player.current) return setStatus('Ruffle is still loading.'); if (!url.startsWith('https://')) return setStatus('For safety, remote Flash URLs must use HTTPS.'); setStatus('Loading…'); player.current.load({ url }).catch(() => setStatus('This SWF could not be loaded. Check the URL and CORS permissions.')) }
  const loadFile = event => { const file = event.target.files?.[0]; if (!file || !player.current) return; setFileName(file.name); setStatus('Loading local SWF…'); const reader = new FileReader(); reader.onload = () => player.current.load({ buffer: new Uint8Array(reader.result) }).catch(() => setStatus('This local SWF could not be played.')); reader.onerror = () => setStatus('Could not read that file.'); reader.readAsArrayBuffer(file) }
  return <div className="flash"><div className="flash-toolbar">File&nbsp;&nbsp; View&nbsp;&nbsp; Control&nbsp;&nbsp; Help <span>Macromedia Flash Player 6 · Ruffle</span></div><div className="flash-stage" ref={host}><div className="loading">{status}</div></div><div className="flash-controls"><input value={url} onChange={e => setUrl(e.target.value)} aria-label="SWF URL" /><button onClick={loadUrl}>Load URL</button><label className="file-button">Open SWF<input type="file" accept=".swf,application/x-shockwave-flash" onChange={loadFile} /></label></div><p className="notice">{status} · Current file: {fileName} · Ruffle is an open-source Flash emulator.</p></div>
}

class ErrorBoundary extends React.Component { state = { error: null }; static getDerivedStateFromError(error) { return { error } }; render() { return this.state.error ? <pre style={{ padding: 20, color: '#900', background: '#fff' }}>Application error: {this.state.error.message}</pre> : this.props.children } }
createRoot(document.getElementById('root')).render(<ErrorBoundary><App /></ErrorBoundary>)
