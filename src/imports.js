"use strict";

var imports = function() {
    function Imports() { }
    Imports.prototype = {
        ui : ui
    };
    return Imports;
}();

var ui = function() {
    function Ui() { }
    Ui.prototype = {
        main : main,
	    applet : applet,
	    popupMenu : popupMenu
    };
    return Ui;
}();

var main = function() {
    function Main() { }
    Main.prototype = {

    };
    return Main;
}();

var applet = function() {
    function Applet() { }
    Applet.prototype = {
        IconApplet : IconApplet,
	    AppletPopupMenu : AppletPopupMenu
    };
    return Applet;
}();

var settings = function() {
    function Settings() { }
    Settings.prototype = {
        AppletSettings : AppletSettings,
	    BindingDirection : BindingDirection
    };
    return Settings;
}();

var popupMenu = function() {
	function PopupMenu() { }
	PopupMenu.prototype = {
		PopupMenuManager : PopupMenuManager
	};
	return PopupMenu;
}();