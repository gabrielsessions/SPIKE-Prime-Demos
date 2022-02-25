/*
    saveCode.ts/js
    Gabriel Sessions
    2/24/2022

    Saves code from a demo file into local storage
    Future extension opportunities provided through the DemoCode class

*/

const LAST_SAVED_ID = "#lastSaved";
const SAVING_ICON_ID = "#savingIcon";
const SAVE_ANIMATION_LEN = 1500;

class DemoCode{
    private _fileName: string;
    private _userCode: string = "";
    private _lastSaved: Date = new Date(0);

    public constructor(fileName: string, userCode?: string, lastSaved?: Date) {
        this._fileName = fileName;
        this._userCode = userCode;
        this._lastSaved = lastSaved;
    }

    public get fileName(): string {
        return this._fileName;
    }

    public get userCode(): string {
        if (this._userCode == "")
            return ("No user code has been written so far.");
        return this._userCode;
    }

    public get lastSaved(): Date {
        return this._lastSaved;
    }

    public set userCode(newCode: string) {
        this._userCode = newCode;
        localStorage.setItem(this._fileName, this._userCode);
    }

    public updateSavedDate() {
        this._lastSaved = new Date(Date.now());
    }

}

// Uses the page name as the file name for saving user code
let path: string = window.location.pathname;
const pageName: string = path.split("/").pop();

// Code saver is initialized upon page load
let CodeSaver: DemoCode = new DemoCode(pageName);

let getPreviousCode = () => localStorage.getItem(pageName);


// Displays new last save date and saves new code to local storage
let saveCode = (code: string, autosave: boolean)  => {
    CodeSaver.userCode = code; // Implicit userCode setter call
    CodeSaver.updateSavedDate();
    let lastSavedDate: Date = CodeSaver.lastSaved;  // Implicit getter call

    if (autosave) {
        $(LAST_SAVED_ID).html("Autosaved at: " + lastSavedDate.toDateString() + " " + lastSavedDate.getHours() + ":" + lastSavedDate.getMinutes() + ":" +  lastSavedDate.getSeconds());
    }
    else {
        $(LAST_SAVED_ID).html("Last Save: " + lastSavedDate.toDateString() + " " + lastSavedDate.getHours() + ":" + lastSavedDate.getMinutes() + ":" +  lastSavedDate.getSeconds());
        showSavingIcon();
        animateLastSaved();
    }
    

    
    
}

// Fades in the new last save date 
let animateLastSaved = () => {
    $(LAST_SAVED_ID).hide();
    $(LAST_SAVED_ID).fadeIn();
}

// Displays the saving... text and icon
let showSavingIcon = () => {
    $(SAVING_ICON_ID).addClass("inline-flex");
    $(SAVING_ICON_ID).removeClass("hidden");
    $(SAVING_ICON_ID).attr("style", "");

    setTimeout(() => {

        $(SAVING_ICON_ID).fadeOut((2/3) * SAVE_ANIMATION_LEN, () => {
            $(SAVING_ICON_ID).removeClass("inline-flex");
            $(SAVING_ICON_ID).addClass("hidden");
        });
        
        
    }, (1/3) * SAVE_ANIMATION_LEN);

}







