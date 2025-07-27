(()=>{
    const FRFdate = Date.now();
    window.addEventListener('keydown', (e) => {
        if(e.ctrlKey && e.code == 'KeyI') return;
        e.preventDefault();
        if(e.ctrlKey && e.code == 'KeyR'){
            if(Date.now() - FRFdate > 10000){
                document.querySelector('iframe').contentWindow.location.reload();
            }
            return;
        }
        document.querySelector('iframe').contentWindow.dispatchEvent(new KeyboardEvent('keydown', e));
    });
})();