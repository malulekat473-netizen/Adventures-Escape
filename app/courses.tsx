import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, Page, Photo, SectionLabel } from '../components/AppUI';
import { COURSES } from '../src/courses';
import { colors, money } from '../src/theme';

export default function COURSESScreen() {
  return <Page title="Pick your kind of outside." eyebrow="THE COURSE LINE-UP">
    <Photo uri={COURSES[2].image} height={220} />
    <Text style={styles.caption}>Seven ways to make a day of it. Compare options below. Fees are per person; availability is confirmed after your request.</Text>
    <SectionLabel>CHOOSE AN ADVENTURE</SectionLabel>
    <View style={styles.courseList}>
      {COURSES.map((course) => <Link href={`/course/${course.slug}`} asChild key={course.slug}>
        <Pressable style={styles.card} accessibilityRole="button" accessibilityLabel={`${course.title}, ${money(course.fee)} per person. View details.`}>
          <View style={styles.cardTop}>
            <Text style={styles.tag}>{course.tag}</Text>
            <Text style={styles.fee}>{money(course.fee)} <Text style={styles.perPerson}>/ person</Text></Text>
          </View>
          <Text style={styles.courseName}>{course.title}</Text>
          <Text style={styles.purpose}>{course.purpose}</Text>
          <View style={styles.cardBottom}>
            <Text style={styles.includes}>Includes {course.includes.length} activities & items</Text>
            <Text style={styles.viewDetails}>VIEW DETAILS  ↗</Text>
          </View>
        </Pressable>
      </Link>)}
    </View>
    <Button label="START A BOOKING REQUEST" href="/request" />
  </Page>;
}

const styles = StyleSheet.create({
  caption: { color: colors.muted, fontSize: 14, lineHeight: 21 },
  courseList: { gap: 10 },
  card: { padding: 16, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: 8 },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  tag: { color: colors.orange, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  fee: { color: colors.espresso, fontWeight: '900', fontSize: 14 },
  perPerson: { color: colors.muted, fontWeight: '500', fontSize: 11 },
  courseName: { color: colors.espresso, fontWeight: '900', fontSize: 18, marginTop: 10 },
  purpose: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 6 },
  cardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, borderTopWidth: 1, borderColor: colors.line, marginTop: 13, paddingTop: 11 },
  includes: { color: colors.muted, fontSize: 11 },
  viewDetails: { color: colors.orange, fontSize: 10, fontWeight: '900', letterSpacing: 0.4 },
});
