/// <reference path="../.astro/types.d.ts" />

interface ScreenOrientation extends EventTarget {
  lock(orientation: OrientationLockType): Promise<void>
}
