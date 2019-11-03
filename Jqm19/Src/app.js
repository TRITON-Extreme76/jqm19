/// <reference path="../scripts/typings/moment/moment.d.ts"/>
var App;
(function (App) {
    "use strict";
    /*
     * テーブルに表示するデータクラス
     */
    var TableData = (function () {
        function TableData() {
            this.data_no = "";
            this.data_state_cd = 0;
            this.data_state = "";
            this.data_date = "";
            this.data_name = "";
            this.quantity = 0;
            this.customer_cd = "";
            this.customer_name = "";
            this.handle_cd = "";
            this.handle_name = "";
            this.price = 0;
            this.create_date = "";
            this.create_user_cd = "";
            this.create_user = "";
            this.modify_date = "";
            this.modify_user_cd = "";
            this.modify_user = "";
        }
        return TableData;
    }());
    App.TableData = TableData;
    function duildTableData() {
        var dts = [];
        for (var i = 0; i < 100; i++) {
            var dt = new TableData;
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
    App.duildTableData = duildTableData;
})(App || (App = {}));
//# sourceMappingURL=app.js.map