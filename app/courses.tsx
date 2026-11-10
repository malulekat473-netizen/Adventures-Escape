import { Link } from 'expo-router';
import { ImageBackground, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Button, Page, Photo, SectionLabel } from '../components/AppUI';
import { COURSES } from '../src/courses';
import { colors, money } from '../src/theme';

export default function COURSESScreen() {
  const { width } = useWindowDimensions();
  const columns = width >= 760;
  return <Page title="Pick your kind of outside." eyebrow="THE COURSE LINE-UP">
    <Photo uri={COURSES[2].image} height={columns ? 310 : 220}>
      <View style={styles.heroShade} />
      <Text style={styles.heroTitle}>Find your kind of outside.</Text>
      <Text style={styles.heroCopy}>Guided adventures, fresh air and good company.</Text>
    </Photo>
    <Text style={styles.caption}>Seven ways to make a day of it. Compare options below. Fees are per person; availability is confirmed after your request.</Text>
    <SectionLabel>CHOOSE AN ADVENTURE</SectionLabel>
    <View style={[styles.courseList, columns && styles.courseListWide]}>
      {COURSES.map((course) => <Link href={`/course/${course.slug}`} asChild key={course.slug}>
        <Pressable style={[styles.card, columns && styles.cardWide]} accessibilityRole="button" accessibilityLabel={`${course.title}, ${money(course.fee)} per person. View details.`}>
          <ImageBackground source={course.image} resizeMode="cover" style={styles.cardImage} imageStyle={styles.cardImageShape}>
            <View style={styles.imageShade} />
            <Text style={styles.tag}>{course.tag}</Text>
            <Text style={styles.viewDetails}>VIEW DETAILS ↗</Text>
          </ImageBackground>
          <View style={styles.cardContent}>
            <View style={styles.cardTop}>
              <Text style={styles.courseName}>{course.title}</Text>
              <Text style={styles.fee}>{money(course.fee)} <Text style={styles.perPerson}>/ person</Text></Text>
            </View>
            <Text style={styles.purpose}>{course.purpose}</Text>
            <View style={styles.cardBottom}>
              <Text style={styles.includes}>Includes {course.includes.length} activities & items</Text>
            </View>
          </View>
        </Pressable>
      </Link>)}
    </View>
    <Button label="START A BOOKING REQUEST" href="/request" />
  </Page>;
}

const styles = StyleSheet.create({
  caption: { color: colors.muted, fontSize: 14, lineHeight: 21 },
  heroShade: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(20, 15, 11, 0.42)' },
  heroTitle: { color: colors.white, fontSize: 32, lineHeight: 38, fontWeight: '900', maxWidth: 500 },
  heroCopy: { color: colors.white, fontSize: 15, marginTop: 8 },
  courseList: { gap: 15 },
  courseListWide: { flexDirection: 'row', flexWrap: 'wrap' },
  card: { width: '100%', overflow: 'hidden', backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: 8 },
  cardWide: { width: '48.5%' },
  cardImage: { height: 190, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', padding: 15, overflow: 'hidden', backgroundColor: colors.stone },
  cardImageShape: { borderTopLeftRadius: 7, borderTopRightRadius: 7 },
  imageShade: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(20, 15, 11, 0.32)' },
  cardContent: { padding: 17 },
  cardTop: { gap: 8 },
  tag: { color: colors.white, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  fee: { color: colors.espresso, fontWeight: '900', fontSize: 14, marginTop: 7 },
  perPerson: { color: colors.muted, fontWeight: '500', fontSize: 11 },
  courseName: { color: colors.espresso, fontWeight: '900', fontSize: 19 },
  purpose: { color: colors.muted, fontSize: 13, lineHeight: 20, marginTop: 8 },
  cardBottom: { borderTopWidth: 1, borderColor: colors.line, marginTop: 13, paddingTop: 11 },
  includes: { color: colors.muted, fontSize: 11 },
  viewDetails: { color: colors.white, fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
});
