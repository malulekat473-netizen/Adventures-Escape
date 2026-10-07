import { Image, StyleSheet, Text, View } from 'react-native';
import { Page } from '../components/AppUI';
import { galleryImages } from '../src/courses';
import { colors } from '../src/theme';

export default function GalleryScreen() {
  return <Page title="A little fresh air." eyebrow="FIELD NOTES / GALLERY">
    <Text style={styles.intro}>A glimpse of the places and moments waiting out there.</Text>
    <View style={styles.grid}>{galleryImages.map((item, index) => <View key={item.title} style={[styles.tile, index === 0 && styles.wide]}>
      <Image source={item.image} accessibilityLabel={item.title} style={[styles.image, index === 0 && styles.imageWide]} />
      <Text style={styles.caption}>{item.title}</Text>
    </View>)}</View>
  </Page>;
}

const styles = StyleSheet.create({ intro: { color: colors.muted, fontSize: 14, lineHeight: 22, marginBottom: 12 }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 }, tile: { width: '48%', marginBottom: 8 }, wide: { width: '100%' }, image: { width: '100%', height: 135, borderRadius: 4, backgroundColor: colors.stone }, imageWide: { height: 230 }, caption: { color: colors.espresso, fontSize: 12, fontWeight: '800', marginTop: 7 } });