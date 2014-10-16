/**
 * Created by ejimenez on 10/15/2014.
 */

window.console = (function(win) {
    var logs = [],
        console = win.console;

    function log(message) {
        logs.push(message);
        console.log(message);
    }

    function show() {
        var list = '';
        for (var i = 0; i < logs.length; i++) {
            list += logs[i] + '\r\n';
        }
        console.log(list);
        return list;
    }

    function clear() {
        logs = [];
    }

    return {
        log: log,
        show: show,
        clear: clear
    };
})(window);
