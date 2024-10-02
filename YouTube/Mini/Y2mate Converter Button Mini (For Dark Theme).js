// ==UserScript==
// @name        Y2mate Youtube Converter Button (Mini)
// @namespace   https://www.y2mate.com/
// @version     2.0
// @author      A Koi (mod: Li Deheng)
// @description Y2mate Downloader: Download Video and Audio for free
// @homepage    https://y2mate.com/
// @icon        https://y2mate.com/themes/images/logo.png
// @icon64      https://y2mate.com/themes/images/logo.png
// @supportURL  https://github.com/Li-Deheng/y2mate-converter-button-mini/issues
// @downloadURL https://github.com/Li-Deheng/y2mate-converter-button-mini
// @updateURL   https://github.com/Li-Deheng/y2mate-converter-button-mini/commits/main
// @homepageURL https://github.com/Li-Deheng/y2mate-converter-button-mini
// @match       *://*.youtube.com/*
// @run-at      document-end
// @grant       GM_listValues
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       GM_openInTab
// @grant       GM_setClipboard
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_notification
// @grant       GM_download
// @grant       GM.info
// @grant       GM.listValues
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.deleteValue
// @grant       GM.openInTab
// @grant       GM.setClipboard
// @grant       GM.xmlHttpRequest
// @connect     youtube.com
// @connect     m.youtube.com
// @connect     www.youtube.com
// @connect     youtube-nocookie.com
// @connect     youtu.be
// @connect     www.y2mate.com
// @connect     self
// @connect     *
// ==/UserScript==

/* global trustedTypes */

// Check for Trusted Types support
if (window.trustedTypes) {
  // Creating a security policy
  window.trustedTypes.createPolicy('default', {
    createHTML: (input) => input,
    createScript: (input) => input,
    createScriptURL: (input) => input,
  });
} else {
  console.warn("Trusted Types are not supported by this browser.");
}

var AKoiMain = {
  vid: null,
  DocOnLoad: function (o) {
    try {
      if (null != o && null != o.body && null != o.location && (AKoiMain.vid = AKoiMain.getVid(o), AKoiMain.vid)) {
        o.querySelector("#top-level-buttons-computed").setAttribute("style", "flex-wrap: wrap;");
        var t = o.querySelector("#top-level-buttons-computed segmented-like-dislike-button-view-model"),
          e = o.querySelector("#y2mateconverter");
        var n = AKoiMain.GetCommandButton();
        if (null == e && null != t) {
          t.parentNode.insertBefore(n, t.nextSibling);
        } else if (null == e) {
          var te = o.querySelector(".YtSegmentedLikeDislikeButtonViewModelHost"); // #owner #subscribe-button
          te.parentNode.insertBefore(n, te);
        }
      }
    } catch (o) {
      console.log("Error in function Y2mate.DocOnLoad. ", o);
    }
  },
  goToY2mate: function (o) {
    try {
      var t = "https://y2mate.com/youtube/" + AKoiMain.vid + "/?utm_source=chrome_addon";
      window.open(t, "_blank");
    } catch (o) {
      console.log("Error in function Y2mate.OnButtonClick. ", o);
    }
  },

  GetCommandButton: function () {
    try {
      var o = document.createElement("button");
      o.id = "y2mateconverter";
      o.className = "yt-uix-tooltip";
      o.setAttribute("type", "button");
      o.setAttribute("title", "Download with\ny2mate.com");

      if (window.trustedTypes) {
        o.innerHTML = trustedTypes.defaultPolicy.createHTML(
          '<img width="32px" height="32px" src="https://user-images.githubusercontent.com/48417413/220382362-140f7b8a-55bf-4197-89a3-0928560f710d.svg">'
        );
      } else {
        o.innerHTML = '<img width="32px" height="32px" src="https://user-images.githubusercontent.com/48417413/220382362-140f7b8a-55bf-4197-89a3-0928560f710d.svg">';
      }

      o.addEventListener("click", function (o) {
        AKoiMain.goToY2mate(o);
      }, !0);
      o.setAttribute(
        "style",
        "display: flex; justify-content: center; align-items: center; position: relative; cursor: pointer; width: 36px; height: 36px; background: rgba(255,255,255,0.1); margin: 0px 8px; border-radius: 18px; border: none;"
      );

      // Add event handlers for hovering over and leaving the button
      o.addEventListener("mouseover", function () {
        this.style.backgroundColor = "rgba(255,0,62,0.5)";
      });
      o.addEventListener("mouseout", function () {
        this.style.backgroundColor = "rgba(255,255,255,0.1)";
      });

      return o;
    } catch (o) {
      console.log("Error in function Y2mate.GetCommandButton.", o);
    }
  },
  getVid: function (o) {
    var t = o.location.toString().match(/^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/);
    return !(!t || !t[3]) && t[3];
  },
};

// Function for tracking DOM changes
function observeDOM() {
  var targetNode = document.body;
  var observerOptions = {
    childList: true,
    subtree: true
  };

  var observer = new MutationObserver(function (mutationsList, observer) {
    for (var mutation of mutationsList) {
      if (mutation.type === "childList") {
        AKoiMain.DocOnLoad(document);
      }
    }
  });

  observer.observe(targetNode, observerOptions);
}

// Launch on first page load
AKoiMain.DocOnLoad(document);

// Launch MutationObserver to track changes on the page
observeDOM();


