/* -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set ts=8 sts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef mozilla_ipc_ShmemMessageUtils_h
#define mozilla_ipc_ShmemMessageUtils_h

#include "ipc/IPCMessageUtils.h"
#include "mozilla/ipc/IPDLParamTraits.h"
#include "mozilla/ipc/Shmem.h"

namespace IPC {

template <>
struct ParamTraits<mozilla::ipc::Shmem> {
  typedef mozilla::ipc::Shmem paramType;

  static void Write(IPC::MessageWriter* aWriter, paramType&& aParam);
  static bool Read(IPC::MessageReader* aReader, paramType* aResult);

  static void Log(const paramType& aParam, std::wstring* aLog) {
    aLog->append(L"(shmem segment)");
  }
};

}  // namespace IPC

#endif  // ifndef mozilla_ipc_ShmemMessageUtils_h
