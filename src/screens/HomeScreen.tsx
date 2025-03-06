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
  StatusBar,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

// Home 画面の props 型定義
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
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
          width: FIRST_ROW_BOOK_WIDTH * 0.9, // 少し小さくする
          height: FIRST_ROW_BOOK_WIDTH * 1.3, // 高さも少し調整
        }]} 
        resizeMode="cover"
      />
      <Text style={styles.bookTitle} numberOfLines={1}>
        {book.title.length > 10 ? book.title.substring(0, 10) + '...' : book.title}
      </Text>
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
          width: OTHER_ROW_BOOK_WIDTH * 0.9, // 少し小さくする
          height: OTHER_ROW_BOOK_WIDTH * 1.3, // 高さも少し調整
        }]} 
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const renderSectionTag = (title: string, isFirst: boolean = false) => (
    <View style={[styles.sectionTag, isFirst ? { backgroundColor: '#FCEB77' } : {}]}>
      <Text style={styles.sectionTagText}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2A4000" barStyle="light-content" />
      
      {/* 背景色を緑色に設定 */}
      <View style={styles.backgroundColorFill} />
      
      {/* ヘッダー部分 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>絵本一覧</Text>
      </View>

      {/* メインコンテンツエリア */}
      <View style={styles.mainContent}>
        {/* 本棚の背景画像 - zIndexを低く設定して背面に配置 */}
        <Image
          source={require('../assets/shelf_background.png')}
          style={styles.shelfBackground}
          resizeMode="stretch"
        />
        
        {/* 左上のランプ */}
        <Image 
          source={require('../assets/lamp_left.png')} 
          style={styles.lampLeft}
          resizeMode="contain"
        />
        
        {/* 右上のランプ */}
        <Image 
          source={require('../assets/lamp_right.png')} 
          style={styles.lampRight}
          resizeMode="contain"
        />
          
        <View style={styles.contentContainer}>
          <View style={styles.sectionsWrapper}>
            {/* 最初の行 - 注目の作品 */}
            <View style={styles.section}>
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
            </View>
            
            {/* 残りの行 */}
            {categories.slice(1).map((category, index) => (
              <View key={category.id} style={styles.section}>
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
          </View>
        </View>

        {/* ラジオとティーカップをオーバーレイとして配置 */}
        <Image 
          source={require('../assets/radio.png')} 
          style={styles.radioImage}
          resizeMode="contain"
        />
        <Image 
          source={require('../assets/teacup.png')} 
          style={styles.teacupImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // 背景を透明に
  },
  backgroundColorFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#2A4000', // 緑色の背景色
  },
  header: {
    backgroundColor: '#FFF',
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    position: 'relative',
  },
  shelfBackground: {
    position: 'absolute',
    width: '120%',  // 横幅を120%に設定して左右がはみ出すようにする
    height: '100%', // 画面の高さいっぱいに表示
    alignSelf: 'center', // 中央に配置
    zIndex: 1,      // 背面に配置するために低いzIndexを設定
  },
  lampLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    zIndex: 10,
  },
  lampRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    height: '100%',
    zIndex: 5,     // 背景よりも前面に表示
  },
  sectionsWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 45, // 上部のランプの下に本を配置するためのパディング
    paddingBottom: 10, // 下部の余白
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 0,
    maxHeight: '33%', // 各セクションの最大高さを制限
  },
  sectionHeader: {
    marginBottom: 6,
    paddingHorizontal: 15,
    paddingVertical: 4,
    backgroundColor: 'rgba(88, 44, 19, 0.7)',
    borderRadius: 20,
    alignSelf: 'center',
    minWidth: 120,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  horizontalScrollView: {
    paddingRight: 16,
    justifyContent: 'center',
    paddingLeft: 8, // 左側のパディングを追加
  },
  shelfContainer: {
    position: 'relative',
    marginBottom: 0,
    alignItems: 'center',
    height: '65%', // 高さを少し小さく調整
  },
  shelfBoard: {
    position: 'absolute',
    bottom: -14,
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: 'rgba(139, 69, 19, 0.8)',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(101, 67, 33, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    zIndex: -1,
  },
  bookContainer: {
    marginRight: SPACING,
    marginBottom: 10,
    alignItems: 'center',
  },
  cover: {
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 4,
  },
  bookTitle: {
    marginTop: 5,
    fontSize: 11,
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingHorizontal: 10,
    width: '100%',
  },
  sectionTag: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  sectionTagText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  radioImage: {
    position: 'absolute',
    width: 70,
    height: 60,
    left: 10,
    bottom: 10,
    zIndex: 10,
  },
  teacupImage: {
    position: 'absolute',
    width: 60,
    height: 50,
    right: 10,
    bottom: 10,
    zIndex: 10,
  },
});