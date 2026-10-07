import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Button, Page, Photo, SectionLabel } from '../../components/AppUI';
import { courses } from '../../src/courses';
import { colors, money } from '../../src/theme';
import { useBooking } from '../../src/booking';

export default function HomeScreen() {
  const { selected } = useBooking();
  return (
    <Page title="Make room for outside." eyebrow="SME ADVENTURES  /  SOUTH AFRICA">
      <Photo uri={courses[0].image} height={340}>
        <View style={styles.heroShade} />
        <Text style={styles.heroKicker}>YOUR NEXT STORY STARTS HERE</Text>
        <Text style={styles.heroTitle}>Find your wild.</Text>
      </Photo>
      <Text style={styles.intro}>Big views, good people, and the kind of day you talk about long after you get home.</Text>
      <Button label="EXPLORE THE COURSES" href="/courses" />
      <Button label={`REVIEW YOUR SELECTION  ·  ${selected.length}`} href="/quote" secondary />
      <SectionLabel>OUT THERE, YOUR WAY</SectionLabel>
      <View style={styles.tiles}>
        {courses.slice(0, 3).map((course) => <Link href={`/course/${course.slug}`} asChild key={course.slug}>
          <Pressable style={styles.tile}><Text style={styles.tileTag}>{course.tag}</Text><Text style={styles.tileTitle}>{course.title}</Text><Text style={styles.tileFee}>{money(course.fee)} <Text style={styles.tilePer}>/ person</Text></Text></Pressable>
        </Link>)}
      </View>
      <View style={styles.band}><Text style={styles.bandLabel}>GOOD DAYS. GOOD PEOPLE.</Text><Text style={styles.bandTitle}>Take the long way around.</Text><Button label="OUR STORY" href="/about" secondary /></View>
    </Page>
  );
}

const styles = StyleSheet.create({
  heroShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,1,3,0.3)' }, heroKicker: { color: colors.tan, fontWeight: '900', fontSize: 10, letterSpacing: 1.6 }, heroTitle: { color: colors.white, fontSize: 38, fontWeight: '900', marginTop: 7 },
  intro: { fontSize: 18, lineHeight: 28, fontWeight: '700', color: colors.espresso, marginVertical: 14 }, tiles: { gap: 1, marginTop: 7, backgroundColor: colors.line },
  tile: { backgroundColor: colors.white, padding: 17 }, tileTag: { color: colors.orange, fontSize: 9, fontWeight: '900', letterSpacing: 1.2 }, tileTitle: { color: colors.espresso, fontSize: 18, fontWeight: '900', marginTop: 6 }, tileFee: { color: colors.espresso, fontWeight: '800', marginTop: 11 }, tilePer: { color: colors.muted, fontWeight: '400', fontSize: 12 },
  band: { marginHorizontal: -22, marginTop: 28, paddingHorizontal: 22, paddingVertical: 26, backgroundColor: colors.tan }, bandLabel: { color: colors.espresso, fontWeight: '900', fontSize: 10, letterSpacing: 1.4 }, bandTitle: { color: colors.espresso, fontWeight: '900', fontSize: 24, marginTop: 8 },
});
