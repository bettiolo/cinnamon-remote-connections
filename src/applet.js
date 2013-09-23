const Applet = imports.ui.applet;
// const Gtk = imports.gi.Gtk;
// const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const Settings = imports.ui.settings;
const St = imports.gi.St;
const Util = imports.misc.util;
// const Lang = imports.lang;
// const Cinnamon = imports.gi.Cinnamon;

const Gettext = imports.gettext.domain('cinnamon-extensions');
const _ = Gettext.gettext;

function MyApplet(orientation){
    this._init.apply(this, arguments);
}

MyApplet.prototype = {
    __proto__: Applet.IconApplet.prototype,

    _init: function(metadata, orientation, panel_height, instanceId){
        try {
            this.settings = new Settings.AppletSettings(this, metadata.uuid, instanceId);
            this.settings.bindProperty(Settings.BindingDirection.IN, "testText", "testText", this.updateUi);

            Applet.IconApplet.prototype._init.call(this, orientation);
            this.set_applet_icon_symbolic_name('go-up');
            this.set_applet_tooltip(' - none -');

            this.menuManager = new PopupMenu.PopupMenuManager(this);
            this.menu = new Applet.AppletPopupMenu(this, orientation);
            this.menuManager.addMenu(this.menu);
            this._contentSection = new PopupMenu.PopupMenuSection();
            this.menu.addMenuItem(this._contentSection);

            this.menu1 = new Applet.MenuItem('Menu item', 'system-lock-screen', function () {

            });

            this.menu.addMenuItem(this.menu1);

            this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

            this.contextMenuItem1 = new Applet.MenuItem('Settings', 'system-run', function () {
                Util.spawnCommandLine('cinnamon-settings applets ' + metadata.uuid);
            });
            this._applet_context_menu.addMenuItem(this.contextMenuItem1);

            this.updateUi();
        } catch(e) {
            global.logError(e);
        }
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