interface Props{
    children: any;
}

export default ( {children}: Props ) => {
    return (
        <>
            <header>
                {/* тут своей позже своей жизнью будет жить компонент header */}
            </header>
            <div id="page_content">
                {children}
            </div>
        </>
    )
}