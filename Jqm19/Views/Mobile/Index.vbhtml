<!DOCTYPE html>
<html>
<head>
  <title>Home</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta charset="utf-8" />

  <link rel="stylesheet" href="@Url.Content("~/Content/jquery.mobile-1.4.5.min.css")" />
  <link rel="stylesheet" href="@Url.Content("~/Content/perfect-scrollbar.css")" />
  <link rel="stylesheet" href="@Url.Content("~/Content/jtsage-datebox.min.css")" />
  <link rel="stylesheet" href="@Url.Content("~/Content/handsontable/handsontable.full.min.css")" />
  <link rel="stylesheet" href="@Url.Content("~/Src/cm.css")" />
  <link rel="stylesheet" href="@Url.Content("~/Src/app.css")" />

  <script type="text/javascript" src="@Url.Content("~/Scripts/jquery-2.1.3.min.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Scripts/jquery.mobile-1.4.5.min.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Scripts/perfect-scrollbar.min.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Scripts/jtsage-datebox.min.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Scripts/jtsage-datebox.i18n.ja.utf8.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Scripts/moment.min.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Scripts/handsontable/handsontable.full.min.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Src/cm.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Src/ht.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Src/app.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Src/mobile.js")"></script>

  <style type="text/css">
  </style>

</head>
<body class="ui-nodisc-icon ui-alt-icon">

  <div data-role="page" id="page1">

    <div data-role="popup" data-history="false" id="popup1" data-arrow="true" data-overlay-theme="b">
      <input id="page1_calbox_popup" type="text" />
    </div>

    <div data-role="popup" data-history="false" id="popup2" data-arrow="true" data-overlay-theme="b">
      <input id="page1_datebox_popup" type="text" />
    </div>

    <div data-role="popup" data-history="false" id="popup3" data-arrow="true" data-overlay-theme="b">
      <input id="page1_timebox_popup" type="text" />
    </div>

    @*<div data-role="panel" data-position="left" data-display="overlay" data-position-fixed="true" id="menu-left-fix">
      <ul data-role="listview">
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
      </ul>
    </div>*@
    <div data-role="panel" data-position="right" data-display="overlay" data-position-fixed="true" id="menu-right-fix">
      <ul data-role="listview">
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
      </ul>
    </div>

    <div data-role="panel" data-position="left" data-display="overlay" data-position-fixed="true" id="menu-left">
      <ul data-role="listview">
        <li>
          <input type="text" id="page1_calbox" />
        </li>
        <li>
          <input type="text" id="page1_datebox" />
        </li>
        <li>
          <input type="text" id="page1_timebox" />
        </li>
        <li><a href="#" cmd="calbox1">カレンダーポップアップ</a></li>
        <li><a href="#" cmd="datebox1">年/月ポップアップ</a></li>
        <li><a href="#" cmd="timebox1">時:分ポップアップ</a></li>
        <li><a href="#">GGGGGGGGGG</a></li>
        <li><a href="#">HHHHHHHHHH</a></li>
        <li><a href="#">IIIIIIIIII</a></li>
        <li><a href="#">JJJJJJJJJJ</a></li>
        <li><a href="#">KKKKKKKKKK</a></li>
      </ul>
    </div>

    <div data-role="panel" data-position="right" data-display="overlay" data-position-fixed="true" id="menu-right">
      <ul data-role="listview">
        <li><a href="#">AAAAAAAAAA</a></li>
        <li><a href="#">BBBBBBBBBB</a></li>
        <li><a href="#">CCCCCCCCCC</a></li>
        <li><a href="#">DDDDDDDDDD</a></li>
        <li><a href="#">EEEEEEEEEE</a></li>
        <li><a href="#">FFFFFFFFFF</a></li>
        <li><a href="#">GGGGGGGGGG</a></li>
        <li><a href="#">HHHHHHHHHH</a></li>
        <li><a href="#">IIIIIIIIII</a></li>
        <li><a href="#">JJJJJJJJJJ</a></li>
        <li><a href="#">KKKKKKKKKK</a></li>
      </ul>
    </div>

    <div data-role="header" data-position="fixed" data-fullscreen="false" data-tap-toggle="false">
      <h1>Header</h1>
      <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-carat-l ui-btn-left" cmd="left"></a>
      <div class="ui-right-panel">
        <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-bars ui-toolbtn"></a>
        <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-carat-r" cmd="right"></a>
      </div>
      <div class="ui-toolbar" id="page1_toolbar1">
        <div class="ui-left-panel">
          <a href="#page2" class="ui-btn ui-btn-icon-notext ui-icon-table-b"></a>
          <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-gear" cmd="gear"></a>
          <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-search" cmd="search"></a>
          <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-edit" cmd="edit"></a>
        </div>
        <div class="ui-right-panel">
          <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-bullets" cmd="home"></a>
          <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-camera" cmd="table"></a>
        </div>
      </div>
      <div data-role="navbar">
        <a href="#" class="ui-btn ui-btn-active">ホーム</a>
        <a href="#">設定</a>
        <a href="#">ヘルプ</a>
        <a href="#">問い合わせ</a>
      </div>
    </div>

    <div role="main" class="ui-content">
      <ul data-role="listview" data-icon="false">
        <li>
          <a href="#">
            <img src=@Url.Content("~/imgs/album-bb.jpg")>
            <h2>Broken Bells</h2>
            <p>Broken Bells</p>
          </a>
        </li>
        <li>
          <img src=@Url.Content("~/imgs/album-hc.jpg")>
          <h2>Warning</h2>
          <p>Hot Chip</p>
        </li>
        <li>
          <a href="#">
            <img src=@Url.Content("~/imgs/album-p.jpg")>
            <h2>Wolfgang Amadeus Phoenix</h2>
            <p>Phoenix</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img src=@Url.Content("~/imgs/album-bb.jpg")>
            <h2>Broken Bells</h2>
            <p>Broken Bells</p>
          </a>
        </li>
        <li>
          <img src=@Url.Content("~/imgs/album-hc.jpg")>
          <h2>Warning</h2>
          <p>Hot Chip</p>
        </li>
        <li>
          <a href="#">
            <img src=@Url.Content("~/imgs/album-p.jpg")>
            <h2>Wolfgang Amadeus Phoenix</h2>
            <p>Phoenix</p>
          </a>
        </li>
      </ul>

    </div>

    <div data-role="footer" data-position="fixed" data-fullscreen="false" data-tap-toggle="false">
      <div class="ui-toolbar" id="page1_toolbar2">
        <div class="ui-left-panel">
          <a href="#page2" class="ui-btn ui-btn-icon-notext ui-icon-table-b"></a>
          <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-gear" cmd="gear"></a>
          <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-search" cmd="search"></a>
          <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-edit" cmd="edit"></a>
        </div>
        <div class="ui-right-panel">
          <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-bullets" cmd="home"></a>
          <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-camera" cmd="table"></a>
        </div>
      </div>
      <div data-role="navbar">
        <a href="#" class="ui-btn ui-btn-active">ホーム</a>
        <a href="#">設定</a>
        <a href="#">ヘルプ</a>
        <a href="#">問い合わせ</a>
      </div>
    </div>

  </div>

  <div data-role="page" id="page2">
    <div data-role="header" data-position="fixed" data-fullscreen="false" data-tap-toggle="false">
      <h1>Table</h1>
      <a href="#page1" class="ui-btn ui-btn-icon-notext ui-icon-arrow-l ui-btn-left"></a>
    </div>
    <div role="main" class="ui-content ui-nopadding">
      <div id="list_table"></div>
    </div>
  </div>
</body>
</html>