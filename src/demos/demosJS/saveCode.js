/*
    saveCode.ts/js
    Gabriel Sessions
    2/24/2022

    Saves code from a demo file into local storage
    Future extension opportunities provided through the DemoCode class

*/
var LAST_SAVED_ID = "#lastSaved";
var SAVING_ICON_ID = "#savingIcon";
var SAVE_ANIMATION_LEN = 1500;
var DemoCode = /** @class */ (function () {
    function DemoCode(fileName, userCode, lastSaved) {
        this._userCode = "";
        this._lastSaved = new Date(0);
        this._fileName = fileName;
        this._userCode = userCode;
        this._lastSaved = lastSaved;
    }
    Object.defineProperty(DemoCode.prototype, "fileName", {
        get: function () {
            return this._fileName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DemoCode.prototype, "userCode", {
        get: function () {
            if (this._userCode == "")
                return ("No user code has been written so far.");
            return this._userCode;
        },
        set: function (newCode) {
            this._userCode = newCode;
            localStorage.setItem(this._fileName, this._userCode);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DemoCode.prototype, "lastSaved", {
        get: function () {
            return this._lastSaved;
        },
        enumerable: false,
        configurable: true
    });
    DemoCode.prototype.updateSavedDate = function () {
        this._lastSaved = new Date(Date.now());
    };
    return DemoCode;
}());
// Uses the page name as the file name for saving user code
var path = window.location.pathname;
var pageName = path.split("/").pop();
// Code saver is initialized upon page load
var CodeSaver = new DemoCode(pageName);
var getPreviousCode = function () { return localStorage.getItem(pageName); };
// Displays new last save date and saves new code to local storage
var saveCode = function (code, autosave) {
    CodeSaver.userCode = code; // Implicit userCode setter call
    CodeSaver.updateSavedDate();
    var lastSavedDate = CodeSaver.lastSaved; // Implicit getter call
    if (autosave) {
        $(LAST_SAVED_ID).html("Autosaved at: " + lastSavedDate.toDateString() + " " + lastSavedDate.getHours() + ":" + lastSavedDate.getMinutes() + ":" + lastSavedDate.getSeconds());
    }
    else {
        $(LAST_SAVED_ID).html("Last Save: " + lastSavedDate.toDateString() + " " + lastSavedDate.getHours() + ":" + lastSavedDate.getMinutes() + ":" + lastSavedDate.getSeconds());
        showSavingIcon();
        animateLastSaved();
    }
};
// Fades in the new last save date 
var animateLastSaved = function () {
    $(LAST_SAVED_ID).hide();
    $(LAST_SAVED_ID).fadeIn();
};
// Displays the saving... text and icon
var showSavingIcon = function () {
    $(SAVING_ICON_ID).addClass("inline-flex");
    $(SAVING_ICON_ID).removeClass("hidden");
    $(SAVING_ICON_ID).attr("style", "");
    setTimeout(function () {
        $(SAVING_ICON_ID).fadeOut((2 / 3) * SAVE_ANIMATION_LEN, function () {
            $(SAVING_ICON_ID).removeClass("inline-flex");
            $(SAVING_ICON_ID).addClass("hidden");
        });
    }, (1 / 3) * SAVE_ANIMATION_LEN);
};
