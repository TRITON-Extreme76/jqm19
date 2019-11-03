/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../scripts/typings/jquerymobile/jquerymobile.d.ts" />
/// <reference path="../scripts/typings/handsontable/handsontable.d.ts"/>
/*
 * Handsontable Helper
 */
var Ht;
(function (Ht) {
    "use strict";
    var CurrentCell;
    (function (CurrentCell) {
        var curRow = -1;
        var curCol = -1;
        function save(ht, row, col) {
            curRow = -1;
            curCol = -1;
            if (row < 0) {
                curRow = getCurrentRow(ht);
            }
            if (col < 0) {
                curCol = getCurrentCol(ht);
            }
        }
        CurrentCell.save = save;
        function restor(ht, row, col) {
            var isRestor = false;
            if (curRow >= 0) {
                row = curRow;
                isRestor = true;
            }
            if (curCol >= 0) {
                col = curCol;
                isRestor = true;
            }
            if (isRestor) {
                curRow = -1;
                curCol = -1;
                ht.selectCell(row, col);
            }
        }
        CurrentCell.restor = restor;
    })(CurrentCell = Ht.CurrentCell || (Ht.CurrentCell = {}));
    /*
     * キー入力禁止
     */
    function setDisableKey(event) {
        // 漢字系
        if ([28, 29, 241, 242, 243, 244].indexOf(event.keyCode) >= 0) {
            event.isImmediatePropagationEnabled = false;
            event.isImmediatePropagationStopped = function () {
                return true;
            };
        }
        // ポップアップ表示中
        // サブウィンドウ表示中
        if (Popup.isActive() || SubWindow.isVisible()) {
            event.isImmediatePropagationEnabled = false;
            event.isImmediatePropagationStopped = function () {
                return true;
            };
        }
    }
    Ht.setDisableKey = setDisableKey;
    /*
     * 親コンテナ取得
     */
    function getContainerParent(ht) {
        return $(ht.container).parent("div");
    }
    Ht.getContainerParent = getContainerParent;
    /*
     * 垂直スクロール位置取得
     */
    function getVScrollPos(ht) {
        return $(ht.container).children(".wtHolder").scrollTop();
    }
    Ht.getVScrollPos = getVScrollPos;
    /*
     * 垂直スクロール位置設定
     */
    function setVScrollPos(ht, value) {
        $(ht.container).children(".wtHolder").scrollTop(value);
    }
    Ht.setVScrollPos = setVScrollPos;
    /*
     * 水平スクロール位置取得
     */
    function getHScrollPos(ht) {
        return $(ht.container).children(".wtHolder").scrollLeft();
    }
    Ht.getHScrollPos = getHScrollPos;
    /*
     * 水平スクロール位置設定
     */
    function setHScrollPos(ht, value) {
        $(ht.container).children(".wtHolder").scrollLeft(value);
    }
    Ht.setHScrollPos = setHScrollPos;
    /*
     * 現在行列位置取得
     */
    function getCurrentRowColPos(ht) {
        var row = -1;
        var col = -1;
        if (ht) {
            var sel = ht.getSelected();
            if (sel && sel.length > 0) {
                row = sel[0][0];
                col = sel[0][1];
            }
        }
        var vpos = getVScrollPos(ht);
        var hpos = getHScrollPos(ht);
        return [row, col, vpos, hpos];
    }
    Ht.getCurrentRowColPos = getCurrentRowColPos;
    /*
     * 現在行列位置設定
     */
    function setCurrentRowColPos(ht, pos) {
        if (!pos || !ht.countRows() || !ht.countCols()) {
            return;
        }
        var row = pos[0];
        if (!row) {
            row = 0;
        }
        else {
            row = Math.max(row, 0);
            row = Math.min(row, ht.countRows() - 1);
        }
        var col = pos[1];
        if (!col) {
            col = 0;
        }
        else {
            col = Math.max(col, 0);
            col = Math.min(col, ht.countCols() - 1);
        }
        var vpos = pos[2];
        if (!vpos) {
            vpos = 0;
        }
        var hpos = pos[3];
        if (!hpos) {
            hpos = 0;
        }
        ht.selectCell(row, col);
        setVScrollPos(ht, vpos);
        setHScrollPos(ht, hpos);
    }
    Ht.setCurrentRowColPos = setCurrentRowColPos;
    /*
     * 現在行取得
     */
    function getCurrentRow(ht) {
        var row = -1;
        if (ht) {
            var sel = ht.getSelected();
            if (sel && sel.length > 0) {
                row = sel[0][0];
            }
        }
        return row;
    }
    Ht.getCurrentRow = getCurrentRow;
    /*
     * 現在列取得
     */
    function getCurrentCol(ht) {
        var col = -1;
        if (ht) {
            var sel = ht.getSelected();
            if (sel && sel.length > 0) {
                col = sel[0][1];
            }
        }
        return col;
    }
    Ht.getCurrentCol = getCurrentCol;
    /*
     * 現在列取得
     */
    function getCurrentProp(ht) {
        var prop = "";
        if (ht) {
            var sel = ht.getSelected();
            if (sel && sel.length > 0) {
                prop = ht.colToProp(sel[0][1]);
            }
        }
        return prop;
    }
    Ht.getCurrentProp = getCurrentProp;
    /*
     * 全面表示
     */
    function setFullSize(ht) {
        if (ht) {
            var sz = cm.getPageContentSize();
            ht.updateSettings({
                width: sz[0],
                height: sz[1]
            }, false);
            getContainerParent(ht).width(sz[0]).height(sz[1]);
            ht.render();
        }
    }
    Ht.setFullSize = setFullSize;
    /*
     * 表示位置へスクロール
     */
    function setRowScroll(ht, row) {
        if (typeof row === "undefined") {
            row = getCurrentRow(ht);
        }
        var col = getCurrentCol(ht);
        // ビュー内に無ければスクロール
        {
            var first = ht.view.wt.wtScroll.getFirstVisibleRow();
            if (row < first) {
                return ht.scrollViewportTo(row, col);
            }
        }
        {
            var last = ht.view.wt.wtScroll.getLastVisibleRow();
            if (row > last) {
                return ht.scrollViewportTo(row, col, true);
            }
        }
        return false;
    }
    Ht.setRowScroll = setRowScroll;
    function setColScroll(ht, col) {
        if (typeof col === "undefined") {
            col = getCurrentCol(ht);
        }
        var row = getCurrentRow(ht);
        // ビュー内に無ければスクロール
        {
            var first = ht.view.wt.wtScroll.getFirstVisibleColumn();
            if (col < first) {
                return ht.scrollViewportTo(row, col);
            }
        }
        {
            var last = ht.view.wt.wtScroll.getLastVisibleColumn();
            if (col > last) {
                return ht.scrollViewportTo(row, col, true);
            }
        }
        return false;
    }
    Ht.setColScroll = setColScroll;
    /*
     * 選択と表示位置へスクロール
     */
    function setRowSelectAndScroll(ht, row) {
        var col = getCurrentCol(ht);
        if (ht.selectCell(row, col) === true) {
            return setRowScroll(ht, row);
        }
        else {
            return false;
        }
    }
    Ht.setRowSelectAndScroll = setRowSelectAndScroll;
    function setColSelectAndScroll(ht, col) {
        var row = getCurrentRow(ht);
        if (ht.selectCell(row, col) === true) {
            return setColScroll(ht, col);
        }
        else {
            return false;
        }
    }
    Ht.setColSelectAndScroll = setColSelectAndScroll;
    /*
     * データ初期化
     */
    function initData(ht) {
        ht.loadData([]);
        ht.updateSettings({ maxRows: 0 }, false);
    }
    Ht.initData = initData;
    /*
     * カラムヘッダタイトル取得
     */
    function getColumnTitle(ht, col) {
        var colidx = 0;
        if (typeof col === "string") {
            colidx = ht.propToCol(col);
        }
        else {
            colidx = col;
        }
        var hd = ht.getColHeader(colidx);
        return $(hd).text();
    }
    Ht.getColumnTitle = getColumnTitle;
})(Ht || (Ht = {}));
//# sourceMappingURL=ht.js.map