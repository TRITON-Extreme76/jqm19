<!DOCTYPE html>
<html>
<head>
  <title>Home</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta charset="utf-8" />

  <link rel="stylesheet" href="@Url.Content("~/Content/jquery.mobile-1.4.5.min.css")" />
  <link rel="stylesheet" href="@Url.Content("~/Src/cm.css")"/>
  <link rel="stylesheet" href="@Url.Content("~/Src/app.css")" />

  <script type="text/javascript" src="@Url.Content("~/Scripts/jquery-2.1.3.min.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Scripts/jquery.mobile-1.4.5.min.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Src/cm.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Src/app.js")"></script>
  <script type="text/javascript" src="@Url.Content("~/Src/home.js")"></script>

  <style type="text/css">

    .menu {
      width: 20em;
      float: left;
      margin-left: 1em!important;
    }

    #page1 > .ui-header > .ui-title.ui-title-left {
      padding-right: 10.5em;
    }

  </style>


</head>
<body class="ui-nodisc-icon ui-alt-icon ui-desktop">
    <div data-role="page" id="page1">

      <div data-role="popup" data-history="false" id="popup0" data-arrow="true" data-overlay-theme="b">
        <p>ポップアップ</p>
      </div>

      <div data-role="popup" data-history="false" id="popup1">
        <ul data-role="listview" data-icon="false">
          <li><a href="#">メニュー1</a></li>
          <li><a href="#">メニュー2</a></li>
          <li><a href="#">メニュー3</a></li>
          <li><a href="#">メニュー4</a></li>
        </ul>
      </div>

      <div data-role="popup" data-history="false" id="popup2" data-overlay-theme="b" data-dismissible="false">
        <div data-role="header">
          <h1>Header</h1>
          <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-delete ui-popup-close ui-btn-right"></a>
          <div class="ui-toolbar" id="toolbar2">
            <div class="ui-left-panel">
              <div class="ui-toolbar-divider">
                <a href="#" class="ui-btn ui-btn-icon-left ui-icon-star">ボタン5</a>
              </div>
            </div>
            <div class="ui-right-panel">
              <div class="ui-toolbar-divider">
                <a href="#" class="ui-btn ui-btn-icon-left ui-icon-share-square-w ui-btn-active">ボタン6</a>
                <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-gear">ボタン7</a>
              </div>
              <div class="ui-toolbar-divider">
                <button>ボタン8</button>
                <a href="#" class="ui-btn">ボタン9</a>
                <a href="#" class="ui-btn">ボタン10</a>
              </div>
              <div class="ui-toolbar-divider">
                <a href="#" class="ui-btn">ボタン11</a>
                <a href="#" class="ui-btn">ボタン12</a>
              </div>
            </div>
          </div>
        </div>
        <div role="main" class="ui-content">
          <ul data-role="listview" data-inset="true" data-icon="false" class="split">
            <li>
              <div class="ui-field-contain em7">
                <label for="popup2_text12">Text input:</label>
                <div>
                  <input name="popup2_text12" id="popup2_text12" type="text" value="">
                </div>
              </div>
              <button class="ui-btn ui-btn-icon-notext ui-btn-split ui-icon-carat-d"></button>
            </li>
            <li>
              <div class="ui-field-contain em7">
                <label for="popup2_text13">Text input clr:</label>
                <div>
                  <input name="popup2_text13" id="popup2_text13" type="text" value="" data-clear-btn="true">
                </div>
              </div>
            </li>
            <li>
              <div class="ui-field-contain em7">
                <label for="popup2_search8">Search:</label>
                <div>
                  <input name="popup2_search8" id="popup2_search8" type="search" value="">
                </div>
              </div>
            </li>
            <li>
              <div class="ui-field-contain em7">
                <label for="popup2_textarea12">Textarea:</label>
                <div>
                  <textarea name="popup2_textarea12" id="popup2_textarea12" rows="8" cols="40"></textarea>
                </div>
              </div>
              <button class="ui-btn ui-btn-icon-notext ui-btn-split ui-icon-delete"></button>
            </li>
            <li>
              <div class="ui-field-contain em7">
                <label for="popup2_flip1">Textarea:</label>
                <div>
                  <input name="popup2_flip1" id="popup2_flip1" type="checkbox" data-role="flipswitch">
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div data-role="footer">
          <div class="ui-toolbar">
            <div class="ui-left-panel">
              <a href="#" class="ui-btn">リセット</a>
            </div>
            <div class="ui-right-panel">
              <a href="#" class="ui-btn ui-btn-active">OK</a>
              <a href="#" class="ui-btn ui-popup-close">キャンセル</a>
            </div>
          </div>
        </div>
      </div>

      <div data-role="popup" data-history="false" id="popup3" data-arrow="true">
        <ul data-role="listview" data-icon="false">
          <li><a href="#">アイテム1</a></li>
          <li><a href="#">アイテム2</a></li>
          <li><a href="#">アイテム3</a></li>
          <li><a href="#">アイテム4</a></li>
          <li><a href="#">アイテム5</a></li>
          <li><a href="#">アイテム6</a></li>
          <li><a href="#">アイテム7</a></li>
          <li><a href="#">アイテム8</a></li>
          <li><a href="#">アイテム9</a></li>
          <li><a href="#">アイテム10</a></li>
        </ul>
      </div>

    <div id="subwindow3" class="ui-subwindow static left">
      <div style="max-width:500px;">
        <div class="ui-content">
          <div class="ui-field-contain em5">
            <label for="text-14">Text input:</label>
            <div>
              <input name="text-14" id="text-14" type="text" value="">
            </div>
          </div>
        </div>
        <div class="ui-footer">
          <div class="ui-toolbar">
            <div class="ui-right-panel">
              <a href="#" class="ui-btn ui-btn-active">OK</a>
              <a href="#" class="ui-btn ui-subwindow-close">キャンセル</a>
            </div>
          </div>
        </div>
      </div>
    </div>

      <div id="subwindow2" class="ui-subwindow ui-dismissible">
        <div>
          <div class="ui-header">
            <h1 class="ui-title">Header</h1>
            <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-delete ui-subwindow-close ui-btn-right"></a>
          </div>
          <div class="ui-content">
            <ul data-role="listview" id="subwindow2_list">
              <li><a href="#">A</a></li>
              <li><a href="#">B</a></li>
              <li><a href="#">C</a></li>
              <li><a href="#">D</a></li>
              <li><a href="#">E</a></li>
              <li><a href="#">A</a></li>
              <li><a href="#">B</a></li>
              <li><a href="#">C</a></li>
              <li><a href="#">D</a></li>
              <li><a href="#">E</a></li>
              <li><a href="#">A</a></li>
              <li><a href="#">B</a></li>
              <li><a href="#">C</a></li>
              <li><a href="#">D</a></li>
              <li><a href="#">E</a></li>
              <li><a href="#">A</a></li>
              <li><a href="#">B</a></li>
              <li><a href="#">C</a></li>
              <li><a href="#">D</a></li>
              <li><a href="#">E</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div id="subwindow1" class="ui-subwindow">
        <div>
          <div class="ui-header">
            <h1 class="ui-title">Header</h1>
            <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-delete ui-subwindow-close ui-btn-right"></a>
            <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-delete ui-subwindow-close ui-btn-left"></a>
            <div class="ui-toolbar" id="toolbar2">
              <div class="ui-left-panel">
                <div class="ui-toolbar-divider">
                  <a href="#" class="ui-btn ui-btn-icon-left ui-icon-star">ボタン5</a>
                </div>
              </div>
              <div class="ui-right-panel">
                <div class="ui-toolbar-divider">
                  <a href="#" class="ui-btn ui-btn-icon-left ui-icon-share-square-w ui-btn-active">ボタン6</a>
                  <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-gear">ボタン7</a>
                </div>
                <div class="ui-toolbar-divider">
                  <a href="#" class="ui-btn">ボタン8</a>
                  <a href="#" class="ui-btn">ボタン9</a>
                  <a href="#" class="ui-btn">ボタン10</a>
                </div>
                <div class="ui-toolbar-divider">
                  <a href="#" class="ui-btn">ボタン11</a>
                  <a href="#" class="ui-btn">ボタン12</a>
                </div>
              </div>
            </div>
          </div>
          <div class="ui-content">
            <ul data-role="listview" data-icon="false" class="split" id="sublist1">
              <li>
                <div class="ui-field-contain em7">
                  <label for="subwindow1_text12">Text input:</label>
                  <div>
                    <input name="subwindow1_text12" id="subwindow1_text12" type="text" value="">
                  </div>
                </div>
                <button class="ui-btn ui-btn-icon-notext ui-btn-split ui-icon-carat-d" cmd="popup3"></button>
              </li>
              <li>
                <div class="ui-field-contain em7">
                  <label for="subwindow1_text13">Text input clr:</label>
                  <div>
                    <input name="subwindow1_text13" id="subwindow1_text13" type="text" value="" data-clear-btn="true">
                  </div>
                </div>
              </li>
              <li>
                <div class="ui-field-contain em7">
                  <label for="subwindow1_search8">Search:</label>
                  <div>
                    <input name="subwindow1_search8" id="subwindow1_search8" type="search" value="">
                  </div>
                </div>
              </li>
              <li>
                <div class="ui-field-contain em7">
                  <label for="subwindow1_textarea12">Textarea:</label>
                  <div>
                    <textarea name="subwindow1_textarea12" id="subwindow1_textarea12" rows="8" cols="40"></textarea>
                  </div>
                </div>
                <button class="ui-btn ui-btn-icon-notext ui-btn-split ui-icon-delete"></button>
              </li>
              <li>
                <div class="ui-field-contain em7">
                  <label for="subwindow1_flip1">Textarea:</label>
                  <div>
                    <input name="subwindow1_flip1" id="subwindow1_flip1" type="checkbox" data-role="flipswitch">
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="ui-footer">
            <div class="ui-toolbar">
              <div class="ui-left-panel">
                <a href="#" class="ui-btn">ボタン3</a>
              </div>
              <div class="ui-right-panel">
                <a href="#" class="ui-btn ui-btn-active">OK</a>
                <a href="#" class="ui-btn ui-subwindow-close">キャンセル</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="subwindow0" class="ui-subwindow ui-dismissible" title="オーバーレイ">
        <div title="ウィンドウ">
          <div class="ui-header">
            <h1 class="ui-title">Header</h1>
          </div>
          <div class="ui-content">
          </div>
          <div class="ui-footer">
            <h1 class="ui-title">Footer</h1>
          </div>
        </div>
      </div>

      <div data-role="header" data-position="fixed" data-fullscreen="false" data-tap-toggle="false">
        @*<h1 class="ui-icon ui-icon-home-w ui-title-left">Header</h1>*@
        <h1 class="ui-img-app ui-title-left">メニュー</h1>
        <div class="ui-right-panel">
          <a href="#page2" class="ui-btn">ダイアログページ</a>
          <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-delete">ボタン2</a>
          <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-bars ui-toolbtn"></a>
        </div>
        <div class="ui-toolbar" id="page1_toolbar1">
          <div class="ui-left-panel">
            <div class="ui-toolbar-divider">
              <a href="#" class="ui-btn ui-btn-icon-left ui-icon-star">star</a>
              <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-star"></a>
              <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-alert"></a>
            </div>
          </div>
          <div class="ui-right-panel">
            <div class="ui-toolbar-divider">
              <a href="#" class="ui-btn ui-btn-icon-left ui-icon-share-square-w ui-btn-active">Active</a>
              <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-gear" cmd="mobile"></a>
            </div>
            <div class="ui-toolbar-divider">
              <a href="#" class="ui-btn">ボタン</a>
              <a href="#" class="ui-btn ui-btn-icon-left ui-icon-search">Search</a>
              <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-search"></a>
            </div>
            <div class="ui-toolbar-divider">
              <a href="#" class="ui-btn ui-btn-icon-left ui-icon-edit" cmd="table">Edit</a>
              <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-edit"></a>
            </div>
          </div>
        </div>
      </div>
      <div role="main" class="ui-content">
        <ul data-role="listview" data-inset="true" data-icon="false" class="menu" id="location_menu">
          <li data-role="list-divider">ロケーション</li>
          <li><a href="#" cmd="mobile">Mobile</a></li>
          <li><a href="#" cmd="table">Table</a></li>
        </ul>

        <ul data-role="listview" data-inset="true" data-icon="false" class="menu" id="subwindow_menu">
          <li data-role="list-divider">サブウィンドウ</li>
          <li><a href="#" cmd="subwin0">素</a></li>
          <li><a href="#" cmd="subwin1">ダイアログ</a></li>
          <li><a href="#" cmd="subwin2">リスト</a></li>
        <li><a href="#" cmd="subwin3">Input</a></li>
        </ul>
        <ul data-role="listview" data-inset="true" data-icon="false" class="menu" id="popup_menu">
          <li data-role="list-divider">ポップアップ</li>
          <li><a href="#" cmd="popup0">素</a></li>
          <li><a href="#" cmd="popup0.1">Popup</a></li>
          <li><a href="#" cmd="popup1">メニュー</a></li>
          <li><a href="#" cmd="popup2">素ダイアログ</a></li>
          <li><a href="#" cmd="popup2.1">ダイアログ</a></li>
          <li><a href="#" cmd="msgbox">メッセージボックス</a></li>
          <li><a href="#" cmd="msgballon">メッセージバルーン</a></li>
        </ul>
        <ul data-role="listview" data-inset="true" data-icon="false" class="menu" id="menu3">
          <li data-role="list-divider">トースト</li>
          <li><a href="#" cmd="bottom">下</a></li>
          <li><a href="#" cmd="top">上</a></li>
          <li><a href="#" cmd="bottom2">全幅下</a></li>
          <li><a href="#" cmd="top2">全幅上</a></li>
        </ul>
      </div>
      <div data-role="footer" data-position="fixed" data-fullscreen="false" data-tap-toggle="false">
        <div class="ui-toolbar">
          <div class="ui-left-panel">
            <a href="#" class="ui-btn">ボタン3</a>
          </div>
          <div class="ui-right-panel">
            <a href="#" class="ui-btn ui-btn-active">OK</a>
            <a href="#" class="ui-btn">キャンセル</a>
          </div>
        </div>
      </div>
    </div>

    <div data-role="page" id="page2" style="overflow:hidden;">
      <div data-role="popup" data-history="false" id="page2_popup1" data-arrow="false">
        <ul data-role="listview" data-icon="false">
          <li><a href="#">アイテム1</a></li>
          <li><a href="#">アイテム2</a></li>
          <li><a href="#">アイテム3</a></li>
          <li><a href="#">アイテム4</a></li>
          <li><a href="#">アイテム5</a></li>
          <li><a href="#">アイテム6</a></li>
          <li><a href="#">アイテム7</a></li>
          <li><a href="#">アイテム8</a></li>
          <li><a href="#">アイテム9</a></li>
          <li><a href="#">アイテム10</a></li>
        </ul>
      </div>

      <div data-role="header" data-position="fixed" data-fullscreen="false" data-tap-toggle="false">
        <h1>Dialog</h1>
        <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-video" cmd="btn1">ボタン1</a>
        <a href="#" class="ui-btn ui-btn-icon-notext ui-icon-camera" cmd="btn2">ボタン2</a>
      </div>

      <div role="main" class="ui-content ui-form">

        <form novalidate="novalidate" style="display:none;" id="dummy_form" title="Firefox form validate対応"></form>

        <ul data-role="listview" data-inset="true" data-icon="false" class="split" id="page2_list">
          <li>
            <div class="ui-field-contain em7">
              <label for="page2_text12">Text input:</label>
              <div>
                <input name="page2_text12" id="page2_text12" type="text" value="">
              </div>
            </div>
            <button class="ui-btn ui-btn-icon-notext ui-btn-split ui-icon-carat-d" cmd="list"></button>
            <label class="ui-error" id="page2_text12_error"></label>
          </li>
          <li>
            <div class="ui-field-contain em7">
              <label for="page2_text13">Text input clr:</label>
              <div>
                <input name="page2_text13" id="page2_text13" type="text" value="" data-clear-btn="true">
              </div>
            </div>
            <label class="ui-error" id="page2_text13_error"></label>
          </li>
          <li>
            <div class="ui-field-contain em7">
              <label for="page2_spin1">Spin input:</label>
              <div>
                <input name="page2_spin1" id="page2_spin1" type="number" value="" max="100" min="-100" step="2" form="dummy_form">
              </div>
            </div>
            <label class="ui-error" id="page2_spin1_error"></label>
          </li>
          <li>
            <div class="ui-field-contain em7">
              <label for="page2_spin2">Spin input clr:</label>
              <div>
                <input name="page2_spin2" id="page2_spin2" type="number" value="" max="100" min="0" step="0.5" data-clear-btn="true" form="dummy_form">
              </div>
            </div>
            <label class="ui-error" id="page2_spin2_error"></label>
          </li>
          <li>
            <div class="ui-field-contain em7">
              <label for="page2_search8">Search:</label>
              <div>
                <input name="page2_search8" id="page2_search8" type="search" value="">
              </div>
            </div>
          </li>
          <li>
            <div class="ui-field-contain em7">
              <label for="page2_textarea12">Textarea:</label>
              <div>
                <textarea name="page2_textarea12" id="page2_textarea12" rows="8" cols="40"></textarea>
              </div>
            </div>
            <button class="ui-btn ui-btn-icon-notext ui-btn-split ui-icon-delete" cmd="area_clear"></button>
            <label class="ui-error" id="page2_textarea12_error"></label>
          </li>
          <li>
            <div class="ui-field-contain em7">
              <label for="page2_flip1">Flip switch:</label>
              <div>
                <input name="page2_flip1" id="page2_flip1" type="checkbox" data-role="flipswitch">
              </div>
            </div>
            <label class="ui-error" id="page2_flip1_error"></label>
          </li>
          <li>
            <label for="page2_check1">CheckBox:</label>
            <input name="page2_check1" id="page2_check1" type="checkbox">
            <label class="ui-error" id="page2_check1_error"></label>
          </li>
          <li>
            <div class="ui-field-contain em7">
              <label for="page2_select1">Select:</label>
              <div>
                <button class="ui-btn ui-btn-icon-right ui-icon-carat-d ui-btn-select" id="page2_select1"></button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div data-role="footer" data-position="fixed" data-fullscreen="false" data-tap-toggle="false">
        <div class="ui-toolbar" id="page2_cmd">
          <div class="ui-left-panel">
            <a href="#" class="ui-btn" cmd="reset">リセット</a>
          </div>
          <div class="ui-right-panel">
            <a href="#" class="ui-btn ui-btn-active" cmd="apply">OK</a>
            <a href="#page1" class="ui-btn" cmd="cancel">キャンセル</a>
          </div>
        </div>
      </div>

    </div>
  </body>
</html>