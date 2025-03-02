import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

// Home 画面の props 型定義
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SPACING = 10;
const FIRST_ROW_BOOKS = 3;
const OTHER_ROWS_BOOKS = 5;

// 1行目の本の幅（画面幅から左右のパディングと間隔を引いて3等分）
const FIRST_ROW_BOOK_WIDTH = (SCREEN_WIDTH - 32 - SPACING * (FIRST_ROW_BOOKS - 1)) / FIRST_ROW_BOOKS;

// 2行目以降の本の幅（画面幅から左右のパディングと間隔を引いて5等分）
const OTHER_ROW_BOOK_WIDTH = (SCREEN_WIDTH - 32 - SPACING * (OTHER_ROWS_BOOKS - 1)) / OTHER_ROWS_BOOKS;

type Book = {
  id: string;
  title: string;
  cover: any;
};

// カテゴリごとの本データ
const categories = [
  {
    id: 'featured',
    title: '注目の作品',
    books: [
      {
        id: '1',
        title: '～大人のための"もしも"童話再解釈～ ヘンゼルとグレーテル',
        cover: require('../assets/bookcovers/cover1.png'),
      },
      {
        id: '2',
        title: '夜の図書館',
        cover: require('../assets/bookcovers/cover2.png'),
      },
      {
        id: '3',
        title: '仕事を辞めた魔女',
        cover: require('../assets/bookcovers/cover3.png'),
      },
      {
        id: '4',
        title: '仕事を辞めた魔女',
        cover: require('../assets/bookcovers/cover3.png'),
      },
      {
        id: '5',
        title: '～大人のための"もしも"童話再解釈～ ヘンゼルとグレーテル',
        cover: require('../assets/bookcovers/cover1.png'),
      },
    ]
  },
  {
    id: 'new',
    title: '新着作品',
    books: [
      {
        id: '6',
        title: '夜の図書館',
        cover: require('../assets/bookcovers/cover2.png'),
      },
      {
        id: '7',
        title: '仕事を辞めた魔女',
        cover: require('../assets/bookcovers/cover3.png'),
      },
      {
        id: '8',
        title: '～大人のための"もしも"童話再解釈～ ヘンゼルとグレーテル',
        cover: require('../assets/bookcovers/cover1.png'),
      },
      {
        id: '9',
        title: '夜の図書館',
        cover: require('../assets/bookcovers/cover2.png'),
      },
      {
        id: '3-2',
        title: '仕事を辞めた魔女',
        cover: require('../assets/bookcovers/cover3.png'),
      },
      {
        id: '1-2',
        title: '～大人のための"もしも"童話再解釈～ ヘンゼルとグレーテル',
        cover: require('../assets/bookcovers/cover1.png'),
      },
      {
        id: '2-2',
        title: '夜の図書館',
        cover: require('../assets/bookcovers/cover2.png'),
      },
    ]
  },
  {
    id: 'popular',
    title: '人気作品',
    books: [
      {
        id: '3-3',
        title: '仕事を辞めた魔女',
        cover: require('../assets/bookcovers/cover3.png'),
      },
      {
        id: '1-3',
        title: '～大人のための"もしも"童話再解釈～ ヘンゼルとグレーテル',
        cover: require('../assets/bookcovers/cover1.png'),
      },
      {
        id: '2-3',
        title: '夜の図書館',
        cover: require('../assets/bookcovers/cover2.png'),
      },
      {
        id: '3-4',
        title: '仕事を辞めた魔女',
        cover: require('../assets/bookcovers/cover3.png'),
      },
      {
        id: '1-4',
        title: '～大人のための"もしも"童話再解釈～ ヘンゼルとグレーテル',
        cover: require('../assets/bookcovers/cover1.png'),
      },
      {
        id: '2-4',
        title: '夜の図書館',
        cover: require('../assets/bookcovers/cover2.png'),
      },
    ]
  }
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  // 本のレンダリング関数（1行目用）
  const renderFirstRowBook = (book: Book) => (
    <TouchableOpacity
      key={book.id}
      style={[styles.bookContainer, { width: FIRST_ROW_BOOK_WIDTH }]}
      onPress={() => navigation.navigate('BookOverview', { bookId: book.id })}
    >
      <Image 
        source={book.cover} 
        style={[styles.cover, { 
          width: FIRST_ROW_BOOK_WIDTH, 
          height: FIRST_ROW_BOOK_WIDTH * 1.4,
          // 本が棚板に接しているようにする（transformを削除）
        }]} 
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  // 本のレンダリング関数（2行目以降用）
  const renderOtherRowBook = (book: Book) => (
    <TouchableOpacity
      key={book.id}
      style={[styles.bookContainer, { width: OTHER_ROW_BOOK_WIDTH }]}
      onPress={() => navigation.navigate('BookOverview', { bookId: book.id })}
    >
      <Image 
        source={book.cover} 
        style={[styles.cover, { 
          width: OTHER_ROW_BOOK_WIDTH, 
          height: OTHER_ROW_BOOK_WIDTH * 1.4,
          // 本が棚板に接しているようにする（transformを削除）
        }]} 
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/shelf_background.png')}
        style={styles.background}
        resizeMode="repeat"
      >
        <ScrollView 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* 最初の行 - 1画面に3冊表示 */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{categories[0].title}</Text>
          </View>
          <View style={styles.shelfContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollView}
            >
              {categories[0].books.map(book => renderFirstRowBook(book))}
            </ScrollView>
            {/* 棚板 */}
            <View style={styles.shelfBoard} />
          </View>
          
          {/* 残りの行 - 1画面に5冊表示 */}
          {categories.slice(1).map(category => (
            <View key={category.id}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{category.title}</Text>
              </View>
              <View style={styles.shelfContainer}>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalScrollView}
                >
                  {category.books.map(book => renderOtherRowBook(book))}
                </ScrollView>
                {/* 棚板 */}
                <View style={styles.shelfBoard} />
              </View>
            </View>
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    padding: 16,
    paddingTop: 16,
  },
  sectionHeader: {
    marginBottom: 12,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  horizontalScrollView: {
    paddingRight: 16,
  },
  shelfContainer: {
    position: 'relative',
    marginBottom: 30, // 棚間の距離を調整
  },
  shelfBoard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 14, // 棚板を少し厚く
    backgroundColor: 'rgba(139, 69, 19, 0.8)',  // 茶色の棚板
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(101, 67, 33, 0.9)', // より暗い茶色の縁取り
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 4,
    zIndex: -1,  // 本の後ろに表示
  },
  bookContainer: {
    marginRight: SPACING,
    marginBottom: 10, // 本と棚板の間の隙間をなくす
    alignItems: 'center',
  },
  cover: {
    borderRadius: 2, // 角を少し柔らかく
    // 本棚らしさを出すためにシャドウを追加
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});