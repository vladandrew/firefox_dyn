/* -*- Mode: IDL; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

dictionary FileSystemCreateWritableOptions {
  boolean keepExistingData = false;
};

// TODO: Add Serializable
[Exposed=(Window,Worker), SecureContext, Pref="dom.fs.enabled"]
interface FileSystemFileHandle : FileSystemHandle {
  Promise<File> getFile();

  Promise<FileSystemWritableFileStream> createWritable(optional FileSystemCreateWritableOptions options = {});

  [Exposed=DedicatedWorker]
  Promise<FileSystemSyncAccessHandle> createSyncAccessHandle();
};
