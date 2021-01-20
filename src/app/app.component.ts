import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public isMobile: string;
    public vs: number;
    public us: number;

    ngOnInit(): void {
        this.refresh();
    }


    @HostListener('window:visibilitychange', ['$event'])
    onVisibility() {
        console.log('ENTERED')
        if (document.visibilityState === 'hidden') {
            console.log('SETTING')
            this.fetchSet('vstate');
        }
    }

    @HostListener('window:unload', ['$event'])
    onUnload() {
        this.fetchSet('ustate');
        // let log = localStorage.getItem('ustate');
        // if (!!log) {
        //     let intlog = parseInt(log);
        //     intlog++;
        //     localStorage.setItem('ustate', `${intlog}`);
        // } else {
        //     localStorage.setItem('ustate', '0');
        // }
    }

    public fetchSet(key: string) {
        let log = localStorage.getItem(key);
        if (!!log) {
            let intlog = parseInt(log);
            intlog++;
            localStorage.setItem(key, `${intlog}`);
        } else {
            localStorage.setItem(key, '0');
        }
    }

    public fetchVal(key: string) {
        const val = localStorage.getItem(key);
        console.log(val);
        return parseInt(!!val ? val : '0');
    }

    public addToSession() {
        sessionStorage.setItem('sessionData', 'something');
    }

    public checkSession() {
        const data = sessionStorage.getItem('sessionData');
        const msg = !!data ? 'contains data' : 'is empty';
        alert(`Session ${msg}`);
    }

    public refresh() {
        let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        this.isMobile = isMobile ? 'mobile' : 'immobile';
        this.vs = this.fetchVal('vstate');
        this.us = this.fetchVal('ustate');
    }

    title = 'netlify-test';
}
