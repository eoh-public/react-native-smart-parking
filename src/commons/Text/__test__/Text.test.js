import React from 'react';
import { act, create } from 'react-test-renderer';
import { Text as NativeText } from 'react-native';
import Text from '../';
import { Colors } from '../../../configs';

describe('Test Text', () => {
  let tree;
  let textStyle;
  let textStyle1;
  let textStyle2;
  let styles;
  let styles1;
  let styles2;
  let addedStyle;
  beforeEach(() => {
    textStyle = {
      fontFamily: 'SFProDisplay-Regular',
      color: '#000',
      fontSize: undefined,
      lineHeight: undefined,
      textAlign: 'left',
      textDecorationLine: 'none',
    };
    textStyle1 = {
      fontFamily: 'SFProDisplay-Regular',
      color: '#000',
      fontSize: undefined,
      lineHeight: undefined,
      textAlign: 'center',
      textDecorationLine: 'none',
    };
    textStyle2 = {
      fontFamily: 'SFProDisplay-Regular',
      color: '#000',
      fontSize: undefined,
      lineHeight: undefined,
      textAlign: 'right',
      textDecorationLine: 'none',
    };
    addedStyle = {};
    styles = [textStyle, addedStyle];
    styles1 = [textStyle1, {}];
    styles2 = [textStyle2, {}];
  });

  test('render Text upper', async () => {
    await act(async () => {
      tree = await create(<Text uppercase>MESSAGE</Text>);
    });
    const instance = tree.root;
    const text = instance.findAllByType(NativeText);
    expect(text).toHaveLength(1);
    expect(text[0].props.children).toEqual('MESSAGE');
  });

  test('render Text lower', async () => {
    await act(async () => {
      tree = await create(<Text lowercase>MESSAGE</Text>);
    });
    const instance = tree.root;
    const text = instance.findAllByType(NativeText);
    expect(text).toHaveLength(1);
    expect(text[0].props.children).toEqual('message');
  });

  test('render Text ucfirst', async () => {
    await act(async () => {
      tree = await create(<Text ucfirst>message</Text>);
    });
    const instance = tree.root;
    const text = instance.findByType(NativeText);
    expect(text.props.children).toEqual('Message');
  });

  test('render Text regular', async () => {
    await act(async () => {
      tree = await create(<Text regular>message</Text>);
    });
    const instance = tree.root;
    const text = instance.findByType(NativeText);
    textStyle.fontFamily = 'SFProDisplay-Regular';
    expect(text.props.style).toEqual(styles);
  });

  test('render Text black', async () => {
    await act(async () => {
      tree = await create(<Text black>message</Text>);
    });
    const instance = tree.root;
    const text = instance.findByType(NativeText);
    textStyle.fontFamily = 'SFProDisplay-Black';
    expect(text.props.style).toEqual(styles);
  });

  test('render Text heavy', async () => {
    await act(async () => {
      tree = await create(<Text heavy>message</Text>);
    });
    const instance = tree.root;
    const text = instance.findByType(NativeText);
    textStyle.fontFamily = 'SFProDisplay-Heavy';
    expect(text.props.style).toEqual(styles);
  });

  test('render Text light', async () => {
    await act(async () => {
      tree = await create(<Text light>message</Text>);
    });
    const instance = tree.root;
    const text = instance.findByType(NativeText);
    textStyle.fontFamily = 'SFProDisplay-Light';
    expect(text.props.style).toEqual(styles);
  });

  test('render Text medium', async () => {
    await act(async () => {
      tree = await create(<Text medium>message</Text>);
    });
    const instance = tree.root;
    const text = instance.findByType(NativeText);
    textStyle.fontFamily = 'SFProDisplay-Medium';
    expect(text.props.style).toEqual(styles);
  });

  test('render Text thin', async () => {
    await act(async () => {
      tree = await create(<Text thin>message</Text>);
    });
    const instance = tree.root;
    const text = instance.findByType(NativeText);
    textStyle.fontFamily = 'SFProDisplay-Thin';
    expect(text.props.style).toEqual(styles);
  });

  test('render Text ultralight', async () => {
    await act(async () => {
      tree = await create(<Text ultralight>message</Text>);
    });
    const instance = tree.root;
    const text = instance.findByType(NativeText);
    textStyle.fontFamily = 'SFProDisplay-Ultralight';
    expect(text.props.style).toEqual(styles);
  });

  test('render Text left', async () => {
    await act(async () => {
      tree = await create(<Text left>message</Text>);
    });
    const instance = tree.root;
    const text = instance.findByType(NativeText);
    textStyle.textAlign = 'left';
    expect(text.props.style).toEqual(styles);
  });
  test('render Text center', async () => {
    await act(async () => {
      tree = await create(<Text center>message</Text>);
    });
    const instance = tree.root;
    const text = instance.findByType(NativeText);
    textStyle1.textAlign = 'center';
    expect(text.props.style).toEqual(styles1);
  });
  test('render Text right', async () => {
    await act(async () => {
      tree = await create(<Text right>message</Text>);
    });
    const instance = tree.root;
    const text = instance.findByType(NativeText);
    textStyle2.textAlign = 'right';
    expect(text.props.style).toEqual(styles2);
  });
  test('render Text color empty string', async () => {
    await act(async () => {
      tree = await create(<Text color="">message</Text>);
    });
    const instance = tree.root;
    const text = instance.findByType(NativeText);
    textStyle.color = null;
    expect(text.props.style).toEqual(styles);
  });

  test('render Text underline', async () => {
    await act(async () => {
      tree = await create(<Text underline>message</Text>);
    });
    const instance = tree.root;
    const text = instance.findByType(NativeText);
    textStyle.textDecorationLine = 'underline';
    expect(text.props.style).toEqual(styles);
  });

  test('render Text lineThrough', async () => {
    await act(async () => {
      tree = await create(<Text lineThrough>message</Text>);
    });
    const instance = tree.root;
    const text = instance.findByType(NativeText);
    textStyle.textDecorationLine = 'line-through';
    expect(text.props.style).toEqual(styles);
  });

  test('render Text underlineLineThrough lineThrough', async () => {
    await act(async () => {
      tree = await create(
        <Text underlineLineThrough lineThrough>
          message
        </Text>
      );
    });
    const instance = tree.root;
    const text = instance.findByType(NativeText);
    textStyle.textDecorationLine = 'underline line-through';
    expect(text.props.style).toEqual(styles);
  });

  test('render Text style.fontWeight normal', async () => {
    const styleText = { fontWeight: 'normal' };
    await act(async () => {
      tree = await create(<Text style={styleText}>message</Text>);
    });
    const instance = tree.root;
    const text = instance.findByType(NativeText);
    addedStyle.fontWeight = null;
    expect(text.props.style).toEqual(styles);
  });

  test('render Text not hilight', async () => {
    await act(async () => {
      tree = await create(<Text hilight>message</Text>);
    });
    const instance = tree.root;
    textStyle.color = Colors.Primary;
    const text = instance.findByType(NativeText);
    expect(text.props.style).toEqual(styles);
  });
});
