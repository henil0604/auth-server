import { writable } from 'svelte/store';


export let state = writable({
    isProgressing: false,
    currentScreen: "signin",
    Users: [],
    temp: {
        lastScreen: "",
    },
    dialog: {
        open: false,
        title: "",
        content: ""
    }
})