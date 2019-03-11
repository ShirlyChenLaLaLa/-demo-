import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_app/widget/common_widget.dart';
import 'package:flutter_app/widget/route_animation.dart';
import 'package:scoped_model/scoped_model.dart';
import 'package:flutter_app/util/constant.dart';
import 'package:flutter_app/page/page0.dart';

int _curIndex = 0;
_MainPageState main;

class MainPage extends StatefulWidget {
  @override
  State<MainPage> createState() {
    main = _MainPageState();
    return _MainPageState();
  }
}

class _MainPageState extends State<MainPage> {
  @override
  Widget build(BuildContext context) {
    return ScopedModel<IndexModel>(
      model: IndexModel(),
      child: Scaffold(
        body: SafeArea(child: _body()),
        bottomNavigationBar: Container(
          height: 46.3,
          width: double.infinity,
          child: Column(
            children: <Widget>[
              MyDivider(),
              Container(
                height: 46,
                width: double.infinity,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    IconText(0),
                    IconText(1),
                    Expanded(
                        child: GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          AnimationPageRoute(
                            slideTween: Tween<Offset>(
                                begin: Offset(1.0, 0.0), end: Offset.zero),
                            builder: (c) {
                              // return Login();
                            }
                          )
                        );
                      },
                      child: Image.asset(
                        Constant.dirImage + 'publish_add.png',
                        height: 50.0,
                        width: 50.0,
                      ),
                    )),
                    IconText(2),
                    IconText(3),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget _body() {
    return ScopedModelDescendant<IndexModel>(
      builder: (ctx, child, model) {
        return IndexedStack(
          index: model._index,
          children: <Widget>[Page0(), Page0(), Page0(), Page0()],
        );
      },
    );
  }

  final MaterialColor cNormal = Colors.blue;
  final MaterialColor cSelect = Colors.red;

  Widget getIcon(int i, IconData data) {
    if (i == _curIndex) {
      return Icon(
        data,
        color: cSelect,
      );
    }
    return Icon(
      data,
      color: cNormal,
    );
  }
}

class IconText extends StatefulWidget {
  final int index;

  const IconText(this.index);

  @override
  State<IconText> createState() {
    return _IconTextState();
  }
}

class _IconTextState extends State<IconText> {
  var titles = ['首页', '关注', '通知', '我的'];
  var icons = [
    'ic_tab_strip_icon_feed.png',
    'ic_tab_strip_icon_follow.png',
    'ic_tab_strip_icon_category.png',
    'ic_tab_strip_icon_profile.png'
  ];
  var iconsSelcect = [
    'ic_tab_strip_icon_feed_selected.png',
    'ic_tab_strip_icon_follow_selected.png',
    'ic_tab_strip_icon_category_selected.png',
    'ic_tab_strip_icon_profile_selected.png'
  ];

  @override
  Widget build(BuildContext context) {
    return ScopedModelDescendant<IndexModel>(
      builder: (ctx, child, model) {
        return Expanded(
          child: GestureDetector(
            child: Container(
              width: double.infinity,
              child: Column(
                children: <Widget>[
                  // Icon(Icons.ac_unit),
                  Image.asset(
                    widget.index == model._index
                        ? Constant.dirImage + iconsSelcect[widget.index]
                        : Constant.dirImage + icons[widget.index],
                    height: 30.0,
                  ),
                  Text(
                    titles[widget.index],
                    style: TextStyle(fontSize: 9.0),
                  )
                ],
              ),
            ),
            onTap: () {
              model.changeIndex(widget.index);
            },
          ),
        );
      },
    );
  }
}

class IndexModel extends Model {
  int _index = 0;

  void changeIndex(int i) {
    _index = i;
    notifyListeners(); // Calls all the listeners.
    // If listeners are added or removed during this function, the modifications will not change which listeners are called during this iteration.
  }
}
