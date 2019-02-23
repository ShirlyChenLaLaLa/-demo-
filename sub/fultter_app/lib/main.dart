import 'package:flutter/material.dart'; // FUltter实现Material Design设计风格的基础包，里面有Text,Icon,Row...
// Material Design ： 谷歌风

void main() => runApp(MyApp()); // main() 函数是Dart程序的入口， runApp是Flutter框架的入口

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      theme: new ThemeData(
        brightness: Brightness.dark,
        primaryColor: Colors.lightBlue[800],
        accentColor: Colors.cyan[600],
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('Welcome to Flutter'),
        ),
        body: Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}