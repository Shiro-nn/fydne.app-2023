module.exports = {
    getUrl: () => {
        try {
            let url = '';
            if (process.argv[1] == '.') url = process.argv.slice(2);
            else url = process.argv.slice(1);
            if (url == null || url == undefined) url = '';
            return url.join(' ');
        } catch {
            return '';
        }
    },
    useUrl: (url, client) => {
        const args = url.replace('fydne://', '').split('/');
        if(args.length < 2) return;
        
        switch (args[0]) {
            case 'token': client.emit('update.token', args.slice(1).join('/')); break;
        
            default: break;
        }
    },
};