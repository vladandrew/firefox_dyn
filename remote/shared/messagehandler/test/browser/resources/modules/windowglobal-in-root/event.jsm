/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const EXPORTED_SYMBOLS = ["event"];

const { Module } = ChromeUtils.import(
  "chrome://remote/content/shared/messagehandler/Module.jsm"
);

class EventModule extends Module {
  destroy() {}

  /**
   * Commands
   */

  testEmitInternalWindowGlobalInRootEvent(params, destination) {
    this.emitEvent("internal-event-from-window-global-in-root", {
      text: `internal windowglobal-in-root event for ${destination.id}`,
    });
  }

  testEmitProtocolWindowGlobalInRootEvent(params, destination) {
    this.emitProtocolEvent("event.testWindowGlobalInRootEvent", {
      text: `protocol windowglobal-in-root event for ${destination.id}`,
    });
  }
}

const event = EventModule;
