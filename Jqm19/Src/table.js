/// <reference path="../scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../scripts/typings/jquerymobile/jquerymobile.d.ts"/>
/// <reference path="../scripts/typings/handsontable/handsontable.d.ts"/>
var Table;
(function (Table) {
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
    /*
     * 表示前
     */
    $(document).on("pagecontainerbeforeshow", function (event, ui) {
        switch (cm.getToPageId(ui)) {
            case "page1":
                cm.hideBodyOverflowY(true); // 縦スクロールなし
                break;
            default:
                cm.hideBodyOverflowY(false);
        }
    });
    var Page1;
    (function (Page1) {
        var _ht = null; // HandsonTable
        var _resizeDelay = new DelayTimer(500); // リサイズ遅延タイマー
        var _pos = []; // 現在位置
        /*
         * ページ表示前
         */
        $(document).on("pagecontainerbeforeshow", function (event, ui) {
            if (cm.getToPageId(ui) !== "page1") {
                return;
            }
            if (_ht) {
                Ht.initData(_ht);
                _ht.render();
            }
        });
        /*
         * ページ表示
         */
        $(document).on("pagecontainershow", function (event, ui) {
            try {
                if (cm.getToPageId(ui) !== "page1") {
                    return;
                }
                // テーブル設定
                if (!_ht) {
                    HTable.build();
                }
                // データ読込
                {
                    var dts = App.duildTableData();
                    _ht.loadData(dts);
                    _ht.updateSettings({ maxRows: dts.length }, false); // データ数設定
                    Ht.setFullSize(_ht);
                }
                Ht.setCurrentRowColPos(_ht, _pos); // 位置復元
                _ht.render(); // 再描画
                mq.update();
                $(window).resize();
            }
            catch (e) {
                cm.showErrMsg(e);
            }
        });
        /*
         * カラムヘッダボタン押下
         */
        $(document).on("click", "#list_table thead > tr > th .ui-btn", function (event) {
            try {
                $(this).blur();
                var cmd = $(this).attr("cmd");
                var txt = "";
                switch (cmd) {
                    case "data_no":
                        txt = "番号カラムヘッダ";
                        break;
                    case "data_date":
                        txt = "日付カラムヘッダ";
                        break;
                    case "data_name":
                        txt = "名称カラムヘッダ";
                        break;
                }
                if (txt) {
                    var dlg = $("#page1_popup");
                    dlg.children("p").text(txt);
                    dlg.off("click").on("click", function (event) {
                        Popup.close();
                    });
                    Popup.open(dlg, { positionTo: this });
                }
            }
            catch (e) {
                cm.showErrMsg(e);
            }
        });
        /*
         * リサイズ
         */
        $(window).on("resize", function (event) {
            if (cm.getActivePageId() !== "page1") {
                return;
            }
            // 一定時間変更がない場合のみテーブルサイズ設定
            _resizeDelay.timeout(function () {
                Ht.setFullSize(_ht);
            });
        });
        /*
         * ツールバーボタン押下
         */
        $(document).on("click", "#page1_toolbar1 .ui-btn", function (event) {
            try {
                $(this).blur();
                var cmd = $(this).attr("cmd");
                switch (cmd) {
                    case "refresh":
                        cm.isBusy(true);
                        setTimeout(function () {
                            cm.isBusy(false);
                        }, 10000);
                        break;
                    case "power":
                        cm.changeLocation("home");
                        break;
                }
            }
            catch (e) {
                cm.showErrMsg(e);
            }
        });
        /*
         * テーブル
         */
        var HTable;
        (function (HTable) {
            /*
         * 作成
         */
            function build() {
                _ht = new Handsontable($("#list_table")[0], {
                    data: null,
                    columns: getColumns() // 列設定
                    ,
                    colHeaders: getColHerders // 列見出し
                    ,
                    rowHeaders: function (index) {
                        if (_ht) {
                            var dt = _ht.getSourceDataAtRow(index); // 直接データ取り出し
                            if (dt) {
                                return dt.data_no;
                            }
                        }
                    },
                    rowHeaderWidth: 100 // 行見出し幅
                    ,
                    manualColumnResize: true // 列幅変更
                    ,
                    multiSelect: false // 複数選択
                    ,
                    stretchH: "none" // 水平ストレッチ
                    ,
                    autoColumnSize: false // 自動サイズ調整
                    ,
                    wordWrap: false // セル内折り返し
                    ,
                    outsideClickDeselects: false // 選択を維持
                    ,
                    disableVisualSelection: "area" // 範囲選択不可
                    ,
                    selectionMode: "single" // 選択モード
                    ,
                    startRows: 0 // データ無時の行数
                    ,
                    trimWhitespace: false // 前後の空白トリム
                    ,
                    currentRowClassName: "current-row" // 選択列にクラス名付加
                    ,
                    rowHeights: function (row) {
                        return 50;
                    },
                    enterMoves: { row: 0, col: 0 } // Enterキー移動先
                    ,
                    autoWrapCol: false // 列移動ループ
                    ,
                    autoWrapRow: false // 行移動ループ
                    ,
                    fillHandle: false // 選択範囲を埋める
                    ,
                    beforeOnCellMouseDown: function (event, coords) {
                        if (_ht) {
                            Ht.CurrentCell.save(_ht, coords.row, coords.col);
                        }
                    },
                    afterSelection: function (row, col) {
                        if (_ht) {
                            Ht.CurrentCell.restor(_ht, row, col);
                        }
                    },
                    beforeKeyDown: function (event) {
                        Ht.setDisableKey(event); // 無効なキー入力設定
                    }
                });
                Ht.setFullSize(_ht); // 全面表示
            }
            HTable.build = build;
            /*
             * エディタ
             */
            var CustomEditor = Handsontable.editors.TextEditor.prototype.extend();
            {
                CustomEditor.prototype.prepare = function () {
                    Handsontable.editors.TextEditor.prototype.prepare.apply(this, arguments);
                    switch (this.prop) {
                        case "data_name":
                            this.TEXTAREA.maxLength = 20;
                            break;
                    }
                };
                CustomEditor.prototype.beginEditing = function () {
                    try {
                        switch (this.prop) {
                            case "data_state":
                                {
                                    var row = this.row;
                                    var dt_1 = _ht.getSourceDataAtRow(row); // 直接データ取り出し
                                    var dlg_1 = $("#page1_state_popup");
                                    var lst_1 = dlg_1.find("ul.ui-listview");
                                    lst_1.find("li > a").off("click").on("click", function (event) {
                                        var cd = parseInt($(this).attr("cd"), 0);
                                        var nm = $(this).attr("title");
                                        if (isNaN(cd) === false) {
                                            dt_1.data_state_cd = cd;
                                            dt_1.data_state = nm;
                                            _ht.render();
                                            Popup.close();
                                        }
                                    });
                                    var td_1 = this.TD;
                                    // ポップアップ表示
                                    setTimeout(function () {
                                        Popup.open(dlg_1, {
                                            positionTo: td_1,
                                            focusSelector: lst_1
                                        });
                                    }, 0);
                                }
                                break;
                            case "data_date":
                                break;
                            case "data_name":
                                Handsontable.editors.TextEditor.prototype.beginEditing.apply(this, arguments); // 通常動作
                                break;
                            case "quantity":
                                {
                                    var row = this.row;
                                    var dt_2 = _ht.getSourceDataAtRow(row); // 直接データ取り出し
                                    var dlg_2 = $("#page1_quantity_popup").css("width", "17em");
                                    var ipt_1 = dlg_2.find(".ui-input-text > input").val(dt_2.quantity);
                                    /*
                                     * ポップアップボタン押下
                                     */
                                    dlg_2.find(".ui-btn").off("click").on("click", function (event) {
                                        var cmd = $(this).attr("cmd");
                                        switch (cmd) {
                                            case "apply":
                                                var v = parseInt(ipt_1.val(), 0);
                                                if (isNaN(v) === false) {
                                                    dt_2.quantity = v;
                                                    _ht.render();
                                                }
                                                Popup.close();
                                                break;
                                        }
                                    });
                                    var td_2 = this.TD;
                                    // ポップアップ表示
                                    setTimeout(function () {
                                        Popup.open(dlg_2, {
                                            positionTo: td_2,
                                            focusSelector: ipt_1,
                                            onOpend: function () {
                                                ipt_1.numberSpin({ digits: 0, slider: true });
                                            }
                                        });
                                    }, 0);
                                }
                                break;
                            default:
                                // ページ移動
                                _pos = Ht.getCurrentRowColPos(_ht);
                                cm.changePage("page2", false);
                        }
                    }
                    catch (e) {
                        cm.showErrMsg(e);
                    }
                };
            }
            /*
             * カラム設定
             */
            function getColumns() {
                return [
                    {
                        type: "text",
                        data: "data_no",
                        readOnly: false,
                        colWidths: 100,
                        editor: CustomEditor
                    },
                    {
                        type: "text",
                        data: "data_state",
                        readOnly: false,
                        colWidths: 100,
                        renderer: htmlRenderer,
                        editor: CustomEditor
                    },
                    {
                        type: "text",
                        data: "data_date",
                        readOnly: false,
                        colWidths: 100,
                        editor: CustomEditor
                    },
                    {
                        type: "text",
                        data: "data_name",
                        readOnly: false,
                        colWidths: 300,
                        editor: CustomEditor
                    },
                    {
                        type: "numeric",
                        title: "数量",
                        data: "quantity",
                        readOnly: false,
                        colWidths: 50,
                        editor: CustomEditor
                    },
                    {
                        type: "text",
                        title: "顧客名",
                        data: "customer_name",
                        readOnly: false,
                        colWidths: 100,
                        editor: CustomEditor
                    },
                    {
                        type: "text",
                        title: "担当者",
                        data: "handle_name",
                        readOnly: false,
                        colWidths: 100,
                        editor: CustomEditor
                    },
                    {
                        type: "numeric",
                        title: "金額",
                        data: "price",
                        numericFormat: {
                            pattern: "0,000,",
                            culture: "ja-JP"
                        },
                        readOnly: false,
                        colWidths: 100,
                        editor: CustomEditor
                    },
                    {
                        type: "text",
                        title: "作成日",
                        data: "create_date",
                        readOnly: false,
                        colWidths: 150,
                        editor: CustomEditor
                    },
                    {
                        type: "text",
                        title: "作成者",
                        data: "create_user",
                        readOnly: false,
                        colWidths: 100,
                        editor: CustomEditor
                    },
                    {
                        type: "text",
                        title: "更新日",
                        data: "modify_date",
                        readOnly: false,
                        colWidths: 150,
                        editor: CustomEditor
                    },
                    {
                        type: "text",
                        title: "更新者",
                        data: "modify_user",
                        readOnly: false,
                        colWidths: 100,
                        editor: CustomEditor
                    }
                ];
            }
            /*
             * カラムヘッダー設定
             */
            function getColHerders(col) {
                //
                // columnsのtitleが設定されてる列では呼ばれません
                // columnSortingとの併用は考慮外
                // 
                if (_ht) {
                    var prop = _ht.colToProp(col);
                    switch (prop) {
                        case "data_no":
                            {
                                // 丸ごとボタン
                                var content = "";
                                content += "<a href='#'";
                                content += " class='ui-btn ui-btn-icon-left ui-icon-search'";
                                content += " cmd='data_no'";
                                content += ">";
                                content += "番号";
                                content += "</a>";
                                return content;
                            }
                        case "data_state":
                            {
                                // アイコン付加
                                var content = "";
                                content += "<div";
                                content += " class='ui-icon ui-icon-tag-b'";
                                content += " style='display:inline-block;'";
                                content += ">";
                                content += "状態";
                                content += "</div>";
                                return content;
                            }
                        case "data_date":
                            {
                                // テキストなしボタン付加
                                var content = "";
                                content += "<div>";
                                content += "日付";
                                content += " <a href='#'";
                                content += "  class='ui-btn ui-btn-icon-notext ui-icon-calendar ui-btn-inline'";
                                content += "  cmd='data_date'";
                                content += " >";
                                content += "</a>";
                                content += "</div>";
                                return content;
                            }
                        case "data_name":
                            {
                                // テキストありボタン付加
                                var content = "";
                                content += "<div>";
                                content += "名称";
                                content += " <a href='#'";
                                content += "  class='ui-btn ui-btn-icon-left ui-icon-bars ui-btn-inline'";
                                content += "  cmd='data_name'";
                                content += " >";
                                content += "選択";
                                content += "</a>";
                                content += "</div>";
                                return content;
                            }
                    }
                }
            }
            /*
             * HTMLセル描画
             */
            function htmlRenderer(instance, td, row, col, prop, value, cellProperties) {
                if (!_ht || _ht.countRows() <= row) {
                    return;
                }
                switch (prop) {
                    case "data_state":
                        {
                            var icon = "none";
                            var dt = _ht.getSourceDataAtRow(row); // 直接データ取り出し
                            if (dt.data_state_cd % 5 === 0) {
                                $(td).css({
                                    "color": "white",
                                    "background-color": "red"
                                });
                                icon = "tag";
                            }
                            $(td).empty().append("<div class='ui-icon ui-icon-" + icon + "-w'>" + value + "</div>");
                        }
                        break;
                }
                return td;
            }
        })(HTable || (HTable = {}));
    })(Page1 || (Page1 = {}));
    var Page2;
    (function (Page2) {
        $(document).on("pagecontainershow", function (event, ui) {
            try {
                if (cm.getToPageId(ui) !== "page2") {
                    return;
                }
            }
            catch (e) {
                cm.showErrMsg(e);
            }
        });
        $(document).on("click", "#page2_toolbar1 .ui-btn", function (event) {
            try {
                $(this).blur();
                var cmd = $(this).attr("cmd");
                switch (cmd) {
                    case "apply":
                        cm.changePage("page1", false);
                        break;
                    case "cancel":
                        cm.changePage("page1", false);
                        break;
                }
            }
            catch (e) {
                cm.showErrMsg(e);
            }
        });
    })(Page2 || (Page2 = {}));
})(Table || (Table = {}));
//# sourceMappingURL=table.js.map