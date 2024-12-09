export function AppHeader() {
    return (
        <header
            className="app-header"
            style={{
                backgroundColor: '#e0e0e0', // Or any preferred color
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
    );
}