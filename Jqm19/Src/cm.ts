/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../scripts/typings/jquerymobile/jquerymobile.d.ts" />

/*
 * Panel
 */
interface PanelOptions {
    animate?: boolean;
    defaults?: boolean;
    disabled?: boolean;
    dismissible?: boolean;
    display?: string;
    initSelector?: string;
    position?: string;
    positionFixed?: boolean;
    swipeClose?: boolean;
    theme?: string;
}

interface PanelEvents {
    create?: JQueryMobileEvent;
}

interface JQueryMobile extends JQueryMobileOptions {
    panel: any;
}

interface JQuery {
    panel(): JQuery;
    panel(command: string): JQuery;
    panel(command: string, name: string): string;
    panel(command: string, name: string, value: string): JQuery;
    panel(options: PanelOptions): JQuery;
    panel(events: PanelEvents): JQuery;

}

/*
 * DateBox
 */
interface JQuery {
    datebox(): JQuery;
    datebox(command: any): JQuery;
    datebox(command: string, name: string | boolean | Date): string;
    datebox(command: string, name: string, value: string | boolean | Date): JQuery;
}

/*
 * プラグイン
 */

interface String {
    toInt(): number;
    toFloat(): number;
}

String.prototype.toInt = function () {
    let n = parseInt(this, 0);
    if (!n || isNaN(n)) {
        n = 0;
    }
    return n;
};

String.prototype.toFloat = function () {
    let n = parseFloat(this);
    if (!n || isNaN(n)) {
        n = 0;
    }
    return n;
};

interface Number {
    toComma(): string;
    toFillZero(width: number): string;
    rad(): number;
    deg(): number;
}

Number.prototype.toComma = function () {
    return String(this).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};

Number.prototype.toFillZero = function (width: number) {
    let v = String(this);
    width -= v.length;
    if (width > 0) {
        return Array(width + 1).join("0") + v;
    } else {
        return v;
    }
};

Number.prototype.deg = function () {
    return this * 180 / Math.PI;
};

Number.prototype.rad = function () {
    return this * Math.PI / 180;
};

interface NumberSpinOptions {
    digits?: number;
    slider?: boolean;
    max?: number;
    min?: number;
    step?: number;
    alignRight?: boolean;
}

interface JQuery {
    checked(): boolean;
    checked(value: boolean): JQuery;
    checked(value: boolean, refresh: boolean): JQuery;
    disabled(): boolean;
    disabled(value: boolean): JQuery;
    uiDisabled(): boolean;
    uiDisabled(value: boolean): JQuery;
    uiDisabled(value: boolean, opacity: number): JQuery;
    resetDisplay(): JQuery;
    readOnly(): boolean;
    readOnly(value: boolean): JQuery;
    uiBtnActive(): boolean;
    uiBtnActive(value: boolean): JQuery;
    uiBtnUnderline(): boolean;
    uiBtnUnderline(value: boolean): JQuery;
    vclick(): JQuery;
    isVisible(): boolean;
    numberSpin(options: NumberSpinOptions): JQuery;
    numberSpin(): JQuery;
    hideInputClear(value: boolean): JQuery;
    skipTabIndex(value: boolean): JQuery;
	tabChain(value: boolean): JQuery;
	uiInputWidth(value: string | number): JQuery;
}

namespace JQuery {
    "use strict";
    let $: JQueryStatic = <JQueryStatic>jQuery;

	$.fn.uiInputWidth = function (value: string | number): JQuery {
		let parent = $(this).parent(".ui-input-search, .ui-input-text");
		if (parent.length > 0) {
			parent.css("max-width", value);
		}
		return this;
	};
	$.fn.tabChain = function (value: boolean): JQuery {

		let chains: any[] = [];
		for (let i = 0; i < $(this).length; i++) {
			if (getTabIndex($(this)[i]) >= 0) {
				chains.push($(this)[i]);
			}
		}
		let first = chains[0];
		let last = chains[chains.length - 1];
		for (let i = 0; i < chains.length; i++) {
			$(chains[i]).off("keydown", keydownEventHandler);
			if (value) {
				$(chains[i]).on("keydown", keydownEventHandler);
			}
		}
		return this;

		function keydownEventHandler(event: JQueryKeyEventObject) {
			if (event.keyCode === 9) {
				if (event.target === last && !event.shiftKey) {
					first.focus();
					return false;
				} else if (event.target === first && event.shiftKey) {
					last.focus();
					return false;
				}
			}
		}

		function getTabIndex(target: any):number {
			let idx = parseInt($(target).attr("tabindex"), 0);
			if (isNaN(idx)) {
				return 0;
			} else {
				return idx;
			}
		}
	};

    $.fn.skipTabIndex = function (value: boolean): JQuery {
        if (value) {
            $(this).attr("tabindex", -1);
        } else {
            $(this).attr("tabindex", "");
        }
        return this;
    };

    $.fn.hideInputClear = function (value: boolean): JQuery {
        let btn = $(this).next(".ui-input-clear");
        if (btn && btn.length > 0) {
            if (value) {
                btn.css("display", "none");
            } else {
                btn.css("display", "");
            }
        }
        return this;
    };

    $.fn.disabled = function (value?: boolean): JQuery | boolean {
        if (typeof value === "undefined") {
            if ($(this).is(":disabled")) {
                return true;
            } else {
                return false;
            }
        } else {
            if (value === true) {
                $(this).attr("disabled", "disabled");
            } else {
                $(this).removeAttr("disabled");
            }
            return this;
        }
    };

    $.fn.uiDisabled = function (value?: boolean, opacity?: number): JQuery | boolean {
        if (typeof value === "undefined") {
            return $(this).hasClass("ui-disabled");
        } else {
            if (value === true) {
                $(this).addClass("ui-disabled");
                if (opacity) {
                    $(this).css("opacity", opacity);
                }
            } else {
                $(this).removeClass("ui-disabled");
                if (opacity) {
                    $(this).css("opacity", "");
                }
            }
            return this;
        }
    };

    $.fn.readOnly = function (value?: boolean): JQuery | boolean {
        if (typeof value === "undefined") {
            if ($(this).is(":readonly")) {
                return true;
            } else {
                return false;
            }
        } else {
            if (value === true) {
                $(this).attr("readonly", "readonly");
            } else {
                $(this).removeAttr("readonly");
            }
            return this;
        }
    };

    $.fn.checked = function (value?: boolean, refresh?: boolean): JQuery | boolean {
        if (typeof value === "undefined") {
            if ($(this).is(":checked")) {
                return true;
            } else {
                return false;
            }
        } else {
            if (value) {
                $(this).prop("checked", true);
                // $(this).attr("checked", "checked");
            } else {
                $(this).prop("checked", false);
                // $(this).removeAttr("checked");
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

    $.fn.uiBtnActive = function (value?: boolean): JQuery | boolean {
        if (typeof value === "undefined") {
            return $(this).hasClass("ui-btn-active");
        } else {
            if (value === true) {
                $(this).addClass("ui-btn-active");
            } else {
                $(this).removeClass("ui-btn-active");
            }
            return this;
        }
    };

    $.fn.uiBtnUnderline = function (value?: boolean): JQuery | boolean {
        if (typeof value === "undefined") {
            return $(this).hasClass("ui-btn-underline");
        } else {
            if (value) {
                $(this).addClass("ui-btn-underline");
            } else {
                $(this).removeClass("ui-btn-underline");
            }
            return this;
        }
    };

    $.fn.vclick = function (): JQuery {
        $(this).trigger("vclick");
        return this;
    };

    $.fn.isVisible = function (): boolean {
        if ($(this).is(":visible")) {
            return true;
        } else {
            return false;
        }
    };

    $.fn.numberSpin = function (options?: NumberSpinOptions): JQuery {

        if ($(this).length > 1) {
            for (let i = 0; i < $(this).length; i++) {
                $(this).eq(i).numberSpin(options);
            }
            return;
        }
        /* 初期化*/
        let container = $(this).closest(".ui-input-text");
        {
            container.css("padding-right", "").addClass("ui-input-has-spin");
            container.children(".ui-btn-spin-group").remove();

            let itm = container.next(".ui-slider");
            if (itm.children(".ui-slider-spin").length > 0) {
                itm.remove();
            }
        }
        let spinInput = container.children("input");

        //オプション
        let opts: NumberSpinOptions = {
            digits: 0
            , slider: false
            , max: 100
            , min: 0
            , step: 1
            , alignRight: false
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
            } else {
                let attrMax = parseFloat(spinInput.attr("max"));
                if (isNaN(attrMax) === false) {
                    opts.max = attrMax;
                }
            }
            // 最小値
            if ((options) && (typeof options.min !== "undefined")) {
                opts.min = options.min;
            } else {
                let attrMin = parseFloat(spinInput.attr("min"));
                if (isNaN(attrMin) === false) {
                    opts.min = attrMin;
                }
            }
            // 増減値
            if ((options) && (typeof options.step !== "undefined")) {
                opts.step = options.step;
            } else {
                let attrStep = parseFloat(spinInput.attr("step"));
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
            "min": opts.min
            , "max": opts.max
            , "step": opts.step
        });
		/*
		 * 増減ボタン作成
		 */
        let spinGroup = $("<div class='ui-btn-spin-group'>");
        let spinPlus = $("<a href='#' tabindex='-1' title='plus'   class='ui-btn ui-btn-inline ui-btn-icon-notext ui-icon-plus  ui-btn-spin-plus'>");
        let spinMinus = $("<a href='#' tabindex='-1' title='miuns' class='ui-btn ui-btn-inline ui-btn-icon-notext ui-icon-minus ui-btn-spin-minus'>");
        {
            // グループ追加
            container.append(spinGroup);
            // ボタン追加
            spinGroup.append(spinMinus);
            spinGroup.append(spinPlus);

            let r = 1;
            if (container.hasClass("ui-input-has-clear")) {
                r = container.outerWidth() - container.width();
            }
            let h = spinInput.outerHeight() - 2;

            spinGroup.css({
                top: 1
                , height: h
                , right: r
            });
            spinGroup.children(".ui-btn").outerHeight(h);

            container.css({
                "padding-right": r + spinGroup.outerWidth() + 2
            });
        }

		/*
		 * スライダー作成
		 */
        let spinSlider: JQuery;
        if ((opts.slider) && (opts.min < opts.max)) {

            let content = "";
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
                .on("change", function (event: Event) {
                    let v = parseFloat(spinSlider.val());
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
            spinInput.off("blur").on("blur", function (event: Event) {
                updateValue(0, false);
            });

            spinInput.off("keydown").on("keydown", function (event: JQueryKeyEventObject) {
                switch (event.which) {
                    case 13:				// Enter
                        updateValue(0, true);	// 表示
                        return false;
                    case 33:				// PageUp
                    case 38:				// Up
                    case 39:				// Right
                        updateValue(1, true);	// 増
                        return false;
                    case 34:				// PageDown
                    case 37: 				// Left
                    case 40:				// Down
                        updateValue(-1, true);	// 減
                        return false;
                }
            });

            spinPlus.off("click").on("click", function (event: Event) {
                updateValue(1, true);	// 増
            });

            spinMinus.off("click").on("click", function (event: Event) {
                updateValue(-1, true);	// 減
            });

            spinPlus.off("mousedown").on("mousedown", function (event: JQueryMouseEventObject) {
                setRepeatTimer(1);	// リピート増
            });

            spinPlus.off("mouseup").on("mouseup", function (event: JQueryMouseEventObject) {
                setRepeatTimer(0);	// リピート終了
            });

            spinPlus.off("mouseleave").on("mouseleave", function (event: JQueryMouseEventObject) {
                setRepeatTimer(0);	// リピート終了
            });

            spinMinus.off("mousedown").on("mousedown", function (event: JQueryMouseEventObject) {
                setRepeatTimer(-1);	// リピート減
            });

            spinMinus.off("mouseup").on("mouseup", function (event: JQueryMouseEventObject) {
                setRepeatTimer(0);	// リピート終了
            });

            spinMinus.off("mouseleave").on("mouseleave", function (event: JQueryMouseEventObject) {
                setRepeatTimer(0);　// リピート終了
            });
        }

		/*
		 * 増減リピートタイマー設定
		 */
        let delayTitmeHandle = 0;	// リピート開始待ち
        let repeatTimerHandle = 0;	// リピート間隔
        function setRepeatTimer(off: number) {
            if (off) {
                // 設定
                setRepeatTimer(0);
                delayTitmeHandle = setTimeout(function () {
                    repeatTimerHandle = setInterval(function () {
                        updateValue(off, true);
                    }, 50);
                }, 1000);
            } else {
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
        function updateValue(off: number, sel: boolean) {
            if (off > 0) {
                off = opts.step;
            }
            if (off < 0) {
                off = -opts.step;
            }

            let prev = parseFloat(spinInput.val());
            let v = prev + off;
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
        function limitMin(value: number): number {
            if (opts.max <= opts.min) {
                return value;
            }
            return Math.max(value, opts.min);
        }

		/*
		 * 最大値取得
		 */
        function limitMax(value: number): number {
            if (opts.max <= opts.min) {
                return value;
            }
            return Math.min(value, opts.max);
        }

        return this;
    };


}

/*
 * Input HTML5対応
 */
$(document).on("focusout", ".ui-input-text", function (event: Event) {
    $(this).removeClass("ui-focus");
});

namespace cm {
    "use strict";
    export let ajaxTimeOut = 30000;

    export function getFileParts(name: string) {
        let expReg = /(.+)(\.([^.]+$))/;
        let parts = name.match(expReg);

        let title = name;
        let extension = "";
        if (parts) {
            title = parts[1];
            extension = parts[2];
        }
        return { extension: extension, title: title };
    }

    export function apiBaseUrl(): string {
        return getSiteRoot() + "api/";
    }


	/*
	 * エラー表示
	 */
    export function showErrMsg(e: any) {
        let msg: any;
        if (e.stack) {
            msg += e.stack + "\n";
        }
        if (e.status) {
            msg += e.status + ":" + e.statusText + "\n";
        } else if (e.statusText) {
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

	/*
	 * サイトのルート取得
	 */
    let _siteRoot = "";
    export function getSiteRoot(): string {
        if (!_siteRoot) {
            let scripts = document.getElementsByTagName("script");
            let i = scripts.length;
            while (i--) {
                let match = scripts[i].src.match(/(^|.*\/)cm\.js*/);
                if (match) {
                    _siteRoot = match[1] + "../";		// cm.jsの場所からルートを設定
                    break;
                }
            }
            let emt: HTMLAnchorElement = <HTMLAnchorElement>$("<a>").attr("href", _siteRoot).get(0);
            _siteRoot = emt.href;
        }
        return _siteRoot;
    }

	/*
	 * ロケーション移動
	 */
    export interface PostData {
        [index: string]: string | number;
    }

    export function changeLocation(url: string, data?: PostData) {
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
            let f = $("<form/>", { "action": url, "method": "post", "target": "_self" });
            for (let key in data) {
                if (key) {
                    f.append($("<input/>", { "type": "hidden", "name": key, "value": data[key] }));
                }
            }
            f.appendTo(document.body);
            f.submit();
            f.remove();

        } else {
            // GET
            location.replace(url);
        }
    }

    export function windowOpen(url: string, data?: PostData) {
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
            let f = $("<form/>", { "action": url, "method": "post", "target": "_blank" });
            for (let key in data) {
                if (key) {
                    f.append($("<input/>", { "type": "hidden", "name": key, "value": data[key] }));
                }
            }
            f.appendTo(document.body);
            f.submit();
            f.remove();

        } else {
            // GET
            window.open(url, "_blank");
        }
    }

    export interface ParamData {
        [index: string]: string;
    }

	/*
	 * パラメーター取得
	 */
    export function getRestParams(lastName?: string): string[] {
        let params: string[] = [];
        let paths = location.pathname.split("\/");

        let idx = 0;
        for (let i = 0; i < paths.length; i++) {
            if (paths[i].toLocaleLowerCase() === lastName.toLocaleLowerCase()) {
                idx = i + 1;
                break;
            }
        }
        if (idx > 0) {
            for (let i = idx; i < paths.length; i++) {
                params.push(decodeURIComponent(paths[i]));
            }
        }
        return params;
    }

    export function getLocationParams(): ParamData {
        let params: ParamData = {};
        if (location.search) {
            let srcs = location.search.substring(1).split("&");
            for (let i = 0; i < srcs.length; i++) {
                let idx = srcs[i].indexOf("=");
                if (idx >= 0) {
                    let k = decodeURIComponent(srcs[i].substring(0, idx));
                    let v = decodeURIComponent(srcs[i].substring(idx + 1));
                    params[k] = v;
                } else {
                    params[srcs[i]] = "";
                }
            }
        }
        return params;
    }

	/*
	 * ローダー表示、表示中判定
	 */
    export function isBusy(value?: boolean): boolean {
        // オフライン
        if (isOffline() === true) {
            return true;
        }

        let loader = $(".ui-loader");

        if (typeof value === "undefined") {
            return loader.isVisible();
        }

        if (value === true) {
            if (loader.isVisible() === true) {
                return true;
            }

            $("body").addClass("ui-disabled").css("opacity", 1);

            let content = "";
            content += "<div class='ui-img-loading'></div>";
            //content += "<span class='ui-icon-loading'></span>";
			content += "<div class='ui-loading-spinner'></div>";
            content += "<h1>Wait…</h1>";

            // html表示、他の設定も必要
            $.mobile.loading("show", {
                html: content
                , textVisible: true
                , textonly: false
            });

            //$.mobile.loading("show", {
            //	text: "Wait…"
            //	, textVisible: true
            //	, textonly: false
            //});

            let h = loader.outerHeight();
            let w = loader.outerWidth();
            loader.css({
                "margin-top": -h / 2
                , "margin-left": -w / 2
            });
			loader.tabChain(true);
            return false;

        } else {
            $.mobile.loading("hide");
            $("body").removeClass("ui-disabled");
			loader.tabChain(false);
            return false;
        }
    }

	/*
	 * AJAX進捗表示
	 */
    export function ajaxLoaderProgress() {
        let x = $.ajaxSettings.xhr();
        if (x.upload) {
            x.upload.addEventListener("progress", loaderProgress, false);
        }
        return x;
    }

    export function loaderProgress(e: any) {
        let loader = $(".ui-loader");

        let progress = loader.children(".ui-progress-loading");
        if (progress.length <= 0) {
            progress = $("<div class='ui-progress-loading'></div>");
            loader.append(progress);
        }

        let v = Math.floor((e.loaded / e.total * 10000) / 100);
        progress.width(v + "%");
    }

    /*
     * 必要ならスクロール
     */
    export function requiredScroll(selector: string | JQuery, offset?: number) {

        if (!offset) {
            offset = 0;
        }

        let pd = cm.getPaddingValue(cm.getActivePage());

        let wy = $(window).scrollTop();
        let wh = $(window).outerHeight();
        let y1 = $(selector).offset().top;
        let y2 = y1 + $(selector).outerHeight();

        let sy = -1;
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

	/*
	 * スクロール位置設定
	 */
    export function setScrollTop(selector?: string | JQuery) {
        if (selector) {
            let pd = cm.getPaddingValue(cm.getActivePage());
            let y = $(selector).offset().top;
            $("html, body").scrollTop(y - pd.top);

        } else {
            $.mobile.silentScroll(0);
        }
    }

	/*
	 * スクロール位置設定
	 */
    export function setScrollBottom(selector?: string | JQuery) {
        if (selector) {
            let pd = cm.getPaddingValue(cm.getActivePage());
            let y1 = $(selector).offset().top;
            let y2 = y1 + $(selector).outerHeight();
            let wy = $(window).scrollTop();
            let wh = $(window).height();

            let sy = -1;
            if (wy + pd.top > y1) {
                sy = y1 - pd.top;
            }
            if (wy + wh - pd.bottom < y2) {
                sy = y2 - wh + pd.bottom;
            }

            if (sy >= 0) {
                $("html, body").scrollTop(sy);
            }

        } else {
            $.mobile.silentScroll($(document).height());
        }
    }

	/*
	 * スクロール位置判定
	 */
    export function isScrollTop(margin?: number): boolean {
        if (margin === undefined) {
            margin = 0;
        }

        if ($(window).scrollTop() <= margin) {
            return true;
        }
        return false;
    }

	/*
	 * スクロール位置判定
	 */
    export function isScrollBottom(margin?: number) {
        if (margin === undefined) {
            margin = 0;
        }

        if ($(window).scrollTop() + $(window).height() >= $(document).height() - margin) {
            return true;
        }
        return false;
    }

	/*
	 * スクロール位置取得
	 */
    export function getScrollTop() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    }

	/*
	 * エラーバルーン設定
	 */
    export function errorBallon(selector?: string | JQuery, message?: string) {
        let target = $(".ui-error");
        if (selector) {
            target = $(selector);
        }
        if (message) {
            message = message.replace(/\r?\n/g, "<br>");	// 改行コードBR変換
            target.html(message).addClass("ui-error-ballon");
        } else {
            target.html("").removeClass("ui-error-ballon");
        }
    }

	/*
	 * アクティブページ
	 */
    export function getActivePageId(): string {
        let pg = getActivePage();
        if ((pg) && (pg[0])) {
            return pg[0].id;
        }
        return "";
    }

    export function getActivePage(): JQuery {
        return $.mobile.pageContainer.pagecontainer("getActivePage");
    }

    export function getToPageId(ui: any): string {
        if (ui && ui.toPage.length > 0) {
            return ui.toPage[0].id;
        }
        return "";
    }

    export function getPrevPageId(ui: any): string {
        if (ui && ui.prevPage.length > 0) {
            return ui.prevPage[0].id;
        }
        return "";
    }

    /*
     * ページコンテンツサイズ取得
     */
    export function getPageContentSize(id?: string) {
        if (typeof id === "undefined") {
            id = getActivePageId();
        }
        let page = $("#" + id);
        let content = page.children(".ui-content");
        let w = content.outerWidth();
        let h = $(window).height();

        let padding = getPaddingValue(page);
        h -= padding.height;

        return [w, h];
    }

    export function getPageContentInnerSize(id?: string) {
        if (!id) {
            id = getActivePageId();
        }
        let sz = getPageContentSize(id);

        let padding = getPaddingValue("#" + id + ">.ui-content");
        sz[1] -= padding.height;
        sz[0] -= padding.width;

        return sz;
    }

    export function getPaddingValue(selector: string | JQuery) {
        let target = $(selector);
        let top = parseInt(target.css("padding-top"), 0);
        if (isNaN(top)) {
            top = 0;
        }
        let bottom = parseInt(target.css("padding-bottom"), 0);
        if (isNaN(bottom)) {
            bottom = 0;
        }
        let left = parseInt(target.css("padding-left"), 0);
        if (isNaN(left)) {
            left = 0;
        }
        let right = parseInt(target.css("padding-right"), 0);
        if (isNaN(right)) {
            right = 0;
        }
        return {
            top: top
            , bottom: bottom
            , left: left
            , right: right
            , width: left + right
            , height: top + bottom
        };
    }

	/*
	 * 縦スクロールバー設定
	 */
    export function hideBodyOverflowY(value: boolean) {
        let v = "";
        if (value === true) {
            v = "hidden";
        }
        $("html, body").css("overflow-y", v);
        getActivePage().css("overflow-y", v);
    }

	/*
	 * 横スクロールバー設定
	 */
    export function hideBodyOverflowX(value: boolean) {
        let v = "";
        if (value === true) {
            v = "hidden";
        }
        $("html, body").css("overflow-x", v);
        getActivePage().css("overflow-x", v);
    }

	/*
	 * オフライン判定
	 */
    function isOffline(): boolean {
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
    export function changePage(id: string, hash?: boolean) {
        // オフライン
        if (isOffline() === true) {
            return;
        }
        if (!hash) {
            hash = false;
        }
        $.mobile.pageContainer.pagecontainer("change", "#" + id, { changeHash: hash });
    }

    export function reloadPage(hash?: boolean) {
        // オフライン
        if (isOffline() === true) {
            return;
        }
        if (!hash) {
            hash = false;
        }
        $.mobile.pageContainer.pagecontainer("change", "#" + getActivePageId(), { changeHash: hash, reload: true });
    }

    /*
     * メッセージバルーン
     */
    export class MsgBallon {
        onClosed(result: boolean) { ; };

        constructor(message: string, positionTo: any, positionFixed: boolean, hasCancel?: boolean) {
            let scope = this;

            let content = "";
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
            let box = $(content)
                .appendTo(cm.getActivePage())
                .enhanceWithin()
                .popup();

            // ボタン押下
            let result = false;
            box.find(".ui-btn").off("click").on("click", function (event: Event) {
                let cmd = $(this).attr("cmd");
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
                transition: "pop"
                , positionTo: positionTo
                , positionFixed: positionFixed
                , arrow: true
                , closeButton: true
                , onClosed: function () {
                    scope.onClosed(result);
                    box.remove();
                }
            });
        }
    }

    export namespace MsgBallon {
        export function show(message: string, positionTo: any, positionFixed: boolean, hasCancel?: boolean) {
            return new MsgBallon(message, positionTo, positionFixed, hasCancel);
        }
    }

    /*
     * メッセージボックス
     */
    export class MsgBox {
        onClosed(result: boolean) { ; };

        constructor(message: string, title: string, hasCancel?: boolean) {
            let scope = this;

            let content = "";
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
            let box = $(content)
                .appendTo(cm.getActivePage())
                .enhanceWithin()
                .popup();

            // ボタン押下
            let result = false;
            box.find(".ui-btn").off("click").on("click", function (event: Event) {
                let cmd = $(this).attr("cmd");
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
                transition: "pop"
                , positionFixed: true
                , onClosed: function () {
                    scope.onClosed(result);
                    box.remove();
                }
            });
        }
    }

    export namespace MsgBox {
        export function show(message: string, title: string, hasCancel?: boolean) {
            return new MsgBox(message, title, hasCancel);
        }
    }



}

/*
 * サブウィンドウ
 */
interface SubWindowOptions {
    unUseCancel?: boolean;                      // キャンセル禁止
    focusSelector?: string | JQuery;			// フォーカス指定
    onClosed?: any;								// 終了イベント
}

namespace SubWindow {
    "use strict";


    let _options: SubWindowOptions = {};

	/*
	 * 表示判定
	 */
    export function isVisible(): boolean {
        return $(".ui-subwindow").isVisible();
    }

	/*
	 * 表示
	 */
    export function show(selector: string | JQuery, options?: SubWindowOptions): JQuery {
        if (options) {
            _options = options;
        }

        let target = $(selector);
        let inner = target.children("div").hide();
        target.show();
        inner.fadeIn();

        $(window).resize();

        if (_options && _options.focusSelector) {
            $(_options.focusSelector).focus();
        }

	    target.find("input,textarea,button,a").tabChain(true);
        return target;
    }

	/*
	 * 終了
	 */
    export function close() {
        $(".ui-subwindow").hide();
        if (_options && _options.onClosed) {
            _options.onClosed();			// コールバック
        }
    }

	/*
	 * サイズ変更
	 */
    $(window).on("resize", function (event: Event) {
        let w = $(".ui-subwindow:visible");
        if (w.length > 0) {
            if (w.hasClass("static") === false) {
                let content = w.find(".ui-content");
                if (content.length > 0) {
                    let hd = w.find(".ui-header").outerHeight();
                    let ft = w.find(".ui-footer").outerHeight();
                    content.css({ "margin-top": hd, "margin-bottom": ft });
                }
            }
        }
    });

	/*
	 * キーボード操作
	 */
    $(window).on("keyup", function (event: JQueryKeyEventObject) {
        if (event.keyCode === 27) {			// ESC
            let w = $(".ui-subwindow:visible");
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
    $(document).on("click", ".ui-subwindow.ui-dismissible", function (event: Event) {
        if (event.target === this) {
            if (!_options || !(_options.unUseCancel)) {
                close();
            }
        }
    });

	/*
	 * 終了ボタン押下
	 */
    $(document).on("click", ".ui-btn.ui-subwindow-close", function (event: Event) {
        if (!_options || !(_options.unUseCancel)) {
            close();
        }
    });
}

/*
 * ポップアップ
 */
interface PopupOptions {
    arrow?: boolean;
    x?: number;
    y?: number;
    x1?: number;								// x左端指定
    x2?: number;								// x右端指定
    y1?: number;								// y上端指定
    y2?: number;								// y下端指定
    positionFixed?: boolean;                    // 位置固定
    restoreScrollPos?: boolean;					// スクロール位置復元
    focusSelector?: string | JQuery;			// フォーカス指定
    closeButton?: boolean;						// 閉じるボタン付加
    onHeightOverflow?(overflow: boolean): any;	// 高さ食み出しイベント
    onOpend?: any;
    onClosed?: any;								// 終了イベント
}

namespace Popup {
    "use strict";

    /*
     * コンテナ取得
     */
    export function getContainer(selector: string | JQuery): JQuery {
        return $(selector).closest(".ui-popup-container");
    }

    /*
     * オープン
     */
    export function open(selector: string | JQuery, options?: PopupOptions): JQuery {
        let pos: number = undefined;

        let target = $(selector);
        let container = getContainer(target);

        // 閉じるボタン追加
        if (options && options.closeButton) {
            target.css("padding-top", "2.4em");

            let btn = $("<button>");
            btn.addClass("ui-btn ui-btn-icon-notext ui-icon-delete ui-popup-close");
            btn.css({
                "position": "absolute"
                , "margin": "0.3em"
                , "top": 0
                , "right": 0
                , "left": "auto"
                , "bottom": "auto"
                , "padding": 0
            });
            target.append(btn);
        }

		/*
		 * 位置変更
		 */
        target.off("popupbeforeposition").on("popupbeforeposition", function (event: Event, data: any) {

			console.log("popupbeforeposition");

            // 位置指定
            if (options) {
                if (options.positionTo) {	// 基準指定
                    delete data.x;
                    delete data.y;
                    data.positionTo = options.positionTo;	// リサイズ時の位置復元

                } else {

                    // 吹き出し有無判定
                    let hasArrow = (target.children(".ui-popup-arrow-container").length > 0);

                    // x座標
                    let cx: number = undefined;
                    if (!isNaN(options.x)) {
                        cx = options.x;
                    } else if (!hasArrow) {					// 吹き出し無しのみ左右端指定可
                        let winW = $(window).width();
                        let itmW = target.outerWidth();

                        if (!isNaN(options.x1)) {			// 左端指定
                            cx = options.x1 + (itmW / 2);
                        } else if (!isNaN(options.x2)) {		// 右端指定
                            cx = (winW - (itmW / 2)) - options.x2;
                        }
                    }

                    // y座標
                    let cy: number = undefined;
                    if (!isNaN(options.y)) {
                        cy = options.y;
                    } else if (!hasArrow) {					// 吹き出し無しのみ上下端指定可
                        let winH = $(window).height();
                        let itmH = target.outerHeight();

                        if (!isNaN(options.y1)) {
                            cy = options.y1 + (itmH / 2);			// 上端指定
                        } else if (!isNaN(options.y2)) {
                            cy = (winH - (itmH / 2)) - options.y2;	// 下端指定			
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
					let overflow = "auto";
					if (isOverflow()) {
						overflow = "scroll";	// Firefox対策
					}

					container.css({
						"position": "fixed"
						, "max-height": $(window).height()
						, "overflow-y": overflow
						, "margin-top": ""
					});
				}

            }

            // 高さオーバーフローイベント
            if (options && options.onHeightOverflow) {
                options.onHeightOverflow(isOverflow()); // コールバック
            }
			$(window).resize();


			function isOverflow(): boolean {
                if (target.outerHeight() >= $(window).height()) {
					return true;
				} else {
					return false;
				}
			}

        });

		/*
		 * オープン後
		 */
        target.off("popupafteropen").on("popupafteropen", function (event: Event) {

			console.log("popupafteropen");

            // フォーカス指定
            if (options && options.focusSelector) {
                let itm = $(options.focusSelector);
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
                options.onOpend();			// コールバック
            }
        });

		/*
		 * クローズ
		 */
        target.off("popupafterclose").on("popupafterclose", function (event: Event) {
            // スクロール位置復元
            if (isNaN(pos) === false) {
                $.mobile.silentScroll(pos);
            }
            // 終了イベント
            if (options && options.onClosed) {
                options.onClosed();			// コールバック
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
                transition: "fade"	// フェードイン
                , tolerance: "0"		// 余白なし
            };
        } else {
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

    /*
     * クローズ
     */
    export function close(): boolean {
        if ($(".ui-popup").isVisible() === true) {
            $(".ui-popup").popup("close");
            return true;
        }
        return false;
    }

    export function isActive(id?: string): boolean {
        if (id) {
            return ($("#" + id + "-popup.ui-popup-active").length > 0);
        } else {
            return ($(".ui-popup-active").length > 0);
        }
    }

    /*
     * クローズボタン押下
     */
    $(document).on("click", ".ui-btn.ui-popup-close", function (event: Event) {
        Popup.close();
    });

    export namespace Pos {
        export function downLeft(selector: JQuery | string) {
            return getPosition(selector, "down", "left");
        }
        export function downRight(selector: JQuery | string) {
            return getPosition(selector, "down", "right");
        }
        export function upLeft(selector: JQuery | string) {
            return getPosition(selector, "up", "left");
        }
        export function upRight(selector: JQuery | string) {
            return getPosition(selector, "up", "right");
        }
        export function rightDown(selector: JQuery | string) {
            return getPosition(selector, "right", "down");
        }
        export function rightUp(selector: JQuery | string) {
            return getPosition(selector, "right", "up");
        }
        export function leftDown(selector: JQuery | string) {
            return getPosition(selector, "left", "down");
        }
        export function leftUp(selector: JQuery | string) {
            return getPosition(selector, "left", "up");
        }

        function getPosition(selector: JQuery | string, location: string, align: string) {
            let target = $(selector);
            let offset = target.offset();

            let x1: number = NaN;
            let y1: number = NaN;
            let x2: number = NaN;
            let y2: number = NaN;

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
    }

	let _timer = 0;
	/*
	 * リサイズ
	 */
	$(window).on("resize", function (event: Event) {
		if (_timer) {
			clearTimeout(_timer);
		}
		_timer = setTimeout(function () {
			_timer = 0;

			// 無理矢理表示と位置補正
			let p = $(".ui-popup-container.ui-popup-active");
			if (p.length > 0) {
				if (p.hasClass("ui-popup-hidden")) {
					p.removeClass("ui-popup-hidden ui-popup-truncate");
				}

				let s = $(".ui-popup-screen:visible");
				if (s.length > 0) {
					{
						let x = p.offset().left;
						let w = p.outerWidth();
						let sw = s.width();
						if (sw < x + w) {
							p.css("left", sw - w);
						}
					}
					{
						let y = p.offset().top;
						let h = p.outerHeight();
						let sh = s.height();
						if (sh < y + h) {
							p.css("top", sh - h);
						}
					}
				}
			}
		}, 500);
	});
}

/*
 * パネル
 */
namespace Panel {
    "use strict";

	/*
	 * クローズ
	 */
    export function close() {
        $(".ui-panel").panel("close");
    }

	/*
	 * オープン
	 */
    export function open(selector: string | JQuery): JQuery {
        let target = $(selector);
        target.panel("open");
        switch (target.css("visibility")) {
            case "hidden":
            case "collapse":
        }
        return target;
    }

	/*
	 * 表示設定
	 */
    export function setVisible(selector: string | JQuery, visible: boolean | number | string): JQuery {
        let target = $(selector);

        if (visible) {
            target.addClass("ui-panel-visible");

            if (typeof visible !== "boolean") {
                setWidth(visible);
            }

        } else {
            target.removeClass("ui-panel-visible");

            if (typeof visible !== "boolean") {
                setWidth(visible);
            }
        }
        return target;

        function setWidth(value: number | string) {

            let section = target.siblings(".ui-header,.ui-content,.ui-footer");

            target.css("width", value);

            if (target.hasClass("ui-panel-position-left")) {
                section.css("margin-left", value);
            }
            if (target.hasClass("ui-panel-position-right")) {
                section.css("margin-right", value);
            }
        }
    }

	/*
	 * 高さ設定
	 */
    export function setFixedHeight(selector: string | JQuery, height: number): JQuery {
        let target = $(selector);
        if (target.hasClass("ui-panel-fixed")) {
            let inner = target.children(".ui-panel-inner");
            inner.outerHeight(height - inner[0].offsetTop).css("overflow-y", "auto");
        }
        return target;
    }

}

/*
 * DateBox
 */
namespace DateBox {
    "use strict";
	let _taget: any = null;

	/*
	 * ポップアップオープン、クローズ
	 */
	$(document).on("popupafterclose popupafteropen", ".ui-datebox-container.ui-popup", function (event: Event) {
		$(".ui-input-clear").uiBtnActive(false);

		if (event.type === "popupafterclose" && _taget) {
            $(_taget).trigger("datebox_closed");
            _taget = null;
		}
	});

	$(document).on("datebox", function (event: Event, passed: any) {
		if (passed.method === "open") {
			_taget = event.target;
			$(".ui-input-clear").uiBtnActive(false);
		}
	});
}

/*
 * 遅延タイマー
 */
class DelayTimer {
    private _timer = 0;
    private _millisec = 0;

    get millisec(): number {
        return this._millisec;
    }

    constructor(sec: number) {
        this._millisec = sec;
    }

    timeout(callback: Function, millisec?: number) {
        if (this._timer) {
            clearTimeout(this._timer);
        }

        if (typeof millisec === "undefined") {
            millisec = this._millisec;
        }

        this._timer = setTimeout(function () {
            callback();
        }, millisec);
    }
}

/*
 * スクロール位置
 */
class ScrollPos {
    private _value = 0;
    private _target: JQuery;

    constructor(selector?: string | JQuery) {
        // 対象無しはドキュメント対象
        if (typeof selector !== "undefined") {
            this._target = $(selector);
        }
    }

	/*
	 * スクロール位置取得
	 */
    getScrollValue(): number {
        if (this._target) {
            return this._target.scrollTop();
        } else {
            return document.documentElement.scrollTop || document.body.scrollTop;
        }
    }

	/*
	 * スクロール実行
	 */
    doScroll(value?: number) {
        if (typeof value === "undefined") {
            value = this._value;
        }
        if (this._target) {
            this._target.scrollTop(value);	// 対象BOX位置
        } else {
            $.mobile.silentScroll(value);	// ドキュメント位置
        }
    }

	/*
	 * 設定値設定
	 */
    setValue(value?: number) {
        if (typeof value === "undefined") {
            value = this.getScrollValue();  // 現在のスクロール位置
        }
        this._value = value;
    }

	/*
	 * 設定値参照
	 */
    getValue(): number {
        return this._value;
    }
}

/*
 * トースター
 */
interface ToasterOptions {
    timeoutSec?: number;
    top?: boolean;
    float?: boolean;
}

namespace Toaster {
    "use strict";


    let _timeoutHandle = 0;

	/*
	 * オープン
	 */
    export function open(messages: string | JQuery, options?: ToasterOptions) {
        close();
        if (!messages) {
            return;
        }

        let cls = "ui-toaster";
        if (options && options.top) {
            cls += " top";
        }
        if (options && options.float) {
            cls += " float";
        }

        let content = "";
        content += "<div class='" + cls + "'>";
        content += " <div>";
        content += " </div>";
        content += "</div>";
        let toast = $(content);

        toast.children("div").append(messages);

        // クリックして非表示
        toast.off("click").on("click", function (event: Event) {
            close();
        });
        // 自動非表示
        let autoHideSec = 0;
        if (options && options.timeoutSec && options.timeoutSec > 0) {
            autoHideSec = options.timeoutSec;
        }
        if (autoHideSec > 0) {
            _timeoutHandle = setTimeout(
                function () {
                    close();
                }
                , autoHideSec * 1000);
        }
        // 表示
        $("body").append(toast);
        toast.slideDown();
    }

	/*
	 * クローズ
	 */
    export function close() {
        if (_timeoutHandle) {
            clearTimeout(_timeoutHandle);
            _timeoutHandle = 0;
        }

        let toast = $(".ui-toaster:visible");
        if (toast) {
            toast.slideUp(500, function () {
                toast.remove();
            });
        } else {
            $(".ui-toaster").remove();
        }
    }
}


/*
 * ドロップダウン
 */

interface DropdownOptions {
    alignRight?: boolean;
    onSelected?: (selItem: Dropdown.Item) => void;
    onClosed?: any;
}

namespace Dropdown {
    "use strict";

    export class Item {
        text: string;
        value: any;
        constructor(text?: string, value?: any) {
            this.text = text;
            this.value = value;
        }
    }

	/*
	 * ドロップダウンリスト表示
	 */
    export function open(selector: JQuery | string, items: Item[], options?: DropdownOptions) {
        let target = $(selector);
        let style = "min-height:1em;";
        if (options && options.alignRight) {
            style += "text-align:right;";
        }

        let content = "";
        content += "<div";
        content += " data-role='popup'";
        content += " data-history='false'";
        content += " data-dismissible='true'";
        content += ">";
        content += " <div role='main' class='ui-content'>";
        content += "  <ul data-role='listview' data-icon='false'>";
        for (let i = 0; i < items.length; i++) {
            content += "   <li idx=" + i + ">";
            content += "    <a href='#' style='" + style + "'>" + items[i].text + "</a>";
            content += "   </li >";
        }
        content += "  </ul>";
        content += " </div>";
        content += "</div>";

        // ポップアップ作成
        let box = $(content)
            .appendTo(cm.getActivePage())
            .enhanceWithin()
            .popup();

        // 選択
        box.find("li").off("click").on("click", function (event: Event) {
            let idx = parseInt($(this).attr("idx"), 0);
            if (options && options.onSelected) {
                options.onSelected(items[idx]);
            }
            Popup.close();
        });

        // 表示
        let pos = Popup.Pos.downLeft(target);	// 位置取得
        if (options && options.alignRight) {
            pos = Popup.Pos.downRight(target);
        }

        Popup.open(box, {
            transition: "none"
            , positionFixed: false
            , x1: pos.x1
            , y1: pos.y1
            , x2: pos.x2
            , y2: pos.y2
            , onClosed: function () {
                box.remove();
                if (options && options.onClosed) {
                    options.onClosed();
                }
            }
        });
    }




}