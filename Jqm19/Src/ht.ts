/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../scripts/typings/jquerymobile/jquerymobile.d.ts" />
/// <reference path="../scripts/typings/handsontable/handsontable.d.ts"/>

/*
 * Handsontable Helper
 */
namespace Ht {
    "use strict";

    export namespace CurrentCell {
        let curRow = -1;
        let curCol = -1;

        export function save(ht: Handsontable, row: number, col: number) {
            curRow = -1;
            curCol = -1;
            if (row < 0) {
                curRow = getCurrentRow(ht);
            }
            if (col < 0) {
                curCol = getCurrentCol(ht);
            }
        }

        export function restor(ht: Handsontable, row: number, col: number) {
            let isRestor = false;

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
    }


	/*
	 * キー入力禁止
	 */
    export function setDisableKey(event: any) {
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

	/*
	 * 親コンテナ取得
	 */
    export function getContainerParent(ht: Handsontable): JQuery {
        return $(ht.container).parent("div");
    }

	/*
	 * 垂直スクロール位置取得
	 */
    export function getVScrollPos(ht: Handsontable): number {
        return $(ht.container).children(".wtHolder").scrollTop();
    }

	/*
	 * 垂直スクロール位置設定
	 */
    export function setVScrollPos(ht: Handsontable, value: number) {
        $(ht.container).children(".wtHolder").scrollTop(value);
    }

	/*
	 * 水平スクロール位置取得
	 */
    export function getHScrollPos(ht: Handsontable): number {
        return $(ht.container).children(".wtHolder").scrollLeft();
    }

	/*
	 * 水平スクロール位置設定
	 */
    export function setHScrollPos(ht: Handsontable, value: number) {
        $(ht.container).children(".wtHolder").scrollLeft(value);
    }

	/*
	 * 現在行列位置取得
	 */
    export function getCurrentRowColPos(ht: Handsontable): number[] {
        let row = -1;
        let col = -1;
        if (ht) {
            let sel = ht.getSelected();
            if (sel && sel.length > 0) {
                row = sel[0][0];
                col = sel[0][1];
            }
        }
        let vpos = getVScrollPos(ht);
        let hpos = getHScrollPos(ht);
        return [row, col, vpos, hpos];
    }

	/*
	 * 現在行列位置設定
	 */
    export function setCurrentRowColPos(ht: Handsontable, pos: number[]) {
        if (!pos || !ht.countRows() || !ht.countCols()) {
            return;
        }
        let row = pos[0];
        if (!row) {
            row = 0;
        } else {
            row = Math.max(row, 0);
            row = Math.min(row, ht.countRows() - 1);
        }

        let col = pos[1];
        if (!col) {
            col = 0;
        } else {
            col = Math.max(col, 0);
            col = Math.min(col, ht.countCols() - 1);
        }

        let vpos = pos[2];
        if (!vpos) {
            vpos = 0;
        }

        let hpos = pos[3];
        if (!hpos) {
            hpos = 0;
        }

        ht.selectCell(row, col);
        setVScrollPos(ht, vpos);
        setHScrollPos(ht, hpos);
    }

	/*
	 * 現在行取得
	 */
    export function getCurrentRow(ht: Handsontable): number {
        let row = -1;
        if (ht) {
            let sel = ht.getSelected();
            if (sel && sel.length > 0) {
                row = sel[0][0];
            }
        }
        return row;
    }

	/*
	 * 現在列取得
	 */
    export function getCurrentCol(ht: Handsontable): number {
        let col = -1;
        if (ht) {
            let sel = ht.getSelected();
            if (sel && sel.length > 0) {
                col = sel[0][1];
            }
        }
        return col;
    }

	/*
	 * 現在列取得
	 */
    export function getCurrentProp(ht: Handsontable): string {
        let prop = "";
        if (ht) {
            let sel = ht.getSelected();
            if (sel && sel.length > 0) {
                prop = <string>ht.colToProp(sel[0][1]);
            }
        }
        return prop;
    }

	/*
	 * 全面表示
	 */
    export function setFullSize(ht: Handsontable) {
        if (ht) {
            let sz = cm.getPageContentSize();

            ht.updateSettings({
                width: sz[0]
                , height: sz[1]
            }, false);
            getContainerParent(ht).width(sz[0]).height(sz[1]);
            ht.render();
        }
    }

	/*
	 * 表示位置へスクロール
	 */
    export function setRowScroll(ht: Handsontable, row?: number): boolean {
        if (typeof row === "undefined") {
            row = getCurrentRow(ht);
        }
        let col = getCurrentCol(ht);

        // ビュー内に無ければスクロール
        {
            let first = ht.view.wt.wtScroll.getFirstVisibleRow();
            if (row < first) {
                return ht.scrollViewportTo(row, col);
            }
        }
        {
            let last = ht.view.wt.wtScroll.getLastVisibleRow();
            if (row > last) {
                return ht.scrollViewportTo(row, col, true);
            }
        }
        return false;
    }

    export function setColScroll(ht: Handsontable, col?: number): boolean {
        if (typeof col === "undefined") {
            col = getCurrentCol(ht);
        }
        let row = getCurrentRow(ht);

        // ビュー内に無ければスクロール
        {
            let first = ht.view.wt.wtScroll.getFirstVisibleColumn();
            if (col < first) {
                return ht.scrollViewportTo(row, col);
            }
        }
        {
            let last = ht.view.wt.wtScroll.getLastVisibleColumn();
            if (col > last) {
                return ht.scrollViewportTo(row, col, true);
            }
        }
        return false;
    }

	/*
	 * 選択と表示位置へスクロール
	 */
    export function setRowSelectAndScroll(ht: Handsontable, row: number): boolean {
        let col = getCurrentCol(ht);
        if (ht.selectCell(row, col) === true) {
            return setRowScroll(ht, row);
        } else {
            return false;
        }
    }

    export function setColSelectAndScroll(ht: Handsontable, col: number): boolean {
        let row = getCurrentRow(ht);
        if (ht.selectCell(row, col) === true) {
            return setColScroll(ht, col);
        } else {
            return false;
        }
    }



	/*
	 * データ初期化
	 */
    export function initData(ht: Handsontable) {
        ht.loadData([]);
        ht.updateSettings({ maxRows: 0 }, false);
    }

    /*
     * カラムヘッダタイトル取得
     */
    export function getColumnTitle(ht: Handsontable, col: number | string): string {
        let colidx = 0;
        if (typeof col === "string") {
            colidx = ht.propToCol(<string>col);
        } else {
            colidx = col;
        }
        let hd = ht.getColHeader(colidx);
        return $(hd).text();
    }

}
