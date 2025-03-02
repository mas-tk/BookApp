export type RootStackParamList = {
  Home: undefined;
  BookOverview: { bookId: string };
  // Book 画面では、bookId は必須で、title や isTTS は任意とする
  Book: { bookId: string; title?: string; isTTS?: boolean };
};
