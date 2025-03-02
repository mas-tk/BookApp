// src/screens/BookOverviewScreen.tsx

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// ① 追加で import
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

// 例: 本の詳細データをまとめた配列
// ここでは仮に summary などの追加情報を入れています。
// 実際には外部ファイルやサーバーから取得してもOK
const bookDetails = [
  {
    id: '1',
    title: '～大人のための"もしも"童話再解釈～ ヘンゼルとグレーテル',
    cover: require('../assets/bookcovers/cover1.png'),
    summary: 'ヘンゼルとグレーテルの物語を大人向けに再解釈した作品...',
    views: 118123,
    likes: 300,
    comments: 12,
  },
  {
    id: '2',
    title: '夜の図書館',
    cover: require('../assets/bookcovers/cover2.png'),
    summary: '真夜中に訪れる不思議な図書館の世界を描いた幻想的な物語...',
    views: 58100,
    likes: 250,
    comments: 5,
  },
  // ... 他の本データ
];

/*
  ② BookOverview 用の型定義
     - RouteProp: ルートパラメータ(bookId)を取得するため
     - NativeStackNavigationProp: navigate() の型推論を正しく行うため
*/
type BookOverviewRouteProp = RouteProp<RootStackParamList, 'BookOverview'>;
type BookOverviewNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BookOverview'>;

export default function BookOverviewScreen() {
  // ③ useRoute / useNavigation に型を付ける
  const route = useRoute<BookOverviewRouteProp>();
  const navigation = useNavigation<BookOverviewNavigationProp>();

  // ④ route.params から bookId を取得
  const { bookId } = route.params;

  // 本の詳細データを検索
  const book = bookDetails.find((b) => b.id === bookId);
  if (!book) {
    return (
      <View style={styles.container}>
        <Text>本のデータが見つかりません</Text>
      </View>
    );
  }

  // 画面UI
  return (
    <View style={styles.container}>
      {/* 本の表紙 */}
      <Image source={book.cover} style={styles.cover} />

      {/* タイトル */}
      <Text style={styles.title}>{book.title}</Text>

      {/* ビュー数、いいね、コメント */}
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>ビュー数: {book.views}</Text>
        <Text style={styles.infoText}>いいね: {book.likes}</Text>
        <Text style={styles.infoText}>コメント: {book.comments}</Text>
      </View>

      {/* 概要テキスト */}
      <Text style={styles.summary}>{book.summary}</Text>

      {/* ボタン群 */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // 「よむ」ボタン → Book画面へ (isTTS は渡さない)
            navigation.navigate('Book', { bookId: book.id });
          }}
        >
          <Text style={styles.buttonText}>よむ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => {
            // 「よみきかせ」ボタン → Book画面へ (isTTS = true)
            navigation.navigate('Book', { bookId: book.id, isTTS: true });
          }}
        >
          <Text style={styles.buttonText}>よみきかせ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    cover: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      borderRadius: 8,
      marginBottom: 12,
    },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    infoText: { fontSize: 14, color: '#666' },
    summary: { fontSize: 14, lineHeight: 20, marginVertical: 12 },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 16 },
    button: {
      backgroundColor: '#007AFF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 6,
    },
    buttonSecondary: { backgroundColor: '#FF9500' },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});