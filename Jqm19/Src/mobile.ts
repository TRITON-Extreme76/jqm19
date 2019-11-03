/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../scripts/typings/jquerymobile/jquerymobile.d.ts" />
/// <reference path="../scripts/typings/perfect-scrollbar/perfect-scrollbar.d.ts"/>
/// <reference path="../scripts/typings/moment/moment.d.ts"/>

namespace Mobile {
    "use strict";

	namespace mq {
		let mm = window.matchMedia("(min-width:28em) and (min-height:28em)");
		mm.addListener(function (event: MediaQueryList) {
			update();
		});
		export function isMatch(): boolean {
			return mm.matches;
		}

		/*
		 * テーブル
		 */
		export namespace Table {
			let table1 = window.matchMedia("(min-width:50em)");		// 50em以上
			table1.addListener(function (event: MediaQueryList) {
				update();
			});
			let table2 = window.matchMedia("(min-width:70em)");		// 70em以上
			table2.addListener(function (event: MediaQueryList) {
				update();
			});

			export function mode(): number {
				if (table2.matches) {
					return 2;			// 70em以上
				}
				if (table1.matches) {
					return 1;			// 50em以上
				}
				return 0;				// 50em以下
			}
		}

		/*
		 * パネルL
		 */
		export namespace PanelL {
			let panelL = window.matchMedia("(min-width:55em)");
			panelL.addListener(function (event: MediaQueryList) {
				update();
			});

			export function isVisible(): boolean {
				return panelL.matches;
			}
		}

		/*
		 * パネルR
		 */
		export namespace PanelR {
			let panelR = window.matchMedia("(min-width:80em)");
			panelR.addListener(function (event: MediaQueryList) {
				update();
			});

			export function isVisible(): boolean {
				return panelR.matches;
			}
		}

		/*
		 * 更新
		 */
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
            case "page2":
                cm.hideBodyOverflowY(true);		// 縦スクロールなし
                break;
            default:
                cm.hideBodyOverflowY(false);
        }
		mq.update();
    });

	class ServerDate {
		Source = "";
		Target: Date;

		constructor(source: string, target: Date) {
			this.Source = source;
			this.Target = target;
		}
	}


	namespace Page1 {
		let _panelLeft: JQuery;
		let _panelRight: JQuery;
		let _psLeft: PerfectScrollbar;
		let _psRight: PerfectScrollbar;
		let _pos = new ScrollPos();

		let _calDate = "";
		let _monthDate = "";
		let _timeDate = "";

		$(document).on("mq_responsive", function (event: Event) {
			if (cm.getActivePageId() !== "page1") {
				return;
			}

			{
				//let w = "";
				//if (!mq.PanelL.isVisible()) {
				//	w = "3em"
				//}
				//Panel.setVisible("#menu-left-fix", w);
				Panel.setVisible(_panelLeft, mq.PanelL.isVisible());
			}

			{
				let w = "";
				if (!mq.PanelR.isVisible()) {
					w = "3em";
				}
				Panel.setVisible("#menu-right-fix", w);
				Panel.setVisible(_panelRight, mq.PanelR.isVisible());
			}
		});

        $(document).on("pagecontainershow", function (event: Event, ui: any) {
            try {
                if (cm.getToPageId(ui) !== "page1") {
                    return;
                }

				// サイドパネル
				_panelLeft = $("#menu-left");
				_panelRight = $("#menu-right");

                // スクロールバー
                _psLeft = new PerfectScrollbar(
					_panelLeft.children(".ui-panel-inner")[0]
					, {
						suppressScrollX: true
						, wheelPropagation: false
					});
                _psRight = new PerfectScrollbar(
					_panelRight.children(".ui-panel-inner")[0]
					, {
						suppressScrollX: true
						, wheelPropagation: false
					});

                // 日付、時刻入力
                $("#page1_calbox").datebox({
                    mode: "calbox"
                    , useFocus: false
                    , useModal: false
                    , overrideDateFormat: "%Y/%m/%d"
                    , overrideCalHeaderFormat: "%Y/%m"
                    , calUsePickers: true
                    , themeDateToday: "c"
                });

                $("#page1_datebox").datebox({
                    mode: "datebox"
                    , useFocus: false
                    , useModal: false
                    , overrideDateFieldOrder: ["y", "m"]
                    , overrideDateFormat: "%Y/%m"
                });

                $("#page1_timebox").datebox({
                    mode: "timebox"
                    , useFocus: false
                    , useModal: false
                    , overrideTimeOutput: "%k:%M"
                });

                $("#page1_calbox_popup").datebox({
                    mode: "calbox"
                    , calUsePickers: true
                    , useInline: true
                    , hideInput: true
                    , overrideDateFormat: "%Y/%m/%d"
                    , overrideCalHeaderFormat: "%Y/%m"
                    , themeDateToday: "c"
                });

                $("#page1_datebox_popup").datebox({
                    mode: "datebox"
                    , useInline: true
                    , hideInput: true
                    , overrideDateFieldOrder: ["y", "m"]
                    , overrideDateFormat: "%Y/%m"
                });

                $("#page1_timebox_popup").datebox({
                    mode: "timebox"
                    , useInline: true
                    , hideInput: true
                    , overrideTimeOutput: "%k:%M"
                });

                $(window).resize();
                _pos.doScroll();	// スクロール位置復元
				mq.update();

            } catch (e) {
                cm.showErrMsg(e);
            }
		});

		/*
		 * ページ終了前
		 */
        $(document).on("pagecontainerbeforehide", function (event: Event, ui: any) {
			if (cm.getPrevPageId(ui) !== "page1") {
				return;
			}
			_pos.setValue();	// スクロール位置保持
		});

		/*
		 * ヘッダボタン押下
		 */
        $(document).on("click", "#page1 > .ui-header .ui-btn", function (event: Event) {
            try {
                $(this).blur();
                let cmd = $(this).attr("cmd");
                switch (cmd) {
                    case "left":
                        Panel.open(_panelLeft);
                        break;

                    case "right":
                        Panel.open(_panelRight);
                        break;
                }
            } catch (e) {
                cm.showErrMsg(e);
            }
		});

		/*
		 * ツールバーボタン押下
		 */
		$(document).on("click", "#page1_toolbar1 .ui-btn, #page1_toolbar2 .ui-btn", function (event: Event) {
            try {
                $(this).blur();
                let cmd = $(this).attr("cmd");
                switch (cmd) {
                    case "home":
                        cm.changeLocation("home");
                        break;

                    case "table":
                        cm.changeLocation("table");
                        break;

					case "gear":
					case "search":
						{
							let cal = $("#page1_calbox").val();
							let tm = $("#page1_timebox").val();
							if (!cal || !tm) {
								cm.MsgBox.show("日付と時刻を選択して下さい", "エラー");
								return;
							}

							let src = cal + " " + tm;
							let svrdt = new ServerDate(src, new Date(src));
							if (cmd === "search") {
								svrdt = new ServerDate(src, new Date(src + " GMT+0000"));
							}

							let dt = JSON.stringify(svrdt);

							cm.isBusy(true);
							$.ajax({
								type: "POST"
								, cache: false
								, async: true
								, url: cm.apiBaseUrl() + "ServerDate/Send"
								, data: dt
								, contentType: "application/json; charset=utf-8"
								, dataType: "json"
								, timeout: cm.ajaxTimeOut
							}).done(function (response: any) {

								if (response) {
									let res = "";
									res += "source:" + response.Source + "<br>";
									res += "target:" + response.Target;
									cm.MsgBox.show(res, "Res");

								} else {
									cm.showErrMsg("no response");
								}

							}).fail(function (e: any) {
								cm.showErrMsg(e);

							}).always(function () {
								cm.isBusy(false);
							});
						}
						break;

                    default:
                        if (cmd) {
                            switch ($(event.target).closest(".ui-toolbar")[0].id) {
                                case "page1_toolbar1":
                                    cm.MsgBox.show(cmd + "ボタンが押されました", "メッセージ");
                                    break;
                                case "page1_toolbar2":
                                    cm.MsgBallon.show(cmd + "ボタンが押されました", this, true);
                                    break;
                            }
                        }
                }
            } catch (e) {
                cm.showErrMsg(e);
            }
		});

        /*
         * 左パネル
         */
        $(document).on("click", "#menu-left .ui-btn", function (event: Event) {
            try {
                $(this).blur();
                let scope = this;
                let cmd = $(this).attr("cmd");
                switch (cmd) {
                    case "calbox1":

                        // NG
                        // 現在日が選択されません
                        //$("#page1_calbox_popup").off("datebox").on("datebox", function (event: Event, passed: any) {
                        //});

                        $(document).off("datebox", "#page1_calbox_popup").on("datebox", "#page1_calbox_popup", function (event: Event, passed: any) {

                            console.log(passed.method);

                            if (passed.method === "set") {
                                if (Popup.isActive("popup1")) {
                                    let dt = passed.date;
                                    if (dt) {
                                        _calDate = moment(dt).format("YYYY/MM/DD");
                                        $(scope).text(passed.value);
                                    }
                                    Popup.close();
                                    Panel.close();
                                }
                            }
                        });

                        if (moment(_calDate).isValid()) {
                            $("#page1_calbox_popup").datebox("setTheDate", moment(_calDate).toDate());
                        }

                        Popup.open("#popup1", {
                            positionTo: this
                            , closeButton: true
                            , positionFixed: true
                        });

                        break;

                    case "datebox1":

                        $("#page1_datebox_popup").off("datebox").on("datebox", function (event: Event, passed: any) {
                            if (passed.method === "set") {
                                if (Popup.isActive("popup2")) {
                                    let dt = passed.date;
                                    if (dt) {
                                        _monthDate = moment(dt).format("YYYY/MM/01");
                                        $(scope).text(passed.value);
                                    }
                                    Popup.close();
                                    Panel.close();

                                }
                            }
                        });

                        if (moment(_monthDate).isValid()) {
                            $("#page1_datebox_popup").datebox("setTheDate", moment(_monthDate).toDate());
                        }

                        Popup.open("#popup2", {
                            positionTo: this
                            , closeButton: true
                            , positionFixed: true
                        });

                        break;
                    case "timebox1":

                        $("#page1_timebox_popup").off("datebox").on("datebox", function (event: Event, passed: any) {
                            if (passed.method === "set") {
                                if (Popup.isActive("popup3")) {
                                    let dt = passed.date;
                                    if (dt) {
                                        _timeDate = moment(dt).format("YYYY/MM/DD HH:mm:01");
                                        $(scope).text(passed.value);
                                    }
                                    Popup.close();
                                    Panel.close();
                                }
                            }
                        });

                        if (moment(_timeDate).isValid()) {
                            $("#page1_timebox_popup").datebox("setTheDate", moment(_timeDate).toDate());
                        }

                        Popup.open("#popup3", {
                            positionTo: this
                            , closeButton: true
                            , positionFixed: true
                        });
                        break;
                }
            } catch (e) {
                cm.showErrMsg(e);
            }
		});

		$(window).on("resize", function (event: Event) {
			if (cm.getActivePageId() !== "page1") {
				return;
			}

			// サイドパネルの高さ更新
			let h = $(window).outerHeight();
			Panel.setFixedHeight(_panelLeft, h);
			if (_psLeft) {
				_psLeft.update();
			}
			Panel.setFixedHeight(_panelRight, h);
			if (_psRight) {
				_psRight.update();
			}
		});
	}

    namespace Page2 {
        let _ht: Handsontable = null;			// HandsonTable
        let _resizeDelay = new DelayTimer(500);	// リサイズ遅延タイマー
		let _pos: number[] = [];				// 現在位置

		$(document).on("mq_responsive", function (event: Event) {
			if (cm.getActivePageId() !== "page2") {
				return;
			}
			if (_ht) {
				_ht.updateSettings({ columns: HTable.getColumns() }, false);
			}
		});

		/*
		 * ページ表示前
		 */
        $(document).on("pagecontainerbeforeshow", function (event: Event, ui: any) {
            if (cm.getToPageId(ui) !== "page2") {
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
                if (cm.getToPageId(ui) !== "page2") {
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

            } catch (e) {
                cm.showErrMsg(e);
            }
        });

		/*
		 * ページ終了前
		 */
        $(document).on("pagecontainerbeforehide", function (event: Event, ui: any) {
			if (cm.getPrevPageId(ui) !== "page2") {
				return;
			}
			if (_ht) {
				_pos = Ht.getCurrentRowColPos(_ht);
			}
		});

		/*
		 * リサイズ
		 */
        $(window).on("resize", function (event: Event) {
            if (cm.getActivePageId() !== "page2") {
                return;
            }

            // 一定時間変更がない場合のみテーブルサイズ設定
            _resizeDelay.timeout(function () {
                Ht.setFullSize(_ht);
            });
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
                    , columns: getColumns()					// 列設定
                    , colHeaders: true						// 列見出し
                    , rowHeaders: true						// 行見出し
                    , rowHeaderWidth: 30					// 行見出し幅
                    , manualColumnResize: false				// 列幅変更：変更不可
                    , multiSelect: false					// 複数選択
                    , stretchH: "all"						// 水平ストレッチ：均等
                    , autoColumnSize: false					// 自動サイズ調整
                    , wordWrap: true						// セル内折り返し：する
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
                    , beforeOnCellMouseDown: function (event: Event, coords: any) {
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
			 * カラム情報
			 */
			export function getColumns(): Object[] {
				let cols: Object[] = [];

				cols.push({
					type: "text"
					, title: "番号"
					, data: "data_no"
					, readOnly: true
					, colWidths: 90
				});

				if (mq.Table.mode() > 0) {	// レスポンシブモードで表示/非表示
					cols.push({
						type: "text"
						, title: "状態"
						, data: "data_state"
						, readOnly: true
						, colWidths: 100
					});
				}

				cols.push({
					type: "text"
					, title: "日付"
					, data: "data_date"
					, readOnly: true
					, colWidths: 80
				});

				{										// レスポンシブモードで幅変更
					let w = 100;
					if (mq.Table.mode() > 0) {
						w = 200;
					}
					if (mq.Table.mode() > 1) {
						w = 300;
					}
					cols.push({
						type: "text"
						, title: "名称"
						, data: "data_name"
						, readOnly: true
						, colWidths: w
					});
				}

				if (mq.Table.mode() > 0) {	// レスポンシブモードで表示/非表示
					cols.push({
						type: "text"
						, title: "顧客名"
						, data: "customer_name"
						, readOnly: true
						, colWidths: 100
					});

					cols.push({
						type: "text"
						, title: "担当者"
						, data: "handle_name"
						, readOnly: true
						, colWidths: 100
					});
				}

				cols.push({
					type: "numeric"
					, title: "金額"
					, data: "price"
					, numericFormat: {
						pattern: "0,000"
						, culture: "ja-JP"
					}
					, readOnly: true
					, colWidths: 70
				});

				if (mq.Table.mode() > 1) {	// レスポンシブモードで表示/非表示
					cols.push({
						type: "text"
						, title: "作成日"
						, data: "create_date"
						, readOnly: true
						, colWidths: 150
					});

					cols.push({
						type: "text"
						, title: "作成者"
						, data: "create_user"
						, readOnly: true
						, colWidths: 100
					});

					cols.push({
						type: "text"
						, title: "更新日"
						, data: "modify_date"
						, readOnly: true
						, colWidths: 150
					});

					cols.push({
						type: "text"
						, title: "更新者"
						, data: "modify_user"
						, readOnly: true
						, colWidths: 100
					});
				}

				return cols;
			}


		}
    }
}