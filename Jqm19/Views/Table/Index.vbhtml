<!DOCTYPE html>
<html>
<head>
  <title>Home</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta charset="utf-8" />

  <link rel="stylesheet" href="@Url.Content("~/Content/jquery.mobile-1.4.5.min.css")" />
  <link rel="stylesheet" href="@Url.Content("~/Content/handsontable/handsontable.full.min.css")" />
  <link rel="stylesheet" href="@Url.Content("~/Src/cm.css")" />
  <link rel="stylesheet" href="@Url.Content("~/Src/app.css")" />

  <script type="text/javascript" src="@Url.Content("~/Scripts/jquery-2.1.3.min.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Scripts/jquery.mobile-1.4.5.min.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Scripts/handsontable/handsontable.full.min.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Src/cm.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Src/ht.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Src/app.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Src/table.js")"></script>

  <style type="text/css">
  </style>
</head>
<body class="ui-nodisc-icon ui-alt-icon ui-desktop">
  <div data-role="page" id="page1">

    <div data-role="popup" data-history="false" id="page1_popup" data-arrow="true">
      <p>ポップアップ</p>
    </div>

    <div data-role="popup" data-history="false" id="page1_state_popup" data-arrow="true">
      <ul data-role="listview" data-icon="false">
        <li><a href="#" cd="11" title="State11">状態1</a></li>
        <li><a href="#" cd="22" title="State22">状態2</a></li>
        <li><a href="#" cd="33" title="State33">状態3</a></li>
        <li><a href="#" cd="44" title="State44">状態4</a></li>
        <li><a href="#" cd="55" title="State55">状態5</a></li>
      </ul>
    </div>

    <div data-role="popup" data-history="false" id="page1_quantity_popup" data-arrow="true">
      <div role="main" class="ui-content">
        <form novalidate="novalidate">
          <input type="number" value="" max="10" min="1" step="1">
        </form>
      </div>
      <div data-role="footer">
        <div class="ui-toolbar">
          <div class="ui-right-panel">
            <a href="#" class="ui-btn ui-btn-active" cmd="apply">OK</a>
            <a href="#" class="ui-btn ui-popup-close">キャンセル</a>
          </div>
        </div>
      </div>
    </div>

    <div data-role="header" data-position="fixed" data-fullscreen="false" data-tap-toggle="false">
      <h1 class="ui-icon ui-icon-table-w ui-title-left">Table</h1>
      <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-bars ui-btn-right ui-toolbtn"></a>

      <div class="ui-toolbar" id="page1_toolbar1">
        <div class="ui-left-panel">
          <div class="ui-toolbar-divider">
            <a href="#" class="ui-btn ui-btn-icon-left ui-icon-plus">追加</a>
            <a href="#" class="ui-btn ui-btn-icon-left ui-icon-edit">編集</a>
            <a href="#" class="ui-btn ui-btn-icon-left ui-icon-delete">削除</a>
          </div>
          <div class="ui-toolbar-divider">
            <a href="#" class="ui-btn ui-btn-icon-left ui-icon-info">情報</a>
            <a href="#" class="ui-btn ui-btn-icon-left ui-icon-clock">履歴</a>
          </div>
        </div>
        <div class="ui-right-panel">
          <div class="ui-toolbar-divider">
            <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-carat-l"></a>
            <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-carat-r"></a>
            <a href="#" class="ui-btn ui-btn-icon-left ui-icon-search">検索</a>
            <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-bullets"></a>
          </div>
          <div class="ui-toolbar-divider">
            <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-refresh" cmd="refresh"></a>
            <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-power" cmd="power"></a>
          </div>
        </div>
      </div>
    </div>

    <div role="main" class="ui-content ui-nopadding">
      <div id="list_table"></div>
    </div>

    <div data-role="footer" data-position="fixed" data-fullscreen="false" data-tap-toggle="false">
      <h1>Footer</h1>
    </div>
  </div>

  <div data-role="page" id="page2">
    <div data-role="header" data-position="fixed" data-fullscreen="false" data-tap-toggle="false">
      <h1>明細</h1>
    </div>
    <div role="main" class="ui-content">

    </div>
    <div data-role="footer" data-position="fixed" data-fullscreen="false" data-tap-toggle="false">
      <div class="ui-toolbar" id="page2_toolbar1">
        <div class="ui-right-panel">
          <a href="#" class="ui-btn ui-btn-active" cmd="apply">OK</a>
          <a href="#" class="ui-btn" cmd="cancel">キャンセル</a>
        </div>
      </div>
    </div>
  </div>

</body>
</html>