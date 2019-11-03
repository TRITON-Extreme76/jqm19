/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../scripts/typings/jquerymobile/jquerymobile.d.ts" />
String.prototype.toInt = function () {
    var n = parseInt(this, 0);
    if (!n || isNaN(n)) {
        n = 0;
    }
    return n;
};
String.prototype.toFloat = function () {
    var n = parseFloat(this);
    if (!n || isNaN(n)) {
        n = 0;
    }
    return n;
};
Number.prototype.toComma = function () {
    return String(this).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};
Number.prototype.toFillZero = function (width) {
    var v = String(this);
    width -= v.length;
    if (width > 0) {
        return Array(width + 1).join("0") + v;
    }
    else {
        return v;
    }
};
Number.prototype.deg = function () {
    return this * 180 / Math.PI;
};
Number.prototype.rad = function () {
    return this * Math.PI / 180;
};
var JQuery;
(function (JQuery) {
    "use strict";
    var $ = jQuery;
    $.fn.uiInputWidth = function (value) {
        var parent = $(this).parent(".ui-input-search, .ui-input-text");
        if (parent.length > 0) {
            parent.css("max-width", value);
        }
        return this;
    };
    $.fn.tabChain = function (value) {
        var chains = [];
        for (var i = 0; i < $(this).length; i++) {
            if (getTabIndex($(this)[i]) >= 0) {
                chains.push($(this)[i]);
            }
        }
        var first = chains[0];
        var last = chains[chains.length - 1];
        for (var i = 0; i < chains.length; i++) {
            $(chains[i]).off("keydown", keydownEventHandler);
            if (value) {
                $(chains[i]).on("keydown", keydownEventHandler);
            }
        }
        return this;
        function keydownEventHandler(event) {
            if (event.keyCode === 9) {
                if (event.target === last && !event.shiftKey) {
                    first.focus();
                    return false;
                }
                else if (event.target === first && event.shiftKey) {
                    last.focus();
                    return false;
                }
            }
        }
        function getTabIndex(target) {
            var idx = parseInt($(target).attr("tabindex"), 0);
            if (isNaN(idx)) {
                return 0;
            }
            else {
                return idx;
            }
        }
    };
    $.fn.skipTabIndex = function (value) {
        if (value) {
            $(this).attr("tabindex", -1);
        }
        else {
            $(this).attr("tabindex", "");
        }
        return this;
    };
    $.fn.hideInputClear = function (value) {
        var btn = $(this).next(".ui-input-clear");
        if (btn && btn.length > 0) {
            if (value) {
                btn.css("display", "none");
            }
            else {
                btn.css("display", "");
            }
        }
        return this;
    };
    $.fn.disabled = function (value) {
        if (typeof value === "undefined") {
            if ($(this).is(":disabled")) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (value === true) {
                $(this).attr("disabled", "disabled");
            }
            else {
                $(this).removeAttr("disabled");
            }
            return this;
        }
    };
    $.fn.uiDisabled = function (value, opacity) {
        if (typeof value === "undefined") {
            return $(this).hasClass("ui-disabled");
        }
        else {
            if (value === true) {
                $(this).addClass("ui-disabled");
                if (opacity) {
                    $(this).css("opacity", opacity);
                }
            }
            else {
                $(this).removeClass("ui-disabled");
                if (opacity) {
                    $(this).css("opacity", "");
                }
            }
            return this;
        }
    };
    $.fn.readOnly = function (value) {
        if (typeof value === "undefined") {
            if ($(this).is(":readonly")) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (value === true) {
                $(this).attr("readonly", "readonly");
            }
            else {
                $(this).removeAttr("readonly");
            }
            return this;
        }
    };
    $.fn.checked = function (value, refresh) {
        if (typeof value === "undefined") {
            if ($(this).is(":checked")) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (value) {
                $(this).prop("checked", true);
            }
            else {
                $(this).prop("checked", false);
            }
            if (refresh) {
                $(this).checkboxradio().checkboxradio("refresh");
            }
            return this;
        }
    };
    $.fn.resetDisplay = function () {
        $(this).css("display", "");
        return this;
    };
    $.fn.uiBtnActive = function (value) {
        if (typeof value === "undefined") {
            return $(this).hasClass("ui-btn-active");
        }
        else {
            if (value === true) {
                $(this).addClass("ui-btn-active");
            }
            else {
                $(this).removeClass("ui-btn-active");
            }
            return this;
        }
    };
    $.fn.uiBtnUnderline = function (value) {
        if (typeof value === "undefined") {
            return $(this).hasClass("ui-btn-underline");
        }
        else {
            if (value) {
                $(this).addClass("ui-btn-underline");
            }
            else {
                $(this).removeClass("ui-btn-underline");
            }
            return this;
        }
    };
    $.fn.vclick = function () {
        $(this).trigger("vclick");
        return this;
    };
    $.fn.isVisible = function () {
        if ($(this).is(":visible")) {
            return true;
        }
        else {
            return false;
        }
    };
    $.fn.numberSpin = function (options) {
        if ($(this).length > 1) {
            for (var i = 0; i < $(this).length; i++) {
                $(this).eq(i).numberSpin(options);
            }
            return;
        }
        /* 初期化*/
        var container = $(this).closest(".ui-input-text");
        {
            container.css("padding-right", "").addClass("ui-input-has-spin");
            container.children(".ui-btn-spin-group").remove();
            var itm = container.next(".ui-slider");
            if (itm.children(".ui-slider-spin").length > 0) {
                itm.remove();
            }
        }
        var spinInput = container.children("input");
        //オプション
        var opts = {
            digits: 0,
            slider: false,
            max: 100,
            min: 0,
            step: 1,
            alignRight: false
        };
        {
            // 少数桁
            if ((options) && (typeof options.digits !== "undefined") && (options.digits >= 0)) {
                opts.digits = options.digits;
            }
            // スライダー表示
            if ((options) && (typeof options.slider !== "undefined")) {
                opts.slider = options.slider;
            }
            // 最大値
            if ((options) && (typeof options.max !== "undefined")) {
                opts.max = options.max;
            }
            else {
                var attrMax = parseFloat(spinInput.attr("max"));
                if (isNaN(attrMax) === false) {
                    opts.max = attrMax;
                }
            }
            // 最小値
            if ((options) && (typeof options.min !== "undefined")) {
                opts.min = options.min;
            }
            else {
                var attrMin = parseFloat(spinInput.attr("min"));
                if (isNaN(attrMin) === false) {
                    opts.min = attrMin;
                }
            }
            // 増減値
            if ((options) && (typeof options.step !== "undefined")) {
                opts.step = options.step;
            }
            else {
                var attrStep = parseFloat(spinInput.attr("step"));
                if (isNaN(attrStep) === false) {
                    opts.step = attrStep;
                }
            }
            opts.step = Math.abs(opts.step);
            if ((options) && (options.alignRight)) {
                spinInput.css("text-align", "right");
            }
        }
        spinInput.attr({
            "min": opts.min,
            "max": opts.max,
            "step": opts.step
        });
        /*
         * 増減ボタン作成
         */
        var spinGroup = $("<div class='ui-btn-spin-group'>");
        var spinPlus = $("<a href='#' tabindex='-1' title='plus'   class='ui-btn ui-btn-inline ui-btn-icon-notext ui-icon-plus  ui-btn-spin-plus'>");
        var spinMinus = $("<a href='#' tabindex='-1' title='miuns' class='ui-btn ui-btn-inline ui-btn-icon-notext ui-icon-minus ui-btn-spin-minus'>");
        {
            // グループ追加
            container.append(spinGroup);
            // ボタン追加
            spinGroup.append(spinMinus);
            spinGroup.append(spinPlus);
            var r = 1;
            if (container.hasClass("ui-input-has-clear")) {
                r = container.outerWidth() - container.width();
            }
            var h = spinInput.outerHeight() - 2;
            spinGroup.css({
                top: 1,
                height: h,
                right: r
            });
            spinGroup.children(".ui-btn").outerHeight(h);
            container.css({
                "padding-right": r + spinGroup.outerWidth() + 2
            });
        }
        /*
         * スライダー作成
         */
        var spinSlider;
        if ((opts.slider) && (opts.min < opts.max)) {
            var content = "";
            content += "<input";
            content += " tabindex='-1'";
            content += " type='range'";
            content += " min='" + opts.min + "'";
            content += " max='" + opts.max + "'";
            content += " step='" + opts.step + "'";
            content += " class='ui-slider-spin'";
            content += ">";
            spinSlider = $(content);
            container.after(spinSlider);
            spinSlider
                .enhanceWithin()
                .slider()
                .slider("refresh")
                .off("change")
                .on("change", function (event) {
                var v = parseFloat(spinSlider.val());
                spinInput.val(v);
                updateValue(0, false);
            });
            spinSlider.closest(".ui-slider").find(".ui-btn").attr("tabindex", "-1");
        }
        updateValue(0, false);
        /*
         * イベント
         */
        {
            spinInput.off("blur").on("blur", function (event) {
                updateValue(0, false);
            });
            spinInput.off("keydown").on("keydown", function (event) {
                switch (event.which) {
                    case 13:
                        updateValue(0, true); // 表示
                        return false;
                    case 33: // PageUp
                    case 38: // Up
                    case 39:
                        updateValue(1, true); // 増
                        return false;
                    case 34: // PageDown
                    case 37: // Left
                    case 40:
                        updateValue(-1, true); // 減
                        return false;
                }
            });
            spinPlus.off("click").on("click", function (event) {
                updateValue(1, true); // 増
            });
            spinMinus.off("click").on("click", function (event) {
                updateValue(-1, true); // 減
            });
            spinPlus.off("mousedown").on("mousedown", function (event) {
                setRepeatTimer(1); // リピート増
            });
            spinPlus.off("mouseup").on("mouseup", function (event) {
                setRepeatTimer(0); // リピート終了
            });
            spinPlus.off("mouseleave").on("mouseleave", function (event) {
                setRepeatTimer(0); // リピート終了
            });
            spinMinus.off("mousedown").on("mousedown", function (event) {
                setRepeatTimer(-1); // リピート減
            });
            spinMinus.off("mouseup").on("mouseup", function (event) {
                setRepeatTimer(0); // リピート終了
            });
            spinMinus.off("mouseleave").on("mouseleave", function (event) {
                setRepeatTimer(0); // リピート終了
            });
        }
        /*
         * 増減リピートタイマー設定
         */
        var delayTitmeHandle = 0; // リピート開始待ち
        var repeatTimerHandle = 0; // リピート間隔
        function setRepeatTimer(off) {
            if (off) {
                // 設定
                setRepeatTimer(0);
                delayTitmeHandle = setTimeout(function () {
                    repeatTimerHandle = setInterval(function () {
                        updateValue(off, true);
                    }, 50);
                }, 1000);
            }
            else {
                // クリア
                if (delayTitmeHandle) {
                    clearTimeout(delayTitmeHandle);
                    delayTitmeHandle = 0;
                }
                if (repeatTimerHandle) {
                    clearInterval(repeatTimerHandle);
                    repeatTimerHandle = 0;
                }
            }
        }
        /*
         * 値更新
         */
        function updateValue(off, sel) {
            if (off > 0) {
                off = opts.step;
            }
            if (off < 0) {
                off = -opts.step;
            }
            var prev = parseFloat(spinInput.val());
            var v = prev + off;
            if (isNaN(v)) {
                v = 0;
            }
            v = limitMax(v);
            v = limitMin(v);
            spinInput.val(v.toFixed(opts.digits));
            if (spinSlider) {
                spinSlider.val(v).slider("refresh");
            }
            if (sel) {
                spinInput.select();
            }
            if (prev !== v) {
                spinInput.change();
            }
        }
        /*
         * 最小値取得
         */
        function limitMin(value) {
            if (opts.max <= opts.min) {
                return value;
            }
            return Math.max(value, opts.min);
        }
        /*
         * 最大値取得
         */
        function limitMax(value) {
            if (opts.max <= opts.min) {
                return value;
            }
            return Math.min(value, opts.max);
        }
        return this;
    };
})(JQuery || (JQuery = {}));
/*
 * Input HTML5対応
 */
$(document).on("focusout", ".ui-input-text", function (event) {
    $(this).removeClass("ui-focus");
});
var cm;
(function (cm) {
    "use strict";
    cm.ajaxTimeOut = 30000;
    function getFileParts(name) {
        var expReg = /(.+)(\.([^.]+$))/;
        var parts = name.match(expReg);
        var title = name;
        var extension = "";
        if (parts) {
            title = parts[1];
            extension = parts[2];
        }
        return { extension: extension, title: title };
    }
    cm.getFileParts = getFileParts;
    function apiBaseUrl() {
        return getSiteRoot() + "api/";
    }
    cm.apiBaseUrl = apiBaseUrl;
    /*
     * エラー表示
     */
    function showErrMsg(e) {
        var msg;
        if (e.stack) {
            msg += e.stack + "\n";
        }
        if (e.status) {
            msg += e.status + ":" + e.statusText + "\n";
        }
        else if (e.statusText) {
            msg += e.statusText + "\n";
        }
        if (e.responseText) {
            msg += e.responseText + "\n";
        }
        if (e.message) {
            msg += e.message + "\n";
        }
        if (!msg) {
            msg = e;
        }
        alert(msg);
    }
    cm.showErrMsg = showErrMsg;
    /*
     * サイトのルート取得
     */
    var _siteRoot = "";
    function getSiteRoot() {
        if (!_siteRoot) {
            var scripts = document.getElementsByTagName("script");
            var i = scripts.length;
            while (i--) {
                var match = scripts[i].src.match(/(^|.*\/)cm\.js*/);
                if (match) {
                    _siteRoot = match[1] + "../"; // cm.jsの場所からルートを設定
                    break;
                }
            }
            var emt = $("<a>").attr("href", _siteRoot).get(0);
            _siteRoot = emt.href;
        }
        return _siteRoot;
    }
    cm.getSiteRoot = getSiteRoot;
    function changeLocation(url, data) {
        // オフライン
        if (isOffline() === true) {
            return;
        }
        if (!url) {
            url = "";
        }
        url = getSiteRoot() + url;
        if (data) {
            // POST
            var f = $("<form/>", { "action": url, "method": "post", "target": "_self" });
            for (var key in data) {
                if (key) {
                    f.append($("<input/>", { "type": "hidden", "name": key, "value": data[key] }));
                }
            }
            f.appendTo(document.body);
            f.submit();
            f.remove();
        }
        else {
            // GET
            location.replace(url);
        }
    }
    cm.changeLocation = changeLocation;
    function windowOpen(url, data) {
        // オフライン
        if (isOffline() === true) {
            return;
        }
        if (!url) {
            url = "";
        }
        url = getSiteRoot() + url;
        if (data) {
            // POST
            var f = $("<form/>", { "action": url, "method": "post", "target": "_blank" });
            for (var key in data) {
                if (key) {
                    f.append($("<input/>", { "type": "hidden", "name": key, "value": data[key] }));
                }
            }
            f.appendTo(document.body);
            f.submit();
            f.remove();
        }
        else {
            // GET
            window.open(url, "_blank");
        }
    }
    cm.windowOpen = windowOpen;
    /*
     * パラメーター取得
     */
    function getRestParams(lastName) {
        var params = [];
        var paths = location.pathname.split("\/");
        var idx = 0;
        for (var i = 0; i < paths.length; i++) {
            if (paths[i].toLocaleLowerCase() === lastName.toLocaleLowerCase()) {
                idx = i + 1;
                break;
            }
        }
        if (idx > 0) {
            for (var i = idx; i < paths.length; i++) {
                params.push(decodeURIComponent(paths[i]));
            }
        }
        return params;
    }
    cm.getRestParams = getRestParams;
    function getLocationParams() {
        var params = {};
        if (location.search) {
            var srcs = location.search.substring(1).split("&");
            for (var i = 0; i < srcs.length; i++) {
                var idx = srcs[i].indexOf("=");
                if (idx >= 0) {
                    var k = decodeURIComponent(srcs[i].substring(0, idx));
                    var v = decodeURIComponent(srcs[i].substring(idx + 1));
                    params[k] = v;
                }
                else {
                    params[srcs[i]] = "";
                }
            }
        }
        return params;
    }
    cm.getLocationParams = getLocationParams;
    /*
     * ローダー表示、表示中判定
     */
    function isBusy(value) {
        // オフライン
        if (isOffline() === true) {
            return true;
        }
        var loader = $(".ui-loader");
        if (typeof value === "undefined") {
            return loader.isVisible();
        }
        if (value === true) {
            if (loader.isVisible() === true) {
                return true;
            }
            $("body").addClass("ui-disabled").css("opacity", 1);
            var content = "";
            content += "<div class='ui-img-loading'></div>";
            //content += "<span class='ui-icon-loading'></span>";
            content += "<div class='ui-loading-spinner'></div>";
            content += "<h1>Wait…</h1>";
            // html表示、他の設定も必要
            $.mobile.loading("show", {
                html: content,
                textVisible: true,
                textonly: false
            });
            //$.mobile.loading("show", {
            //	text: "Wait…"
            //	, textVisible: true
            //	, textonly: false
            //});
            var h = loader.outerHeight();
            var w = loader.outerWidth();
            loader.css({
                "margin-top": -h / 2,
                "margin-left": -w / 2
            });
            loader.tabChain(true);
            return false;
        }
        else {
            $.mobile.loading("hide");
            $("body").removeClass("ui-disabled");
            loader.tabChain(false);
            return false;
        }
    }
    cm.isBusy = isBusy;
    /*
     * AJAX進捗表示
     */
    function ajaxLoaderProgress() {
        var x = $.ajaxSettings.xhr();
        if (x.upload) {
            x.upload.addEventListener("progress", loaderProgress, false);
        }
        return x;
    }
    cm.ajaxLoaderProgress = ajaxLoaderProgress;
    function loaderProgress(e) {
        var loader = $(".ui-loader");
        var progress = loader.children(".ui-progress-loading");
        if (progress.length <= 0) {
            progress = $("<div class='ui-progress-loading'></div>");
            loader.append(progress);
        }
        var v = Math.floor((e.loaded / e.total * 10000) / 100);
        progress.width(v + "%");
    }
    cm.loaderProgress = loaderProgress;
    /*
     * 必要ならスクロール
     */
    function requiredScroll(selector, offset) {
        if (!offset) {
            offset = 0;
        }
        var pd = cm.getPaddingValue(cm.getActivePage());
        var wy = $(window).scrollTop();
        var wh = $(window).outerHeight();
        var y1 = $(selector).offset().top;
        var y2 = y1 + $(selector).outerHeight();
        var sy = -1;
        if (wy + pd.top > y1) {
            sy = y1 - pd.top - offset;
        }
        if (wy + wh - pd.bottom < y2) {
            sy = y2 - wh + pd.bottom + offset;
        }
        if (sy >= 0) {
            $("html, body").scrollTop(sy);
        }
    }
    cm.requiredScroll = requiredScroll;
    /*
     * スクロール位置設定
     */
    function setScrollTop(selector) {
        if (selector) {
            var pd = cm.getPaddingValue(cm.getActivePage());
            var y = $(selector).offset().top;
            $("html, body").scrollTop(y - pd.top);
        }
        else {
            $.mobile.silentScroll(0);
        }
    }
    cm.setScrollTop = setScrollTop;
    /*
     * スクロール位置設定
     */
    function setScrollBottom(selector) {
        if (selector) {
            var pd = cm.getPaddingValue(cm.getActivePage());
            var y1 = $(selector).offset().top;
            var y2 = y1 + $(selector).outerHeight();
            var wy = $(window).scrollTop();
            var wh = $(window).height();
            var sy = -1;
            if (wy + pd.top > y1) {
                sy = y1 - pd.top;
            }
            if (wy + wh - pd.bottom < y2) {
                sy = y2 - wh + pd.bottom;
            }
            if (sy >= 0) {
                $("html, body").scrollTop(sy);
            }
        }
        else {
            $.mobile.silentScroll($(document).height());
        }
    }
    cm.setScrollBottom = setScrollBottom;
    /*
     * スクロール位置判定
     */
    function isScrollTop(margin) {
        if (margin === undefined) {
            margin = 0;
        }
        if ($(window).scrollTop() <= margin) {
            return true;
        }
        return false;
    }
    cm.isScrollTop = isScrollTop;
    /*
     * スクロール位置判定
     */
    function isScrollBottom(margin) {
        if (margin === undefined) {
            margin = 0;
        }
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - margin) {
            return true;
        }
        return false;
    }
    cm.isScrollBottom = isScrollBottom;
    /*
     * スクロール位置取得
     */
    function getScrollTop() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    }
    cm.getScrollTop = getScrollTop;
    /*
     * エラーバルーン設定
     */
    function errorBallon(selector, message) {
        var target = $(".ui-error");
        if (selector) {
            target = $(selector);
        }
        if (message) {
            message = message.replace(/\r?\n/g, "<br>"); // 改行コードBR変換
            target.html(message).addClass("ui-error-ballon");
        }
        else {
            target.html("").removeClass("ui-error-ballon");
        }
    }
    cm.errorBallon = errorBallon;
    /*
     * アクティブページ
     */
    function getActivePageId() {
        var pg = getActivePage();
        if ((pg) && (pg[0])) {
            return pg[0].id;
        }
        return "";
    }
    cm.getActivePageId = getActivePageId;
    function getActivePage() {
        return $.mobile.pageContainer.pagecontainer("getActivePage");
    }
    cm.getActivePage = getActivePage;
    function getToPageId(ui) {
        if (ui && ui.toPage.length > 0) {
            return ui.toPage[0].id;
        }
        return "";
    }
    cm.getToPageId = getToPageId;
    function getPrevPageId(ui) {
        if (ui && ui.prevPage.length > 0) {
            return ui.prevPage[0].id;
        }
        return "";
    }
    cm.getPrevPageId = getPrevPageId;
    /*
     * ページコンテンツサイズ取得
     */
    function getPageContentSize(id) {
        if (typeof id === "undefined") {
            id = getActivePageId();
        }
        var page = $("#" + id);
        var content = page.children(".ui-content");
        var w = content.outerWidth();
        var h = $(window).height();
        var padding = getPaddingValue(page);
        h -= padding.height;
        return [w, h];
    }
    cm.getPageContentSize = getPageContentSize;
    function getPageContentInnerSize(id) {
        if (!id) {
            id = getActivePageId();
        }
        var sz = getPageContentSize(id);
        var padding = getPaddingValue("#" + id + ">.ui-content");
        sz[1] -= padding.height;
        sz[0] -= padding.width;
        return sz;
    }
    cm.getPageContentInnerSize = getPageContentInnerSize;
    function getPaddingValue(selector) {
        var target = $(selector);
        var top = parseInt(target.css("padding-top"), 0);
        if (isNaN(top)) {
            top = 0;
        }
        var bottom = parseInt(target.css("padding-bottom"), 0);
        if (isNaN(bottom)) {
            bottom = 0;
        }
        var left = parseInt(target.css("padding-left"), 0);
        if (isNaN(left)) {
            left = 0;
        }
        var right = parseInt(target.css("padding-right"), 0);
        if (isNaN(right)) {
            right = 0;
        }
        return {
            top: top,
            bottom: bottom,
            left: left,
            right: right,
            width: left + right,
            height: top + bottom
        };
    }
    cm.getPaddingValue = getPaddingValue;
    /*
     * 縦スクロールバー設定
     */
    function hideBodyOverflowY(value) {
        var v = "";
        if (value === true) {
            v = "hidden";
        }
        $("html, body").css("overflow-y", v);
        getActivePage().css("overflow-y", v);
    }
    cm.hideBodyOverflowY = hideBodyOverflowY;
    /*
     * 横スクロールバー設定
     */
    function hideBodyOverflowX(value) {
        var v = "";
        if (value === true) {
            v = "hidden";
        }
        $("html, body").css("overflow-x", v);
        getActivePage().css("overflow-x", v);
    }
    cm.hideBodyOverflowX = hideBodyOverflowX;
    /*
     * オフライン判定
     */
    function isOffline() {
        if (window.navigator.onLine === false) {
            $.mobile.loading("hide");
            alert("Network OffLine...");
            isBusy(false);
            return true;
        }
        return false;
    }
    /*
     * ページ移動
     */
    function changePage(id, hash) {
        // オフライン
        if (isOffline() === true) {
            return;
        }
        if (!hash) {
            hash = false;
        }
        $.mobile.pageContainer.pagecontainer("change", "#" + id, { changeHash: hash });
    }
    cm.changePage = changePage;
    function reloadPage(hash) {
        // オフライン
        if (isOffline() === true) {
            return;
        }
        if (!hash) {
            hash = false;
        }
        $.mobile.pageContainer.pagecontainer("change", "#" + getActivePageId(), { changeHash: hash, reload: true });
    }
    cm.reloadPage = reloadPage;
    /*
     * メッセージバルーン
     */
    var MsgBallon = (function () {
        function MsgBallon(message, positionTo, positionFixed, hasCancel) {
            var scope = this;
            var content = "";
            content += "<div";
            content += " data-role='popup'";
            content += " data-history='false'";
            content += " data-overlay-theme='a'";
            content += ">";
            content += " <div role='main' class='ui-content'>";
            content += "   <div style='white-space: nowrap;'>" + message.replace(/\n/g, "<br/>") + "</div>";
            content += " </div>";
            content += " <div data-role='footer' style='text-align:right;padding:0.3em;'>";
            content += "  <a href='#' class='ui-btn ui-btn-inline ui-btn-active' cmd='apply'>OK</a>";
            if (hasCancel) {
                content += "  <a href='#' class='ui-btn ui-btn-inline' cmd='cancel'>キャンセル</a>";
            }
            content += " </div>";
            content += "</div>";
            // 作成
            var box = $(content)
                .appendTo(cm.getActivePage())
                .enhanceWithin()
                .popup();
            // ボタン押下
            var result = false;
            box.find(".ui-btn").off("click").on("click", function (event) {
                var cmd = $(this).attr("cmd");
                switch (cmd) {
                    case "apply":
                        result = true;
                        box.popup("close");
                        break;
                    case "cancel":
                        box.popup("close");
                        break;
                }
            });
            // 表示
            Popup.open(box, {
                transition: "pop",
                positionTo: positionTo,
                positionFixed: positionFixed,
                arrow: true,
                closeButton: true,
                onClosed: function () {
                    scope.onClosed(result);
                    box.remove();
                }
            });
        }
        MsgBallon.prototype.onClosed = function (result) { ; };
        ;
        return MsgBallon;
    }());
    cm.MsgBallon = MsgBallon;
    var MsgBallon;
    (function (MsgBallon) {
        function show(message, positionTo, positionFixed, hasCancel) {
            return new MsgBallon(message, positionTo, positionFixed, hasCancel);
        }
        MsgBallon.show = show;
    })(MsgBallon = cm.MsgBallon || (cm.MsgBallon = {}));
    /*
     * メッセージボックス
     */
    var MsgBox = (function () {
        function MsgBox(message, title, hasCancel) {
            var scope = this;
            var content = "";
            content += "<div";
            content += " data-role='popup'";
            content += " data-history='false'";
            content += " data-overlay-theme='b'";
            content += " data-dismissible='false'";
            content += ">";
            content += " <div data-role='header'>";
            content += "  <h1>" + title + "</h1>";
            content += " </div>";
            content += " <div role='main' class='ui-content' style='min-width:15em;'>";
            content += "  <div style='text-align:center;'>" + message.replace(/\n/g, "<br/>") + "</div>";
            content += " </div>";
            content += " <div data-role='footer' style=text-align:center;padding:0.3em;>";
            content += "  <a href='#' class='ui-btn ui-btn-inline ui-btn-active' cmd='apply'>OK</a>";
            if (hasCancel) {
                content += "  <a href='#' class='ui-btn ui-btn-inline' cmd='cancel'>キャンセル</a>";
            }
            content += " </div>";
            content += "</div>";
            // 作成
            var box = $(content)
                .appendTo(cm.getActivePage())
                .enhanceWithin()
                .popup();
            // ボタン押下
            var result = false;
            box.find(".ui-btn").off("click").on("click", function (event) {
                var cmd = $(this).attr("cmd");
                switch (cmd) {
                    case "apply":
                        result = true;
                        box.popup("close");
                        break;
                    case "cancel":
                        box.popup("close");
                        break;
                }
            });
            // 表示
            Popup.open(box, {
                transition: "pop",
                positionFixed: true,
                onClosed: function () {
                    scope.onClosed(result);
                    box.remove();
                }
            });
        }
        MsgBox.prototype.onClosed = function (result) { ; };
        ;
        return MsgBox;
    }());
    cm.MsgBox = MsgBox;
    var MsgBox;
    (function (MsgBox) {
        function show(message, title, hasCancel) {
            return new MsgBox(message, title, hasCancel);
        }
        MsgBox.show = show;
    })(MsgBox = cm.MsgBox || (cm.MsgBox = {}));
})(cm || (cm = {}));
var SubWindow;
(function (SubWindow) {
    "use strict";
    var _options = {};
    /*
     * 表示判定
     */
    function isVisible() {
        return $(".ui-subwindow").isVisible();
    }
    SubWindow.isVisible = isVisible;
    /*
     * 表示
     */
    function show(selector, options) {
        if (options) {
            _options = options;
        }
        var target = $(selector);
        var inner = target.children("div").hide();
        target.show();
        inner.fadeIn();
        $(window).resize();
        if (_options && _options.focusSelector) {
            $(_options.focusSelector).focus();
        }
        target.find("input,textarea,button,a").tabChain(true);
        return target;
    }
    SubWindow.show = show;
    /*
     * 終了
     */
    function close() {
        $(".ui-subwindow").hide();
        if (_options && _options.onClosed) {
            _options.onClosed(); // コールバック
        }
    }
    SubWindow.close = close;
    /*
     * サイズ変更
     */
    $(window).on("resize", function (event) {
        var w = $(".ui-subwindow:visible");
        if (w.length > 0) {
            if (w.hasClass("static") === false) {
                var content = w.find(".ui-content");
                if (content.length > 0) {
                    var hd = w.find(".ui-header").outerHeight();
                    var ft = w.find(".ui-footer").outerHeight();
                    content.css({ "margin-top": hd, "margin-bottom": ft });
                }
            }
        }
    });
    /*
     * キーボード操作
     */
    $(window).on("keyup", function (event) {
        if (event.keyCode === 27) {
            var w = $(".ui-subwindow:visible");
            if (w.length > 0) {
                if (!_options || !(_options.unUseCancel)) {
                    close();
                }
            }
        }
    });
    /*
     * オーバーレイクリック
     */
    $(document).on("click", ".ui-subwindow.ui-dismissible", function (event) {
        if (event.target === this) {
            if (!_options || !(_options.unUseCancel)) {
                close();
            }
        }
    });
    /*
     * 終了ボタン押下
     */
    $(document).on("click", ".ui-btn.ui-subwindow-close", function (event) {
        if (!_options || !(_options.unUseCancel)) {
            close();
        }
    });
})(SubWindow || (SubWindow = {}));
var Popup;
(function (Popup) {
    "use strict";
    /*
     * コンテナ取得
     */
    function getContainer(selector) {
        return $(selector).closest(".ui-popup-container");
    }
    Popup.getContainer = getContainer;
    /*
     * オープン
     */
    function open(selector, options) {
        var pos = undefined;
        var target = $(selector);
        var container = getContainer(target);
        // 閉じるボタン追加
        if (options && options.closeButton) {
            target.css("padding-top", "2.4em");
            var btn = $("<button>");
            btn.addClass("ui-btn ui-btn-icon-notext ui-icon-delete ui-popup-close");
            btn.css({
                "position": "absolute",
                "margin": "0.3em",
                "top": 0,
                "right": 0,
                "left": "auto",
                "bottom": "auto",
                "padding": 0
            });
            target.append(btn);
        }
        /*
         * 位置変更
         */
        target.off("popupbeforeposition").on("popupbeforeposition", function (event, data) {
            console.log("popupbeforeposition");
            // 位置指定
            if (options) {
                if (options.positionTo) {
                    delete data.x;
                    delete data.y;
                    data.positionTo = options.positionTo; // リサイズ時の位置復元
                }
                else {
                    // 吹き出し有無判定
                    var hasArrow = (target.children(".ui-popup-arrow-container").length > 0);
                    // x座標
                    var cx = undefined;
                    if (!isNaN(options.x)) {
                        cx = options.x;
                    }
                    else if (!hasArrow) {
                        var winW = $(window).width();
                        var itmW = target.outerWidth();
                        if (!isNaN(options.x1)) {
                            cx = options.x1 + (itmW / 2);
                        }
                        else if (!isNaN(options.x2)) {
                            cx = (winW - (itmW / 2)) - options.x2;
                        }
                    }
                    // y座標
                    var cy = undefined;
                    if (!isNaN(options.y)) {
                        cy = options.y;
                    }
                    else if (!hasArrow) {
                        var winH = $(window).height();
                        var itmH = target.outerHeight();
                        if (!isNaN(options.y1)) {
                            cy = options.y1 + (itmH / 2); // 上端指定
                        }
                        else if (!isNaN(options.y2)) {
                            cy = (winH - (itmH / 2)) - options.y2; // 下端指定			
                        }
                    }
                    // リサイズ時の座標復元
                    if (!isNaN(cx) || !isNaN(cy)) {
                        delete data.positionTo;
                        if (!isNaN(cx)) {
                            data.x = cx;
                        }
                        if (!isNaN(cy)) {
                            data.y = cy;
                        }
                    }
                }
                // 位置固定
                if (options.positionFixed) {
                    var overflow = "auto";
                    if (isOverflow()) {
                        overflow = "scroll"; // Firefox対策
                    }
                    container.css({
                        "position": "fixed",
                        "max-height": $(window).height(),
                        "overflow-y": overflow,
                        "margin-top": ""
                    });
                }
            }
            // 高さオーバーフローイベント
            if (options && options.onHeightOverflow) {
                options.onHeightOverflow(isOverflow()); // コールバック
            }
            $(window).resize();
            function isOverflow() {
                if (target.outerHeight() >= $(window).height()) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
        /*
         * オープン後
         */
        target.off("popupafteropen").on("popupafteropen", function (event) {
            console.log("popupafteropen");
            // フォーカス指定
            if (options && options.focusSelector) {
                var itm = $(options.focusSelector);
                itm.focus();
            }
            // 位置固定
            if (options && options.positionFixed && !options.positionTo) {
                container.css({
                    "margin-top": -cm.getScrollTop()
                });
            }
            $(window).resize();
            // オープン完了
            if (options && options.onOpend) {
                options.onOpend(); // コールバック
            }
        });
        /*
         * クローズ
         */
        target.off("popupafterclose").on("popupafterclose", function (event) {
            // スクロール位置復元
            if (isNaN(pos) === false) {
                $.mobile.silentScroll(pos);
            }
            // 終了イベント
            if (options && options.onClosed) {
                options.onClosed(); // コールバック
            }
            // イベントハンドラ破棄
            target.off("popupbeforeposition")
                .off("popupafteropen")
                .off("popupafterclose");
            // コンテナ位置設定削除
            container.css("position", "");
            target = null;
            container = null;
        });
        // スクロール位置保持
        if (options && options.restoreScrollPos) {
            pos = cm.getScrollTop();
        }
        // オープン
        if (!options) {
            options = {
                transition: "fade" // フェードイン
                ,
                tolerance: "0" // 余白なし
            };
        }
        else {
            if (!options.transition) {
                options.transition = "fade";
            }
            if (!options.tolerance) {
                options.tolerance = "0";
            }
        }
        target.popup(options).popup("open", options);
        target.find("input,textarea,button,a").tabChain(true);
        $(window).resize();
        return target;
    }
    Popup.open = open;
    /*
     * クローズ
     */
    function close() {
        if ($(".ui-popup").isVisible() === true) {
            $(".ui-popup").popup("close");
            return true;
        }
        return false;
    }
    Popup.close = close;
    function isActive(id) {
        if (id) {
            return ($("#" + id + "-popup.ui-popup-active").length > 0);
        }
        else {
            return ($(".ui-popup-active").length > 0);
        }
    }
    Popup.isActive = isActive;
    /*
     * クローズボタン押下
     */
    $(document).on("click", ".ui-btn.ui-popup-close", function (event) {
        Popup.close();
    });
    var Pos;
    (function (Pos) {
        function downLeft(selector) {
            return getPosition(selector, "down", "left");
        }
        Pos.downLeft = downLeft;
        function downRight(selector) {
            return getPosition(selector, "down", "right");
        }
        Pos.downRight = downRight;
        function upLeft(selector) {
            return getPosition(selector, "up", "left");
        }
        Pos.upLeft = upLeft;
        function upRight(selector) {
            return getPosition(selector, "up", "right");
        }
        Pos.upRight = upRight;
        function rightDown(selector) {
            return getPosition(selector, "right", "down");
        }
        Pos.rightDown = rightDown;
        function rightUp(selector) {
            return getPosition(selector, "right", "up");
        }
        Pos.rightUp = rightUp;
        function leftDown(selector) {
            return getPosition(selector, "left", "down");
        }
        Pos.leftDown = leftDown;
        function leftUp(selector) {
            return getPosition(selector, "left", "up");
        }
        Pos.leftUp = leftUp;
        function getPosition(selector, location, align) {
            var target = $(selector);
            var offset = target.offset();
            var x1 = NaN;
            var y1 = NaN;
            var x2 = NaN;
            var y2 = NaN;
            switch (location) {
                case "down":
                    y1 = offset.top + target.outerHeight();
                    break;
                case "up":
                    y2 = $(window).height() - offset.top;
                    break;
                case "right":
                    x1 = offset.left + target.outerWidth();
                    break;
                case "left":
                    x2 = $(window).width() - offset.left;
                    break;
            }
            switch (align) {
                case "left":
                    x1 = offset.left;
                    break;
                case "right":
                    x2 = $(window).width() - offset.left - target.outerWidth();
                    break;
                case "down":
                    y1 = offset.top;
                    break;
                case "up":
                    y2 = $(window).height() - offset.top - target.outerHeight();
                    break;
            }
            return { x1: x1, y1: y1, x2: x2, y2: y2 };
        }
    })(Pos = Popup.Pos || (Popup.Pos = {}));
    var _timer = 0;
    /*
     * リサイズ
     */
    $(window).on("resize", function (event) {
        if (_timer) {
            clearTimeout(_timer);
        }
        _timer = setTimeout(function () {
            _timer = 0;
            // 無理矢理表示と位置補正
            var p = $(".ui-popup-container.ui-popup-active");
            if (p.length > 0) {
                if (p.hasClass("ui-popup-hidden")) {
                    p.removeClass("ui-popup-hidden ui-popup-truncate");
                }
                var s = $(".ui-popup-screen:visible");
                if (s.length > 0) {
                    {
                        var x = p.offset().left;
                        var w = p.outerWidth();
                        var sw = s.width();
                        if (sw < x + w) {
                            p.css("left", sw - w);
                        }
                    }
                    {
                        var y = p.offset().top;
                        var h = p.outerHeight();
                        var sh = s.height();
                        if (sh < y + h) {
                            p.css("top", sh - h);
                        }
                    }
                }
            }
        }, 500);
    });
})(Popup || (Popup = {}));
/*
 * パネル
 */
var Panel;
(function (Panel) {
    "use strict";
    /*
     * クローズ
     */
    function close() {
        $(".ui-panel").panel("close");
    }
    Panel.close = close;
    /*
     * オープン
     */
    function open(selector) {
        var target = $(selector);
        target.panel("open");
        switch (target.css("visibility")) {
            case "hidden":
            case "collapse":
        }
        return target;
    }
    Panel.open = open;
    /*
     * 表示設定
     */
    function setVisible(selector, visible) {
        var target = $(selector);
        if (visible) {
            target.addClass("ui-panel-visible");
            if (typeof visible !== "boolean") {
                setWidth(visible);
            }
        }
        else {
            target.removeClass("ui-panel-visible");
            if (typeof visible !== "boolean") {
                setWidth(visible);
            }
        }
        return target;
        function setWidth(value) {
            var section = target.siblings(".ui-header,.ui-content,.ui-footer");
            target.css("width", value);
            if (target.hasClass("ui-panel-position-left")) {
                section.css("margin-left", value);
            }
            if (target.hasClass("ui-panel-position-right")) {
                section.css("margin-right", value);
            }
        }
    }
    Panel.setVisible = setVisible;
    /*
     * 高さ設定
     */
    function setFixedHeight(selector, height) {
        var target = $(selector);
        if (target.hasClass("ui-panel-fixed")) {
            var inner = target.children(".ui-panel-inner");
            inner.outerHeight(height - inner[0].offsetTop).css("overflow-y", "auto");
        }
        return target;
    }
    Panel.setFixedHeight = setFixedHeight;
})(Panel || (Panel = {}));
/*
 * DateBox
 */
var DateBox;
(function (DateBox) {
    "use strict";
    var _taget = null;
    /*
     * ポップアップオープン、クローズ
     */
    $(document).on("popupafterclose popupafteropen", ".ui-datebox-container.ui-popup", function (event) {
        $(".ui-input-clear").uiBtnActive(false);
        if (event.type === "popupafterclose" && _taget) {
            $(_taget).trigger("datebox_closed");
            _taget = null;
        }
    });
    $(document).on("datebox", function (event, passed) {
        if (passed.method === "open") {
            _taget = event.target;
            $(".ui-input-clear").uiBtnActive(false);
        }
    });
})(DateBox || (DateBox = {}));
/*
 * 遅延タイマー
 */
var DelayTimer = (function () {
    function DelayTimer(sec) {
        this._timer = 0;
        this._millisec = 0;
        this._millisec = sec;
    }
    Object.defineProperty(DelayTimer.prototype, "millisec", {
        get: function () {
            return this._millisec;
        },
        enumerable: true,
        configurable: true
    });
    DelayTimer.prototype.timeout = function (callback, millisec) {
        if (this._timer) {
            clearTimeout(this._timer);
        }
        if (typeof millisec === "undefined") {
            millisec = this._millisec;
        }
        this._timer = setTimeout(function () {
            callback();
        }, millisec);
    };
    return DelayTimer;
}());
/*
 * スクロール位置
 */
var ScrollPos = (function () {
    function ScrollPos(selector) {
        this._value = 0;
        // 対象無しはドキュメント対象
        if (typeof selector !== "undefined") {
            this._target = $(selector);
        }
    }
    /*
     * スクロール位置取得
     */
    ScrollPos.prototype.getScrollValue = function () {
        if (this._target) {
            return this._target.scrollTop();
        }
        else {
            return document.documentElement.scrollTop || document.body.scrollTop;
        }
    };
    /*
     * スクロール実行
     */
    ScrollPos.prototype.doScroll = function (value) {
        if (typeof value === "undefined") {
            value = this._value;
        }
        if (this._target) {
            this._target.scrollTop(value); // 対象BOX位置
        }
        else {
            $.mobile.silentScroll(value); // ドキュメント位置
        }
    };
    /*
     * 設定値設定
     */
    ScrollPos.prototype.setValue = function (value) {
        if (typeof value === "undefined") {
            value = this.getScrollValue(); // 現在のスクロール位置
        }
        this._value = value;
    };
    /*
     * 設定値参照
     */
    ScrollPos.prototype.getValue = function () {
        return this._value;
    };
    return ScrollPos;
}());
var Toaster;
(function (Toaster) {
    "use strict";
    var _timeoutHandle = 0;
    /*
     * オープン
     */
    function open(messages, options) {
        close();
        if (!messages) {
            return;
        }
        var cls = "ui-toaster";
        if (options && options.top) {
            cls += " top";
        }
        if (options && options.float) {
            cls += " float";
        }
        var content = "";
        content += "<div class='" + cls + "'>";
        content += " <div>";
        content += " </div>";
        content += "</div>";
        var toast = $(content);
        toast.children("div").append(messages);
        // クリックして非表示
        toast.off("click").on("click", function (event) {
            close();
        });
        // 自動非表示
        var autoHideSec = 0;
        if (options && options.timeoutSec && options.timeoutSec > 0) {
            autoHideSec = options.timeoutSec;
        }
        if (autoHideSec > 0) {
            _timeoutHandle = setTimeout(function () {
                close();
            }, autoHideSec * 1000);
        }
        // 表示
        $("body").append(toast);
        toast.slideDown();
    }
    Toaster.open = open;
    /*
     * クローズ
     */
    function close() {
        if (_timeoutHandle) {
            clearTimeout(_timeoutHandle);
            _timeoutHandle = 0;
        }
        var toast = $(".ui-toaster:visible");
        if (toast) {
            toast.slideUp(500, function () {
                toast.remove();
            });
        }
        else {
            $(".ui-toaster").remove();
        }
    }
    Toaster.close = close;
})(Toaster || (Toaster = {}));
var Dropdown;
(function (Dropdown) {
    "use strict";
    var Item = (function () {
        function Item(text, value) {
            this.text = text;
            this.value = value;
        }
        return Item;
    }());
    Dropdown.Item = Item;
    /*
     * ドロップダウンリスト表示
     */
    function open(selector, items, options) {
        var target = $(selector);
        var style = "min-height:1em;";
        if (options && options.alignRight) {
            style += "text-align:right;";
        }
        var content = "";
        content += "<div";
        content += " data-role='popup'";
        content += " data-history='false'";
        content += " data-dismissible='true'";
        content += ">";
        content += " <div role='main' class='ui-content'>";
        content += "  <ul data-role='listview' data-icon='false'>";
        for (var i = 0; i < items.length; i++) {
            content += "   <li idx=" + i + ">";
            content += "    <a href='#' style='" + style + "'>" + items[i].text + "</a>";
            content += "   </li >";
        }
        content += "  </ul>";
        content += " </div>";
        content += "</div>";
        // ポップアップ作成
        var box = $(content)
            .appendTo(cm.getActivePage())
            .enhanceWithin()
            .popup();
        // 選択
        box.find("li").off("click").on("click", function (event) {
            var idx = parseInt($(this).attr("idx"), 0);
            if (options && options.onSelected) {
                options.onSelected(items[idx]);
            }
            Popup.close();
        });
        // 表示
        var pos = Popup.Pos.downLeft(target); // 位置取得
        if (options && options.alignRight) {
            pos = Popup.Pos.downRight(target);
        }
        Popup.open(box, {
            transition: "none",
            positionFixed: false,
            x1: pos.x1,
            y1: pos.y1,
            x2: pos.x2,
            y2: pos.y2,
            onClosed: function () {
                box.remove();
                if (options && options.onClosed) {
                    options.onClosed();
                }
            }
        });
    }
    Dropdown.open = open;
})(Dropdown || (Dropdown = {}));
//# sourceMappingURL=cm.js.map