/// <reference path="../scripts/typings/moment/moment.d.ts"/>

namespace App {
	"use strict";
	/*
	 * テーブルに表示するデータクラス
	 */
    export class TableData {
        data_no = "";
        data_state_cd = 0;
        data_state = "";
        data_date = "";
        data_name = "";
        quantity = 0;
        customer_cd = "";
        customer_name = "";
        handle_cd = "";
        handle_name = "";
        price = 0;
        create_date = "";
        create_user_cd = "";
        create_user = "";
        modify_date = "";
        modify_user_cd = "";
        modify_user = "";
    }

    export function duildTableData(): TableData[] {
        let dts: TableData[] = [];

        for (let i = 0; i < 100; i++) {
            let dt = new TableData;

            dt.data_no = "DNO_" + i.toFillZero(5);
            dt.data_state_cd = i;
            dt.data_state = "State" + i;
            dt.data_date = moment().format("YYYY/MM/DD");
            dt.data_name = "データ名称" + i + "データ名称" + i + "データ名称" + i;
            dt.quantity = i + 1;
            dt.customer_cd = "Customer" + i;
            dt.customer_name = "顧客名" + i;
            dt.handle_cd = "handle" + i;
            dt.handle_name = "担当者名" + i;
            dt.price = i * 1000;
            dt.create_date = moment().format("YYYY/MM/DD hh:mm:ss");
            dt.create_user_cd = "user" + i;
            dt.create_user = "作成者" + i;
            dt.modify_date = moment().format("YYYY/MM/DD hh:mm:ss");
            dt.modify_user_cd = "user" + i;
            dt.modify_user = "更新者" + i;

            dts.push(dt);
        }
        return dts;
    }
}
