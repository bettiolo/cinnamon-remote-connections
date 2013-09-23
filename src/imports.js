"use strict";

var imports = function() {
    function Imports() { }
    Imports.prototype = {
        ui : ui,
        gi : gi,
	    misc : misc
    };
    return Imports;
}();

// Second level

var ui = function() {
    function Ui() { }
    Ui.prototype = {
        main : main,
	    applet : applet,
	    popupMenu : popupMenu
    };
    return Ui;
}();

var gi = function() {
	function Gi() { }
	Gi.prototype = {
		St : St
	};
	return Gi;
}();

// Third level

var main = function() {
    function Main() { }
    Main.prototype = {

    };
    return Main;
}();

var misc = function() {
	function Misc() { }
	Misc.prototype = {
		util : util
	};
	return Main;
}();

var misc = function() {
	function Misc() { }
	Misc.prototype = {
		util : util
	};
	return Main;
}();

// Files in /usr/share/cinnamon/js

var applet = function() {
    function Applet() { }
    Applet.prototype = {
        IconApplet : IconApplet,
	    AppletPopupMenu : AppletPopupMenu,
	    MenuItem : MenuItem
    };
    return Applet;
}();

var popupMenu = function() {
	function PopupMenu() { }
	PopupMenu.prototype = {
		PopupMenuManager : PopupMenuManager,
		PopupMenuSection : PopupMenuSection,
		PopupSeparatorMenuItem : PopupSeparatorMenuItem
	};
	return PopupMenu;
}();

var settings = function() {
	function Settings() { }
	Settings.prototype = {
		AppletSettings : AppletSettings,
		BindingDirection : BindingDirection
	};
	return Settings;
}();

// End of Files in /usr/share/cinnamon/js

// Files in /usr/share/cinnamon/misc

var util = function() {
	function Util() { }
	Util.prototype = {
		spawnCommandLine : function (commandLine) {}
	};
	return Util;
}();

// End of Files in /usr/share/cinnamon/misc

// External

var St = function() {
	function St() { }
	St.prototype = {
	};
	return St;
}();