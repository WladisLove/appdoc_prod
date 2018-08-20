/* eslint-disable */
/** @license MIT License (c) 2011,2012 Copyright Tavendo GmbH. */

/**
 * AutobahnJS - http://autobahn.ws
 *
 * A lightweight implementation of
 *
 *   WAMP (The WebSocket Application Messaging Protocol) - http://wamp.ws
 *
 * Provides asynchronous RPC/PubSub over WebSocket.
 *
 * Copyright 2011, 2012 Tavendo GmbH. Licensed under the MIT License.
 * See license text at http://www.opensource.org/licenses/mit-license.php
 */


/** @define {string} */
var AUTOBAHNJS_VERSION = '?.?.?';

var ab = window.ab = {};

ab._version = AUTOBAHNJS_VERSION;

(function () {
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
            if (this === null) {
                throw new TypeError();
            }
            var t = new Object(this);
            var len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = 0;
            if (arguments.length > 0) {
                n = Number(arguments[1]);
                if (n !== n) { // shortcut for verifying if it's NaN
                    n = 0;
                } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            if (n >= len) {
                return -1;
            }
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (; k < len; k++) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        };
    }

    if (!Array.prototype.forEach) {

        Array.prototype.forEach = function (callback, thisArg) {

            var T, k;

            if (this === null) {
                throw new TypeError(" this is null or not defined");
            }
            var O = new Object(this);
            var len = O.length >>> 0; // Hack to convert O.length to a UInt32

            if ({}.toString.call(callback) !== "[object Function]") {
                throw new TypeError(callback + " is not a function");
            }

            if (thisArg) {
                T = thisArg;
            }

            k = 0;

            while (k < len) {

                var kValue;

                if (k in O) {
                    kValue = O[k];
                    callback.call(T, kValue, k, O);
                }
                k++;
            }
        };
    }

})();


// Logging message for unsupported browser.
ab.browserNotSupportedMessage = "Browser does not support WebSockets (RFC6455)";
ab._subprotocol = "wamp";

ab.PrefixMap = function () {
    var self = this;
    self._index = {};
    self._rindex = {};
};

ab.PrefixMap.prototype.get = function (prefix) {

    var self = this;
    return self._index[prefix];
};

ab.PrefixMap.prototype.set = function (prefix, uri) {

    var self = this;
    self._index[prefix] = uri;
    self._rindex[uri] = prefix;
};

ab.PrefixMap.prototype.resolve = function (curie, pass) {

    var self = this;

    // skip if not a CURIE
    var i = curie.indexOf(":");
    if (i >= 0) {
        var prefix = curie.substring(0, i);
        if (self._index[prefix]) {
            return self._index[prefix] + curie.substring(i + 1);
        }
    }

    // either pass-through or null
    if (pass == true) {
        return curie;
    } else {
        return null;
    }
};


ab._MESSAGE_TYPEID_WELCOME        = 0;
ab._MESSAGE_TYPEID_PREFIX         = 1;
ab._MESSAGE_TYPEID_SUBSCRIBE      = 5;
ab._MESSAGE_TYPEID_EVENT          = 8;

ab.CONNECTION_UNSUPPORTED = 3;

ab.Session = function (wsuri, onopen, onclose, options) {

    var self = this;

    self._websocket_onopen = onopen;
    self._websocket_onclose = onclose;
    self._websocket = null;
    self._websocket_connected = false;
    self._session_id = null;
    self._subscriptions = {};
    self._prefixes = new ab.PrefixMap();

    self._txcnt = 0;
    self._rxcnt = 0;

    if ("WebSocket" in window) {
        // Chrome, MSIE, newer Firefox
        self._websocket = new WebSocket(wsuri, [ab._subprotocol]);
    } else {
        if (onclose !== undefined) {
            onclose(ab.CONNECTION_UNSUPPORTED);
            return;
        } else {
            throw ab.browserNotSupportedMessage;
        }
    }

    self._websocket.onmessage = function (e)
    {
        var o = JSON.parse(e.data);
        if (o[0] === ab._MESSAGE_TYPEID_EVENT)
        {
            var subid = self._prefixes.resolve(o[1], true);
            if (subid in self._subscriptions) {

                var uri2 = o[1];
                var val = o[2];

                self._subscriptions[subid].forEach(function (callback) {

                    callback(uri2, val);
                });
            }
            else {
                // ignore unsolicited event!
            }
        }
        else if (o[0] === ab._MESSAGE_TYPEID_WELCOME)
        {
            if (self._session_id === null) {
                self._session_id = o[1];
                self._wamp_version = o[2];
                self._server = o[3];

                // only now that we have received the initial server-to-client
                // welcome message, fire application onopen() hook
                if (self._websocket_onopen !== null) {
                    self._websocket_onopen(self._session_id, self._wamp_version, self._server);
                }
            } else {
                throw "protocol error (welcome message received more than once)";
            }
        }
    };

    self._websocket.onopen = function (e){
        self._websocket_connected = true;
    };

    self._websocket.onclose = function (e){
        self._websocket_connected = false;
        self._websocket_onopen = null;
        self._websocket_onclose = null;
        self._websocket = null;
    };
};


ab.Session.prototype._send = function (msg) {

    var self = this;

    if (!self._websocket_connected) {
        throw "Autobahn not connected";
    }

    var rmsg = JSON.stringify(msg);
    self._websocket.send(rmsg);
    self._txcnt += 1;
};


ab.Session.prototype.prefix = function (prefix, uri) {

    var self = this;

    if (self._prefixes.get(prefix) !== undefined) {
        throw "prefix '" + prefix + "' already defined";
    }

    self._prefixes.set(prefix, uri);

    var msg = [ab._MESSAGE_TYPEID_PREFIX, prefix, uri];
    self._send(msg);
};


ab.Session.prototype.subscribe = function (topicuri, callback) {

    var self = this;
    //console.log('subscribe',topicuri, callback)

    // subscribe by sending WAMP message when topic not already subscribed
    //
    var rtopicuri = self._prefixes.resolve(topicuri, true);
    if (!(rtopicuri in self._subscriptions)) {

        //console.log('in sending')
        var msg = [ab._MESSAGE_TYPEID_SUBSCRIBE, topicuri];
        self._send(msg);

        self._subscriptions[rtopicuri] = [];
    }

    // add callback to event listeners list if not already in list
    //
    var i = self._subscriptions[rtopicuri].indexOf(callback);
    if (i === -1) {
        self._subscriptions[rtopicuri].push(callback);
    }
    else {
        throw "callback " + callback + " already subscribed for topic " + rtopicuri;
    }
};

export default ab;