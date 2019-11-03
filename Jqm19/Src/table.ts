/// <reference path="../scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../scripts/typings/jquerymobile/jquerymobile.d.ts"/>
/// <reference path="../scripts/typings/handsontable/handsontable.d.ts"/>

namespace Table {
	"use strict";

	namespace mq {
		let mm = window.matchMedia("(min-width:28em) and (min-height:28em)");
		mm.addListener(function (event: MediaQueryList) {
			update();
		});
		export function isMatch(): boolean {
			return mm.matches;
		}
		export function update() {
			if (mm.matches) {
				$(".ui-header .ui-toolbar").resetDisplay();
				$(".ui-header .ui-toolbtn").hide();
			} else {
				$(".ui-header .ui-toolbar").hide();
				$(".ui-header .ui-toolbtn").resetDisplay();
			}
			$(document).trigger("mq_responsive");
		}
	}

	/*
	 * 表示前
	 */
	$(document).on("pagecontainerbeforeshow", function (event: Event, ui: any) {
		switch (cm.getToPageId(ui)) {
			case "page1":
				cm.hideBodyOverflowY(true);		// 縦スクロールなし
				break;
			default:
				cm.hideBodyOverflowY(false);
        }
	});




	namespace Page1 {
        let _ht: Handsontable = null;				// HandsonTable
        let _resizeDelay = new DelayTimer(500);	// リサイズ遅延タイマー
		let _pos: number[] = [];				// 現在位置

		/*
		 * ページ表示前
		 */
		$(document).on("pagecontainerbeforeshow", function (event: Event, ui: any) {
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
        $(document).on("pagecontainershow", function (event: Event, ui: any) {
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
					let dts = App.duildTableData();
                    _ht.loadData(dts);
                    _ht.updateSettings({ maxRows: dts.length }, false);	// データ数設定
                    Ht.setFullSize(_ht);
                }
                Ht.setCurrentRowColPos(_ht, _pos);	// 位置復元
                _ht.render();						// 再描画

				mq.update();
				$(window).resize();

            } catch (e) {
                cm.showErrMsg(e);
			}
		});

        /*
		 * カラムヘッダボタン押下
		 */
		$(document).on("click", "#list_table thead > tr > th .ui-btn", function (event: Event) {
            try {

                $(this).blur();
                let cmd = $(this).attr("cmd");
                let txt = "";
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
                    let dlg = $("#page1_popup");
                    dlg.children("p").text(txt);
                    dlg.off("click").on("click", function (event: Event) {
                        Popup.close();
                    });
                    Popup.open(dlg, { positionTo: this });
                }
            } catch (e) {
                cm.showErrMsg(e);
            }
		});

		/*
		 * リサイズ
		 */
		$(window).on("resize", function (event: Event) {
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
        $(document).on("click", "#page1_toolbar1 .ui-btn", function (event: Event) {
            try {
                $(this).blur();
                let cmd = $(this).attr("cmd");
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

            } catch (e) {
                cm.showErrMsg(e);
            }
		});

		/*
		 * テーブル
		 */
        namespace HTable {
			/*
		 * 作成
		 */
			export function build() {
                _ht = new Handsontable($("#list_table")[0], {
                    data: null
                    , columns: getColumns()                 // 列設定
                    , colHeaders: getColHerders				// 列見出し
                    // , rowHeaders: true						// 行見出し
					, rowHeaders: function (index: number) {
						if (_ht) {
							let dt = <App.TableData>_ht.getSourceDataAtRow(index);   // 直接データ取り出し
							if (dt) {
								return dt.data_no;
							}
						}
					}
                    , rowHeaderWidth: 100					// 行見出し幅
                    , manualColumnResize: true				// 列幅変更
                    , multiSelect: false					// 複数選択
                    , stretchH: "none"						// 水平ストレッチ
                    , autoColumnSize: false					// 自動サイズ調整
                    , wordWrap: false						// セル内折り返し
                    , outsideClickDeselects: false			// 選択を維持
                    , disableVisualSelection: "area"		// 範囲選択不可
                    , selectionMode: "single"               // 選択モード
                    , startRows: 0							// データ無時の行数
                    , trimWhitespace: false					// 前後の空白トリム
                    , currentRowClassName: "current-row"	// 選択列にクラス名付加
                    , rowHeights: function (row: number) {	// 行高さ
                        return 50;
                    }
                    , enterMoves: { row: 0, col: 0 }        // Enterキー移動先
                    , autoWrapCol: false					// 列移動ループ
                    , autoWrapRow: false					// 行移動ループ
                    , fillHandle: false                     // 選択範囲を埋める
                    , beforeOnCellMouseDown(event: Event, coords: any) {
                        if (_ht) {
                            Ht.CurrentCell.save(_ht, coords.row, coords.col);
                        }
                    }
                    , afterSelection(row: number, col: number) {
                        if (_ht) {
                            Ht.CurrentCell.restor(_ht, row, col);
                        }
                    }
                    , beforeKeyDown(event: any) {

                        Ht.setDisableKey(event);	// 無効なキー入力設定
                    }
                });
				Ht.setFullSize(_ht);	// 全面表示
			}

			/*
			 * エディタ
			 */
            let CustomEditor = Handsontable.editors.TextEditor.prototype.extend();
			{
				CustomEditor.prototype.prepare = function () {
					Handsontable.editors.TextEditor.prototype.prepare.apply(this, arguments);

					switch (this.prop) {
						case "data_name":	// 名称編集

							this.TEXTAREA.maxLength = 20;
							break;
					}
				};

				CustomEditor.prototype.beginEditing = function () {		// 編集開始前
                    try {
                        switch (this.prop) {
                            case "data_state":	// 状態編集
                                {

                                    let row = this.row;
									let dt = <App.TableData>_ht.getSourceDataAtRow(row);   // 直接データ取り出し

                                    let dlg = $("#page1_state_popup");
                                    let lst = dlg.find("ul.ui-listview");

                                    lst.find("li > a").off("click").on("click", function (event: Event) {
                                        let cd = parseInt($(this).attr("cd"), 0);
                                        let nm = $(this).attr("title");

                                        if (isNaN(cd) === false) {
                                            dt.data_state_cd = cd;
                                            dt.data_state = nm;
                                            _ht.render();
                                            Popup.close();
                                        }
                                    });

									let td = this.TD;

                                    // ポップアップ表示
									setTimeout(function () {	// A対策
										Popup.open(dlg, {
											positionTo: td
											, focusSelector: lst
										});
									}, 0);
                                }
                                break;

							case "data_date":

								break;

                            case "data_name":	// 名称編集
                                Handsontable.editors.TextEditor.prototype.beginEditing.apply(this, arguments);	// 通常動作
                                break;

                            case "quantity":	// 数量編集
                                {
                                    let row = this.row;
									let dt = <App.TableData>_ht.getSourceDataAtRow(row);   // 直接データ取り出し

                                    let dlg = $("#page1_quantity_popup").css("width", "17em");
                                    let ipt = dlg.find(".ui-input-text > input").val(dt.quantity);

                                    /*
                                     * ポップアップボタン押下
                                     */
                                    dlg.find(".ui-btn").off("click").on("click", function (event: Event) {

                                        let cmd = $(this).attr("cmd");
                                        switch (cmd) {
                                            case "apply":				// OK
                                                let v = parseInt(ipt.val(), 0);
                                                if (isNaN(v) === false) {
                                                    dt.quantity = v;
                                                    _ht.render();
                                                }
                                                Popup.close();
                                                break;
                                        }
                                    });

									let td = this.TD;
                                    // ポップアップ表示
									setTimeout(function () {	// A対策
										Popup.open(dlg, {
											positionTo: td
											, focusSelector: ipt
											, onOpend: function () {
												ipt.numberSpin({ digits: 0, slider: true });
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

                    } catch (e) {
                        cm.showErrMsg(e);
                    }
				};
			}

			/*
			 * カラム設定
			 */
			function getColumns(): Object[] {

				return [
					{
						type: "text"
						//, title: "番号" // colHeaderで設定する場合は設定しない
						, data: "data_no"
						, readOnly: false
						, colWidths: 100
						, editor: CustomEditor
					}
					, {
						type: "text"
						//, title: "状態"
						, data: "data_state"
						, readOnly: false
						, colWidths: 100
						, renderer: htmlRenderer
						, editor: CustomEditor
					}
					, {
						type: "text"
						//, title: "日付"
						, data: "data_date"
						, readOnly: false
						, colWidths: 100
						, editor: CustomEditor
					}
					, {
						type: "text"
						//, title: "名称"
						, data: "data_name"
						, readOnly: false
						, colWidths: 300
						, editor: CustomEditor
					}
					, {
						type: "numeric"
						, title: "数量"
						, data: "quantity"
						, readOnly: false
						, colWidths: 50
						, editor: CustomEditor
					}
					, {
						type: "text"
						, title: "顧客名"
						, data: "customer_name"
						, readOnly: false
						, colWidths: 100
						, editor: CustomEditor
					}
					, {
						type: "text"
						, title: "担当者"
						, data: "handle_name"
						, readOnly: false
						, colWidths: 100
						, editor: CustomEditor
					}
					, {
						type: "numeric"
						, title: "金額"
						, data: "price"
						, numericFormat: {
							pattern: "0,000,"
							, culture: "ja-JP"
						}
						, readOnly: false
						, colWidths: 100
						, editor: CustomEditor
					}
					, {
						type: "text"
						, title: "作成日"
						, data: "create_date"
						, readOnly: false
						, colWidths: 150
						, editor: CustomEditor
					}
					, {
						type: "text"
						, title: "作成者"
						, data: "create_user"
						, readOnly: false
						, colWidths: 100
						, editor: CustomEditor
					}
					, {
						type: "text"
						, title: "更新日"
						, data: "modify_date"
						, readOnly: false
						, colWidths: 150
						, editor: CustomEditor
					}
					, {
						type: "text"
						, title: "更新者"
						, data: "modify_user"
						, readOnly: false
						, colWidths: 100
						, editor: CustomEditor
					}
				];
			}

			/*
			 * カラムヘッダー設定
			 */
			function getColHerders(col: number): string {
				//
				// columnsのtitleが設定されてる列では呼ばれません
				// columnSortingとの併用は考慮外
				// 
				if (_ht) {
					let prop = _ht.colToProp(col);
					switch (prop) {
						case "data_no":
							{
								// 丸ごとボタン
								let content = "";
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
								let content = "";
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
								let content = "";
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
								let content = "";
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
			function htmlRenderer(instance: any, td: HTMLTableDataCellElement, row: number, col: number, prop: string, value: any, cellProperties: any) {
				if (!_ht || _ht.countRows() <= row) {
					return;
				}

				switch (prop) {
					case "data_state":
						{
							let icon = "none";
                            let dt = <App.TableData>_ht.getSourceDataAtRow(row);   // 直接データ取り出し
							if (dt.data_state_cd % 5 === 0) {
								$(td).css({
									"color": "white"
									, "background-color": "red"
								});
								icon = "tag";
							}
							$(td).empty().append("<div class='ui-icon ui-icon-" + icon + "-w'>" + value + "</div>");
							// $(td).text(value);
						}
						break;
				}
				return td;
			}
		}
	}

    namespace Page2 {

        $(document).on("pagecontainershow", function (event: Event, ui: any) {
            try {
                if (cm.getToPageId(ui) !== "page2") {
                    return;
                }



            } catch (e) {
                cm.showErrMsg(e);
            }
        });

		$(document).on("click", "#page2_toolbar1 .ui-btn", function (event: Event) {
            try {
                $(this).blur();
                let cmd = $(this).attr("cmd");
                switch (cmd) {
                    case "apply":
                        cm.changePage("page1", false);
                        break;

                    case "cancel":
                        cm.changePage("page1", false);
                        break;
                }
            } catch (e) {
                cm.showErrMsg(e);
            }
		});
	}
}