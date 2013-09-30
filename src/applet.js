'use strict';
const Applet = imports.ui.applet;
// const Gtk = imports.gi.Gtk;
// const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const Settings = imports.ui.settings;
const St = imports.gi.St;
const Util = imports.misc.util;
const Lang = imports.lang;
const Clutter = imports.gi.Clutter;
// const Cinnamon = imports.gi.Cinnamon;

const ModalDialog = imports.ui.modalDialog;

const Gettext = imports.gettext.domain('cinnamon-extensions');
const _ = Gettext.gettext;

function MyApplet(orientation){
    this._init.apply(this, arguments);
}

MyApplet.prototype = {
    __proto__: Applet.IconApplet.prototype,

    _init: function(metadata, orientation, panel_height, instanceId){
	    Applet.IconApplet.prototype._init.call(this, orientation, panel_height, instanceId);
        try {
	        this.initSettings(metadata, instanceId);
	        this.initMainMenu(orientation);

            this.set_applet_icon_symbolic_name('go-up');
            this.set_applet_tooltip(' - none -');

	        this.addMenuItem('Error dialog', 'system-lock-screen', function () {
		        let errorDialog = new ErrorDialog('Test error message', 'Error message body');
		        errorDialog.open();
	        });
	        this.addMenuItem('Confirm dialog', 'system-lock-screen', function () {
		        let confirm = new ConfirmationDialog('Test prompt message', function () { }, true);
		        confirm.open();
	        });
			this.addMenuSeparator();
	        this.addMenuItem('Menu item 3', 'system-lock-screen', function () { });

	        this.addContextMenuItem('Settings', 'system-run', function () {
		        Util.spawnCommandLine('cinnamon-settings applets ' + metadata.uuid + ' ' + instanceId);
	        });
	        this.addContextMenuItem('Settings 2', 'system-run', function () { });
	        this.addContextMenuSeparator();
	        this.addContextMenuItem('Settings 3', 'system-run', function () { });

            this.updateUi();
        } catch(e) {
            global.logError(e);
        }
    },

	initSettings : function (metadata, instanceId) {
		this.settings = new Settings.AppletSettings(this, metadata.uuid, instanceId);
		this.settings.bindProperty(Settings.BindingDirection.IN, "testText", "testText", this.updateUi);
	},

	initMainMenu : function (orientation) {
		this.menuManager = new PopupMenu.PopupMenuManager(this);
		this.menu = new Applet.AppletPopupMenu(this, orientation);
		this.menuManager.addMenu(this.menu);
		this._contentSection = new PopupMenu.PopupMenuSection();
		this.menu.addMenuItem(this._contentSection);
	},

	contextMenuItems : [],

	addContextMenuItem : function(title, icon, callback) {
		var contextMenuItem = new Applet.MenuItem(title, icon, function () {
			callback();
		});
		this.contextMenuItems.push(contextMenuItem);
		this._applet_context_menu.addMenuItem(contextMenuItem);
	},

	menuItems : [],

	addMenuItem : function (title, icon, callback) {
		var menuItem = new Applet.MenuItem(title, icon, function () {
			callback();
		});
		this.menuItems.push(menuItem);
		this.menu.addMenuItem(menuItem);
	},

	addContextMenuSeparator : function () {
		this._applet_context_menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
	},

	addMenuSeparator : function () {
		this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
	},

    updateUi : function () {
        if (this.testText) {
            this.set_applet_tooltip(this.testText);
        } else {
            this.set_applet_tooltip(' - none 2 -');
        }
    },

    on_applet_clicked: function(event) {
        this.menu.toggle();
    },

    on_applet_removed_from_panel: function() {
        this.settings.finalize();
    }
}

function main(metadata, orientation, panel_height, instanceId) {
    let myApplet = new MyApplet(metadata, orientation, panel_height, instanceId);
    return myApplet;
}






function ConfirmationDialog(prompt, yesAction, yesFocused){
	this._init(prompt, yesAction, yesFocused);
}

ConfirmationDialog.prototype = {
	__proto__: ModalDialog.ModalDialog.prototype,

	_init: function(message, yesAction, yesFocused) {
		ModalDialog.ModalDialog.prototype._init.call(this);
		let label = new St.Label({ text: message });
		this.contentLayout.add(label);

		this.setButtons([
			{
				label: _("Yes"),
				focused: yesFocused,
				action: Lang.bind(this, function(){
					yesAction();
					this.close();
				})
			},
			{
				label: _("No"),
				action: Lang.bind(this, function(){
					this.close();
				})
			}
		]);
	}
};



function ErrorDialog() {
	this._init.apply(this, arguments);
};

ErrorDialog.prototype = {
	__proto__: ModalDialog.ModalDialog.prototype,

	_init: function(title, message) {
		ModalDialog.ModalDialog.prototype._init.call(this);
		let mainContentBox = new St.BoxLayout({ vertical: false });
		this.contentLayout.add(mainContentBox, { x_fill: true, y_fill: true });
		let messageBox = new St.BoxLayout({ vertical: true });
		mainContentBox.add(messageBox, { y_align: St.Align.START });
		this._subjectLabel = new St.Label({ text: title });
		messageBox.add(this._subjectLabel, { y_fill: false, y_align: St.Align.START });
		this._descriptionLabel = new St.Label({ text: message });
		messageBox.add(this._descriptionLabel, { y_fill: true, y_align: St.Align.START });
		this.setButtons([
			{
				label: _("OK"),
				action: Lang.bind(this, function() {
					this.close();
				}),
				key: Clutter.Escape
			}
		]);
	}
};