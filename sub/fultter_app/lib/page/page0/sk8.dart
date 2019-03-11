import 'package:flutter/material.dart';

class Sk8 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Container(
      width: 100,
      height: 100,
      color: Colors.black,
      child: new Transform(
        alignment: Alignment.topRight, //相对于坐标系原点的对齐方式
        transform: new Matrix4.skewY(0.3), //沿Y轴倾斜0.3弧度
        child: new Container(
          padding: const EdgeInsets.all(8.0),
          color: Colors.deepOrange,
          child: const Text('Apartment for rent!'),
        ),
      ),
    );
  }
}
