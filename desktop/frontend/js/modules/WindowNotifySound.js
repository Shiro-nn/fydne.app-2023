class WindowNotifySound {
    static getName() {
        return window.localStorage.getItem('settings.notify.sound.name') ?? 'meow1';
    }
    static setName(value) {
        window.localStorage.setItem('settings.notify.sound.name', value);
    }
    
    static getVolume() {
        let _get = window.localStorage.getItem('settings.notify.sound.volume') ?? 50;
        return !isNaN(_get) ? _get : 50;
    }
    static setVolume(value) {
        window.localStorage.setItem('settings.notify.sound.volume', value);
    }
    
    static get() {
        return {
            name: this.getName(),
            volume: this.getVolume(),
        }
    }
    static set(name, volume) {
        this.setName(name);
        this.setVolume(volume);
    }
}