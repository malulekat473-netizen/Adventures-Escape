import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Page, Photo, SectionLabel } from '../components/AppUI';
import { courses } from '../src/courses';
import { colors, money } from '../src/theme';

export default function CoursesScreen() {
  return <Page title="Pick your kind of outside." eyebrow="THE COURSE LINE-UP">
    <Photo uri={courses[2].image} height={220} />
    <Text style={styles.caption}>Seven ways to make a day of it. Every fee is per person; final availability is confirmed after your request.</Text>
    <SectionLabel>COURSE & FEE OVERVIEW</SectionLabel>
    <ScrollView horizontal showsHorizontalScrollIndicator>
      <View>
        <View style={[styles.row, styles.headerRow]}><Text style={[styles.cell, styles.nameCell, styles.headerText]}>COURSE</Text><Text style={[styles.cell, styles.feeCell, styles.headerText]}>FEE</Text><Text style={[styles.cell, styles.inclusionCell, styles.headerText]}>INCLUDES</Text></View>
        {courses.map((course) => <Link href={`/course/${course.slug}`} asChild key={course.slug}><Pressable style={styles.row}>
          <Text style={[styles.cell, styles.nameCell, styles.courseName]}>{course.title}</Text>
          <Text style={[styles.cell, styles.feeCell, styles.fee]}>{money(course.fee)}</Text>
          <Text style={[styles.cell, styles.inclusionCell, styles.includes]} numberOfLines={2}>{course.includes.join(' · ')}</Text>
        </Pressable></Link>)}
      </View>
    </ScrollView>
    <Button label="START A BOOKING REQUEST" href="/request" />
  </Page>;
}

const styles = StyleSheet.create({
  caption: { color: colors.muted, fontSize: 13, lineHeight: 20 }, row: { minHeight: 58, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderBottomWidth: 1, borderColor: colors.line }, headerRow: { minHeight: 37, backgroundColor: colors.espresso }, cell: { paddingHorizontal: 11, paddingVertical: 9 }, nameCell: { width: 205 }, feeCell: { width: 110 }, inclusionCell: { width: 260 }, headerText: { color: colors.tan, fontSize: 9, fontWeight: '900', letterSpacing: 1 }, courseName: { color: colors.espresso, fontWeight: '800', fontSize: 12 }, fee: { color: colors.orange, fontWeight: '900', fontSize: 12 }, includes: { color: colors.muted, fontSize: 11 },
});