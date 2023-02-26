// ==UserScript==
// @name        Y2mate Youtube Music Converter Button Mini
// @namespace   https://www.y2mate.com/
// @version     1.8
// @date        2022-12-13
// @author      A Koi (mod: Li Deheng)
// @description Y2mate Downloader: Download Video and Audio for free
// @homepage    https://y2mate.com/
// @icon        https://y2mate.com/themes/images/logo.png
// @icon64      https://y2mate.com/themes/images/logo.png
// @updateURL   https://www.y2mate.com/extensions/chrome/helper.meta.js
// @downloadURL https://www.y2mate.com/extensions/chrome/helper.user.js
// @include     http://*
// @include     https://*
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
// @connect     music.youtube.com
// @connect     www.music.youtube.com
// @connect     www.y2mate.com
// @connect     self
// @connect     *
// ==/UserScript==
var AKoiMain = {
	oXHttpReq: null,
	vid: null,
	oldUrl: null,
	DocOnLoad: function (o) {
		try {
			if (null != o && null != o.body && null != o.location && (AKoiMain.vid = AKoiMain.getVid(o), AKoiMain.vid)) {
				var t = o.querySelector("#like-button-renderer"),
				e = o.querySelector("#y2mateconverter"),
				n = AKoiMain.GetCommandButton();
				null == e && (null != t ? t.parentNode.insertBefore(n, t.nextSibling) : (t = o.querySelector("#eow-title")).parentNode.insertBefore(n, t)),
				AKoiMain.oldUrl = o.location.href,
				AKoiMain.checkChangeVid()
			}
			return !0 }
		catch (o) { console.log("Error in function Y2mate.DocOnLoad. ", o) } },
	checkChangeVid: function () {
		setTimeout(function () {
			AKoiMain.oldUrl == window.location.href ? AKoiMain.checkChangeVid() : AKoiMain.WaitLoadDom(window.document) }, 1e3) },
		WaitLoadDom: function (o) {
			AKoiMain.vid = AKoiMain.getVid(o),
			AKoiMain.vid ? null != o.querySelector("#progress-bar #sliderContainer") ? AKoiMain.DocOnLoad(o) : setTimeout(function () { AKoiMain.WaitLoadDom(o) }, 1e3) : AKoiMain.checkChangeVid() },
	goToY2mate: function (o) {
		try {
			var t = "https://y2mate.com/youtube/" + AKoiMain.vid + "/?utm_source=chrome_addon";
			window.open(t, "_blank") }
		catch (o) { console.log("Error in function Y2mate.OnButtonClick. ", o) } },
	GetCommandButton: function () {
		try {
			var o = document.createElement("button");
			return o.id = "y2mateconverter",
				o.className = "yt-uix-tooltip",
				o.setAttribute("type", "button"),
				o.setAttribute("title", "Download with\ny2mate.com"),
				o.innerHTML = '<img width="32px" height="32px" src="https://user-images.githubusercontent.com/48417413/220382362-140f7b8a-55bf-4197-89a3-0928560f710d.svg">',
				o.addEventListener("click", function (o) { AKoiMain.goToY2mate(o) }, !0),
				o.setAttribute("style", "display: flex; justify-content: center; align-items: center; position: relative; cursor: pointer; width: 36px; height: 36px; background: rgba(255,0,62,0.0); margin: 0px 0px 0px 8px; border-radius: 18px; border: none;"),
				o.setAttribute("onmouseover", "this.style.backgroundColor='rgba(255,0,62,0.3)'"),
				o.setAttribute("onmouseout", "this.style.backgroundColor='rgba(255,0,62,0.0)'"), o }
		catch (o) { console.log("Error in function Y2mate.GetCommandButton. ", o) } },
	getVid: function (o) {
		var t = o.location.toString().match(/^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/);
		return !(!t || !t[3]) && t[3] } };
AKoiMain.WaitLoadDom(window.document);