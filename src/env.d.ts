/// <reference path="../.astro/types.d.ts" />

import "user-agent-data-types"

declare global {
  interface ScreenOrientation extends EventTarget {
    lock(orientation: OrientationLockType): Promise<void>
  }
}
