import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import { Button, Page, Photo, SectionLabel } from '../../components/AppUI';
import { COURSES } from '../../src/courses';
import { colors, money } from '../../src/theme';
import { useBooking } from '../../src/booking';

export default function HomeScreen() {
  const { selected } = useBooking();
  const { width } = useWindowDimensions();
  const wideLayout = width >= 760;
  return (
    <Page title="Make room for outside." eyebrow="SME ADVENTURES / SOUTH AFRICA">
      <Photo uri={require('../../assets/images/ultimate-adventure-image.jpg')} height={wideLayout ? 440 : 390}>
        <View style={styles.heroShade} />
        <View style={styles.heroContent}>
          <Text style={styles.heroKicker}>NEXT STORY STARTS HERE</Text>
          <Text accessibilityRole="header" style={wideLayout ? styles.heroTitleWide : styles.heroTitle}>Find your wild.</Text>
        </View>
      </Photo>
      <Text style={styles.intro}>Big views, good people, and the kind of day you talk about long after you get home.</Text>
      <View style={[styles.actions, wideLayout && styles.actionsWide]}>
        <View style={[styles.actionItem, wideLayout && styles.actionItemWide]}><Button label="EXPLORE THE COURSES" href="/courses" /></View>
        <View style={[styles.actionItem, wideLayout && styles.actionItemWide]}><Button label={`REVIEW YOUR SELECTION · ${selected.length}`} href="/quote" secondary /></View>
      </View>
      <SectionLabel>OUT THERE, YOUR WAY</SectionLabel>
      <View style={[styles.tiles, wideLayout && styles.tilesWide]}>
        {COURSES.slice(0, 3).map((course) => <Link href={`/course/${course.slug}`} asChild key={course.slug}>
          <Pressable style={[styles.tile, wideLayout && styles.tileWide]}>
            <View style={styles.tileContent}>
              <Text style={styles.tileTag}>{course.tag}</Text>
              <Text style={styles.tileTitle}>{course.title}</Text>
              <Text style={styles.tileFee}>{money(course.fee)} <Text style={styles.tilePer}>/ person</Text></Text>
            </View>
          </Pressable>
        </Link>)}
      </View>
      <View style={styles.band}>
        <View style={styles.bandCopy}>
          <Text style={styles.bandLabel}>GOOD DAYS. GOOD PEOPLE.</Text>
          <Text style={styles.bandTitle}>Take the long way around.</Text>
        </View>
        <View style={styles.bandButton}><Button label="OUR STORY" href="/about" secondary /></View>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  heroShade: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(20, 15, 11, 0.12)' },
  heroContent: { maxWidth: 680, paddingBottom: 8 },
  heroKicker: { color: colors.white, fontWeight: '900', fontSize: 10, letterSpacing: 1.6, marginBottom: 8 },
  heroTitle: { color: colors.white, fontSize: 38, lineHeight: 44, fontWeight: '900', letterSpacing: -0.8 },
  heroTitleWide: { color: colors.white, fontSize: 46, lineHeight: 52, fontWeight: '900', letterSpacing: -1.2 },
  intro: { maxWidth: 670, fontSize: 19, lineHeight: 29, fontWeight: '600', color: colors.espresso, marginVertical: 18 },
  actions: { gap: 0 },
  actionsWide: { maxWidth: 640, flexDirection: 'row', gap: 12 },
  actionItem: { width: '100%' },
  actionItemWide: { flex: 1 },
  tiles: { gap: 1, marginTop: 7, backgroundColor: colors.line },
  tilesWide: { flexDirection: 'row' },
  tile: { width: '100%', backgroundColor: colors.white },
  tileWide: { flex: 1 },
  tileContent: { padding: 18 },
  tileTag: { color: colors.orange, fontSize: 10, fontWeight: '900', letterSpacing: 1.2 },
  tileTitle: { color: colors.espresso, fontSize: 19, fontWeight: '900', marginTop: 7 },
  tileFee: { color: colors.espresso, fontWeight: '800', marginTop: 10 },
  tilePer: { color: colors.muted, fontWeight: '400', fontSize: 12 },
  band: { marginTop: 46, padding: 26, backgroundColor: '#E8D6C1', borderRadius: 8 },
  bandCopy: { marginBottom: 8 },
  bandButton: { width: '100%', maxWidth: 240 },
  bandLabel: { color: colors.espresso, fontWeight: '900', fontSize: 10, letterSpacing: 1.4 },
  bandTitle: { color: colors.espresso, fontWeight: '900', fontSize: 25, marginTop: 8 },
});