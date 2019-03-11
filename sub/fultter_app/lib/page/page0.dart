import 'package:flutter/material.dart';
import 'package:flutter_app/widget/route_animation.dart';
import 'package:flutter_app/page/page0/sk8.dart';
import 'package:flutter_app/util/constant.dart';
import 'package:dio/dio.dart';

class Page0 extends StatefulWidget {
  @override
  State<Page0> createState() {
    return _Page0State();
  }
}

class _Page0State extends State<Page0> with SingleTickerProviderStateMixin {
  List<Tab> tabs = [];
  List<int> ids = [];

  TabController _tabController;

  @override
  void initState() {
    super.initState();
    // Dio()
    //     .get('http://www.wanandroid.com/tools/mockapi/8977/kanyan_tag')
    //     .then((res) {
    //   tabs = Constant.tabsName.map((it) {
    //     return Tab(
    //       text: it,
    //     );
    //   }).toList();

    //   res.data.forEach((it) {
    //     tabs.add(Tab(
    //       text: it['name'],
    //     ));
    //     ids.add(it['id']);
    //   });

    //   _tabController = new TabController(vsync: this, length: tabs.length);
    //   setState(() {});
    //   _tabController.animateTo(1);
    // });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        child: Column(
          children: <Widget>[
            buildTopBar(),
            Expanded(
              child: TabBarView(
              controller: _tabController,
              children: buildTabPage(),
            ))
          ],
        ));
  }

  Widget buildTopBar() {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(horizontal: 8.0),
      height: 36.0,
      child: Row(
        children: <Widget>[
          GestureDetector(
            onTap: () {
              Navigator.push(
                  context,
                  AnimationPageRoute(
                    slideTween:
                        Tween(begin: Offset(0.0, 0.0), end: Offset.zero),
                    builder: (c) {
                      return new Container(
                        width: 10,
                      );
                    },
                  ));
            },
            child: Icon(
              Icons.menu,
              size: 23.0,
            ),
          ),
          SizedBox(
            width: 10.0,
          ),
          Expanded(
            child: TabBar(
              tabs: tabs,
              isScrollable: true,
              indicatorColor: Colors.black,
              indicatorSize: TabBarIndicatorSize.label,
              labelColor: Colors.black,
              unselectedLabelColor: Colors.grey[400],
              controller: _tabController,
            ),
          ),
          SizedBox(
            width: 10.0,
          ),
          GestureDetector(
            child: Icon(Icons.search),
            onTap: () {
              Navigator.push(
                  context,
                  AnimationPageRoute(
                    slideTween:
                        Tween(begin: Offset(0.0, -1.0), end: Offset.zero),
                    builder: (c) {
                      return new Container(
                        width: 20,
                      );
                      // return Test1();
                    },
                  ));
            },
          ),
        ],
      ),
    );
  }

  List<Widget> buildTabPage() {
    List<Widget> list = [];

    list.insert(0, Sk8());
    list.insert(1, Sk8());

    return list;
  }
}
