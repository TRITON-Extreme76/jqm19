/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../scripts/typings/jquerymobile/jquerymobile.d.ts" />
var Home;
(function (Home) {
    "use strict";
    var mq;
    (function (mq) {
        var mm = window.matchMedia("(min-width:28em) and (min-height:28em)");
        mm.addListener(function (event) {
            update();
        });
        function isMatch() {
            return mm.matches;
        }
        mq.isMatch = isMatch;
        function update() {
            if (mm.matches) {
                $(".ui-header .ui-toolbar").resetDisplay();
                $(".ui-header .ui-toolbtn").hide();
            }
            else {
                $(".ui-header .ui-toolbar").hide();
                $(".ui-header .ui-toolbtn").resetDisplay();
            }
            $(document).trigger("mq_responsive");
        }
        mq.update = update;
    })(mq || (mq = {}));
    var Page1;
    (function (Page1) {
        $(document).on("pagecontainershow", function (event, ui) {
            try {
                if (cm.getToPageId(ui) !== "page1") {
                    return;
                }
                mq.update();
                $(window).resize();
            }
            catch (e) {
                cm.showErrMsg(e);
            }
        });
        $(document).on("click", "#location_menu > li > .ui-btn", function (event) {
            try {
                $(this).blur();
                var cmd = $(this).attr("cmd");
                switch (cmd) {
                    case "mobile":
                        cm.changeLocation("mobile");
                        break;
                    case "table":
                        cm.changeLocation("table");
                        break;
                }
            }
            catch (e) {
                cm.showErrMsg(e);
            }
        });
        $(document).on("click", "#subwindow_menu > li > .ui-btn", function (event) {
            try {
                $(this).blur();
                var cmd = $(this).attr("cmd");
                switch (cmd) {
                    case "subwin0":
                        SubWindow.show("#subwindow0");
                        break;
                    case "subwin1":
                        SubWindow1.show();
                        break;
                    case "subwin2":
                        SubWindow2.show();
                        break;
                    case "subwin3":
                        SubWindow3.show();
                        break;
                }
            }
            catch (e) {
                cm.showErrMsg(e);
            }
        });
        $(document).on("click", "#menu3 > li > .ui-btn", function (event) {
            try {
                $(this).blur();
                var cmd = $(this).attr("cmd");
                switch (cmd) {
                    case "bottom":
                        {
                            var content = "<p>焼けました</p><p>焼けました</p>";
                            Toaster.open(content, { timeoutSec: 3, float: true });
                        }
                        break;
                    case "top":
                        {
                            var content = "<p>焼けました</p>";
                            Toaster.open(content, { top: true, float: true });
                        }
                        break;
                    case "bottom2":
                        {
                            var content = "<p>焼けました</p><p>焼けました</p>";
                            Toaster.open(content, { timeoutSec: 3 });
                        }
                        break;
                    case "top2":
                        {
                            var content = "<p>焼けました</p>";
                            Toaster.open(content, { top: true });
                        }
                        break;
                }
            }
            catch (e) {
                cm.showErrMsg(e);
            }
        });
        $(document).on("click", "#popup_menu > li > .ui-btn", function (event) {
            try {
                $(this).blur();
                var cmd = $(this).attr("cmd");
                switch (cmd) {
                    case "popup0":
                        $("#popup0").popup("open", { positionTo: this });
                        break;
                    case "popup0.1":
                        Popup.open("#popup0", { positionTo: this, restoreScrollPos: true });
                        break;
                    case "popup1":
                        Popup.open("#popup1", {
                            positionTo: this,
                            arrow: true,
                            restoreScrollPos: true,
                            closeButton: true,
                            onClosed: function () {
                                console.log("Popup Closed");
                            }
                        });
                        break;
                    case "popup2":
                        $("#popup2").popup("open", { positionTo: null });
                        break;
                    case "popup2.1":
                        Popup.open("#popup2", {
                            positionTo: this,
                            restoreScrollPos: true,
                            focusSelector: "#text-121"
                        });
                        break;
                    case "msgbox":
                        {
                            cm.MsgBox.show("メッセージ・メッセージ・メッセージ<br>宜しいですか？", "確認", true)
                                .onClosed = function (result) {
                                if (result === true) {
                                    alert("OK");
                                }
                            };
                        }
                        break;
                    case "msgballon":
                        cm.MsgBallon.show("メッセージ・メッセージ・メッセージ", this, false);
                        break;
                    case "test":
                        {
                            setTimeout(function () {
                                try {
                                    throw new Error("エラー");
                                }
                                catch (e) {
                                    cm.showErrMsg(e);
                                }
                            }, 100);
                        }
                        break;
                }
            }
            catch (e) {
                cm.showErrMsg(e);
            }
        });
        var SubWindow1;
        (function (SubWindow1) {
            function show() {
                var w = $("#subwindow1");
                SubWindow.show(w);
                w.find("textarea").change(); // textareaサイズ正常化
            }
            SubWindow1.show = show;
            $(document).on("click", "#sublist1 > li > .ui-btn", function (event) {
                try {
                    $(this).blur();
                    var cmd = $(this).attr("cmd");
                    switch (cmd) {
                        case "popup3":
                            var dlg_1 = $("#popup3");
                            Popup.open(dlg_1, {
                                positionTo: this,
                                positionFixed: true,
                                closeButton: true,
                                onHeightOverflow: function (overflow) {
                                    if (overflow) {
                                        dlg_1.offset().top = 0;
                                        dlg_1.outerHeight($(window).height());
                                        dlg_1.find("ul.ui-listview").css({
                                            "overflow-y": "scroll",
                                            "height": "100%"
                                        });
                                    }
                                    else {
                                        dlg_1.find("ul.ui-listview").css({
                                            "overflow-y": "hidden",
                                            "height": ""
                                        });
                                        dlg_1.css({
                                            "height": "",
                                            "top": ""
                                        });
                                    }
                                }
                            });
                            break;
                    }
                }
                catch (e) {
                    cm.showErrMsg(e);
                }
            });
        })(SubWindow1 || (SubWindow1 = {}));
        var SubWindow2;
        (function (SubWindow2) {
            function show() {
                var w = $("#subwindow2");
                SubWindow.show(w);
            }
            SubWindow2.show = show;
            $(document).on("click", "#subwindow2_list > li > .ui-btn", function (event) {
                SubWindow.close();
            });
        })(SubWindow2 || (SubWindow2 = {}));
        var SubWindow3;
        (function (SubWindow3) {
            function show() {
                var w = $("#subwindow3");
                SubWindow.show(w, { focusSelector: "#text-14" });
            }
            SubWindow3.show = show;
        })(SubWindow3 || (SubWindow3 = {}));
    })(Page1 || (Page1 = {}));
    var Page2;
    (function (Page2) {
        $(document).on("pagecontainershow", function (event, ui) {
            try {
                if (cm.getToPageId(ui) !== "page2") {
                    return;
                }
                // 数値入力設定
                $("#page2_spin2").numberSpin({ digits: 2, slider: true });
                $("#page2_spin1").numberSpin({ alignRight: true });
            }
            catch (e) {
                cm.showErrMsg(e);
            }
        });
        $(document).on("click", "#page2 > .ui-header > .ui-btn", function (event) {
            try {
                $(this).blur();
                var y1 = $("#page2 > .ui-header").outerHeight() + $(window).scrollTop();
                var cmd = $(this).attr("cmd");
                switch (cmd) {
                    case "btn1":
                        Popup.open("#page2_popup1", {
                            x1: 0,
                            y1: y1,
                            positionFixed: true,
                            transition: "slidedown"
                        });
                        break;
                    case "btn2":
                        Popup.open("#page2_popup1", {
                            x2: 0,
                            y1: y1,
                            transition: "slidedown"
                        });
                        break;
                }
            }
            catch (e) {
                cm.showErrMsg(e);
            }
        });
        $(document).on("click", "#page2 li > .ui-btn", function (event) {
            try {
                $(this).blur();
                var cmd = $(this).attr("cmd");
                switch (cmd) {
                    case "list":
                        {
                            var lst = $("#page2_popup1");
                            var ipt_1 = $(this).closest("li").find("input"); // 対象Input
                            // リスト選択
                            lst.find("li > .ui-btn").off("click").on("click", function (event) {
                                var txt = $(this).text();
                                if (txt) {
                                    ipt_1.val(txt);
                                    Popup.close();
                                }
                            });
                            // リスト表示
                            var pos = $(this).offset();
                            var x = $(window).width() - pos.left - $(this).outerWidth(); // ボタン左端
                            var y = pos.top + $(this).outerHeight(); // ボタン下端
                            Popup.open(lst, {
                                x2: x,
                                y1: y,
                                restoreScrollPos: true
                            });
                        }
                        break;
                    case "area_clear":
                        {
                            // 入力欄クリア
                            $(this).closest("li").find("input,textarea").val("").focus().change(); // クリアしてサイズ合わせ
                        }
                        break;
                }
            }
            catch (e) {
                cm.showErrMsg(e);
            }
        });
        $(document).on("click", "#page2_select1", function (event) {
            var _this = this;
            try {
                // Pageをoverflow:hideでないと２重スクロール
                Dropdown.open($(this), [
                    { text: "選択１", value: 1 },
                    { text: "選択２", value: 2 },
                    { text: "選択３", value: 3 },
                    { text: "選択４", value: 4 },
                    { text: "選択５選択５", value: 5 }
                ], {
                    onSelected: function (selItem) {
                        if (selItem) {
                            $(_this).text(selItem.text).attr("value", selItem.value);
                        }
                    },
                    onClosed: function () {
                        console.log("dropdown closed");
                    },
                    alignRight: false
                });
            }
            catch (e) {
                cm.showErrMsg(e);
            }
        });
        $(document).on("click", "#page2 > .ui-footer .ui-btn", function (event) {
            try {
                $(this).blur();
                cm.errorBallon(); // エラー表示初期化
                var cmd = $(this).attr("cmd");
                switch (cmd) {
                    case "reset":
                        var y2 = $("#page2 > .ui-footer").outerHeight() - $(window).scrollTop();
                        Popup.open("#page2_popup1", {
                            x1: 0,
                            y2: y2,
                            transition: "flip",
                            positionFixed: true
                        });
                        break;
                    case "canel":
                        break;
                    case "apply":
                        var errLi = null;
                        if (!$("#page2_text12").val()) {
                            cm.errorBallon("#page2_text12_error", "文字を入力して下さい");
                            if (!errLi) {
                                errLi = $("#page2_text12").closest("li");
                            }
                        }
                        if (!$("#page2_text13").val()) {
                            cm.errorBallon("#page2_text13_error", "文字を入力して下さい");
                            if (!errLi) {
                                errLi = $("#page2_text13").closest("li");
                            }
                        }
                        if (parseFloat($("#page2_spin1").val()) === 0) {
                            cm.errorBallon("#page2_spin1_error", "数値を入力して下さい");
                            if (!errLi) {
                                errLi = $("#page2_spin1").closest("li");
                            }
                        }
                        if (parseFloat($("#page2_spin2").val()) === 0) {
                            cm.errorBallon("#page2_spin2_error", "数値を入力して下さい");
                            if (!errLi) {
                                errLi = $("#page2_spin2").closest("li");
                            }
                        }
                        if (!$("#page2_textarea12").val()) {
                            cm.errorBallon("#page2_textarea12_error", "何かを入力して下さい");
                            if (!errLi) {
                                errLi = $("#page2_textarea12").closest("li");
                            }
                        }
                        if ($("#page2_flip1").checked() !== true) {
                            cm.errorBallon("#page2_flip1_error", "ONにして下さい");
                            if (!errLi) {
                                errLi = $("#page2_flip1").closest("li");
                            }
                        }
                        //　エラー位置までスクロール
                        if (errLi) {
                            cm.setScrollBottom(errLi);
                        }
                        break;
                }
            }
            catch (e) {
                cm.showErrMsg(e);
            }
        });
        /*
         * フォーカス
         */
        $(document).on("focusin", "input, button, textarea, .ui-btn", function (event) {
            if ($(this).closest("#page2_list").length) {
                cm.requiredScroll($(this), 10);
            }
        });
    })(Page2 || (Page2 = {}));
})(Home || (Home = {}));
//# sourceMappingURL=home.js.map