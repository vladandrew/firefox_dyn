/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

/* import-globals-from ../../mochitest/layout.js */
loadScripts({ name: "layout.js", dir: MOCHITESTS_DIR });

const appUnitsPerDevPixel = 60;

function testCachedScrollPosition(acc, expectedX, expectedY) {
  let cachedPosition = "";
  try {
    cachedPosition = acc.cache.getStringProperty("scroll-position");
  } catch (e) {
    // `getStringProperty` will throw an exception if we ask for
    // a domain it doesn't have -- catch the exception here to
    // prevent it from taking down the whole test.
    console.info("Unable to fetch scroll position from cache!");
  }

  // The value we retrieve from the cache is in app units, but the values
  // passed in are in pixels. Since the retrieved value is a string,
  // and harder to modify, adjust our expected x and y values to match its units.
  return (
    cachedPosition ==
    `${expectedX * appUnitsPerDevPixel}, ${expectedY * appUnitsPerDevPixel}`
  );
}

/**
 * Test bounds of accessibles after scrolling
 */
addAccessibleTask(
  `
  <div id='square' style='height:100px; width:100px; background:green; margin-top:3000px; margin-bottom:4000px;'>
  </div>

  <div id='rect' style='height:40px; width:200px; background:blue; margin-bottom:3400px'>
  </div>
  `,
  async function(browser, docAcc) {
    ok(docAcc, "iframe document acc is present");
    await testBoundsInContent(docAcc, "square", browser);
    await testBoundsInContent(docAcc, "rect", browser);

    await invokeContentTask(browser, [], () => {
      content.document.getElementById("square").scrollIntoView();
    });

    await waitForContentPaint(browser);

    await testBoundsInContent(docAcc, "square", browser);
    await testBoundsInContent(docAcc, "rect", browser);

    await invokeContentTask(browser, [], () => {
      content.document.getElementById("rect").scrollIntoView();
    });

    await waitForContentPaint(browser);
    await testBoundsInContent(docAcc, "square", browser);
    await testBoundsInContent(docAcc, "rect", browser);
  },
  { iframe: true, remoteIframe: true, chrome: true }
);

/**
 * Test scroll offset on cached accessibles
 */
addAccessibleTask(
  `
  <div id='square' style='height:100px; width:100px; background:green; margin-top:3000px; margin-bottom:4000px;'>
  </div>

  <div id='rect' style='height:40px; width:200px; background:blue; margin-bottom:3400px'>
  </div>
  `,
  async function(browser, docAcc) {
    // We can only access the `cache` attribute of an accessible when
    // the cache is enabled and we're in a remote browser. Verify
    // both these conditions hold, and return early if they don't.
    if (!isCacheEnabled || !browser.isRemoteBrowser) {
      return;
    }

    ok(docAcc, "iframe document acc is present");
    await untilCacheOk(
      () => testCachedScrollPosition(docAcc, 0, 0),
      "Correct initial scroll position."
    );

    await invokeContentTask(browser, [], () => {
      content.document.getElementById("square").scrollIntoView();
    });

    await waitForContentPaint(browser);

    // The only content to scroll over is `square`'s top margin
    // so our scroll offset here should be 3000px
    await untilCacheOk(
      () => testCachedScrollPosition(docAcc, 0, 3000),
      "Correct scroll position after first scroll."
    );

    await invokeContentTask(browser, [], () => {
      content.document.getElementById("rect").scrollIntoView();
    });

    await waitForContentPaint(browser);
    // We have to scroll over `square`'s top margin (3000px),
    // `square` itself (100px), and `square`'s bottom margin (4000px).
    // This should give us a 7100px offset.
    await untilCacheOk(
      () => testCachedScrollPosition(docAcc, 0, 7100),
      "Correct final scroll position."
    );
  },
  { iframe: true, remoteIframe: true }
);
