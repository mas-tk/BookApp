// ページめくり時の挙動 - 音声なしバージョン
const handlePageFlip = () => {
  // 音声機能は現在無効化中
  console.log('ページめくり');
};// src/screens/BookScreen.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
View,
Text,
StyleSheet,
Dimensions,
Image,
Animated,
FlatList,
TouchableOpacity,
Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
TapGestureHandler,
PanGestureHandler,
State,
GestureHandlerRootView,
PanGestureHandlerGestureEvent,  // 型定義を追加
} from 'react-native-gesture-handler';
// Audio APIのインポートを削除

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

// 絵本データ (JSON)
import bookData from '../data/book1.json';

// デバイス幅・高さ
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 画面用の型定義
type BookScreenProps = NativeStackScreenProps<RootStackParamList, 'Book'>;

// 画像ファイルのマッピング（新しいファイル構造に対応）
const imageMapping: Record<string, any> = {
// イラスト画像
"001-1.png": require('../../src/assets/books/book1/001-1.png'),
"002-1.png": require('../../src/assets/books/book1/002-1.png'),
"003-1.png": require('../../src/assets/books/book1/003-1.png'),
"004-1.png": require('../../src/assets/books/book1/004-1.png'),
"005-1.png": require('../../src/assets/books/book1/005-1.png'),
"006-1.png": require('../../src/assets/books/book1/006-1.png'),
"007-1.png": require('../../src/assets/books/book1/007-1.png'),
"008-1.png": require('../../src/assets/books/book1/008-1.png'),
"009-1.png": require('../../src/assets/books/book1/009-1.png'),
"010-1.png": require('../../src/assets/books/book1/010-1.png'),
"011-1.png": require('../../src/assets/books/book1/011-1.png'),
"012-1.png": require('../../src/assets/books/book1/012-1.png'),
"013-1.png": require('../../src/assets/books/book1/013-1.png'),
"014-1.png": require('../../src/assets/books/book1/014-1.png'),
"015-1.png": require('../../src/assets/books/book1/015-1.png'),
"016-1.png": require('../../src/assets/books/book1/016-1.png'),
"017-1.png": require('../../src/assets/books/book1/017-1.png'),
"018-1.png": require('../../src/assets/books/book1/018-1.png'),
"019-1.png": require('../../src/assets/books/book1/019-1.png'),
"020-1.png": require('../../src/assets/books/book1/020-1.png'),

// 文字レイヤー
"001-2.png": require('../../src/assets/books/book1/001-2.png'),
"002-2.png": require('../../src/assets/books/book1/002-2.png'),
"003-2.png": require('../../src/assets/books/book1/003-2.png'),
"004-2.png": require('../../src/assets/books/book1/004-2.png'),
"005-2.png": require('../../src/assets/books/book1/005-2.png'),
"006-2.png": require('../../src/assets/books/book1/006-2.png'),
"007-2.png": require('../../src/assets/books/book1/007-2.png'),
"008-2.png": require('../../src/assets/books/book1/008-2.png'),
"009-2.png": require('../../src/assets/books/book1/009-2.png'),
"010-2.png": require('../../src/assets/books/book1/010-2.png'),
"011-2.png": require('../../src/assets/books/book1/011-2.png'),
"012-2.png": require('../../src/assets/books/book1/012-2.png'),
"013-2.png": require('../../src/assets/books/book1/013-2.png'),
"014-2.png": require('../../src/assets/books/book1/014-2.png'),
"015-2.png": require('../../src/assets/books/book1/015-2.png'),
"016-2.png": require('../../src/assets/books/book1/016-2.png'),
"017-2.png": require('../../src/assets/books/book1/017-2.png'),
"018-2.png": require('../../src/assets/books/book1/018-2.png'),
"019-2.png": require('../../src/assets/books/book1/019-2.png'),
"020-2.png": require('../../src/assets/books/book1/020-2.png'),
};

export default function BookScreen({ route, navigation }: BookScreenProps) {
// ■■■ タブバーを非表示 ■■■
useEffect(() => {
  // BookScreen 表示中はタブバーを消す
  navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
  return () => {
    // 戻るときにタブバーを元に戻す
    navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  };
}, [navigation]);

// ■■■ メニューの表示状態 ■■■
const [showMenu, setShowMenu] = useState(false);

// ■■■ 各ページのテキスト表示状態 ■■■
const [textVisibility, setTextVisibility] = useState<Record<string, boolean>>({});

// ■■■ 音声機能の状態 - 開発中は無効化 ■■■
const [soundEnabled] = useState(false); // 常にfalseに設定

// ■■■ ルートパラメータから情報取得 ■■■
const { bookId, title, isTTS } = route.params;
// JSON内にタイトルがあればそれを優先、なければパラメータのtitleを使う
const displayTitle = title || bookData.title;
const pages = bookData.pages;

// ■■■ 横スクロールのアニメーション管理 ■■■
const scrollX = useRef(new Animated.Value(0)).current;

// ページタップ時のテキスト表示/非表示切り替え
const toggleTextLayer = (pageId: string) => {
  setTextVisibility(prev => ({
    ...prev,
    [pageId]: !prev[pageId]
  }));
};

// ■■■ 1ページ分の描画 ■■■
const renderPage = ({ item, index }: { item: typeof pages[number]; index: number }) => {
  // スクロール位置に応じて Y軸回転を補間
  const inputRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];
  const rotateY = scrollX.interpolate({
    inputRange,
    outputRange: ['45deg', '0deg', '-45deg'],
    extrapolate: 'clamp',
  });

  // ファイル名の変換（001.png → 001-1.png）
  const baseImageName = item.image.replace('.png', '-1.png');
  const textImageName = item.image.replace('.png', '-2.png');
  
  const baseImageSource = imageMapping[baseImageName];
  const textImageSource = imageMapping[textImageName];
  
  // このページのテキスト表示状態を取得
  const isTextVisible = textVisibility[item.pageId] || false;

  return (
    <Animated.View
      style={[
        styles.pageContainer,
        {
          width: SCREEN_WIDTH,
          transform: [{ perspective: 1000 }, { rotateY }],
        },
      ]}
    >
      {/* イラスト画像（ベース）*/}
      <Image source={baseImageSource} style={styles.pageImage} />
      
      {/* テキストレイヤー（タップで表示/非表示）*/}
      {isTextVisible && (
        <Image 
          source={textImageSource} 
          style={styles.textLayerImage} 
        />
      )}
      
      {/* ページ全体をタップ可能にする透明なボタン */}
      <TouchableOpacity
        style={styles.touchableArea}
        onPress={() => toggleTextLayer(item.pageId)}
        activeOpacity={1} // タップ時の透過効果を無効化
      />
    </Animated.View>
  );
};

// ■■■ 画面タップ時のメニュー表示を削除 ■■■
// 代わりにスワイプでメニュー表示を実装

// スワイプジェスチャーのハンドリング
const onSwipeUp = (event: PanGestureHandlerGestureEvent) => {
  // スワイプが上向きで一定の距離を超えた場合にメニューを表示
  if (event.nativeEvent.state === State.END) {
    // 上向きのスワイプ（Y軸の値が負）で、ある程度の距離があるとき
    if (event.nativeEvent.translationY < -50) {
      setShowMenu(true);
    } 
    // 下向きのスワイプ（Y軸の値が正）で、ある程度の距離があるとき
    else if (event.nativeEvent.translationY > 50) {
      setShowMenu(false);
    }
  }
};

return (
  <GestureHandlerRootView style={{ flex: 1 }}>
    {/* 全体コンテナ */}
    <View style={styles.container}>
      {/* 上部メニュー（showMenuがtrueのときのみ表示） */}
      {showMenu && (
        <View style={styles.topOverlay} pointerEvents="box-only">
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('BookOverview', { bookId })}
          >
            <Text style={styles.backButtonText}>戻る</Text>
          </TouchableOpacity>
          <Text style={styles.infoText}>
            {displayTitle} {isTTS ? ' [読み聞かせモード]' : ''}
          </Text>
          <Text style={styles.infoTextSmall}>絵本ID: {bookId}</Text>
        </View>
      )}

      {/* PanGestureHandlerでスワイプを検出し、
          その中にFlatListを配置して水平スクロールも可能にする */}
      <PanGestureHandler
        onHandlerStateChange={onSwipeUp}
        minDist={20} // 最小スワイプ距離
      >
        <Animated.FlatList
          data={pages}
          renderItem={renderPage}
          keyExtractor={(item) => item.pageId}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          // 横スクロール位置を Animated.Value scrollX に反映
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          // スクロールが完全に止まったタイミングでハンドラを呼び出す
          onMomentumScrollEnd={handlePageFlip}
          style={{ flex: 1 }}
        />
      </PanGestureHandler>

      {/* 下部メニュー */}
      {showMenu && (
        <View style={styles.bottomMenu}>
          <Text style={styles.menuText}>メニュー項目1</Text>
          <Text style={styles.menuText}>メニュー項目2</Text>
          <Text style={styles.menuText}>メニュー項目3</Text>
        </View>
      )}
    </View>
  </GestureHandlerRootView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // 黒帯用の背景色
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    zIndex: 999,
  },
  backButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  infoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoTextSmall: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    alignItems: 'center',
    zIndex: 1000,
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 4,
  },
  pageContainer: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#000', // 黒帯用のコンテナ背景色
  },
  pageImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // アスペクト比を維持しつつ、画面内に収める
  },
  textLayerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // アスペクト比を維持しつつ、画面内に収める
  },
  touchableArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent', // 透明
  },
});