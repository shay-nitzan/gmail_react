export function AppHeader() {
    return (
        <header
            className="app-header"
            style={{
                backgroundColor: '#edf2fb',
                padding: '10px',
                borderBottom: '1px solid #ccc',
            }}
        >
            <img
                src="/img/logo_gmail.png"
                alt="Logo"
                style={{ height: '40px', marginRight: '10px' }}
            />
        </header>
    )
}