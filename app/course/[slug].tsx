import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Body, Button, Page, Photo, SectionLabel } from '../../components/AppUI';
import { useBooking } from '../../src/booking';
import { courses } from '../../src/courses';
import { colors, money } from '../../src/theme';

export default function CourseDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const course = courses.find((item) => item.slug === slug);
  const { selected, toggleCourse } = useBooking();
  if (!course) return <Page title="Course not found"><Body>That course could not be found.</Body><Button label="BROWSE COURSES" href="/courses" /></Page>;
  const isSelected = selected.includes(course.slug);
  return <Page title={course.title} eyebrow={`${course.tag}  ·  ${money(course.fee)} PER PERSON`}>
    <Photo uri={course.image} height={290} />
    <Body>{course.purpose}</Body>
    <SectionLabel>WHAT'S INCLUDED</SectionLabel>
    {course.includes.map((item) => <View key={item} style={styles.listRow}><Text style={styles.check}>+</Text><Text style={styles.listText}>{item}</Text></View>)}
    <Text style={styles.notice}>Your request is not a confirmed booking. Our team will follow up to confirm details and availability.</Text>
    <Button label="SAFETY & PREPARATION" href="/safety" secondary />
    <Button label={isSelected ? 'REMOVE FROM MY SELECTION' : 'ADD TO MY SELECTION'} onPress={() => toggleCourse(course.slug)} secondary={isSelected} />
    <Button label="CONTINUE TO REQUEST" href="/request" />
  </Page>;
}

const styles = StyleSheet.create({ listRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: colors.line }, check: { width: 29, color: colors.orange, fontSize: 20, fontWeight: '900' }, listText: { flex: 1, color: colors.espresso, fontSize: 14 }, notice: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 20, padding: 14, backgroundColor: '#EDE6DE' } });